// Single source of truth for all ticker symbols.
// To add a ticker: append an object. To remove: delete the line.
// Any Yahoo Finance symbol works (e.g. '^GSPC', 'AAPL', 'ETH-USD').
// NavBar shows the first 3. Marquee bar shows all.

export const TICKERS = [
  { symbol: '^VIX',    label: 'VIX',  type: 'index',     decimals: 2 },
  { symbol: 'SPY',     label: 'SPY',  type: 'equity',    decimals: 2 },
  { symbol: '^TNX',    label: '10Y',  type: 'rate',      decimals: 2 },
  { symbol: 'BTC-USD', label: 'BTC',  type: 'crypto',    decimals: 0 },
  { symbol: 'GC=F',    label: 'GOLD', type: 'commodity', decimals: 2 },
  { symbol: '^IXIC',   label: 'NDAQ', type: 'index',     decimals: 2 },
  { symbol: 'QQQ',     label: 'QQQ',  type: 'equity',    decimals: 2 },
]
