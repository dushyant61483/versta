import OutfitCard from "../components/OutfitCard";

function Recommendations() {
  const outfits = [
    {
      id: 1,
      name: "Relaxed Street",
      image: "/images/outfit1.png",
      description: "A comfortable look for a warm day.",
      items: [
        "Oversized Shirt",
        "Cargo Pants",
        "Sneakers",
      ],
      styleScore: 94,
      weatherScore: 96,
      occasionScore: 95,
      styleCompatibility: 94,
      badge: "Best Match",
      reason:
        "This outfit balances comfort, weather and your selected occasion.",
    },
    {
      id: 2,
      name: "Clean Casual",
      image: "/images/outfit2.png",
      description: "Simple, comfortable and versatile.",
      items: [
        "Cotton Tee",
        "Relaxed Jeans",
        "Sneakers",
      ],
      styleScore: 91,
      weatherScore: 94,
      occasionScore: 92,
      styleCompatibility: 91,
      badge: "Weather Pick",
      reason:
        "Lightweight pieces make this a good choice for today's weather.",
    },
    {
      id: 3,
      name: "Smart Everyday",
      image: "/images/outfit3.png",
      description: "A polished look without trying too hard.",
      items: [
        "Light Shirt",
        "Trousers",
        "Casual Shoes",
      ],
      styleScore: 88,
      weatherScore: 87,
      occasionScore: 90,
      styleCompatibility: 88,
      badge: "Style Pick",
      reason:
        "A polished combination that works well for everyday occasions.",
    },
  ];

  return (
    <div className="recommendations-page">

      <section className="recommendations-header">
        <p className="section-label">
          AI STYLE ENGINE
        </p>

        <h1>
          Your perfect outfit
        </h1>

        <p>
          Based on your style, today's weather and your occasion.
        </p>
      </section>

      <section className="recommendations-context">

        <div>
          <span>📍 Location</span>
          <strong>Delhi</strong>
        </div>

        <div>
          <span>🌡️ Weather</span>
          <strong>29°C · Cloudy</strong>
        </div>

        <div>
          <span>🎓 Occasion</span>
          <strong>College</strong>
        </div>

      </section>

      <section className="recommendations-grid">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            onTryOn={(selectedOutfit) => {
              window.history.pushState(
                { outfit: selectedOutfit },
                "",
                "/try-on"
              );

              window.dispatchEvent(new PopStateEvent("popstate"));
              window.scrollTo(0, 0);
            }}
            onSelect={(selectedOutfit) => {
              console.log("Selected:", selectedOutfit);
            }}
          />
        ))}
      </section>

    </div>
  );
}

export default Recommendations;