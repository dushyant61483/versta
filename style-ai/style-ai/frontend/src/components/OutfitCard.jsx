import React from "react";

function OutfitCard({
  outfit = {},
  onTryOn,
  onSelect,
}) {
  return (
    <article className="outfit-card">

      {/* Outfit Image */}
      <div className="outfit-image-wrapper">
        {outfit.image ? (
          <img
            src={outfit.image}
            alt={outfit.name || "Recommended outfit"}
            className="outfit-image"
          />
        ) : (
          <div className="outfit-image-placeholder">
            <span>👕</span>
            <p>Outfit Preview</p>
          </div>
        )}

        {outfit.badge && (
          <span className="outfit-badge">
            {outfit.badge}
          </span>
        )}
      </div>

      {/* Outfit Details */}
      <div className="outfit-card-content">

        <div className="outfit-title-row">
          <div>
            <p className="outfit-label">
              AI RECOMMENDATION
            </p>

           <h3>
              {outfit.name || "Recommended Outfit"}
            </h3>

            {outfit.description && (
              <p className="outfit-description">
                {outfit.description}
              </p>
            )}
          </div>

          {outfit.styleScore !== undefined && (
            <div className="style-score">
              <strong>{outfit.styleScore}</strong>
              <span>/100</span>
            </div>
          )}
        </div>

        {/* Clothing Items */}
        {outfit.items?.length > 0 && (
          <div className="outfit-items">
            {outfit.items.map((item, index) => (
              <span
                className="outfit-item"
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Scores */}
        <div className="outfit-scores">

          {outfit.weatherScore !== undefined && (
            <div className="score-row">
              <span>Weather</span>
              <strong>
                {outfit.weatherScore}%
              </strong>
            </div>
          )}

          {outfit.occasionScore !== undefined && (
            <div className="score-row">
              <span>Occasion</span>
              <strong>
                {outfit.occasionScore}%
              </strong>
            </div>
          )}

          {outfit.styleCompatibility !== undefined && (
            <div className="score-row">
              <span>Style Match</span>
              <strong>
                {outfit.styleCompatibility}%
              </strong>
            </div>
          )}

        </div>

        {/* AI Reason */}
        {outfit.reason && (
          <div className="outfit-reason">
            <span className="reason-icon">
              ✦
            </span>

            <p>{outfit.reason}</p>
          </div>
        )}

        {/* Actions */}
        <div className="outfit-actions">

          {onTryOn && (
            <button
              type="button"
              className="try-on-button"
              onClick={() => onTryOn(outfit)}
            >
              Try This On
            </button>
          )}

          {onSelect && (
            <button
              type="button"
              className="select-outfit-button"
              onClick={() => onSelect(outfit)}
            >
              Select Outfit
            </button>
          )}

        </div>

      </div>
    </article>
  );
}

export default OutfitCard;