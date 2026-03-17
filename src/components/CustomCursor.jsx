import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200
    let rafId  = null

    // Show on mount
    dot.style.opacity  = '1'
    ring.style.opacity = '1'

    // Ring lag loop
    const loop = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`

      // Cursor state
      const target    = e.target
      const isLink    = !!target.closest('a, button')
      const isCard    = !!target.closest('[data-cursor-card]')
      const isText    = !isLink && !isCard && !!target.closest('p, li')

      dot.className  = 'cursor-dot'
      ring.className = 'cursor-ring'

      if (isCard) {
        ring.classList.add('cursor-card')
      } else if (isLink) {
        dot.classList.add('cursor-link')
        ring.classList.add('cursor-link')
      } else if (isText) {
        ring.classList.add('cursor-text')
      }
    }

    const onLeave  = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter  = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }
    const onDown   = () => { dot.classList.add('cursor-clicking');  ring.classList.add('cursor-clicking') }
    const onUp     = () => { dot.classList.remove('cursor-clicking'); ring.classList.remove('cursor-clicking') }

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  )
}
