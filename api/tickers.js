export const config = { runtime: 'edge' }

const SYMBOLS = ['^VIX', 'SPY', '^TNX', 'BTC-USD', 'GC=F', '^IXIC', 'QQQ']

// Simple in-memory cache (edge function stays warm between requests)
let cache = { data: null, timestamp: 0 }
const CACHE_TTL = 30000 // 30 seconds

export default async function handler() {
  const now = Date.now()

  if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return new Response(JSON.stringify(cache.data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  const results = await Promise.all(
    SYMBOLS.map(async (symbol) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
        const json = await res.json()
        const meta = json.chart.result[0].meta
        const price = meta.regularMarketPrice
        const prev  = meta.chartPreviousClose ?? price
        return {
          symbol,
          price,
          change:    price - prev,
          changePct: ((price - prev) / prev) * 100,
        }
      } catch {
        return { symbol, price: null, change: null, changePct: null }
      }
    })
  )

  cache = { data: results, timestamp: now }

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
