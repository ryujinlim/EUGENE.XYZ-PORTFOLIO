import { useState, useEffect } from 'react'
import { TICKERS } from '../config/tickers'

const LS_KEY = 'eugene-ticker-cache'

// ── Module-level singleton — one fetch shared across all hook instances ────
let moduleData    = null
let moduleLoading = true
const subscribers = new Set()

// Seed from localStorage immediately so components render cached data on mount
try {
  const cached = localStorage.getItem(LS_KEY)
  if (cached) {
    moduleData    = JSON.parse(cached)
    moduleLoading = false
  }
} catch { /* ignore */ }

let fetchPromise = null

async function fetchAll() {
  if (fetchPromise) return fetchPromise
  fetchPromise = fetch('/api/tickers')
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      moduleData    = data
      moduleLoading = false
      try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch { /* ignore */ }
      subscribers.forEach((fn) => fn({ data, loading: false }))
    })
    .catch(() => {
      moduleLoading = false
      subscribers.forEach((fn) => fn({ data: moduleData, loading: false }))
    })
    .finally(() => { fetchPromise = null })
  return fetchPromise
}

// ── Symbol → backwards-compat key (for NavBar) ────────────────────────────
const SYMBOL_TO_KEY = { '^VIX': 'vix', 'SPY': 'spy', '^TNX': 'tny' }

export function useMarketData() {
  const [state, setState] = useState({ data: moduleData, loading: moduleLoading })

  useEffect(() => {
    const listener = (next) => setState(next)
    subscribers.add(listener)
    fetchAll()
    const id = setInterval(fetchAll, 60_000)
    return () => {
      subscribers.delete(listener)
      clearInterval(id)
    }
  }, [])

  const { data, loading } = state

  // Backwards-compat `tickers` map for NavBar { vix, spy, tny }
  const tickers = data ? (() => {
    const map = {}
    data.forEach((item) => {
      const key    = SYMBOL_TO_KEY[item.symbol]
      if (!key || item.price == null) return
      const config = TICKERS.find((t) => t.symbol === item.symbol)
      if (!config) return
      const suffix = key === 'tny' ? '%' : ''
      map[key] = { value: item.price.toFixed(config.decimals) + suffix, positive: item.change >= 0 }
    })
    return Object.keys(map).length > 0 ? map : null
  })() : null

  // Full formatted array for the marquee bar
  const marqueeData = data ? data.map((item) => {
    const config = TICKERS.find((t) => t.symbol === item.symbol)
    if (!config || item.price == null) return null
    return {
      symbol:    item.symbol,
      label:     config.label,
      price:     item.price,
      change:    item.change,
      changePct: item.changePct,
      decimals:  config.decimals,
      positive:  item.change >= 0,
    }
  }).filter(Boolean) : null

  return {
    vix: tickers?.vix?.value ?? null, // backwards compat for mobile menu
    tickers,
    loading,
    marqueeData,
  }
}
