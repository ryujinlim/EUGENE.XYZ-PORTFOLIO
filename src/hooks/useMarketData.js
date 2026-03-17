import { useState, useEffect, useCallback } from 'react'

const SYMBOLS = [
  { key: 'vix', symbol: '^VIX', decimals: 2, suffix: '' },
  { key: 'spy', symbol: 'SPY',  decimals: 1, suffix: '' },
  { key: 'tny', symbol: '^TNX', decimals: 2, suffix: '%' },
]

async function fetchQuote(symbol) {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(yahooUrl)}`
  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error('proxy error')
  const json = await res.json()
  const data = JSON.parse(json.contents)
  const meta = data?.chart?.result?.[0]?.meta
  if (!meta) throw new Error('no data')
  const price = meta.regularMarketPrice
  const prev  = meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? price
  return { price, change: price - prev }
}

export function useMarketData() {
  const [tickers, setTickers] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const results = await Promise.allSettled(
      SYMBOLS.map(({ symbol }) => fetchQuote(symbol))
    )
    const next = {}
    let any = false
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        const { key, decimals, suffix } = SYMBOLS[i]
        const { price, change } = r.value
        next[key] = { value: price.toFixed(decimals) + suffix, positive: change >= 0 }
        any = true
      }
    })
    if (any) setTickers(next)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 60_000)
    return () => clearInterval(id)
  }, [fetchAll])

  // backwards-compat: vix field for mobile menu
  return { vix: tickers?.vix?.value ?? null, tickers, loading }
}
