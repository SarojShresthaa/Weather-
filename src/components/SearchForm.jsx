import { useState } from 'react'

export default function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.trim()) onSearch(city.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City name (e.g. Kathmandu)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? 'Loading…' : 'Search'}
      </button>
    </form>
  )
}
