import fallbackData from '@/data/deliveryZonesFallback.json';

const CACHE_KEY = 'lucky_delivery_zones_cache_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

let memoryCache = null;

/**
 * Loads delivery zones with fallback to local JSON
 */
export async function getDeliveryZonesData() {
  if (memoryCache) {
    return memoryCache;
  }

  // Check client sessionStorage if running in browser
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS && data && data.districts) {
          memoryCache = data;
          return data;
        }
      }
    } catch (_) {}
  }

  // Attempt Supabase fetch if credentials exist, otherwise use fallbackData
  let resolvedData = fallbackData;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/delivery_zones?is_active=eq.true&select=*`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          // Structure flat rows into hierarchical districts & neighborhoods
          const districtMap = new Map();

          rows.forEach((row) => {
            const districtKey = row.district.toLowerCase().trim();
            if (!districtMap.has(districtKey)) {
              districtMap.set(districtKey, {
                id: districtKey,
                name_tr: row.district,
                name_en: row.district,
                name_ar: row.district,
                name_ru: row.district,
                name_zh: row.district,
                neighborhoods: [],
              });
            }

            districtMap.get(districtKey).neighborhoods.push({
              id: row.id || row.neighborhood.toLowerCase().trim(),
              name_tr: row.neighborhood,
              branch_id: row.branch_id,
              min_order_tl: Number(row.min_order_tl) || 500,
              delivery_fee_tl: Number(row.delivery_fee_tl) || 0,
            });
          });

          // Merge with translated names from fallbackData
          const structuredDistricts = Array.from(districtMap.values()).map((d) => {
            const fallbackD = fallbackData.districts.find(
              (fd) => fd.name_tr.toLowerCase() === d.name_tr.toLowerCase() || fd.id === d.id
            );
            if (fallbackD) {
              return {
                ...d,
                id: fallbackD.id,
                name_en: fallbackD.name_en,
                name_ar: fallbackD.name_ar,
                name_ru: fallbackD.name_ru,
                name_zh: fallbackD.name_zh,
              };
            }
            return d;
          });

          resolvedData = {
            city: 'İstanbul',
            districts: structuredDistricts,
          };
        }
      }
    } catch (_) {
      // Gracefully fall back to local JSON
      resolvedData = fallbackData;
    }
  }

  memoryCache = resolvedData;

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: resolvedData })
      );
    } catch (_) {}
  }

  return resolvedData;
}

/**
 * Returns available districts
 */
export async function getDistricts() {
  const data = await getDeliveryZonesData();
  return data.districts || [];
}

/**
 * Returns neighborhoods for a given district
 */
export async function getNeighborhoods(districtId) {
  if (!districtId) return [];
  const data = await getDeliveryZonesData();
  const district = data.districts.find(
    (d) => d.id === districtId || d.name_tr.toLowerCase() === districtId.toLowerCase()
  );
  return district ? district.neighborhoods : [];
}

/**
 * Validates whether an address is within active delivery coverage
 * and returns the fulfilling branch and delivery rules.
 */
export async function validateDeliveryAddress(districtId, neighborhoodId) {
  if (!districtId || !neighborhoodId) {
    return {
      isValid: false,
      reason: 'MISSING_FIELDS',
      branchId: null,
      minOrderTl: 500,
      deliveryFeeTl: 0,
    };
  }

  const neighborhoods = await getNeighborhoods(districtId);
  const match = neighborhoods.find(
    (n) =>
      n.id === neighborhoodId ||
      n.name_tr.toLowerCase() === neighborhoodId.toLowerCase()
  );

  if (!match) {
    return {
      isValid: false,
      reason: 'UNSUPPORTED_ZONE',
      branchId: null,
      minOrderTl: 500,
      deliveryFeeTl: 0,
    };
  }

  return {
    isValid: true,
    reason: null,
    branchId: match.branch_id,
    neighborhoodName: match.name_tr,
    minOrderTl: match.min_order_tl || 500,
    deliveryFeeTl: match.delivery_fee_tl || 0,
  };
}
