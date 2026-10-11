import mapImage from "../assets/campus-map.jpg";
import MapPin from "./MapPin.jsx";

// The map image with one MapPin per location drawn on top of it.
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
          <MapPin
            key={location.id}
            location={location}
            isSelected={location.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default CampusMap;
