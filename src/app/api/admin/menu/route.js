import { getAdminSession, hasRoleAtLeast, isSameOrigin } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/**
 * Admin panel - menu management (table: public.menu_items).
 *   GET    list all items (incl. unavailable) -> any panel role
 *   POST   create an item                     -> any panel role
 *   PATCH  update an item                     -> any panel role
 *   DELETE delete an item                     -> owner and above
 * Writes use the service-role client after the caller's role check.
 */

const TEXT_FIELDS = {
  name_tr: 200,
  name_en: 200,
  name_ar: 200,
  name_zh: 200,
  description_tr: 2000,
  description_en: 2000,
  description_ar: 2000,
  description_zh: 2000,
  portion_or_pieces: 80,
};
const LIST_FIELDS = ['ingredients', 'tags', 'allergens'];
const NAME_FIELDS = ['name_tr', 'name_en', 'name_ar', 'name_zh'];
const CURRENCIES = ['TL', 'TRY', 'USD', 'EUR'];
const ID_PATTERN = /^[a-z0-9][a-z0-9_-]{1,79}$/;
const CATEGORY_PATTERN = /^[a-z0-9][a-z0-9_-]{0,59}$/;
const NO_STORE = { 'Cache-Control': 'no-store' };

function fail(message, status = 400) {
  return Response.json({ error: message }, { status, headers: NO_STORE });
}

async function requireSession(minRole, request) {
  if (request && !isSameOrigin(request)) {
    return { error: fail('Cross-site request blocked.', 403) };
  }
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

function toList(value) {
  const list = Array.isArray(value) ? value : String(value ?? '').split(',');
  return list.map((v) => String(v).trim()).filter(Boolean).slice(0, 60);
}

/** Validate + normalise the editable fields that are present in `body`. */
function pickItemFields(body) {
  const item = {};

  for (const [field, max] of Object.entries(TEXT_FIELDS)) {
    if (body[field] === undefined) continue;
    const value = body[field] === null ? '' : String(body[field]).trim();
    if (value.length > max) return { error: `${field} is too long (max ${max} characters).` };
    item[field] = value || null;
  }

  for (const field of LIST_FIELDS) {
    if (body[field] === undefined) continue;
    const list = toList(body[field]);
    if (list.some((entry) => entry.length > 120)) {
      return { error: `Each ${field} entry must be 120 characters or fewer.` };
    }
    item[field] = list;
  }

  if (body.price !== undefined) {
    const price = Number(body.price);
    if (body.price === '' || !Number.isFinite(price) || price < 0 || price > 1_000_000) {
      return { error: 'Price must be a number between 0 and 1,000,000.' };
    }
    item.price = price;
  }

  if (body.currency !== undefined) {
    const currency = String(body.currency || 'TL').trim().toUpperCase();
    if (!CURRENCIES.includes(currency)) return { error: 'Unsupported currency.' };
    item.currency = currency;
  }

  if (body.category !== undefined) {
    const category = String(body.category ?? '').trim().toLowerCase();
    if (!CATEGORY_PATTERN.test(category)) {
      return { error: 'Category must be lowercase letters, numbers, dashes or underscores (e.g. sushi-sets).' };
    }
    item.category = category;
  }

  if (body.image !== undefined) {
    const image = body.image === null ? '' : String(body.image).trim();
    if (image && !/^(\/|https:\/\/)/.test(image)) {
      return { error: 'Image must be a path starting with / or an https:// URL.' };
    }
    if (image.length > 500) return { error: 'Image path is too long.' };
    item.image = image || null;
  }

  if (body.availability !== undefined) item.availability = Boolean(body.availability);

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

  return Response.json({ items: data }, { headers: NO_STORE });
}

export async function POST(request) {
  const { admin, error } = await requireSession('admin', request);
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? '').trim();
  if (!ID_PATTERN.test(id)) {
    return fail('Item id is required: 2-80 lowercase letters, numbers, dashes or underscores.');
  }

  const { item, error: fieldError } = pickItemFields(body);
  if (fieldError) return fail(fieldError);
  if (item.price === undefined) return fail('Price is required.');
  if (!item.category) return fail('Category is required.');
  if (!NAME_FIELDS.some((field) => item[field])) {
    return fail('Give the item a name in at least one language.');
  }

  const { data, error: dbError } = await admin
    .from('menu_items')
    .insert({
      currency: 'TL',
      availability: true,
      ...item,
      id,
      last_reviewed_at: new Date().toISOString().slice(0, 10),
    })
    .select('*')
    .single();
  if (dbError) {
    if (dbError.code === '23505') return fail('An item with this id already exists.', 409);
    return fail(dbError.message, 400);
  }

  return Response.json({ item: data }, { status: 201, headers: NO_STORE });
}

export async function PATCH(request) {
  const { admin, error } = await requireSession('admin', request);
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
    .maybeSingle();
  if (dbError) return fail(dbError.message, 400);
  if (!data) return fail('This item no longer exists. Reload the list.', 404);

  return Response.json({ item: data }, { headers: NO_STORE });
}

export async function DELETE(request) {
  const { admin, error } = await requireSession('owner', request);
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? '').trim();
  if (!id) return fail('Missing item id.');

  const { data, error: dbError } = await admin
    .from('menu_items')
    .delete()
    .eq('id', id)
    .select('id');
  if (dbError) return fail(dbError.message, 500);
  if (!data?.length) return fail('This item no longer exists. Reload the list.', 404);

  return Response.json({ ok: true }, { headers: NO_STORE });
}
