import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf8');

const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/['"]/g, '');
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ متغيرات البيئة غير موجودة! تأكد من ملف .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔄 جاري الاتصال بـ Supabase لجلب البيانات...');
  
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name_en, price')
    .limit(5);

  if (error) {
    console.error("❌ حدث خطأ أثناء الاتصال بقاعدة البيانات:", error.message);
    return;
  }

  console.log("✅ الاتصال ناجح وممتاز! إليك أول 5 منتجات من قاعدة البيانات للتأكيد:");
  console.table(data);
  
  const { count } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true });
    
  console.log(`\n✅ إجمالي عدد المنتجات المحفوظة في الداتا بيز الآن: ${count} منتج.`);
}

testConnection();
