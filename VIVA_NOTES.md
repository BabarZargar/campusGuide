# Viva Notes — Freshers' Campus Guide

Short notes to help us explain every part of the project.

---

## 1. Folder structure

```
campusGuide/
├── index.html              The only HTML page. React draws everything inside <div id="root">.
├── package.json            Project name, scripts (dev/build/lint) and packages.
├── vite.config.js          Vite settings (just enables the React plugin).
├── public/favicon.svg      Browser tab icon.
└── src/
    ├── main.jsx            Entry point: renders <App /> inside <BrowserRouter>.
    ├── App.jsx             Header (navbar) + footer on every page, the routes, and the 404 page.
    ├── index.css           All styles: CSS variables, layout, map pins, media queries.
    ├── assets/
    │   └── campus-map.jpg  The campus map image (2810 × 1713 px).
    ├── data/
    │   └── locations.js    Array of all places + the list of categories.
    ├── components/         Reusable pieces that get their data through props
    │   ├── CampusMap.jsx       Map image + one clickable pin per place
    │   ├── LocationDetails.jsx Details panel (or "Click a place" message)
    │   └── LocationList.jsx    Text list of places (also clickable)
    └── pages/              One component per route
        ├── Home.jsx
        ├── MapPage.jsx      Owns the state, plus the category buttons and search box
        └── About.jsx
```

**pages vs components:** a page is what a route shows. A component is a smaller piece that pages are built from.

---

## 2. The click → state → re-render flow

This is the heart of the project.

1. **`MapPage`** holds the state:
   ```js
   const [selectedId, setSelectedId] = useState(null);
   ```
   At first `selectedId` is `null`, so nothing is selected.

2. `MapPage` passes `onSelect={setSelectedId}` down to **`CampusMap`** as a prop.

3. The user clicks a pin. Inside `CampusMap`'s `.map()`, the pin's button runs:
   ```js
   onClick={() => onSelect(location.id)}   // e.g. onSelect("21")
   ```
   `onSelect` *is* `setSelectedId`, so this calls `setSelectedId("21")`.

4. Changing state tells React to **re-render `MapPage`** (run the function again). This time `selectedId` is `"21"`.

5. During that render, `MapPage` finds the full object:
   ```js
   const selectedLocation = locations.find((location) => location.id === selectedId);
   ```

6. `MapPage` passes it down: `<LocationDetails location={selectedLocation} />`. `LocationDetails` now shows Mega Hostel's details.

7. The same render also passes `selectedId` to `CampusMap`. The pin whose `location.id === selectedId` gets the `selected` CSS class, so it turns orange. `LocationList` highlights the matching row in the same way.

The **`LocationList`** buttons call the same `onSelect`, so clicking a list item does exactly the same thing as clicking a pin.

**"Lifting state up":** the selected place is needed by three siblings: the map (highlight a pin), the list (highlight a row) and the details panel (show info). So the state lives in their common parent, `MapPage`. Children only receive props and call functions they were given; they never store the selection themselves. There is one source of truth.

---

## 3. Props each component receives

| Component | Props | What they're for |
|---|---|---|
| `CampusMap` | `locations`, `selectedId`, `onSelect` | Which pins to draw, which one is selected, and the function to call on click. |
| `LocationDetails` | `location`, `onClear` | The selected place object (or `undefined`), and the function for the "Clear selection" button. |
| `LocationList` | `locations`, `selectedId`, `onSelect` | Same idea as `CampusMap`, shown as a list. |
| Pages (`Home`, `MapPage`, `About`) | none | They are rendered by routes. |

The header, footer and 404 page are written directly inside `App.jsx`, and the category buttons and search box directly inside `MapPage.jsx`, so they need no props: they use the state and setters that are already in scope.

**Destructuring props:** `function CampusMap({ locations, selectedId, onSelect })` takes the props object apart in the parameter list. It's the same as writing `function CampusMap(props)` and then using `props.locations`, etc.

---

## 4. Where each React/JS feature is used, and why

