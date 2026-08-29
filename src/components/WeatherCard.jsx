const CONDITION_ICON = {
  Cloudy: '☁️',
  Sunny: '☀️',
  Rainy: '🌧️',
  Clear: '🌤️',
}

export default function WeatherCard({ weather, loading }) {
  if (loading) {
    return (
      <div className="card weather-card">
        <span className="loading-stitch" aria-hidden="true" />
        <p>Reading today's sky…</p>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="card weather-card">
      <div className="weather-card-top">
        <span className="stitch-tag">Today · {weather.location}</span>
        <span className="weather-icon" aria-hidden="true">
          {CONDITION_ICON[weather.condition] || '🌡️'}
        </span>
      </div>
      <div className="weather-temp">{weather.temperature}°C</div>
      <p className="weather-condition">{weather.condition}</p>
      <div className="weather-stats">
        <div>
          <span className="weather-stat-value">{weather.humidity}%</span>
          <span className="weather-stat-label">Humidity</span>
        </div>
        <div>
          <span className="weather-stat-value">{weather.rainProbability}%</span>
          <span className="weather-stat-label">Rain chance</span>
        </div>
        <div>
          <span className="weather-stat-value">{weather.windKph} km/h</span>
          <span className="weather-stat-label">Wind</span>
        </div>
      </div>
      {weather.rainProbability >= 50 && (
        <p className="weather-note">☂ Carry an umbrella today.</p>
      )}
    </div>
  )
}
