import React from "react";

const occasions = [
  {
    id: "college",
    name: "College",
    icon: "🎓",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: "💍",
  },
  {
    id: "trekking",
    name: "Trekking",
    icon: "🏔️",
  },
  {
    id: "party",
    name: "Party",
    icon: "🎉",
  },
  {
    id: "interview",
    name: "Interview",
    icon: "💼",
  },
  {
    id: "casual",
    name: "Casual",
    icon: "☕",
  },
  {
    id: "vacation",
    name: "Vacation",
    icon: "🏖️",
  },
  {
    id: "date",
    name: "Date",
    icon: "❤️",
  },
];

function OccasionCard({ selectedOccasion, onSelect }) {
  return (
    <section className="occasion-card">
      <div className="occasion-header">
        <span className="occasion-label">STYLE FOR</span>

        <h2>What's the occasion?</h2>

        <p>
          Select an occasion to personalize your outfit
          recommendation.
        </p>
      </div>

      <div className="occasion-grid">
        {occasions.map((occasion) => {
          const isSelected =
            selectedOccasion === occasion.id;

          return (
            <button
              type="button"
              key={occasion.id}
              className={
                isSelected
                  ? "occasion-option selected"
                  : "occasion-option"
              }
              onClick={() =>
                onSelect && onSelect(occasion.id)
              }
            >
              <span className="occasion-icon">
                {occasion.icon}
              </span>

              <span className="occasion-name">
                {occasion.name}
              </span>

              {isSelected && (
                <span className="occasion-check">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default OccasionCard;