### `useState` (in `MapPage.jsx`)
| State | Starts as | Changed by |
|---|---|---|
| `selectedId` | `null` | Clicking a pin or list item, the Clear button, or the Escape key |
| `selectedCategory` | `"All"` (or the category from the URL) | The category buttons (`onClick={() => setSelectedCategory(category)}`) |
| `searchText` | `""` | Typing in the search box |

We use state because these values change while the user is on the page, and the screen must update when they do. A normal variable would not trigger a re-render.

### `useEffect` (in `MapPage.jsx`)
```js
useEffect(() => {
  function handleKeyDown(event) {
    if (event.key === "Escape") setSelectedId(null);
  }
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```
- **Why an effect:** listening to the keyboard on `window` is a "side effect". It reaches outside React's own rendering, so it belongs in `useEffect`, not in the component body.
- **`[]` (empty dependency array):** run this once, when `MapPage` first appears, not on every render.
- **The returned function is the cleanup:** React runs it when `MapPage` disappears (for example, when the user goes to the About page). Without it, the listener would keep running on other pages, and a new one would be added every time we came back to the map.

### `.map()` — turning arrays into JSX
- `CampusMap.jsx`: one pin `<button>` per location.
- `LocationList.jsx`: one `<li>` per location.
- `MapPage.jsx`: one filter button per category.
- `LocationDetails.jsx`: one `<li>` per facility.
- `Home.jsx`: one card per quick link.

Each item gets a **`key`** (like `key={location.id}`). React uses keys to tell items apart when the list changes, for example after filtering. Keys must be unique among siblings, so we use the id rather than the array index.

### `.filter()` (in `MapPage.jsx`)
```js
const visibleLocations = locations.filter((location) => {
  const matchesCategory = selectedCategory === "All" || location.category === selectedCategory;
  const matchesSearch = location.name.toLowerCase().includes(searchText.trim().toLowerCase());
  return matchesCategory && matchesSearch;
});
```
This keeps only the places that match both the category and the search text. The result goes to both `CampusMap` and `LocationList`, so the pins and the list always agree. It is calculated on every render, not stored in state, because it can always be worked out from the state we already have.

### `.find()` (in `MapPage.jsx`)
`locations.find((location) => location.id === selectedId)` returns the first object whose id matches, or `undefined` if none does. We store only the **id** in state, not the whole object, and look the object up when we need it.

### Conditional rendering
- `LocationDetails`: `if (!location) return (...message...)` is an **early return**, which shows "Click a place on the map" when nothing is selected.
- `LocationDetails`: `{timings && (...)}` shows Timings only if they aren't `null`.
- `LocationDetails`: `{facilities.length > 0 && (...)}` shows Facilities only if the array isn't empty.
- `LocationList`: `{locations.length === 0 ? <p>No places match</p> : <ul>...</ul>}` uses a **ternary** to show one thing or the other.
- `CampusMap`: `location.id === selectedId ? "selected" : ""` adds a CSS class only for the selected pin.

### Event handling
- `onClick={() => onSelect(location.id)}` in `CampusMap`. The arrow function is needed so that `onSelect` runs **when clicked**, not immediately during render.
- `onChange={(event) => setSearchText(event.target.value)}` on the search input in `MapPage`. `event.target.value` is the text currently in the input.
- `window.addEventListener("keydown", ...)` handles the Escape key (see `useEffect` above).

### Controlled input (search box in `MapPage.jsx`)
The input's `value` comes from state (`searchText`), and `onChange` updates that state. React is always in charge of what the box shows: type → state changes → re-render → input shows the new state.

### ES6 features
- **Arrow functions:** `(location) => location.id === selectedId`
- **Destructuring:** `const { name, category, grid, ... } = location;` in `LocationDetails` and `({ locations, selectedId, onSelect })`
- **Template literals:** `` `${x}%` ``, `` `/map?category=${category}` ``, `` `map-pin pin-${location.category.toLowerCase()} ...` ``
- **import/export:** `export default locations;` and `export const categories = [...]`. A file can have one default export (imported without `{ }`) and any number of named exports (imported with `{ }`): `import locations, { categories } from "../data/locations.js";`
- **Fragments `<>...</>`:** group elements without adding an extra `<div>` (used in `Home.jsx` and `LocationDetails.jsx`).

