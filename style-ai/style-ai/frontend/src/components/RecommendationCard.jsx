import React from "react";

function RecommendationCard({
  recommendation,
  onTryOn,
  onSelect,
}) {
  return (
    <article className="recommendation-card">
      {/* Header */}
      <div className="recommendation-header">
        <div>
          <span className="recommendation-tag">
            ✦ AI PICK
          </span>

          <h2>{recommendation.title}</h2>

          {recommendation.subtitle && (
            <p>{recommendation.subtitle}</p>
          )}
        </div>

        {recommendation.styleScore !== undefined && (
          <div className="recommendation-score">
            <span>Style Score</span>
            <strong>{recommendation.styleScore}</strong>
            <small>/100</small>
          </div>
        )}
      </div>

      {/* Outfit Preview */}
      {recommendation.image && (
        <div className="recommendation-image">
          <img
            src={recommendation.image}
            alt={recommendation.title}
          />
        </div>
      )}

      {/* Recommended Items */}
      {recommendation.items?.length > 0 && (
        <div className="recommendation-items">
          <h4>Recommended Outfit</h4>

          <div className="items-list">
            {recommendation.items.map((item, index) => (
              <div className="recommended-item" key={index}>
                <span className="item-number">
                  {index + 1}
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Reasoning */}
      {recommendation.reason && (
        <div className="recommendation-reason">
          <span>✦</span>

          <div>
            <h4>Why this works</h4>
            <p>{recommendation.reason}</p>
          </div>
        </div>
      )}

      {/* Scores */}
      <div className="recommendation-metrics">
        {recommendation.weatherScore !== undefined && (
          <div className="metric">
            <span>Weather</span>
            <strong>{recommendation.weatherScore}%</strong>
          </div>
        )}

        {recommendation.occasionScore !== undefined && (
          <div className="metric">
            <span>Occasion</span>
            <strong>{recommendation.occasionScore}%</strong>
          </div>
        )}

        {recommendation.styleCompatibility !== undefined && (
          <div className="metric">
            <span>Style Match</span>
            <strong>
              {recommendation.styleCompatibility}%
            </strong>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="recommendation-actions">
        {onTryOn && (
          <button
            className="recommendation-tryon"
            onClick={() => onTryOn(recommendation)}
          >
            Try This Outfit
          </button>
        )}

        {onSelect && (
          <button
            className="recommendation-select"
            onClick={() => onSelect(recommendation)}
          >
            Wear This
          </button>
        )}
      </div>
    </article>
  );
}

export default RecommendationCard;
