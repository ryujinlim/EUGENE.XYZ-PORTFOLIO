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

  if (isTouch) return <>{children}</>

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const dx = Math.max(-40, Math.min(40, e.clientX - (rect.left + rect.width  / 2)))
        const dy = Math.max(-40, Math.min(40, e.clientY - (rect.top  + rect.height / 2)))
        setOffset({ x: dx * 0.35, y: dy * 0.35 })
      }}
      onMouseLeave={() => {
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
