import { useState } from 'react'
import RevealSection   from '../components/RevealSection'
import ScrambleHeading from '../components/ScrambleHeading'
import Tag             from '../components/Tag'
import { useScrollReveal } from '../hooks/useScrollReveal'

const EXPERIENCE = [
  {
    role:  'Research Assistant',
    org:   'Boston College',
    date:  'Sep 2024 – Present',
    lines: [
      'Develop Python-based quantitative research tools for faculty in the Finance Dept.',
      'Focus on equity factor models, portfolio optimization, and return attribution analysis.',
    ],
  },
  {
    role:  'Trading Combine Participant',
    org:   'TopStep',
    date:  '2024',
    lines: [
      'Completed futures trading evaluation under real-capital risk parameters.',
      'Demonstrated systematic trade execution, strict drawdown discipline, and R:R management.',
    ],
  },
  {
    role:  'Equity Research Analyst',
    org:   'BC Investment Portfolio',
    date:  'Jan 2024 – Present',
    lines: [
      'Authored two equity research reports covering consumer staples and technology sectors.',
      'Pitched long and short ideas to the student-managed fund; presented to faculty advisors.',
    ],
  },
  {
    role:  'Member, Finance & Analytics Association',
    org:   'Boston College',
    date:  'Sep 2022 – Present',
    lines: [
      'Participated in case competitions, stock pitch events, and industry speaker panels.',
      'Collaborated with peers on sector analyses and financial modeling workshops.',
    ],
  },
]

function ExperienceRow({ role, org, date, lines, index }) {
  const { ref, isVisible } = useScrollReveal(0.1, index * 100)
  const [hovered, setHovered] = useState(false)

  // Border draw delay: stagger per row
  const borderDelay  = `${index * 100}ms`
  // Text fade delay: border (300ms) + 150ms after it, plus row stagger
  const textDelay    = `${index * 100 + 150}ms`

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pl-5 py-6 cursor-default"
      style={{
        borderRadius: '0 4px 4px 0',
        background:   hovered ? 'var(--color-surface-2)' : 'transparent',
        transition:   'background 250ms ease',
      }}
    >
      {/* Animated left border — draws down on reveal */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          left:       0,
          top:        0,
          width:      '1px',
          height:     isVisible ? '100%' : '0%',
          background: hovered ? 'var(--color-accent)' : 'var(--color-border)',
          transition: `height 300ms ease ${borderDelay}, background 200ms ease`,
        }}
      />

      {/* Content fades in after border */}
      <div
        style={{
          opacity:    isVisible ? 1 : 0,
          transform:  isVisible ? 'translateX(0)' : 'translateX(-8px)',
          transition: `opacity 300ms ease ${textDelay}, transform 300ms ease ${textDelay}`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <span className="font-sans font-medium text-body text-text">{role}</span>
          <span
            className="font-sans text-small"
            style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-muted)' }}
          >
            {org}
          </span>
          <span className="font-mono text-label text-muted tracking-label sm:ml-auto">
            {date}
          </span>
        </div>
        {lines.map((line, i) => (
          <p key={i} className="font-sans text-small text-muted leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <RevealSection>
          <Tag label="Experience" />
        </RevealSection>

        <RevealSection delay={100} className="mt-6 mb-12">
          <ScrambleHeading
            text="Where I've worked"
            className="font-serif font-light text-text"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: '1.1' }}
          />
        </RevealSection>

        <div className="flex flex-col gap-2">
          {EXPERIENCE.map((entry, i) => (
            <ExperienceRow key={i} {...entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
