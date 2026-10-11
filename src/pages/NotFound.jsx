import { Link } from "react-router-dom";

// Shown for any URL that doesn't match a route (see path="*" in App.jsx).
function NotFound() {
  return (
    <section>
      <h1>404 — Page not found</h1>
      <p>
        Looks like you took a wrong turn. <Link to="/">Go back home</Link>.
      </p>
    </section>
  );
}

export default NotFound;
