import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MapPage from "./pages/MapPage.jsx";
import About from "./pages/About.jsx";

// Worked out once when the file loads, not on every render.
const currentYear = new Date().getFullYear();

// The header and footer appear on every page; only the part inside
// <main> changes depending on the URL.
function App() {
  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="navbar-brand">
          NIT Srinagar Campus Guide
        </Link>
        {/* NavLink (unlike Link) adds class="active" to the current page's link */}
        <nav className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/map">Campus Map</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          {/* "*" matches any URL not listed above, giving us the 404 page */}
          <Route
            path="*"
            element={
              <section>
                <h1>404 — Page not found</h1>
                <p>
                  Looks like you took a wrong turn. <Link to="/">Go back home</Link>.
                </p>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>Freshers' Campus Guide · NIT Srinagar · {currentYear}</p>
      </footer>
    </div>
  );
}

export default App;
