// Shows information about the selected place, or a hint if nothing
// is selected yet. Fields we don't know (null timings, empty
// facilities) are simply not shown.
function LocationDetails({ location, onClear }) {
  if (!location) {
    return (
      <aside className="details-panel details-empty">
        <h2>Click a place on the map</h2>
        <p>
          Tap any pin on the map, or pick a place from the list, to see what
          it is and how to get there.
        </p>
      </aside>
    );
  }

  const { name, category, grid, description, timings, facilities, directions } =
    location;

  return (
    <aside className="details-panel" aria-live="polite">
      <span className={`category-badge badge-${category.toLowerCase()}`}>
        {category}
      </span>
      <h2>{name}</h2>
      <p className="details-grid">Map grid square: {grid}</p>
      <p>{description}</p>

      {timings && (
        <>
          <h3>Timings</h3>
          <p>{timings}</p>
        </>
      )}

      {facilities.length > 0 && (
        <>
          <h3>Facilities</h3>
          <ul>
            {facilities.map((facility) => (
              <li key={facility}>{facility}</li>
            ))}
          </ul>
        </>
      )}

      <h3>How to get there</h3>
      <p>{directions}</p>

      <button type="button" className="clear-button" onClick={onClear}>
        Clear selection (Esc)
      </button>
    </aside>
  );
}

export default LocationDetails;
