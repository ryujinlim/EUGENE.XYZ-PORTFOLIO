/**
 * 1px horizontal rule with optional centered label in monospace.
 */
export default function Divider({ label, className = '' }) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        <span className="font-mono text-label text-muted tracking-label uppercase">{label}</span>
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
      </div>
    )
  }
  return (
    <hr
      className={className}
      style={{ border: 'none', borderTop: '1px solid var(--color-border)' }}
    />
  )
}
