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

    let timerId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timerId = setTimeout(() => setIsVisible(true), delay)
            observer.disconnect()
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

    return () => {
      observer.disconnect()
      if (timerId) clearTimeout(timerId)
    }
  }, [threshold, delay])

  return { ref, isVisible }
}
