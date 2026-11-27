# Lucky Sushi — Admin Panel

A complete admin panel for the website, backed by **PostgreSQL** (via
Supabase, which the site was already wired for). It lives at:

- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **Menu management:** `/admin/menu`
- **Users & roles:** `/admin/users` (owner and developer only)

## Role hierarchy

```
👑 Developer  →  Owner  →  Admin
```

| Capability                                   | Developer | Owner | Admin |
| -------------------------------------------- | :-------: | :---: | :---: |
| View dashboard                               |     ✓     |   ✓   |   ✓   |
| Add / edit menu items, prices, availability  |     ✓     |   ✓   |   ✓   |
| Delete menu items                            |     ✓     |   ✓   |       |
| Add admin accounts                           |     ✓     |   ✓   |       |
| Manage admin accounts (activate, rename)     |     ✓     |   ✓   |       |
| Add owner accounts                           |     ✓     |       |       |
| Change roles / manage owners                 |     ✓     |       |       |
| Delete accounts                              |     ✓     |       |       |

Safety rules enforced on the server (not just hidden in the UI):

- Nobody can change their **own** role or deactivate their own account.
- The **last active developer** can never be deleted, deactivated or
  demoted — the panel can never lock the developer out.
- Owners can only ever create/manage **admin** accounts.

## How it works

- **Accounts** are Supabase Auth users. A `profiles` table in PostgreSQL
  holds each account's role (`developer` / `owner` / `admin`), display
  name and active flag. A database trigger creates the profile row
  automatically when an account is created.
- **The panel writes through server API routes**
  (`/api/admin/users`, `/api/admin/menu`). Each route first verifies the
  caller's session and role in code, then writes with the service-role
  key. Row Level Security policies in the database are a second line of
  defence.
- **The public website** — ⚠️ the menu *service* (`src/lib/services/menuService.js`)
  can read `menu_items`, but the website's pages currently import the static
  `src/data/menuData.js` directly, so **edits made in the panel are stored in the
  database but are not shown on the site yet**. Wiring the site to the database is
  a separate step.

## One-time setup

1. **Database** — in the Supabase SQL Editor, run in order:
   1. `supabase_setup.sql` (menu table + data — skip if already done)
   2. `supabase_admin_setup.sql` (profiles, roles, triggers, RLS)
2. **Environment variables** (locally in `.env.local`, on Vercel in
   Project Settings → Environment Variables) — see `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` ← from Supabase → Project Settings →
     API → `service_role` secret. **Server only, never commit it.**
3. **Create the first developer account:**
   1. Supabase Dashboard → Authentication → Users → **Add user** —
      enter the developer's email + a password.
   2. Back in the SQL Editor, promote that account:
      ```sql
      UPDATE public.profiles
      SET role = 'developer'
      WHERE email = 'the-developer-email@example.com';
      ```
4. **Log in** at `/admin/login`. From the **Users & roles** page the
   developer can now add owner and admin accounts directly — no more
   SQL needed.

## Files added

| File | Purpose |
| ---- | ------- |
| `supabase_admin_setup.sql` | Profiles table, role type, auth trigger, RLS |
| `src/lib/supabase/server.js` | Session-bound Supabase client (server) |
| `src/lib/supabase/admin.js` | Service-role client (server only) |
| `src/lib/adminAuth.js` | Session + role resolution helpers |
| `src/app/api/admin/users/route.js` | User & role management API (role-gated) |
| `src/app/api/admin/menu/route.js` | Menu CRUD API (role-gated) |
| `src/app/admin/login/` | Panel login page |
| `src/app/admin/(panel)/` | Dashboard, menu manager, users manager, shell |
| `src/app/admin/layout.jsx` | Admin-only root shell (own CSS, `noindex`) — none of the public site's providers load here |
| `src/lib/supabase/proxy.js` + `src/proxy.js` | Refreshes the Supabase session for `/admin` so staff are not logged out every hour |
| `src/app/admin/admin.css` | Panel styles (brand-aligned, responsive: top bar + card rows + bottom sheets on mobile) |

One existing file was touched: `src/proxy.js` — the i18n middleware
matcher now also excludes `admin`, so `/admin` is not treated as a
language route. Nothing else in the public site changed.
