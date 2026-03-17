import { useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

export function useScramble(text) {
  const elRef     = useRef(null)
  const triggered = useRef(false)
  const timerRef  = useRef(null)

  const scramble = useCallback(() => {
    if (triggered.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    triggered.current = true

    const el = elRef.current
    if (!el) return

    const INTERVAL_MS  = 40
    const DURATION_MS  = 600
    const totalFrames  = Math.ceil(DURATION_MS / INTERVAL_MS)
    const chars        = text.split('')
    let frame          = 0

    timerRef.current = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const result = chars.map((ch, i) => {
        if (ch === ' ') return ch
        const charProgress = Math.max(0, progress * chars.length - i)
        if (charProgress >= 1) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      el.textContent = result.join('')
      if (frame >= totalFrames) {
        clearInterval(timerRef.current)
        el.textContent = text
      }
    }, INTERVAL_MS)
  }, [text])

  return { ref: elRef, scramble }
}
