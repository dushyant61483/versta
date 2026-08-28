function WeatherCard() {
  return (
    <div className="weather-card">
      <div className="card-header">
        <div>
          <p className="card-label">TODAY'S WEATHER</p>
          <h3>Delhi, India</h3>
        </div>

        <span className="weather-icon">☀</span>
      </div>

      <div className="weather-main">
        <span className="temperature">29°</span>

        <div className="weather-details">
          <strong>Partly Cloudy</strong>
          <span>Feels like 31°C</span>
        </div>
      </div>

      <div className="weather-stats">
        <div>
          <span>Humidity</span>
          <strong>72%</strong>
        </div>

        <div>
          <span>Rain</span>
          <strong>60%</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>12 km/h</strong>
        </div>
      </div>

      <p className="weather-note">
        Light, breathable clothing recommended. Carry an umbrella.
      </p>
    </div>
  );
}

export default WeatherCard;