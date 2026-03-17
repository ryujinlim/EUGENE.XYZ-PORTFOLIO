import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Wraps children with a scroll-triggered fade-up reveal.
 */
export default function RevealSection({ delay = 0, children, className = '' }) {
  const { ref, isVisible } = useScrollReveal(0.12, delay)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 750ms var(--ease-out-expo), transform 750ms var(--ease-out-expo)`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  )
}
