// Weather service — currently returns mock data.
//
// TODO(Backend team): Replace getWeather() with a real call to a weather
// API (e.g. OpenWeatherMap, WeatherAPI). Use the browser's geolocation
// (navigator.geolocation.getCurrentPosition) to get lat/lng, then fetch
// from your backend so the API key stays server-side (see .env.example).

const MOCK_WEATHER = {
  location: 'Delhi, IN',
  temperature: 29,
  condition: 'Cloudy',
  humidity: 72,
  rainProbability: 60,
  windKph: 14,
}

export async function getWeather() {
  // Simulate network latency for a realistic loading state in the demo.
  await new Promise((resolve) => setTimeout(resolve, 600))
  return MOCK_WEATHER
}

export async function requestLocation() {
  // TODO(Backend team): swap this mock for navigator.geolocation once a
  // real weather API key is wired up. Returning a fixed city keeps the
  // demo deterministic.
  await new Promise((resolve) => setTimeout(resolve, 400))
  return { city: 'Delhi', country: 'IN' }
}
