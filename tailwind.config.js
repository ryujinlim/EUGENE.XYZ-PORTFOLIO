/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:             'var(--color-bg)',
        surface:        'var(--color-surface)',
        'surface-2':    'var(--color-surface-2)',
        text:           'var(--color-text)',
        muted:          'var(--color-muted)',
        accent:         'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero:  ['clamp(64px, 8vw, 96px)', { lineHeight: '1' }],
        h2:    ['clamp(36px, 4vw, 52px)', { lineHeight: '1.1' }],
        h3:    ['24px',  { lineHeight: '1.3' }],
        body:  ['17px',  { lineHeight: '1.65' }],
        small: ['14px',  { lineHeight: '1.6' }],
        label: ['12px',  { lineHeight: '1.5', letterSpacing: '0.2em' }],
      },
      letterSpacing: {
        label: '0.2em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '450ms',
        slow: '750ms',
      },
      borderColor: {
        DEFAULT: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}
