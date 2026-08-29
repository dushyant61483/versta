import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import OccasionSelector from "../components/OccasionSelector";
import OutfitCard from "../components/OutfitCard";

function Home() {
  const [occasion, setOccasion] = useState("Casual");

  const outfitsByOccasion = {
  College: [
    {
      id: 1,
      name: "Relaxed Street",
      image: "/images/outfit1.png",
      description: "Perfect for a warm college day.",
      items: ["Oversized Shirt", "Cargo Pants", "Sneakers"],
      styleScore: 94,
      weatherScore: 96,
      occasionScore: 95,
      styleCompatibility: 94,
      badge: "Best Match",
      reason: "A comfortable and stylish choice for college.",
    },
    {
      id: 2,
      name: "Clean Casual",
      image: "/images/outfit2.png",
      description: "Simple, comfortable and versatile.",
      items: ["Cotton Tee", "Relaxed Jeans", "Sneakers"],
      styleScore: 91,
      weatherScore: 94,
      occasionScore: 92,
      styleCompatibility: 91,
      badge: "Weather Pick",
      reason: "Light and versatile pieces for an everyday college look.",
    },
    {
      id: 3,
      name: "Smart Everyday",
      image: "/images/outfit3.png",
      description: "A polished look without trying too hard.",
      items: ["Light Shirt", "Trousers", "Casual Shoes"],
      styleScore: 88,
      weatherScore: 87,
      occasionScore: 90,
      styleCompatibility: 88,
      badge: "Style Pick",
      reason: "A polished combination that works well for college.",
    },
  ],

  Casual: [
    {
      id: 4,
      name: "Easy Weekend",
      image: "/images/outfit1.png",
      description: "Relaxed and comfortable for everyday plans.",
      items: ["Basic Tee", "Jeans", "Sneakers"],
      styleScore: 93,
      weatherScore: 95,
      occasionScore: 96,
      styleCompatibility: 93,
      badge: "Best Match",
      reason: "An effortless outfit for a casual day.",
    },
    {
      id: 5,
      name: "Simple Comfort",
      image: "/images/outfit2.png",
      description: "Minimal style with maximum comfort.",
      items: ["Cotton Shirt", "Relaxed Pants", "Sneakers"],
      styleScore: 90,
      weatherScore: 92,
      occasionScore: 94,
      styleCompatibility: 90,
      badge: "Comfort Pick",
      reason: "Comfortable pieces make this perfect for casual plans.",
    },
    {
      id: 6,
      name: "Casual Smart",
      image: "/images/outfit3.png",
      description: "A clean look for a relaxed outing.",
      items: ["Polo Shirt", "Chinos", "Casual Shoes"],
      styleScore: 89,
      weatherScore: 88,
      occasionScore: 91,
      styleCompatibility: 89,
      badge: "Style Pick",
      reason: "A clean and versatile casual combination.",
    },
  ],

  Party: [
    {
      id: 7,
      name: "Party Ready",
      image: "/images/outfit3.png",
      description: "A confident look for your next party.",
      items: ["Statement Shirt", "Dark Jeans", "Sneakers"],
      styleScore: 95,
      weatherScore: 90,
      occasionScore: 97,
      styleCompatibility: 95,
      badge: "Best Match",
      reason: "A confident combination designed for party occasions.",
    },
    {
      id: 8,
      name: "Night Out",
      image: "/images/outfit1.png",
      description: "Stylish and comfortable for an evening out.",
      items: ["Dark Shirt", "Black Jeans", "Casual Shoes"],
      styleScore: 92,
      weatherScore: 89,
      occasionScore: 94,
      styleCompatibility: 92,
      badge: "Style Pick",
      reason: "A sleek outfit that works well for an evening party.",
    },
    {
      id: 9,
      name: "Modern Casual",
      image: "/images/outfit2.png",
      description: "Relaxed style with a party-ready finish.",
      items: ["Oversized Tee", "Cargo Pants", "Sneakers"],
      styleScore: 90,
      weatherScore: 91,
      occasionScore: 92,
      styleCompatibility: 90,
      badge: "Comfort Pick",
      reason: "Comfortable enough to enjoy the entire evening.",
    },
  ],

  Wedding: [
    {
      id: 10,
      name: "Wedding Classic",
      image: "/images/outfit3.png",
      description: "A polished look for a special celebration.",
      items: ["Formal Shirt", "Trousers", "Dress Shoes"],
      styleScore: 96,
      weatherScore: 88,
      occasionScore: 98,
      styleCompatibility: 96,
      badge: "Best Match",
      reason: "A refined combination suited for a wedding.",
    },
    {
      id: 11,
      name: "Elegant Formal",
      image: "/images/outfit1.png",
      description: "Classic styling with a modern touch.",
      items: ["Dress Shirt", "Tailored Pants", "Formal Shoes"],
      styleScore: 94,
      weatherScore: 87,
      occasionScore: 96,
      styleCompatibility: 94,
      badge: "Style Pick",
      reason: "A sophisticated outfit for a formal celebration.",
    },
    {
      id: 12,
      name: "Smart Celebration",
      image: "/images/outfit2.png",
      description: "Comfortable formalwear for a long celebration.",
      items: ["Light Shirt", "Chinos", "Loafers"],
      styleScore: 91,
      weatherScore: 90,
      occasionScore: 94,
      styleCompatibility: 91,
      badge: "Comfort Pick",
      reason: "A comfortable but polished wedding look.",
    },
  ],
};

const recommendedOutfits = outfitsByOccasion[occasion];

  // Navigate to recommendations page
  const goToRecommendations = () => {
    window.history.pushState({}, "", "/recommendations");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-label">
            YOUR PERSONAL AI STYLIST
          </p>

          <h1>
            What should you
            <br />
            <span>wear today?</span>
          </h1>

          <p className="hero-description">
            Style AI combines your personal style, weather
            and occasion to help you discover the perfect
            outfit.
          </p>

          <button
            className="primary-button"
            onClick={goToRecommendations}
          >
            Get My Outfit
            <span>→</span>
          </button>

        </div>

        <div className="hero-visual">

          <div className="style-circle">
            <span>✦</span>
          </div>

          <div className="floating-card floating-card-top">
            <span>✦</span>

            <div>
              <strong>Personalized</strong>
              <small>Just for you</small>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span>✓</span>

            <div>
              <strong>Style Match</strong>
              <small>94% compatible</small>
            </div>
          </div>

        </div>

      </section>


      {/* ================= TODAY'S CONTEXT ================= */}

      <section className="context-section">

        <div className="section-heading">

          <p className="section-label">
            YOUR DAY
          </p>

          <h2>
            Let's dress for today.
          </h2>

        </div>

        <div className="context-grid">

          <WeatherCard />

          <div className="occasion-wrapper">

            <div className="card-header">

              <div>

                <p className="card-label">
                  OCCASION
                </p>

                <h3>
                  What's the plan?
                </h3>

              </div>

              <span className="card-icon">
                ◌
              </span>

            </div>

            <OccasionSelector
                selectedOccasion={occasion}
                onChange={setOccasion}
              />

          </div>

        </div>

      </section>


      {/* ================= RECOMMENDATIONS ================= */}

      <section className="recommendation-section">

        <div className="recommendation-heading">

          <div>

            <p className="section-label">
              AI PICKS
            </p>

            <h2>
              Recommended for you
            </h2>

            <p className="recommendation-subtitle">
              Looks selected using your style, weather and occasion.
            </p>

          </div>

          <button
            className="view-all-button"
            onClick={goToRecommendations}
          >
            View all
            <span>→</span>
          </button>

        </div>


        <div className="outfit-grid">

          {recommendedOutfits.map((outfit) => (

            <OutfitCard
              key={outfit.id}
              outfit={outfit}

              onTryOn={(selectedOutfit) => {
                console.log("Try on:", selectedOutfit);
              }}

              onSelect={(selectedOutfit) => {
                console.log("Selected:", selectedOutfit);
              }}
            />

          ))}

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-cta">

        <div>

          <p className="section-label">
            READY?
          </p>

          <h2>
            Find your perfect look.
          </h2>

          <p>
            Let AI understand your style and create
            an outfit for you.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={goToRecommendations}
        >
          Start Styling
          <span>→</span>
        </button>

      </section>

    </div>
  );
}

export default Home;