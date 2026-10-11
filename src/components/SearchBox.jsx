// A "controlled input": React state (searchText) decides what the box
// shows, and every keystroke updates that state through onSearchChange.
function SearchBox({ searchText, onSearchChange }) {
  return (
    <label className="search-box">
      <span>Search by name</span>
      <input
        type="search"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="e.g. Physics, Jehlum, canteen"
      />
    </label>
  );
}

export default SearchBox;
