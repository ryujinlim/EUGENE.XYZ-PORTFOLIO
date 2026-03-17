import { track } from '@vercel/analytics'
import RevealSection   from '../components/RevealSection'
import HoverLink       from '../components/HoverLink'
import ScrambleHeading from '../components/ScrambleHeading'
import MagneticWrapper from '../components/MagneticWrapper'

export default function Contact() {
  return (
    <>
      <section id="contact" aria-label="Contact" className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <RevealSection>
            <ScrambleHeading
              text="Open to conversations."
              className="font-serif italic font-light text-text"
              style={{ fontSize: 'clamp(48px, 5.5vw, 72px)', lineHeight: '1.1' }}
            />
          </RevealSection>

          <RevealSection delay={150} className="mt-6 max-w-lg">
            <p
              className="font-sans text-body"
              style={{ lineHeight: '1.75', color: 'var(--color-text-60)' }}
            >
              Whether you're recruiting for quant or capital markets roles, collaborating
              on music, or just want to talk markets — I'm listening.
            </p>
          </RevealSection>

          <RevealSection delay={250} className="mt-10 flex items-center gap-6">
            <MagneticWrapper>
              <HoverLink
                href="mailto:eugenelimty@gmail.com"
                aria-label="Email Eugene Lim"
                onClick={() => track('contact_cta_click')}
                className="font-sans text-label text-muted tracking-label uppercase"
              >
                eugenelimty@gmail.com
              </HoverLink>
            </MagneticWrapper>
            <span className="text-muted text-label select-none" aria-hidden="true">·</span>
            <MagneticWrapper>
              <HoverLink
                href="https://linkedin.com/in/eugenelimt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eugene Lim on LinkedIn"
                className="font-sans text-label text-muted tracking-label uppercase"
              >
                LinkedIn
              </HoverLink>
            </MagneticWrapper>
            <span className="text-muted text-label select-none" aria-hidden="true">·</span>
            <MagneticWrapper>
              <HoverLink
                href="https://github.com/eugenelim17"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eugene Lim on GitHub"
                className="font-sans text-label text-muted tracking-label uppercase"
              >
                GitHub
              </HoverLink>
            </MagneticWrapper>
          </RevealSection>
        </div>
      </section>

      <footer
        aria-label="Site footer"
        className="py-6"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-label text-muted tracking-label">
            Eugene Lim &nbsp;·&nbsp; © 2025
          </span>
          <span className="font-mono text-label text-muted tracking-label">
            Built with intention.
          </span>
        </div>
      </footer>
    </>
  )
}
