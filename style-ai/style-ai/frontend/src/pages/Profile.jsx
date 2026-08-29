import { useState } from "react";
import "./profile.css";

function Profile() {
  const [style, setStyle] = useState("Streetwear");
  const [fit, setFit] = useState("Oversized");
  const [colors, setColors] = useState(["Black", "White"]);
  const [occasions, setOccasions] = useState(["College", "Casual"]);

  const colorOptions = [
    "Black",
    "White",
    "Beige",
    "Blue",
    "Green",
    "Brown",
  ];

  const occasionOptions = [
    "College",
    "Casual",
    "Wedding",
    "Party",
    "Interview",
    "Vacation",
  ];

  const toggleColor = (color) => {
    setColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  const toggleOccasion = (occasion) => {
    setOccasions((prev) =>
      prev.includes(occasion)
        ? prev.filter((item) => item !== occasion)
        : [...prev, occasion]
    );
  };

  const handleSave = () => {
    const profileData = {
      preferredStyle: style,
      preferredColors: colors,
      fitPreference: fit,
      occasions,
    };

    console.log("Style Profile:", profileData);
    alert("Style profile saved!");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <p className="profile-label">STYLE PROFILE</p>

          <h1>
            Your style.
            <br />
            Your identity.
          </h1>

          <p className="profile-description">
            Tell us about your fashion preferences so StyleAI
            can create recommendations that feel personal to you.
          </p>
        </div>

        <div className="profile-card">

          {/* Preferred Style */}
          <div className="profile-section">
            <h2>Preferred Style</h2>
            <p>Choose the style that best matches you.</p>

            <div className="option-grid">
              {[
                "Streetwear",
                "Casual",
                "Formal",
                "Minimal",
                "Sporty",
                "Ethnic",
              ].map((item) => (
                <button
                  key={item}
                  className={`option-button ${
                    style === item ? "selected" : ""
                  }`}
                  onClick={() => setStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Colors */}
          <div className="profile-section">
            <h2>Preferred Colors</h2>
            <p>Select the colors you enjoy wearing.</p>

            <div className="option-grid">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`option-button ${
                    colors.includes(color) ? "selected" : ""
                  }`}
                  onClick={() => toggleColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Preference */}
          <div className="profile-section">
            <h2>Fit Preference</h2>
            <p>How do you prefer your clothes to fit?</p>

            <div className="option-grid">
              {["Oversized", "Relaxed", "Regular", "Slim"].map((item) => (
                <button
                  key={item}
                  className={`option-button ${
                    fit === item ? "selected" : ""
                  }`}
                  onClick={() => setFit(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions */}
          <div className="profile-section">
            <h2>Common Occasions</h2>
            <p>Choose the situations you usually dress for.</p>

            <div className="option-grid">
              {occasionOptions.map((occasion) => (
                <button
                  key={occasion}
                  className={`option-button ${
                    occasions.includes(occasion) ? "selected" : ""
                  }`}
                  onClick={() => toggleOccasion(occasion)}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="profile-actions">
            <button className="save-profile-button" onClick={handleSave}>
              Save Style Profile →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;