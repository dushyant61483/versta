function OutfitCard({
  title,
  description,
  items,
  score,
  tag,
}) {
  return (
    <article className="outfit-card">
      <div className="outfit-image">
        <span className="outfit-placeholder">✦</span>

        <span className="outfit-tag">
          {tag}
        </span>

        <button
          className="favorite-button"
          aria-label={`Save ${title}`}
        >
          ♡
        </button>
      </div>

      <div className="outfit-content">
        <div className="outfit-title-row">
          <h3>{title}</h3>

          <span className="outfit-score">
            {score}
          </span>
        </div>

        <p className="outfit-description">
          {description}
        </p>

        <p className="outfit-items">
          {items}
        </p>

        <button className="try-button">
          Try this look →
        </button>
      </div>
    </article>
  );
}

export default OutfitCard;