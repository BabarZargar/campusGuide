// Places without a number (canteens, courts, gate...) show an icon instead.
const categoryIcons = {
  Food: "🍴",
  Sports: "⚽",
  Facility: "★",
};

// One clickable pin on the map. It doesn't store anything itself; it just
// tells its parent which place was clicked by calling onSelect(id).
function MapPin({ location, isSelected, onSelect }) {
  const { id, name, category, x, y } = location;

  // parseInt("10-A") is 10, parseInt("canteen-1") is NaN (not a number)
  const hasNumber = !isNaN(parseInt(id));
  const label = hasNumber ? id : categoryIcons[category];

  // e.g. "map-pin pin-hostel selected"
  const className = `map-pin pin-${category.toLowerCase()} ${isSelected ? "selected" : ""}`;

  return (
    <button
      type="button"
      className={className}
      // Percentages keep the pin on the same spot at any map size
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={name}
      aria-pressed={isSelected}
      title={name}
      onClick={() => onSelect(id)}
    >
      {label}
    </button>
  );
}

export default MapPin;
