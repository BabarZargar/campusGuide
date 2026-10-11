import { Link } from "react-router-dom";

// Each quick link opens the map with one category already filtered.
const quickLinks = [
  {
    title: "Find your department",
    text: "All the academic departments and where they are.",
    category: "Academic",
  },
  {
    title: "Find your hostel",
    text: "Every hostel, from Mega Hostel to the ones by Dal Lake.",
    category: "Hostel",
  },
  {
    title: "Grab something to eat",
    text: "Canteens around the academic area and the hostels.",
    category: "Food",
  },
  {
    title: "Play some sport",
    text: "The stadium, the cricket ground and the courts.",
    category: "Sports",
  },
];

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to NIT Srinagar!</h1>
        <p>
          New on campus? This guide helps you find your way around: your
          department, your hostel, the canteens, the medical unit and more.
          The campus sits on the bank of Dal Lake in Hazratbal, Srinagar.
        </p>
        <Link to="/map" className="button-primary">
          Open the campus map
        </Link>
      </section>

      <section>
        <h2>Quick links</h2>
        <div className="card-grid">
          {quickLinks.map(({ title, text, category }) => (
            <Link key={category} to={`/map?category=${category}`} className="card">
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
