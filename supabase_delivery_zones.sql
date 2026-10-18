-- ==============================================================================
-- Lucky Sushi & Chinese — Supabase Delivery Zones Migration & Seed Script
-- ==============================================================================

-- 1. Create table public.delivery_zones
CREATE TABLE IF NOT EXISTS public.delivery_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id TEXT NOT NULL, -- 'alibeykoy', 'zeytinburnu', 'resitpasa'
    city TEXT NOT NULL DEFAULT 'İstanbul',
    district TEXT NOT NULL,  -- e.g. 'Eyüpsultan', 'Zeytinburnu', 'Sarıyer'
    neighborhood TEXT NOT NULL, -- e.g. 'Alibeyköy Mah.', 'Sümer Mah.'
    min_order_tl NUMERIC NOT NULL DEFAULT 500,
    delivery_fee_tl NUMERIC NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    estimated_delivery_minutes INTEGER DEFAULT 45,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_city_district_neighborhood UNIQUE (city, district, neighborhood)
);

-- 2. Indexes for high performance lookups
CREATE INDEX IF NOT EXISTS idx_delivery_zones_lookup 
ON public.delivery_zones (city, district, neighborhood) 
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_delivery_zones_branch 
ON public.delivery_zones (branch_id);

-- 3. Row Level Security (RLS)
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active zones
DROP POLICY IF EXISTS "Public read access for active delivery zones" ON public.delivery_zones;
CREATE POLICY "Public read access for active delivery zones" 
ON public.delivery_zones FOR SELECT 
TO anon, authenticated 
USING (is_active = true);

-- Deny public write mutations (staff only via service_role or Supabase dashboard)
DROP POLICY IF EXISTS "Disallow public mutations" ON public.delivery_zones;
CREATE POLICY "Disallow public mutations" 
ON public.delivery_zones FOR ALL 
TO anon 
USING (false);

-- 4. Seed Data for Branches: Alibeyköy, Zeytinburnu, Reşitpaşa (All 500 TL min, 0 TL delivery fee)

-- Eyüpsultan (Alibeyköy Main Branch)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Alibeyköy Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Çırçır Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Yeşilpınar Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Akşemsettin Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Güzeltepe Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Merkez Mah. (Eyüp)', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'İslambey Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Rami Cuma Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Rami Yeni Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Silahtarağa Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Sakarya Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Topçular Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Nişanca Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Eyüpsultan', 'Emniyettepe Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Gaziosmanpaşa (Alibeyköy Main Branch)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Merkez Mah. (GOP)', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Bağlarbaşı Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Hürriyet Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Karadeniz Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Karlıtepe Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Kâzım Karabekir Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Mevlana Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Pazariçi Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Sarıgöl Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Yeni Mahalle', 500, 0),
('alibeykoy', 'İstanbul', 'Gaziosmanpaşa', 'Yıldıztabya Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Kağıthane (Alibeyköy & Reşitpaşa)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('alibeykoy', 'İstanbul', 'Kağıthane', 'Hamidiye Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Kağıthane', 'Cendere / Vadistanbul Çevresi', 500, 0),
('alibeykoy', 'İstanbul', 'Kağıthane', 'Merkez Mah. (Kağıthane)', 500, 0),
('alibeykoy', 'İstanbul', 'Kağıthane', 'Nurtepe Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Kağıthane', 'Seyrantepe Mah.', 500, 0),
('alibeykoy', 'İstanbul', 'Kağıthane', 'Talatpaşa Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Zeytinburnu (Zeytinburnu Branch)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Sümer Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Merkezefendi Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Beştelsiz Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Çırpıcı Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Gökalp Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Kazlıçeşme Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Maltepe Mah. (Topkapı)', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Nuripaşa Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Telsiz Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Veliefendi Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Yenidoğan Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Zeytinburnu', 'Yeşiltepe Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Bakırköy (Zeytinburnu Branch)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Ataköy 1. Kısım Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Ataköy 2-5-6. Kısım Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Ataköy 3-4-11. Kısım Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Ataköy 7-8-9-10. Kısım Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Cevizlik Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Kartaltepe Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Osmaniye Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Sakızağacı Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Yenimahalle Mah. (Bakırköy)', 500, 0),
('zeytinburnu', 'İstanbul', 'Bakırköy', 'Yeşilköy Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Fatih (Zeytinburnu Branch)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('zeytinburnu', 'İstanbul', 'Fatih', 'Topkapı Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Şehremini Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Kocamustafapaşa Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Fındıkzade / Haseki Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Aksaray Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Yedikule Mah.', 500, 0),
('zeytinburnu', 'İstanbul', 'Fatih', 'Silivrikapı Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Sarıyer (Reşitpaşa Cloud Kitchen)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('resitpasa', 'İstanbul', 'Sarıyer', 'Reşitpaşa Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Maslak Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'İstinye Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Emirgan Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Tarabya Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Yeniköy Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Fatih Sultan Mehmet Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Pınar Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Poligon Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Darüşşafaka Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Ayazağa Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Sarıyer', 'Hacıosman / Çamlıtepe Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;

-- Beşiktaş (Reşitpaşa Cloud Kitchen)
INSERT INTO public.delivery_zones (branch_id, city, district, neighborhood, min_order_tl, delivery_fee_tl) VALUES
('resitpasa', 'İstanbul', 'Beşiktaş', 'Levent Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Etiler Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Akatlar Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Nisbetiye Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Bebek Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Kuruçeşme Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Ortaköy Mah.', 500, 0),
('resitpasa', 'İstanbul', 'Beşiktaş', 'Ulus / Kültür Mah.', 500, 0)
ON CONFLICT (city, district, neighborhood) DO UPDATE 
SET branch_id = EXCLUDED.branch_id, min_order_tl = EXCLUDED.min_order_tl, delivery_fee_tl = EXCLUDED.delivery_fee_tl;
