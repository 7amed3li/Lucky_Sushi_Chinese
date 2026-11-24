import { getAdminSession, hasRoleAtLeast } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/**
 * Admin panel - menu management (table: public.menu_items).
 *   GET    list all items (incl. unavailable) -> any panel role
 *   POST   create an item                     -> any panel role
 *   PATCH  update an item                     -> any panel role
 *   DELETE delete an item                     -> owner and above
 * Writes use the service-role client after the caller's role check.
 */

const EDITABLE_FIELDS = [
  'name_tr',
  'name_en',
  'name_ar',
  'name_zh',
  'description_tr',
  'description_en',
  'description_ar',
  'description_zh',
  'ingredients',
  'portion_or_pieces',
  'price',
  'currency',
  'category',
  'tags',
  'allergens',
  'image',
  'availability',
];

function fail(message, status = 400) {
  return Response.json({ error: message }, { status });
}

async function requireSession(minRole) {
  const session = await getAdminSession();
  if (!session) return { error: fail('Not signed in.', 401) };
  if (!hasRoleAtLeast(session.profile, minRole)) {
    return { error: fail('Your role does not allow this action.', 403) };
  }
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return {
      error: fail(
        'Server is missing SUPABASE_SERVICE_ROLE_KEY - menu management is unavailable.',
        503
      ),
    };
  }
  return { session, admin };
}

function pickItemFields(body) {
  const item = {};
  for (const field of EDITABLE_FIELDS) {
    if (body[field] === undefined) continue;
    if (field === 'price') {
      const price = Number(body[field]);
      if (!Number.isFinite(price) || price < 0) return { error: 'Price must be a non-negative number.' };
      item[field] = price;
    } else if (field === 'availability') {
      item[field] = Boolean(body[field]);
    } else if (['ingredients', 'tags', 'allergens'].includes(field)) {
      const value = body[field];
      item[field] = Array.isArray(value)
        ? value.map((v) => String(v).trim()).filter(Boolean)
        : String(value ?? '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
    } else {
      const value = body[field];
      item[field] = value === null ? null : String(value).trim() || null;
    }
  }
  return { item };
}

export async function GET() {
  const { admin, error } = await requireSession('admin');
  if (error) return error;

  const { data, error: dbError } = await admin
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })
    .order('price', { ascending: true });
  if (dbError) return fail(dbError.message, 500);

  return Response.json({ items: data });
}

export async function POST(request) {
  const { admin, error } = await requireSession('admin');
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? '').trim();
  if (!id || !/^[a-z0-9][a-z0-9-_]*$/.test(id)) {
    return fail('Item id is required (lowercase letters, numbers, dashes).');
  }

  const { item, error: fieldError } = pickItemFields(body);
  if (fieldError) return fail(fieldError);
  if (item.price === undefined) return fail('Price is required.');

  const { data, error: dbError } = await admin
    .from('menu_items')
    .insert({
      id,
      currency: 'TL',
      availability: true,
      ...item,
      last_reviewed_at: new Date().toISOString().slice(0, 10),
    })
    .select('*')
    .single();
  if (dbError) return fail(dbError.message, 400);

  return Response.json({ item: data }, { status: 201 });
}

export async function PATCH(request) {
  const { admin, error } = await requireSession('admin');
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? '').trim();
  if (!id) return fail('Missing item id.');

  const { item, error: fieldError } = pickItemFields(body);
  if (fieldError) return fail(fieldError);

  const { data, error: dbError } = await admin
    .from('menu_items')
    .update({ ...item, last_reviewed_at: new Date().toISOString().slice(0, 10) })
    .eq('id', id)
    .select('*')
    .single();
  if (dbError) return fail(dbError.message, 400);

  return Response.json({ item: data });
}

export async function DELETE(request) {
  const { admin, error } = await requireSession('owner');
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? '').trim();
  if (!id) return fail('Missing item id.');

  const { error: dbError } = await admin.from('menu_items').delete().eq('id', id);
  if (dbError) return fail(dbError.message, 500);

  return Response.json({ ok: true });
}
