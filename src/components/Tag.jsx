/**
 * Monospace tag in bracket notation: [Python] [Finance] [R&B]
 */
export default function Tag({ label }) {
  return (
    <span className="font-mono text-label text-muted tracking-label uppercase">
      [{label}]
    </span>
  )
}
