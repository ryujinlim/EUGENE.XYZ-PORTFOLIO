import { useEffect, useState } from 'react'

/**
 * Splits text into words or lines and animates each unit in with a stagger.
 * startDelay: ms before animation begins (for page-load sequences).
 */
export default function AnimatedText({
  text,
  type = 'words',
  staggerDelay = 0.06,
  startDelay = 0,
  className = '',
}) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setStarted(true)
      return
    }
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  const units = type === 'words' ? text.split(' ') : text.split('\n')

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block" aria-hidden="true">
          <span
            className="inline-block"
            style={{
              transition: `opacity 750ms var(--ease-out-expo), transform 750ms var(--ease-out-expo)`,
              transitionDelay: `${i * staggerDelay}s`,
              opacity: started ? 1 : 0,
              transform: started ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {unit}
          </span>
          {type === 'words' && i < units.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
