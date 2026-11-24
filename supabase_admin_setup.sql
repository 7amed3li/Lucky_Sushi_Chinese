-- ==========================================
-- Lucky Sushi Chinese - Admin Panel Setup
-- ==========================================
-- Run this ONCE in the Supabase SQL Editor, AFTER supabase_setup.sql.
--
-- What it creates:
--   * public.profiles  - one row per admin-panel user, with a role.
--   * Role hierarchy:  developer (top) > owner > admin
--       - developer : full control. Can add/remove owners and admins,
--                     change any role, manage the menu.
--       - owner     : can add/manage admins only, manage the menu.
--       - admin     : can manage the menu only.
--   * A trigger that auto-creates a profile row for every new
--     Supabase Auth user (role taken from user metadata, default 'admin').
--   * Row Level Security on profiles and menu_items.
--
-- BOOTSTRAP THE FIRST DEVELOPER (after running this file):
--   1. Supabase Dashboard -> Authentication -> Users -> "Add user"
--      Create the developer account with an email + password.
--      (The trigger below creates its profile automatically as 'admin'.)
--   2. Promote it to developer by running:
--        UPDATE public.profiles SET role = 'developer'
--        WHERE email = 'developer@example.com';
--   3. Log in at /admin/login on the website.
--   From then on, the developer adds owners/admins from the panel itself.
-- ==========================================

-- 1. Role type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('developer', 'owner', 'admin');
  END IF;
END
$$;

-- 2. Profiles table (one row per Supabase Auth user)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    email text NOT NULL,
    display_name text,
    role public.user_role NOT NULL DEFAULT 'admin',
    is_active boolean NOT NULL DEFAULT true,
    created_by uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role);

-- 3. Auto-create a profile for every new auth user.
--    Role/display name come from the user's metadata (set by the admin
--    panel's "add user" API route); anything else defaults to 'admin'.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'display_name',
    CASE
      WHEN NEW.raw_user_meta_data ->> 'role' IN ('developer', 'owner', 'admin')
        THEN (NEW.raw_user_meta_data ->> 'role')::public.user_role
      ELSE 'admin'::public.user_role
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for auth users that already exist.
INSERT INTO public.profiles (id, email, display_name)
SELECT id, email, raw_user_meta_data ->> 'display_name'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 4. Helper: role of the currently signed-in user (used by RLS policies).
CREATE OR REPLACE FUNCTION public.my_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true;
$$;

-- 5. Row Level Security - profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    id = auth.uid()                       -- own row
    OR public.my_role() = 'developer'     -- developer sees everyone
    OR public.my_role() = 'owner'         -- owner sees everyone (manages admins)
  );

-- Direct writes from a browser session are developer-only.
-- (The panel itself writes through server API routes that verify the
--  caller's role in code and then use the service-role key, which
--  bypasses RLS - these policies are the second line of defence.)
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (public.my_role() = 'developer');

DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.my_role() = 'developer')
  WITH CHECK (public.my_role() = 'developer');

DROP POLICY IF EXISTS "profiles_delete" ON public.profiles;
CREATE POLICY "profiles_delete" ON public.profiles
  FOR DELETE TO authenticated
  USING (public.my_role() = 'developer');

-- 6. Row Level Security - menu_items
--    Public visitors can read available items (the website falls back to
--    static data anyway). Signed-in panel users can read everything.
--    Direct writes are restricted to active panel users; the panel's API
--    routes re-check roles in code before writing.
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "menu_items_public_read" ON public.menu_items;
CREATE POLICY "menu_items_public_read" ON public.menu_items
  FOR SELECT TO anon
  USING (availability = true);

DROP POLICY IF EXISTS "menu_items_panel_read" ON public.menu_items;
CREATE POLICY "menu_items_panel_read" ON public.menu_items
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "menu_items_panel_write" ON public.menu_items;
CREATE POLICY "menu_items_panel_write" ON public.menu_items
  FOR ALL TO authenticated
  USING (public.my_role() IS NOT NULL)
  WITH CHECK (public.my_role() IS NOT NULL);
