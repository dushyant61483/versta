import WeatherCard from "../components/WeatherCard";
import OccasionSelector from "../components/OccasionSelector";
import OutfitCard from "../components/OutfitCard";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">YOUR PERSONAL AI STYLIST</p>

          <h1>
            What should you
            <br />
            <span>wear today?</span>
          </h1>

          <p className="hero-description">
            Style AI combines your personal style, weather and occasion
            to help you discover the perfect outfit.
          </p>

          <button className="primary-button">
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

      {/* Today's Context */}
      <section className="context-section">
        <div className="section-heading">
          <p className="section-label">YOUR DAY</p>
          <h2>Let's dress for today.</h2>
        </div>

        <div className="context-grid">
          <WeatherCard />

          <div className="occasion-wrapper">
            <div className="card-header">
              <div>
                <p className="card-label">OCCASION</p>
                <h3>What's the plan?</h3>
              </div>
              <span className="card-icon">◌</span>
            </div>

            <OccasionSelector />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendation-section">
        <div className="recommendation-heading">
          <div>
            <p className="section-label">AI PICKS</p>
            <h2>Recommended for you</h2>
          </div>

          <button className="view-all-button">
            View all →
          </button>
        </div>

        <div className="outfit-grid">
          <OutfitCard
            title="Relaxed Street"
            description="Perfect for a warm college day."
            items="Oversized shirt · Cargo pants · Sneakers"
            score="94%"
            tag="Best Match"
          />

          <OutfitCard
            title="Clean Casual"
            description="Simple, comfortable and versatile."
            items="Cotton tee · Relaxed jeans · Sneakers"
            score="91%"
            tag="Weather Pick"
          />

          <OutfitCard
            title="Smart Everyday"
            description="A polished look without trying too hard."
            items="Light shirt · Trousers · Casual shoes"
            score="88%"
            tag="Style Pick"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta">
        <div>
          <p className="section-label">READY?</p>
          <h2>Find your perfect look.</h2>
          <p>
            Let AI understand your style and create an outfit for you.
          </p>
        </div>

        <button className="primary-button">
          Start Styling
          <span>→</span>
        </button>
      </section>
    </div>
  );
}

export default Home;