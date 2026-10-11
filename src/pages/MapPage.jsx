import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import locations, { categories } from "../data/locations.js";
import CampusMap from "../components/CampusMap.jsx";
import LocationDetails from "../components/LocationDetails.jsx";
import LocationList from "../components/LocationList.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SearchBox from "../components/SearchBox.jsx";

// MapPage owns all the state for this page ("lifting state up").
// Its children only receive values and functions through props.
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
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <SearchBox searchText={searchText} onSearchChange={setSearchText} />
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
