import { Link } from "react-router-dom";

export default function Footer() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.07)";

  const socials = [
    { name: "Facebook", href: "https://facebook.com", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )},
    { name: "Instagram", href: "https://instagram.com", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )},
    { name: "LinkedIn", href: "https://linkedin.com", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )},
  ];

  return (
    <footer style={{ background: "#050505", borderTop: `1px solid ${L}`, padding: "70px 5vw 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
        gap: "40px", marginBottom: "56px" }} className="footer-grid">

        <div>
          <img src="/logo.png" alt="Goonya" style={{ height: "40px", width: "auto", display: "block", marginBottom: "14px" }} />
          <p style={{ color: "#444", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
            We help Australian small businesses get found, get leads and save time —
            without the big agency price tag.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map(({ name, href, icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" title={name}
                style={{ width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.1)", display: "flex",
                  alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={headingStyle}>SERVICES</div>
          {["Website Development", "Digital Marketing", "SEO & Google", "Social Media", "Automation & CRM"].map((s) => (
            <Link key={s} to="/services" style={linkStyle}>{s}</Link>
          ))}
        </div>

        <div>
          <div style={headingStyle}>COMPANY</div>
          {[
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Packages", path: "/packages" },
            { name: "Our Work", path: "/our-work" },
            { name: "Contact", path: "/contact" },
          ].map((l) => (
            <Link key={l.path} to={l.path} style={linkStyle}>{l.name}</Link>
          ))}
        </div>

        <div>
          <div style={headingStyle}>RESOURCES</div>
          <a href="/#growth-check" style={linkStyle}>Business Growth Check</a>
          <Link to="/packages" style={linkStyle}>View Packages</Link>
          <Link to="/our-work" style={linkStyle}>Case Studies</Link>
          <Link to="/contact" style={linkStyle}>Book a Strategy Call</Link>
        </div>

        <div>
          <div style={headingStyle}>CONTACT</div>
          <a href="mailto:info@goonya.com.au" style={linkStyle}>info@goonya.com.au</a>
          <a href="tel:0434785800" style={linkStyle}>0434 785 800</a>
          <a href="tel:0452542981" style={linkStyle}>0452 542 981</a>
          <div style={{ fontSize: "13px", color: "#3a3a3a", lineHeight: 1.5, marginTop: "8px" }}>
            75 Bowmore Rd<br />Noble Park VIC 3174<br />Australia
          </div>
        </div>
      </div>

      <div style={{ paddingTop: "24px", borderTop: `1px solid ${L}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px" }}>
        <span style={{ fontSize: "12px", color: "#3a3a3a" }}>© 2026 Goonya. All rights reserved.</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link to="/privacy" style={{ fontSize: "12px", color: "#3a3a3a", textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: "12px", color: "#3a3a3a", textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .footer-grid{ grid-template-columns:1fr 1fr !important; } }
        @media(max-width:520px){ .footer-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </footer>
  );
}

const headingStyle = {
  fontSize: "10px",
  letterSpacing: "2.5px",
  color: "#3a3a3a",
  marginBottom: "18px",
};

const linkStyle = {
  display: "block",
  fontSize: "14px",
  color: "#555",
  textDecoration: "none",
  marginBottom: "12px",
};
