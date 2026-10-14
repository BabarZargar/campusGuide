import mapImage from "../assets/campus-map.jpg";

// The map image with one clickable pin per location drawn on top of it.
// .map-container is position: relative, so the absolutely positioned
// pins are placed relative to the image, not the whole page.
function CampusMap({ locations, selectedId, onSelect }) {
  return (
    <div className="map-scroll">
      <div className="map-container">
        <img
          src={mapImage}
          alt="Illustrated map of the NIT Srinagar campus"
          className="map-image"
        />
        {locations.map((location) => (
          <button
            key={location.id}
            type="button"
            // e.g. "map-pin pin-hostel selected"; the category class picks the colour
            className={`map-pin pin-${location.category.toLowerCase()} ${location.id === selectedId ? "selected" : ""}`}
            // Percentages keep the pin on the same spot at any map size
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            aria-label={location.name}
            title={location.name}
            // The pin stores nothing; it just tells MapPage which place was clicked
            onClick={() => onSelect(location.id)}
          >
            {location.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CampusMap;
