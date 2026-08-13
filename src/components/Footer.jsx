import { Link } from "react-router-dom";
import GoonyaLogo from "./GoonyaLogo";
import { SITE, SOCIAL_LINKS, SLOGAN, fullAddress } from "../data/siteMeta";

export default function Footer() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.07)";

  const socialIcons = {
    Facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    Instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  };

  return (
    <footer style={{ background: "#050505", borderTop: `1px solid ${L}`, padding: "70px 0 32px" }}>
      <div className="page-container">
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
        gap: "40px", marginBottom: "56px" }} className="footer-grid">

        <div>
          <Link to="/" style={{ display: "inline-block", marginBottom: "14px", textDecoration: "none" }}>
            <GoonyaLogo height={36} />
          </Link>
          <p style={{ color: "#444", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
            {SLOGAN}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIAL_LINKS.map(({ name, href, label }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}
                style={{ width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.1)", display: "flex",
                  alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}>
                {socialIcons[name]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={headingStyle}>SERVICES</div>
          {[
            { name: "AI Automation", path: "/services#ai-automation" },
            { name: "Website Design", path: "/services#website-design" },
            { name: "Digital Marketing", path: "/services#digital-marketing" },
            { name: "Social Media", path: "/services#social-media" },
            { name: "Digital Systems", path: "/services#digital-systems" },
          ].map((l) => (
            <Link key={l.path} to={l.path} style={linkStyle}>{l.name}</Link>
          ))}
        </div>

        <div>
          <div style={headingStyle}>COMPANY</div>
          {[
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Packages", path: "/packages#plans" },
            { name: "Our Work", path: "/our-work" },
            { name: "Contact", path: "/contact" },
          ].map((l) => (
            <Link key={l.path} to={l.path} style={linkStyle}>{l.name}</Link>
          ))}
        </div>

        <div>
          <div style={headingStyle}>RESOURCES</div>
          <Link to="/faq" style={linkStyle}>FAQ</Link>
          <Link to="/#growth-check" style={linkStyle}>Business Growth Check</Link>
          <Link to="/packages#plans" style={linkStyle}>View Packages</Link>
          <Link to="/packages#website-package" style={linkStyle}>Website — $699</Link>
          <Link to="/our-work" style={linkStyle}>Case Studies</Link>
          <Link to="/contact" style={linkStyle}>Book a Strategy Call</Link>
        </div>

        <div>
          <div style={headingStyle}>CONTACT</div>
          <a href="mailto:info@goonya.com.au" style={linkStyle}>info@goonya.com.au</a>
          <a href={`tel:${SITE.phoneTel}`} style={linkStyle}>{SITE.phone}</a>
          <a href={`tel:${SITE.phoneSecondaryTel}`} style={linkStyle}>{SITE.phoneSecondary}</a>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" style={linkStyle}>
            {fullAddress()}
          </a>
        </div>
      </div>

      <div style={{ paddingTop: "24px", borderTop: `1px solid ${L}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px" }}>
        <span style={{ fontSize: "12px", color: "#3a3a3a" }}>© 2026 Goonya. All rights reserved.</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link to="/faq" style={{ fontSize: "12px", color: "#3a3a3a", textDecoration: "none" }}>FAQ</Link>
          <Link to="/privacy" style={{ fontSize: "12px", color: "#3a3a3a", textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: "12px", color: "#3a3a3a", textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
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
