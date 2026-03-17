import { useEffect, useRef, useState } from 'react'
import RevealSection    from '../components/RevealSection'
import ScrambleHeading  from '../components/ScrambleHeading'
import Tag              from '../components/Tag'
import Divider          from '../components/Divider'
import { useScrollReveal } from '../hooks/useScrollReveal'

const STATS = [
  { number: 4, label: 'Quant Projects' },
  { number: 2, label: 'Equity Pitches' },
  { number: 3, label: 'Years of Markets Study' },
  { number: 1, label: 'Album in Progress' },
]

function AnimatedStat({ number, label, index }) {
  const { ref, isVisible } = useScrollReveal(0.1, index * 100)
  const [count,    setCount]    = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    if (!isVisible || animated.current || number === 0) return
    animated.current = true
    const duration  = 1200
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)   // ease-out cubic
      setCount(Math.round(eased * number))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, number])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span
        className="font-serif font-light text-accent"
        style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: '1' }}
      >
        {count}
      </span>
      <span className="font-sans text-label text-muted tracking-label uppercase">
        {label}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" aria-label="About Eugene Lim" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <RevealSection>
          <Tag label="About" />
        </RevealSection>

        <RevealSection delay={100} className="mt-6 mb-12">
          <ScrambleHeading
            text="Who I am"
            className="font-serif font-light text-text"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: '1.1' }}
          />
        </RevealSection>

        <div className="mt-0 flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: bio */}
          <RevealSection delay={150} className="lg:w-[60%]">
            <p className="font-sans text-body text-text" style={{ lineHeight: '1.8' }}>
              I'm a junior at Boston College's Carroll School of Management, concentrating
              in Finance and Business Analytics. My focus is quantitative finance — building
              tools and mental models to understand how markets actually work, not just how
              they're described in textbooks.
            </p>
            <p className="font-sans text-body text-text mt-6" style={{ lineHeight: '1.8' }}>
              I've spent the last three years working at the intersection of Python, data,
              and markets — from Monte Carlo simulators and M&amp;A signal pipelines to
              algorithmic strategies in Pine Script. Long-term, I want to be a portfolio
              manager at a fund that takes quantitative rigor seriously.
            </p>
            <p className="font-sans text-body text-text mt-6" style={{ lineHeight: '1.8' }}>
              Outside of markets, I'm a musician. I write R&amp;B in English and Korean
              under the project <em>Tribulations</em> — it's the part of my life that
              keeps the rest honest.
            </p>
          </RevealSection>

          {/* Right: animated stat block */}
          <div className="lg:w-[40%]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {STATS.map(({ number, label }, i) => (
                <AnimatedStat key={i} number={number} label={label} index={i} />
              ))}
            </div>
          </div>
        </div>

        <RevealSection delay={300} className="mt-20">
          <Divider />
        </RevealSection>
      </div>
    </section>
  )
}
