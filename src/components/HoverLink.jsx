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
  onClick,
  'aria-label': ariaLabel,
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`hover-link focus-visible:outline-accent ${className}`}
    >
      {children}
    </a>
  )
}
