import { useEffect, useRef, useState } from 'react'

/**
 * Returns { ref, isVisible } for scroll-triggered reveal animations.
 * Respects prefers-reduced-motion by setting isVisible immediately.
 */
export function useScrollReveal(threshold = 0.15, delay = 0) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => setIsVisible(true), delay)
            observer.disconnect()
            return () => clearTimeout(timer)
          } else {
            setIsVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, delay])

  return { ref, isVisible }
}