---

## 5. How routing works

We use the **react-router-dom** package.

1. `main.jsx` wraps the app in `<BrowserRouter>`, which lets React read and change the browser's URL.
2. `App.jsx` lists the routes:
   ```jsx
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/map" element={<MapPage />} />
     <Route path="/about" element={<About />} />
     <Route path="*" element={<section><h1>404 — Page not found</h1>...</section>} />
   </Routes>
   ```
   `<Routes>` picks the **one** route that matches the current URL. `path="*"` matches anything else, which gives us the 404 page. It is small, so we wrote its JSX directly in the route instead of making a separate component.
3. Links use `<Link to="/map">` instead of `<a href="/map">`. `Link` changes the URL **without reloading the page**, so the app stays fast and doesn't restart.
4. The header in `App.jsx` uses **`NavLink`**, which adds `class="active"` to the link for the current page. We style that in CSS (`.navbar-links a.active`).
5. **Query string:** the Home page quick links go to e.g. `/map?category=Hostel`. In `MapPage`, `useSearchParams()` reads `category` from the URL and uses it as the starting value of `selectedCategory`. If the value isn't a real category (e.g. `?category=xyz`), we fall back to `"All"`.

The header and footer sit outside `<Routes>` in `App.jsx`, so they appear on every page.

---

## 6. How the pins are positioned with CSS

```
.map-container  (position: relative)   ← the reference box
 ├── <img class="map-image">           width: 100%, height: auto
 ├── <button class="map-pin" style="left: 58.1%; top: 55.6%">   position: absolute
 └── ...one button per place
```

1. **`.map-container { position: relative; }`**: absolutely positioned children are placed relative to the nearest positioned ancestor. This makes the map box that ancestor, not the whole page.
2. **The image fills the container** (`width: 100%; height: auto; display: block`), so the container is exactly the size of the image.
3. **Each pin is `position: absolute`** with `left: x%` and `top: y%`, set from the data using an inline style:
   ```jsx
   style={{ left: `${location.x}%`, top: `${location.y}%` }}
   ```
   Percentages are of the container's width and height. If the map shrinks to half its size, 58.1% is still the same spot on the picture. That's why we stored x and y as percentages, not pixels.
4. **`transform: translate(-50%, -50%)`**: `left`/`top` place the pin's **top-left corner** on the point. Moving it back by half its own width and height puts the pin's **centre** on the point instead.
5. **Hover/focus/selected:** these add `scale(...)` (the translate part must be repeated, because `transform` replaces the whole value) and a higher `z-index`, so the active pin sits above its neighbours.
6. **Pin colours** come from CSS variables per category (`.pin-hostel { background: var(--pin-hostel); }`). The colours are semi-transparent `rgba(...)` so the pin drawn on the image still shows through.
7. **Accessibility:** each pin is a real `<button>`, so it works with Tab and Enter. It has `aria-label={name}` so screen readers say "Mega Hostel" instead of just "21". The map image has `alt` text, and the details panel has `aria-live="polite"` so screen readers read out the new place when the selection changes.

**How we got x%:** pixel position ÷ image width × 100. For example, a pin 1633 px from the left of a 2810 px wide image is at 1633 ÷ 2810 × 100 ≈ 58.1%.

---

## 7. How responsiveness was done

- **CSS variables** (`:root { --color-primary: ... }`) keep all colours in one place.
- **Flexbox:**
  - `.app` is a column with `min-height: 100vh`, and `.main-content` has `flex: 1`. This keeps the footer at the bottom.
  - `.navbar`, `.category-filter` and `.map-controls` lay items out in rows and wrap with `flex-wrap: wrap`.
- **CSS Grid:**
  - `.map-layout { grid-template-columns: minmax(0, 1fr) 340px; }` puts the map on the left and the details/list column on the right (desktop).
  - `.card-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }` makes the Home cards wrap automatically. This needs no media query.
