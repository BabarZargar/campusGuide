// A plain text list of places. It does the same job as the pins (calls
// onSelect), which is handy on small phone screens.
function LocationList({ locations, selectedId, onSelect }) {
  return (
    <section className="location-list-section">
      <h2>Places ({locations.length})</h2>

      {locations.length === 0 ? (
        <p className="list-empty">No places match your filter or search.</p>
      ) : (
        <ul className="location-list">
          {locations.map((location) => (
            <li key={location.id}>
              <button
                type="button"
                className={location.id === selectedId ? "list-item selected" : "list-item"}
                onClick={() => onSelect(location.id)}
              >
                <span className="list-category">{location.category}</span>
                {location.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default LocationList;
