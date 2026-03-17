import { useState, useEffect } from 'react'
import HoverLink from './HoverLink'
import { useMarketData } from '../hooks/useMarketData'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Music',      href: '#music' },
  { label: 'Contact',    href: '#contact' },
]

const TICK_DEFS = [
  { key: 'vix', label: 'VIX' },
  { key: 'spy', label: 'SPY' },
  { key: 'tny', label: '10Y' },
]

/* ── Theme Toggle ─────────────────────────────────────────────────────────── */
function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = localStorage.getItem('eugene-theme') || 'dark'
    setTheme(stored)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const html  = document.documentElement
    html.style.transition = 'background-color 400ms ease, color 400ms ease'
    html.classList.remove('dark', 'light')
    html.classList.add(next)
    localStorage.setItem('eugene-theme', next)
    setTheme(next)
    setTimeout(() => { html.style.transition = '' }, 400)
  }

  return (
    <button
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() } }}
      tabIndex={0}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        color:      'var(--color-accent)',
        fontSize:   '14px',
        background: 'none',
        border:     'none',
        cursor:     'pointer',
        padding:    '4px 6px',
        lineHeight: 1,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {theme === 'dark' ? '☀' : '◐'}
    </button>
  )
}

/* ── Market Ticker ────────────────────────────────────────────────────────── */
function MarketTicker({ tickers, loading }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (tickers && !revealed) setRevealed(true)
  }, [tickers]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!tickers && loading) {
    return (
      <span
        className="hidden md:block font-mono text-label text-muted tracking-label"
        aria-hidden="true"
      >
        ···
      </span>
    )
  }

  if (!tickers) return null

  return (
    <div className="hidden md:flex items-center gap-5">
      {TICK_DEFS.map(({ key, label }, i) => {
        const tick = tickers[key]
        if (!tick) return null
        return (
          <span
            key={key}
            className="font-mono text-label tracking-label flex items-center gap-1.5"
            style={{
              color:           'var(--color-muted)',
              opacity:         revealed ? 1 : 0,
              transition:      'opacity 300ms ease',
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span>{label}</span>
            <span>{tick.value}</span>
            <span style={{ color: tick.positive ? 'var(--color-accent)' : '#E05C5C' }}>
              {tick.positive ? '▲' : '▼'}
            </span>
          </span>
        )
      })}
    </div>
  )
}

/* ── NavBar ───────────────────────────────────────────────────────────────── */
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted,  setMounted]  = useState(false)
  const { vix, tickers, loading } = useMarketData()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition:           'opacity 300ms ease, background 300ms ease, backdrop-filter 300ms ease',
          opacity:              mounted ? 1 : 0,
          background:           scrolled ? 'var(--color-nav-bg)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:         scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          {/* Left: monogram */}
          <HoverLink
            href="#home"
            aria-label="Eugene Lim — Home"
            className="font-serif text-[20px] font-light text-text tracking-wide"
          >
            EL
          </HoverLink>

          {/* Center: theme toggle + live market ticker */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <MarketTicker tickers={tickers} loading={loading} />
          </div>

          {/* Right: nav links (desktop) */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <HoverLink
                  href={href}
                  className="font-sans text-small text-muted tracking-wide"
                >
                  {label}
                </HoverLink>
              </li>
            ))}
          </ul>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="flex flex-col gap-[5px] p-2 text-muted focus-visible:outline-accent"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span
                className="block w-5 h-px bg-text transition-all duration-200"
                style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}
              />
              <span
                className="block w-5 h-px bg-text transition-all duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-text transition-all duration-200"
                style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center"
        style={{
          background:     'var(--color-overlay)',
          backdropFilter: 'blur(12px)',
          transition:     'opacity 300ms ease, visibility 300ms ease',
          opacity:        menuOpen ? 1 : 0,
          visibility:     menuOpen ? 'visible' : 'hidden',
        }}
      >
        <ul className="flex flex-col items-center gap-10 list-none" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="font-serif font-light text-[clamp(32px,6vw,48px)] text-text hover:text-accent transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        {vix && (
          <p className="font-mono text-label text-muted tracking-label mt-16">
            VIX&nbsp;&nbsp;{vix}
          </p>
        )}
      </div>
    </>
  )
}
