import { Link, NavLink } from "react-router-dom";

// NavLink (unlike Link) automatically adds class="active" to the link
// for the current page, so we can highlight it in CSS.
function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        NIT Srinagar Campus Guide
      </Link>
      <nav className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/map">Campus Map</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
