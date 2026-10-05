// Server-side cached exchange rate proxy
// Caches rates for 5 minutes to avoid hammering the external API
// while still providing near-real-time rates to clients

let cachedRates = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  // Return cached data if still fresh
  if (cachedRates && now - cacheTimestamp < CACHE_DURATION_MS) {
    return Response.json({
      ...cachedRates,
      cached: true,
      nextUpdate: Math.round((CACHE_DURATION_MS - (now - cacheTimestamp)) / 1000),
    });
  }

  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/TRY",
      { 
        next: { revalidate: 300 }, // Next.js fetch cache: 5 min
        signal: AbortSignal.timeout(3000)
      }
    );

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    cachedRates = {
      rates: {
        TRY: { symbol: "₺", rate: 1 },
        USD: { symbol: "$", rate: data.rates.USD || 0.02121 },
        EUR: { symbol: "€", rate: data.rates.EUR || 0.01855 },
        GBP: { symbol: "£", rate: data.rates.GBP || 0.01579 },
        RUB: { symbol: "₽", rate: data.rates.RUB || 2.65 },
        SAR: { symbol: "ر.س", rate: data.rates.SAR || (data.rates.USD ? Number((data.rates.USD * 3.75).toFixed(5)) : 0.0795) },
      },
      source: "exchangerate-api.com",
      lastUpdated: data.date,
      fetchedAt: new Date().toISOString(),
    };
    cacheTimestamp = now;

    return Response.json({ ...cachedRates, cached: false });
  } catch (error) {
    // Fallback: return stale cache if available, or hardcoded defaults
    const fallback = cachedRates || {
      rates: {
        TRY: { symbol: "₺", rate: 1 },
        USD: { symbol: "$", rate: 0.02121 },
        EUR: { symbol: "€", rate: 0.01855 },
        GBP: { symbol: "£", rate: 0.01579 },
        RUB: { symbol: "₽", rate: 2.65 },
        SAR: { symbol: "ر.س", rate: 0.0795 },
      },
      source: "fallback",
      lastUpdated: new Date().toISOString().split("T")[0],
      fetchedAt: new Date().toISOString(),
    };

    return Response.json({ ...fallback, cached: true, error: error.message });
  }
}
