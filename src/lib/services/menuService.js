/**
 * Menu service — resolves menu items from Supabase (if available)
 * or falls back to the static local CSV-derived data.
 *
 * Table schema expected in Supabase (optional):
 *   menu_items (
 *     id text primary key,
 *     name_tr text, name_en text, name_ar text, name_zh text,
 *     description_tr text, description_en text, description_ar text, description_zh text,
 *     ingredients text[],
 *     portion_or_pieces text,
 *     price numeric,
 *     currency text default 'TL',
 *     category text,
 *     tags text[],
 *     allergens text[],
 *     image text,
 *     availability boolean default true,
 *     last_reviewed_at date
 *   )
 *
 * If the table doesn't exist or Supabase is not configured,
 * the static data from menuData.js is returned automatically.
 */

import { menuItems as staticItems } from '@/data/menuData';
import supabase from '@/lib/supabase/client';

/**
 * Fetch all available menu items.
 * @returns {Promise<Array>}
 */
export async function fetchMenuItems() {
  if (!supabase) return staticItems;

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('availability', true)
      .order('category')
      .order('price');

    if (error || !data || data.length === 0) {
      console.info('[MenuService] Using static data (Supabase returned:', error?.message ?? 'empty', ')');
      return staticItems;
    }

    return data;
  } catch (err) {
    console.warn('[MenuService] Supabase fetch failed, using static data:', err.message);
    return staticItems;
  }
}

/**
 * Fetch a single item by ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function fetchMenuItemById(id) {
  if (!supabase) {
    return staticItems.find((item) => item.id === id) ?? null;
  }

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return staticItems.find((item) => item.id === id) ?? null;
    }
    return data;
  } catch {
    return staticItems.find((item) => item.id === id) ?? null;
  }
}
