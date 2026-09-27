export default function SearchHistory({ cities, onSelect }) {
  if (!cities.length) return null

  return (
    <section className="history">
      <h3>Recent searches</h3>
      <ul>
        {cities.map((city) => (
          <li key={city}>
            <button type="button" onClick={() => onSelect(city)}>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
