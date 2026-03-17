import { useState, useRef } from 'react'

/**
 * Wraps children with a magnetic follow-cursor effect on desktop.
 * On touch devices renders children unchanged.
 */
export default function MagneticWrapper({ children, className = '' }) {
  const isTouch = typeof window !== 'undefined'
    && window.matchMedia('(pointer: coarse)').matches

  const [offset, setOffset]   = useState({ x: 0, y: 0 })
  const [active, setActive]   = useState(false)
  const rafRef                = useRef(null)

  if (isTouch) return <>{children}</>

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseMove={(e) => {
        if (rafRef.current) return
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = e.clientX
        const cy = e.clientY
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          const dx = Math.max(-40, Math.min(40, cx - (rect.left + rect.width  / 2)))
          const dy = Math.max(-40, Math.min(40, cy - (rect.top  + rect.height / 2)))
          setOffset({ x: dx * 0.35, y: dy * 0.35 })
        })
      }}
      onMouseLeave={() => {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
        setActive(false)
        setOffset({ x: 0, y: 0 })
      }}
      style={{
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: active
          ? 'none'
          : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </span>
  )
}
