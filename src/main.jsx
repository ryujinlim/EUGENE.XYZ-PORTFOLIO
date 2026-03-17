import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { inject } from '@vercel/analytics'

// Vercel Analytics — auto-tracks page views
inject()

// Lenis smooth scroll — skip for users who prefer reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  import('@studio-freight/lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Expose globally so nav links can call window.lenis.scrollTo('#section')
    window.lenis = lenis
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
