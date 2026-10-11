// Worked out once when the file loads, not on every render.
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p>Freshers' Campus Guide · NIT Srinagar · {currentYear}</p>
    </footer>
  );
}

export default Footer;
