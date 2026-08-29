function OccasionSelector({ selectedOccasion, onChange }) {
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
            selectedOccasion === occasion.name ? "selected" : ""
          }`}
          onClick={() => onChange(occasion.name)}
        >
          <span>{occasion.icon}</span>
          {occasion.name}
        </button>
      ))}
    </div>
  );
}

export default OccasionSelector;