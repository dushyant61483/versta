import { useState } from "react";

function OccasionSelector() {
  const [selected, setSelected] = useState("College");

  const occasions = [
    { name: "College", icon: "🎓" },
    { name: "Casual", icon: "☕" },
    { name: "Party", icon: "🎉" },
    { name: "Wedding", icon: "💍" },
  ];

  return (
    <div className="occasion-list">
      {occasions.map((occasion) => (
        <button
          key={occasion.name}
          className={`occasion-button ${
            selected === occasion.name ? "selected" : ""
          }`}
          onClick={() => setSelected(occasion.name)}
        >
          <span>{occasion.icon}</span>
          {occasion.name}
        </button>
      ))}
    </div>
  );
}

export default OccasionSelector;