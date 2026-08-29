import React from "react";

function WardrobeCard({ item, onDelete }) {
  return (
    <article className="wardrobe-card">
      {/* Clothing Image */}
      <div className="wardrobe-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="wardrobe-image"
        />

        {/* Delete Button */}
        {onDelete && (
          <button
            className="delete-button"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete ${item.name}`}
          >
            ×
          </button>
        )}
      </div>

      {/* Clothing Information */}
      <div className="wardrobe-card-content">
        <p className="item-category">{item.category}</p>

        <h3>{item.name}</h3>
      </div>
    </article>
  );
}

export default WardrobeCard;