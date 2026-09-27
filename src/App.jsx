import { useEffect, useState } from 'react'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import SearchHistory from './components/SearchHistory'
import { fetchWeatherByCity } from './weatherApi'

const STORAGE_KEY = 'weather-search-history'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const addToHistory = (city) => {
    const name = city.trim()
    if (!name) return
    setHistory((prev) => {
      const next = [
        name,
        ...prev.filter((item) => item.toLowerCase() !== name.toLowerCase()),
      ].slice(0, 5)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const fetchWeather = async (city) => {
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const data = await fetchWeatherByCity(city)
      setWeather(data)
      addToHistory(city)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <h1>Weather Dashboard</h1>
      <p className="subtitle">Search any city for live weather (Open-Meteo).</p>
      <SearchForm onSearch={fetchWeather} loading={loading} />
      <WeatherCard weather={weather} loading={loading} error={error} />
      <SearchHistory cities={history} onSelect={fetchWeather} />
    </main>
  )
}
