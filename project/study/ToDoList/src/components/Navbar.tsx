import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#333", padding: "1rem" }}>
      <h1 style={{ color: "white", margin: 0 }}>Welcome to React Router</h1>
      <div style={{ marginTop: "1rem" }}>
        <Link
          to="/"
          style={{
            color: "blue",
            marginRight: "1rem",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{
            color: "green",
            marginRight: "1rem",
            textDecoration: "none",
          }}
        >
          About
        </Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

