/**
 * Vercel serverless function — proxies VIX data from Yahoo Finance.
 * Called from the browser as /api/vix to avoid CORS restrictions.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')

  try {
    const response = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?interval=1d&range=1d',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; portfolio-site/1.0)',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(4000),
      }
    )

    if (!response.ok) throw new Error(`Yahoo Finance returned ${response.status}`)

    const data = await response.json()
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice ?? null

    res.status(200).json({ vix: price })
  } catch {
    // Return null gracefully — the frontend handles missing data
    res.status(200).json({ vix: null })
  }
}
