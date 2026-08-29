import { useState } from 'react'

/**
 * Renders an <img>, but swaps to a soft placeholder swatch if the source
 * fails to load (e.g. because real product photography hasn't been added
 * to /public/images yet). Prevents broken-image icons during the demo.
 */
export default function ImageWithFallback({ src, alt, className = '', tone = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={`img-fallback ${tone} ${className}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  )
}
