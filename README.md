# NIT Srinagar — Freshers' Campus Guide

A small React website that helps new students find their way around the NIT Srinagar campus. Open the campus map, click any place, and see what it is and how to get there from the main gate.

Course project for **Web Programming (ITL202), NIT Srinagar**.
Made by **Babar Haneef** and **Syeda Ilha**.

---

## Features

- **Three pages:** Home, Campus Map and About, plus a 404 page for unknown URLs.
- **Navbar** that highlights the page you are on, and a **footer** on every page.
- **Clickable campus map:** 33 pins drawn on the official campus map. The selected pin is highlighted.
- **Details panel:** shows the place's category, map grid square, description and directions. Fields we don't have yet (timings, facilities) are hidden instead of showing blanks.
- **Place list:** the same places as a text list, which is easier to tap on a phone.
- **Category filter:** All, Academic, Hostel, Food, Sports, Facility.
- **Search by name:** for example "Physics", "Jehlum" or "canteen".
- **Esc key** clears the selection.
- **Quick links** on the Home page open the map already filtered (for example "Find your hostel" opens `/map?category=Hostel`).
- **Responsive layout** for desktop, tablet and phone.

---

## Getting started

You need [Node.js](https://nodejs.org/) version 20.19 or newer (it comes with npm).

```bash
npm install      # install packages (only needed once)
npm run dev      # start the dev server
```

Open the address printed in the terminal (usually http://localhost:5173).

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the dev server; the page reloads as you edit. |
| `npm run build`   | Creates an optimised production build in `dist/`.    |
| `npm run preview` | Serves the `dist/` build locally to check it.        |
| `npm run lint`    | Checks the code for common mistakes (oxlint).        |

---

## Project structure

```
campusGuide/
├── index.html                       The only HTML page; React draws inside <div id="root">
├── package.json                     Scripts and packages
├── vite.config.js                   Vite settings (enables the React plugin)
├── public/favicon.svg               Browser tab icon
└── src/
    ├── main.jsx                     Entry point: renders <App /> inside <BrowserRouter>
    ├── App.jsx                      Header, nav, footer, routes and the 404 page
    ├── index.css                    All styles
    ├── assets/campus-map.jpg        The campus map image
    ├── data/locations.js            All 33 places + the list of categories
    ├── pages/
    │   ├── Home.jsx                 Welcome text and quick links
    │   ├── MapPage.jsx              All map-page state, category buttons, search box
    │   └── About.jsx                About the project and credits
    └── components/
        ├── CampusMap.jsx            Map image + one clickable pin per place
        ├── LocationDetails.jsx      Details panel for the selected place
        └── LocationList.jsx         Clickable list of places
```

A **page** is what a route shows. A **component** is a reusable piece that a page is built from and that gets its data through **props**.

---

## How it works

### 1. Routing (`main.jsx`, `App.jsx`)

We use **React Router** (`react-router-dom`).

- `main.jsx` wraps the app in `<BrowserRouter>` so React can read and change the URL.
- `App.jsx` lists the routes. `<Routes>` shows the one that matches the URL:

  ```jsx
  <Route path="/" element={<Home />} />
  <Route path="/map" element={<MapPage />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={/* 404 page */} />
  ```

  `path="*"` matches any other URL, which gives us the 404 page.
- Links use `<Link to="...">` instead of `<a href="...">`, so the page changes **without a full reload**.
- The navbar uses `<NavLink>`, which adds `class="active"` to the link for the current page. CSS uses that class for the highlight.
- The header and footer are outside `<Routes>`, so they show on every page.

### 2. The data (`data/locations.js`)

Every place is one object in an array:

```js
{
  id: "21",                 // unique id
  label: "21",              // text on the pin: map number or an icon (🍴 ⚽ ★)
  name: "Mega Hostel",
  category: "Hostel",       // Academic | Hostel | Food | Sports | Facility
  grid: "B3",               // grid square on the printed map
  x: 58.1, y: 55.6,         // pin position, % across and % down the image
  description: "...",
  timings: null,            // null = unknown, hidden on the site
  facilities: [],           // [] = hidden on the site
  directions: "...",
}
```

The whole map page is built from this array with `.map()`. There is no backend or database.

### 3. State and props (`MapPage.jsx`)

`MapPage` holds all the state for the map page:

```js
const [selectedId, setSelectedId] = useState(null);          // which place is selected
const [selectedCategory, setSelectedCategory] = useState(startCategory);
const [searchText, setSearchText] = useState("");
```

The map, the details panel and the list all need to know which place is selected. So the state lives in their shared parent, `MapPage`, and is passed down as props. This is called **"lifting state up"**. The three components never store the selection themselves.

| Component         | Props it receives                     |
| ----------------- | ------------------------------------- |
| `CampusMap`       | `locations`, `selectedId`, `onSelect` |
| `LocationDetails` | `location`, `onClear`                 |
| `LocationList`    | `locations`, `selectedId`, `onSelect` |

### 4. What happens when you click a pin

1. `MapPage` passes `onSelect={setSelectedId}` to `CampusMap` and `LocationList`.
2. In `CampusMap`, the pin runs `onClick={() => onSelect(location.id)}`, which is the same as `setSelectedId("21")`.
3. Changing state makes React **re-render** `MapPage` with `selectedId = "21"`.
4. `MapPage` finds the full object with `locations.find(...)` and passes it to `LocationDetails`, which shows its details.
5. `selectedId` also goes back down to `CampusMap` and `LocationList`, so the matching pin and list row get the `selected` class and are highlighted.

Clicking a row in the list calls the same `onSelect`, so it does exactly the same thing.

### 5. Filter and search (`MapPage.jsx`)

- The category buttons call `setSelectedCategory(category)`. The active one gets the `active` class.
- The search box is a **controlled input**: its `value` comes from `searchText`, and every keystroke calls `setSearchText(...)`.
- On every render, `MapPage` works out which places to show:

  ```js
  const visibleLocations = locations.filter((location) => {
    const matchesCategory = selectedCategory === "All" || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchText.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });
  ```

  The same `visibleLocations` goes to both the map and the list, so they always agree. It isn't stored in state because it can always be worked out from the state we already have.

### 6. Quick links from the Home page

Each Home card links to e.g. `/map?category=Food`. `MapPage` reads that with `useSearchParams()` and uses it as the starting category. An invalid value (like `?category=xyz`) falls back to `"All"`.

### 7. The Esc key (`useEffect`)

```js
useEffect(() => {
  function handleKeyDown(event) {
    if (event.key === "Escape") setSelectedId(null);
  }
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

- Listening to the keyboard on `window` is a **side effect**, so it goes in `useEffect`.
- `[]` means it runs once, when the map page opens.
- The returned **cleanup** function removes the listener when you leave the page, so it doesn't keep running on other pages or pile up each time you come back.

### 8. Positioning the pins (CSS)

- `.map-container` is `position: relative`, and the image fills it (`width: 100%`).
- Each pin is a `<button>` with `position: absolute` and an inline style: `left: x%` and `top: y%`.
- Because the values are **percentages**, a pin stays on the same spot on the picture at any screen size.
- `transform: translate(-50%, -50%)` centres the pin on its point, instead of putting its top-left corner there.
- Pin colours come from CSS variables, one per category (`.pin-hostel`, `.pin-food`, ...).

To find x and y for a new place: x = pixel x ÷ 2810 × 100, and y = pixel y ÷ 1713 × 100 (the image is 2810 × 1713 px).

### 9. Showing only what we know (`LocationDetails.jsx`)

- `if (!location) return (...)`: when nothing is selected, show a "Click a place on the map" message.
- `{timings && (...)}`: show Timings only if they aren't `null`.
- `{facilities.length > 0 && (...)}`: show Facilities only if there are any.

### 10. Responsive design (`index.css`)

- **CSS variables** keep all colours in one place.
- **Flexbox** for the navbar, the filter buttons and keeping the footer at the bottom.
- **CSS Grid** for the layout. On desktop the map is on the left and the details and list are in a 340px column on the right. The Home cards use `repeat(auto-fit, minmax(220px, 1fr))`, so they wrap without a media query.
- **Below 900px**, the layout becomes one column: map, then details, then list.
- **Below 600px** (phones), the map keeps a minimum width of 800px and scrolls sideways, so the pins stay big enough to tap. A "Swipe sideways" hint appears.

### 11. Accessibility

- Every pin is a real `<button>`, so it works with Tab and Enter.
- Pins have `aria-label={name}`, so screen readers say "Mega Hostel" instead of just "21".
- The map image has `alt` text.
- The details panel has `aria-live="polite"`, so screen readers announce the newly selected place.
- `:focus-visible` styles show a focus ring for keyboard users.

---

## Adding a new place

1. Open `src/data/locations.js`.
2. Copy an existing object, give it a new unique `id`, and change the other values (including `label` and `x`/`y`).
3. Save. The new pin, list item and details panel appear automatically. No component needs to change.

---

## Packages

| Package                              | Why                                                       |
| ------------------------------------ | --------------------------------------------------------- |
| `react`, `react-dom`                 | React itself, and drawing it into the browser page.       |
| `react-router-dom`                   | Multiple pages without reloading. The only package we added ourselves. |
| `vite`, `@vitejs/plugin-react` (dev) | Dev server and production build; turns JSX into JavaScript. |
| `oxlint` (dev)                       | Code checker for `npm run lint`.                          |

No UI library, no Redux or Context, no backend and no map API. The map is just an `<img>` with buttons placed on top.

---

## Credits

Campus map by **Ibrahim Salaria** and **Samreen Sariya Jabal**, Department of Civil Engineering, NIT Srinagar.
