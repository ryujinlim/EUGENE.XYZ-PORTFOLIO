import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [width,   setWidth]   = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrolled / docHeight) * 100 : 0)
      setVisible(scrolled > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        width:      `${width}%`,
        height:     '2px',
        background: 'var(--color-accent)',
        zIndex:     60,
        opacity:    visible ? 1 : 0,
        transition: 'opacity 300ms ease',
        pointerEvents: 'none',
      }}
    />
  )
}