- **Media queries:**
  - `@media (max-width: 900px)`: the map layout becomes one column, so the map, details and list stack vertically.
  - `@media (max-width: 600px)`: on phones the map keeps a `min-width: 800px` inside `.map-scroll { overflow-x: auto; }`. On a 390px-wide phone screen the whole map would be too small to tap the pins accurately, so it stays big enough and the user swipes sideways. A "Swipe sideways" hint appears only at this size.
- **`minmax(0, 1fr)` instead of `1fr`:** a plain `1fr` column refuses to be narrower than its content, so the 800px map would have stretched the whole page sideways. `minmax(0, 1fr)` allows the column to shrink, and the map scrolls inside its own box instead. (We found this bug while testing on a phone-sized screen.)
- **Box model:** `box-sizing: border-box` on everything means `width` includes padding and border.
- **Hover/focus effects:** `:hover` and `:focus-visible` on links, cards, filter buttons and pins. `:focus-visible` shows the ring for keyboard users without showing it on every mouse click.

---

## 8. How to add a new location

1. Open `src/data/locations.js`.
2. Copy an existing object and change the values:
   ```js
   {
     id: "library",              // must be unique
     label: "★",                 // text on the pin: a number or an icon
     name: "Central Library",
     category: "Facility",       // Academic | Hostel | Food | Sports | Facility
     grid: "B2",
     x: 45.0, y: 50.0,           // % across and % down the map image
     description: "...",
     timings: null,              // null = unknown → hidden
     facilities: [],             // [] = hidden
     directions: "...",
   },
   ```
3. Save. The pin, the list item and the details panel all appear automatically. No component needs to change, because everything is built with `.map()` over this array.

We tested this: adding one object raised the count from 33 to 34 pins, and removing the gate lowered it to 32.

**Finding x and y:** open the map in an image viewer that shows pixel positions. Then x = pixel x ÷ 2810 × 100 and y = pixel y ÷ 1713 × 100. Nudge the values by eye until the pin sits on the right spot.

**Pin labels:** every place has a `label` field, which is the text drawn on its pin. Numbered places use their number from the printed map (`"8"`, `"10-A"`). Others use an icon (🍴 Food, ⚽ Sports, ★ Facility). `CampusMap` just renders `{location.label}`.

---

## 9. Packages installed and why

| Package | Why |
|---|---|
| `react`, `react-dom` | React itself, and the part that draws React components into the browser page. |
| `react-router-dom` | Multiple pages (Home / Map / About / 404) without reloading. **The only package we added ourselves.** |
| `vite`, `@vitejs/plugin-react` (dev) | Dev server with instant reload, and the production build. It also turns JSX into normal JavaScript. |
| `oxlint` (dev) | Code checker (`npm run lint`). Comes with Vite's React template. |
| `@types/react`, `@types/react-dom` (dev) | Come with Vite's template. They only improve autocomplete in VS Code; we don't use TypeScript. |

**Not used (on purpose):** no UI libraries, no Redux or Context API, no backend or database, no map APIs. The map is just an `<img>` with absolutely positioned buttons on top.

---

## 10. Data honesty

- **`timings: null`** for every place, because we don't have verified timings yet. The UI hides `null` fields.
- **`facilities`** is filled in only where it's visible on the map (the stadium's athletics track and football field). Everywhere else it's `[]` and hidden.
- **`TODO: verify`** marks directions we wrote from the map, not from walking the route. These still need checking on campus.

---

## 11. Possible viva questions

- **Why not store the whole selected object in state?** Storing just the id is simpler, and `.find()` always gives the latest object from the data.
- **Why is `visibleLocations` not in state?** It can be calculated from `selectedCategory` and `searchText`. Storing it too would duplicate state and risk the two getting out of sync.
- **What happens without `key`?** React shows a warning in the console, and it can mix up items when the list changes.
- **Why `onClick={() => onSelect(id)}` and not `onClick={onSelect(id)}`?** The second one *calls* `onSelect` immediately while rendering. That would update state during render and cause an infinite loop.
- **Why `StrictMode`?** It is a development-only helper that runs some code twice to catch bugs. For example, it runs our effect, then the cleanup, then the effect again, which proves the cleanup works.
