export default function WeatherCard({ weather, loading, error }) {
  if (loading) {
    return <p className="message">Loading weather…</p>
  }

  if (error) {
    return <p className="message error">{error}</p>
  }

  if (!weather) {
    return <p className="message">Search a city to see the forecast.</p>
  }

  return (
    <section className="weather-card">
      <h2>
        {weather.name}, {weather.country}
      </h2>
      <p className="weather-icon" aria-hidden="true">
        {weather.icon}
      </p>
      <p className="temp">{Math.round(weather.temp)}°C</p>
      <p className="condition">{weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
    </section>
  )
}
