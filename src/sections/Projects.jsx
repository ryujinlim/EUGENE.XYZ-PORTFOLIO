import { useState } from 'react'
import RevealSection   from '../components/RevealSection'
import ScrambleHeading from '../components/ScrambleHeading'
import Tag             from '../components/Tag'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PROJECTS = [
  {
    title: 'Monte Carlo VaR Simulator',
    description:
      'Simulates portfolio value-at-risk using correlated Monte Carlo methods. Visualizes 10-day loss distributions across multi-asset portfolios with configurable confidence intervals.',
    tags: ['Python', 'Finance', 'Risk'],
    href: '#',
  },
  {
    title: 'Crypto Arbitrage Scanner',
    description:
      'Real-time scanner detecting triangular and cross-exchange arbitrage across the top-10 crypto pairs. Uses WebSocket feeds with latency-aware execution logic.',
    tags: ['Python', 'Crypto', 'Quant'],
    href: '#',
  },
  {
    title: 'M&A Signal Pipeline',
    description:
      'Ingests SEC EDGAR filings and financial press releases, then uses GPT-4 to classify M&A signals and assign probability scores for deal likelihood.',
    tags: ['Python', 'GPT API', 'NLP'],
    href: '#',
  },
  {
    title: 'Pine Script Strategy',
    description:
      'Momentum-reversion hybrid strategy with dynamic ATR-based stop-losses. Backtested across 3 years of SPY/QQQ data with full risk-adjusted performance metrics.',
    tags: ['TradingView', 'Pine Script', 'Algo'],
    href: '#',
  },
  {
    title: 'Equity Research — Consumer Staples',
    description:
      'Full-stack equity research report covering a large-cap consumer staples company. DCF, comps, and scenario analysis; presented to the BC Investment Portfolio.',
    tags: ['Finance', 'Excel', 'Research'],
    href: '#',
  },
  {
    title: 'Portfolio Website',
    description:
      'This site — built with a custom design system, scroll-triggered animations, and live market data. Optimized for Lighthouse 90+ and deployed on Vercel.',
    tags: ['React', 'Vite', 'Design'],
    href: '#',
  },
]

function ProjectCard({ title, description, tags, href, index }) {
  const { ref, isVisible } = useScrollReveal(0.1, index * 80)
  const [hovered,   setHovered]   = useState(false)
  const [spotlight, setSpotlight] = useState(null)

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const onMouseLeave = () => {
    setHovered(false)
    setSpotlight(null)
  }

  const spotlightBg = spotlight
    ? `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(201,168,76,0.08), transparent 70%), var(--color-surface)`
    : 'var(--color-surface)'

  return (
    <a
      ref={ref}
      href={href}
      data-cursor-card
      aria-label={`${title} project`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex flex-col gap-4 p-7 no-underline"
      style={{
        background:      spotlightBg,
        border:          `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius:    '6px',
        transition:      `opacity 600ms var(--ease-out-expo), transform 600ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo), box-shadow 350ms var(--ease-out-expo)`,
        transitionDelay: `${index * 60}ms`,
        opacity:         isVisible ? 1 : 0,
        transform:       isVisible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        boxShadow:       hovered
          ? '0 8px 32px rgba(201,168,76,0.12)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      <h3
        className="font-serif font-light text-text"
        style={{ fontSize: '24px', lineHeight: '1.3' }}
      >
        {title}
      </h3>
      <p className="font-sans text-small text-muted leading-relaxed flex-1">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <RevealSection>
          <Tag label="Projects" />
        </RevealSection>

        <RevealSection delay={100} className="mt-6 mb-12">
          <ScrambleHeading
            text="Things I've built"
            className="font-serif font-light text-text"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: '1.1' }}
          />
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
