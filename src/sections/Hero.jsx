import { useState, useEffect, useRef } from 'react'
import AnimatedText    from '../components/AnimatedText'
import HoverLink       from '../components/HoverLink'
import MagneticWrapper from '../components/MagneticWrapper'

export default function Hero() {
  const [bioVisible,   setBioVisible]   = useState(false)
  const [linksVisible, setLinksVisible] = useState(false)
  const [orbOffset,    setOrbOffset]    = useState({ x: 0, y: 0 })
  const orbRef   = useRef(null)
  const nameRef  = useRef(null)

  // Bio + links stagger
  useEffect(() => {
    const t1 = setTimeout(() => setBioVisible(true),   700)
    const t2 = setTimeout(() => setLinksVisible(true), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Hero name glitch — fires once ~2s after mount (≈800ms after name enters)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const t = setTimeout(() => {
      const el = nameRef.current
      if (!el) return
      el.classList.add('hero-glitch-active')
      el.addEventListener('animationend', () => el.classList.remove('hero-glitch-active'), { once: true })
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax on orb (desktop only)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    let raf
    const handleMouseMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setOrbOffset({
          x: (e.clientX / window.innerWidth  - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
      })
    }
    const mq = window.matchMedia('(min-width: 768px)')
    if (mq.matches) window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', handleMouseMove) }
  }, [])

  const fadeUp = (visible) => ({
    transition: 'opacity 750ms var(--ease-out-expo), transform 750ms var(--ease-out-expo)',
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(20px)',
  })

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top:        '50%',
          left:       '50%',
          transform:  `translate(calc(-50% + ${orbOffset.x}px), calc(-50% + ${orbOffset.y}px))`,
          transition: 'transform 80ms linear',
          zIndex:     0,
        }}
      >
        <div
          ref={orbRef}
          className="ambient-orb"
          style={{
            width:        '900px',
            height:       '900px',
            borderRadius: '50%',
            background:   'var(--orb-bg)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-6xl w-full pt-24 pb-16">
        {/* Name — glitch target */}
        <h1
          ref={nameRef}
          className="font-serif font-light text-text leading-none tracking-tight mb-8"
          style={{ fontSize: 'clamp(64px, 8vw, 96px)' }}
        >
          <AnimatedText
            text="Eugene Lim"
            type="words"
            staggerDelay={0.1}
            startDelay={300}
          />
        </h1>

        {/* Bio */}
        <div className="flex flex-col gap-1.5 mb-10" style={fadeUp(bioVisible)}>
          <p className="font-sans text-body text-muted">
            Finance &amp; Business Analytics &nbsp;·&nbsp; Boston College Carroll
          </p>
          <p className="font-sans text-body text-muted">
            Quantitative Finance &nbsp;·&nbsp; Capital Markets &nbsp;·&nbsp; Derivatives
          </p>
          <p className="font-sans text-body text-muted">
            Musician &nbsp;·&nbsp; Songwriter &nbsp;·&nbsp; Builder
          </p>
        </div>

        {/* Social links — magnetic */}
        <div className="flex items-center gap-6" style={fadeUp(linksVisible)}>
          <MagneticWrapper>
            <HoverLink
              href="https://linkedin.com/in/eugenelimt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eugene Lim on LinkedIn"
              className="font-sans text-label text-muted tracking-label uppercase"
            >
              LinkedIn
            </HoverLink>
          </MagneticWrapper>
          <span className="text-muted text-label select-none" aria-hidden="true">·</span>
          <MagneticWrapper>
            <HoverLink
              href="https://github.com/eugenelim17"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eugene Lim on GitHub"
              className="font-sans text-label text-muted tracking-label uppercase"
            >
              GitHub
            </HoverLink>
          </MagneticWrapper>
          <span className="text-muted text-label select-none" aria-hidden="true">·</span>
          <MagneticWrapper>
            <HoverLink
              href="mailto:eugenelimty@gmail.com"
              aria-label="Email Eugene Lim"
              className="font-sans text-label text-muted tracking-label uppercase"
            >
              Email
            </HoverLink>
          </MagneticWrapper>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={fadeUp(linksVisible)}
        aria-hidden="true"
      >
        <span className="font-mono text-label text-muted tracking-label" style={{ opacity: 0.4 }}>
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }}
        />
      </div>
    </section>
  )
}
