import { useState } from "react";

const categories = ["All", "Tops", "Bottoms", "Shoes", "Jackets"];

const initialWardrobe = [
  {
    id: 1,
    name: "White T-Shirt",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 2,
    name: "Blue Shirt",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
  },
  {
    id: 3,
    name: "Black Jeans",
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  },
  {
    id: 4,
    name: "Cargo Pants",
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: 5,
    name: "White Sneakers",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 6,
    name: "Denim Jacket",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600",
  },
];

function Wardrobe() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wardrobe, setWardrobe] = useState(initialWardrobe);

  const filteredItems =
    activeCategory === "All"
      ? wardrobe
      : wardrobe.filter((item) => item.category === activeCategory);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    const newItems = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name.replace(/\.[^/.]+$/, ""),
      category: "Tops",
      image: URL.createObjectURL(file),
    }));

    setWardrobe((previous) => [...newItems, ...previous]);
    event.target.value = "";
  };

  const handleDelete = (id) => {
    setWardrobe((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="wardrobe-page">

      {/* Header */}
      <section className="wardrobe-header">
        <div>
          <p className="wardrobe-label">MY STYLE</p>

          <h1>My Wardrobe</h1>

          <p className="wardrobe-description">
            Organize your clothes and let your AI stylist create
            personalized outfits from what you already own.
          </p>
        </div>

        <label className="upload-button">
          <span>+</span>
          Add Clothes

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            hidden
          />
        </label>
      </section>

      {/* Controls */}
      <section className="wardrobe-controls">

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="item-count">
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "item" : "items"}
        </p>

      </section>

      {/* Wardrobe */}
      {filteredItems.length > 0 ? (
        <section className="wardrobe-grid">

          {filteredItems.map((item) => (
            <article
              className="wardrobe-card"
              key={item.id}
            >

              {/* Image */}
              <div className="wardrobe-image-wrapper">

                <img
                  src={item.image}
                  alt={item.name}
                  className="wardrobe-image"
                />

                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  ×
                </button>

              </div>

              {/* Content */}
              <div className="wardrobe-card-content">

                <p className="item-category">
                  {item.category}
                </p>

                <h3>{item.name}</h3>

              </div>

            </article>
          ))}

        </section>
      ) : (
        <section className="empty-wardrobe">

          <div className="empty-icon">👕</div>

          <h2>No clothes here yet</h2>

          <p>
            Add some clothes to your wardrobe and start
            creating personalized outfits.
          </p>

          <label className="empty-upload-button">
            Add Your First Item

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              hidden
            />
          </label>

        </section>
      )}

    </main>
  );
}

export default Wardrobe;