import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { menuItems } from './src/data/menuData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sql = `
-- ==========================================
-- Lucky Sushi Chinese - Supabase Database
-- ==========================================

-- 1. Create the Table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id text PRIMARY KEY,
    name_tr text,
    name_en text,
    name_ar text,
    name_zh text,
    description_tr text,
    description_en text,
    description_ar text,
    description_zh text,
    ingredients text[],
    portion_or_pieces text,
    price numeric,
    currency text DEFAULT 'TL',
    category text,
    tags text[],
    allergens text[],
    image text,
    availability boolean DEFAULT true,
    last_reviewed_at text
);

-- 2. Clear existing data (if you want to re-run this script)
TRUNCATE TABLE public.menu_items;

-- 3. Insert Data
`;

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

function arrayToSql(arr) {
    if (!arr || arr.length === 0) return "'{}'";
    const escaped = arr.map(item => `"${item.replace(/"/g, '""')}"`).join(',');
    return `'{${escaped}}'`;
}

menuItems.forEach(item => {
    const cols = [
        escapeSql(item.id),
        escapeSql(item.name_tr),
        escapeSql(item.name_en),
        escapeSql(item.name_ar),
        escapeSql(item.name_zh),
        escapeSql(item.description_tr),
        escapeSql(item.description_en),
        escapeSql(item.description_ar),
        escapeSql(item.description_zh),
        arrayToSql(item.ingredients),
        escapeSql(item.portion_or_pieces),
        item.price || 0,
        escapeSql(item.currency),
        escapeSql(item.category),
        arrayToSql(item.tags),
        arrayToSql(item.allergens),
        escapeSql(item.image),
        item.availability ? 'true' : 'false',
        escapeSql(item.last_reviewed_at)
    ];

    sql += `INSERT INTO public.menu_items (id, name_tr, name_en, name_ar, name_zh, description_tr, description_en, description_ar, description_zh, ingredients, portion_or_pieces, price, currency, category, tags, allergens, image, availability, last_reviewed_at) VALUES (${cols.join(', ')});\n`;
});

const outPath = path.join(__dirname, 'supabase_setup.sql');
fs.writeFileSync(outPath, sql, 'utf8');

console.log('✅ SQL Script generated successfully at: ' + outPath);
