import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div>
          <div className="footer-brand">
            GOONYA<span>.</span>
          </div>

          <p>
            Digital systems for businesses
            ready to move differently.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <small>EXPLORE</small>

            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/our-work">Our Work</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <small>SERVICES</small>

            <span>AI Automation</span>
            <span>Websites</span>
            <span>Marketing</span>
            <span>Digital Systems</span>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 GOONYA</span>
        <span>BUILDING WHAT'S NEXT.</span>
      </div>

    </footer>
  );
}

export default Footer;