import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Our Work", path: "/our-work" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="brand" onClick={closeMenu}>
          GOONYA<span>.</span>
        </Link>

        <div className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="nav-project">
          Start a project
          <span>↗</span>
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span />
          <span />
        </button>

      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <div className="mobile-menu-inner">

          <div className="mobile-menu-label">
            NAVIGATION
          </div>

          {links.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              style={{ "--i": index }}
            >
              <span>0{index + 1}</span>
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            className="mobile-contact"
            onClick={closeMenu}
          >
            Start a project ↗
          </Link>

        </div>

      </div>
    </>
  );
}

export default Navbar;