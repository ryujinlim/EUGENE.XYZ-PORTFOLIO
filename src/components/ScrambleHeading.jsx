import { useEffect } from 'react'
import { useScramble } from '../hooks/useScramble'

/**
 * Renders an h2 (or custom tag) whose text scrambles on scroll-reveal.
 * Trigger fires once when the element enters the viewport.
 */
export default function ScrambleHeading({
  text,
  className = '',
  style     = {},
  as: Tag   = 'h2',
}) {
  const { ref, scramble, cancel } = useScramble(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble()
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); cancel() }
  }, [scramble, cancel, ref])

  return (
    <Tag ref={ref} className={className} style={style}>
      {text}
    </Tag>
  )
}
