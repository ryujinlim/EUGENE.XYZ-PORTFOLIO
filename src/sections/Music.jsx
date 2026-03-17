import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import RevealSection   from '../components/RevealSection'
import HoverLink       from '../components/HoverLink'
import ScrambleHeading from '../components/ScrambleHeading'
import Tag             from '../components/Tag'

function WaveformDeco() {
  const bars = [4, 10, 18, 8, 22, 14, 30, 10, 24, 16, 32, 8, 20, 12, 26, 6, 18, 28, 10, 22, 16, 30, 8, 14, 24, 12, 20, 6, 28, 18]
  return (
    <svg
      aria-hidden="true"
      className="waveform-deco"
      viewBox={`0 0 ${bars.length * 6} 36`}
      style={{ width: '100%', maxWidth: '480px', height: '36px', fill: 'none' }}
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 6 + 1}
          y={(36 - h) / 2}
          width={3}
          height={h}
          rx={1.5}
          fill="var(--color-accent)"
          opacity={0.18 + (h / 32) * 0.12}
        />
      ))}
    </svg>
  )
}

export default function Music() {
  const sectionRef  = useRef(null)
  const trackedRef  = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !trackedRef.current) {
          trackedRef.current = true
          track('music_section_viewed')
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="music"
      aria-label="Music"
      className="py-32 md:py-40"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <RevealSection>
          <Tag label="Music" />
        </RevealSection>

        <RevealSection delay={120} className="mt-10">
          <ScrambleHeading
            text="Tribulations"
            className="font-serif italic font-light text-text"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: '1.05' }}
          />
        </RevealSection>

        <RevealSection delay={200} className="mt-4">
          <p className="font-sans text-body text-muted">
            A bilingual R&amp;B project — English &amp; Korean
          </p>
        </RevealSection>

        <RevealSection delay={300} className="mt-10 max-w-xl">
          <p
            className="font-sans text-body"
            style={{ lineHeight: '1.8', color: 'var(--color-text-75)' }}
          >
            Music is where I stop trying to be precise. <em>Tribulations</em> is a set of
            songs about the friction between where you're from and where you're going —
            written across two languages because neither one alone says it fully.
          </p>
          <p
            className="font-sans text-body mt-5"
            style={{ lineHeight: '1.8', color: 'var(--color-text-75)' }}
          >
            It's R&amp;B at its core: melody-forward, honest, a little melancholy. I write,
            produce, and record everything. It's the work I do with no audience in mind,
            which is probably why it's the most me.
          </p>
        </RevealSection>

        <RevealSection delay={400} className="mt-10">
          <WaveformDeco />
        </RevealSection>

        <RevealSection delay={500} className="mt-10 flex items-center gap-6">
          <HoverLink
            href="#"
            aria-label="Listen to Tribulations on streaming"
            className="font-sans text-label text-muted tracking-label uppercase"
          >
            Listen
          </HoverLink>
          <span className="text-muted text-label select-none" aria-hidden="true">·</span>
          <HoverLink
            href="#"
            aria-label="Follow Tribulations on social media"
            className="font-sans text-label text-muted tracking-label uppercase"
          >
            Follow
          </HoverLink>
          <span className="text-muted text-label select-none" aria-hidden="true">·</span>
          <HoverLink
            href="mailto:eugenelimty@gmail.com"
            aria-label="Connect with Eugene about music"
            className="font-sans text-label text-muted tracking-label uppercase"
          >
            Connect
          </HoverLink>
        </RevealSection>
      </div>
    </section>
  )
}
