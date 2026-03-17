import { useMarketData } from '../hooks/useMarketData'

function TickerItem({ item }) {
  const { label, price, change, changePct, decimals, positive } = item
  const priceStr  = price.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const changeStr = (change >= 0 ? '+' : '') + change.toFixed(decimals)
  const pctStr    = (change >= 0 ? '+' : '') + changePct.toFixed(2) + '%'
  const color     = positive ? '#4CAF88' : '#E05C5C'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', paddingRight: '48px' }}>
      <span style={{ color: 'var(--color-accent)', fontSize: '8px' }}>◆</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)', fontSize: '11px' }}>
        {priceStr}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', color, fontSize: '11px' }}>
        {changeStr}&nbsp;({pctStr})
      </span>
      <span style={{ color, fontSize: '9px' }}>{positive ? '▲' : '▼'}</span>
    </span>
  )
}

export default function TickerMarquee() {
  const { marqueeData, loading } = useMarketData()

  const barStyle = {
    position:     'sticky',
    top:          '64px',
    zIndex:       49,
    height:       '36px',
    background:   'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    overflow:     'hidden',
    display:      'flex',
    alignItems:   'center',
  }

  if (!marqueeData || marqueeData.length === 0) {
    return (
      <div className="hidden md:flex" style={barStyle}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '11px', paddingLeft: '16px', opacity: loading ? 1 : 0 }}>
          ···
        </span>
      </div>
    )
  }

  return (
    <div className="ticker-bar hidden md:flex" style={barStyle}>
      {/* 3 copies for seamless CSS marquee loop */}
      <div className="ticker-track" style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[0, 1, 2].map((copy) => (
          <span key={copy} style={{ display: 'inline-flex' }}>
            {marqueeData.map((item, i) => (
              <TickerItem key={`${copy}-${i}`} item={item} />
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
