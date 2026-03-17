/**
 * Link with a left→right gold underline slide animation on hover.
 * Uses the .hover-link CSS class defined in index.css.
 */
export default function HoverLink({
  href,
  children,
  className = '',
  target,
  rel,
  'aria-label': ariaLabel,
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`hover-link focus-visible:outline-accent ${className}`}
    >
      {children}
    </a>
  )
}
