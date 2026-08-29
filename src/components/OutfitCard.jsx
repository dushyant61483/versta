import ImageWithFallback from './ImageWithFallback.jsx'
import ScoreBar from './ScoreBar.jsx'
import Button from './Button.jsx'

export default function OutfitCard({
  outfit,
  selected = false,
  onSelect,
  onTryOn,
  compact = false,
}) {
  return (
    <article className={`card outfit-card ${selected ? 'is-selected' : ''}`}>
      <div className="outfit-card-media">
        <ImageWithFallback src={outfit.image} alt={outfit.name} className="outfit-card-img" />
        {outfit.badge && <span className="outfit-card-badge">{outfit.badge}</span>}
        {outfit.fromWardrobe && <span className="outfit-card-wardrobe-tag">From your wardrobe</span>}
      </div>

      <div className="outfit-card-body">
        <div className="outfit-card-heading">
          <h3>{outfit.name}</h3>
          <span className="outfit-card-score">{outfit.scores.overall}%</span>
        </div>
        <p className="outfit-card-desc">{outfit.description}</p>

        <ul className="outfit-card-items">
          {outfit.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {!compact && (
          <div className="outfit-card-scores">
            <ScoreBar label="Style" value={outfit.scores.style} />
            <ScoreBar label="Weather" value={outfit.scores.weather} />
            <ScoreBar label="Occasion" value={outfit.scores.occasion} />
          </div>
        )}

        <div className="outfit-card-actions">
          <Button variant="outline" onClick={() => onTryOn?.(outfit)}>
            Try On
          </Button>
          <Button variant="primary" onClick={() => onSelect?.(outfit)}>
            {selected ? 'Selected ✓' : 'Select'}
          </Button>
        </div>
      </div>
    </article>
  )
}
