import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import locations, { categories } from "../data/locations.js";
import CampusMap from "../components/CampusMap.jsx";
import LocationDetails from "../components/LocationDetails.jsx";
import LocationList from "../components/LocationList.jsx";

// MapPage owns all the state for this page ("lifting state up").
// The filter and search box live here; the map, details and list
// components only receive values and functions through props.
function MapPage() {
  // Links on the Home page open e.g. /map?category=Hostel, so start with
  // that category if it's a valid one, otherwise show everything.
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const startCategory = categories.includes(categoryFromUrl) ? categoryFromUrl : "All";

  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(startCategory);
  const [searchText, setSearchText] = useState("");

  // Pressing Escape anywhere on the page clears the selection.
  // The cleanup function removes the listener when we leave this page,
  // so it doesn't keep running on other pages.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Worked out fresh on every render from the current state.
  const visibleLocations = locations.filter((location) => {
    const matchesCategory =
      selectedCategory === "All" || location.category === selectedCategory;
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // undefined when nothing is selected; LocationDetails handles that case.
  const selectedLocation = locations.find((location) => location.id === selectedId);

  return (
    <section className="map-page">
      <h1>Campus Map</h1>
      <p className="page-intro">
        Click a pin to see details and directions. Press <kbd>Esc</kbd> to clear
        your selection.
      </p>

      <div className="map-controls">
        {/* One button per category; the active one gets the "active" class */}
        <div className="category-filter" role="group" aria-label="Filter places by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === selectedCategory ? "filter-button active" : "filter-button"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* A "controlled input": state decides what the box shows, and
            every keystroke updates that state */}
        <label className="search-box">
          <span>Search by name</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="e.g. Physics, Jehlum, canteen"
          />
        </label>
      </div>

      <div className="map-layout">
        <div className="map-column">
          <p className="scroll-hint">Swipe sideways to see the whole map.</p>
          <CampusMap
            locations={visibleLocations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="side-column">
          <LocationDetails
            location={selectedLocation}
            onClear={() => setSelectedId(null)}
          />
          <LocationList
            locations={visibleLocations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </section>
  );
}

export default MapPage;
