// One button per category. The active one is highlighted; clicking a
// button tells MapPage which category to show.
function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter places by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={category === selectedCategory ? "filter-button active" : "filter-button"}
          aria-pressed={category === selectedCategory}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
