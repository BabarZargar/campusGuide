import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import MapPage from "./pages/MapPage.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

// Navbar and Footer appear on every page; only the part inside <main>
// changes depending on the URL.
function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          {/* "*" matches any URL not listed above */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
