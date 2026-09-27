const WMO = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  61: { label: 'Rain', icon: '🌧️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
}

function describeWeather(code) {
  return WMO[code] || { label: 'Weather', icon: '🌡️' }
}

export async function fetchWeatherByCity(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  const geoRes = await fetch(geoUrl)
  if (!geoRes.ok) throw new Error('Network error. Try again.')
  const geo = await geoRes.json()
  const place = geo.results?.[0]
  if (!place) throw new Error('City not found. Try another spelling.')

  const { latitude, longitude, name, country_code } = place
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
  const weatherRes = await fetch(weatherUrl)
  if (!weatherRes.ok) throw new Error('Network error. Try again.')
  const weather = await weatherRes.json()
  const { label, icon } = describeWeather(weather.current.weather_code)

  return {
    name,
    country: country_code,
    temp: weather.current.temperature_2m,
    humidity: weather.current.relative_humidity_2m,
    condition: label,
    icon,
  }
}
