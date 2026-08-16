import { Link, useLocation } from "react-router-dom";
import { LOCAL_SEO_PAGES } from "../data/localSeoPages";
import { SITE } from "../data/siteMeta";
import { normalizePathname } from "../utils/pathname";

export default function LocalSeoLanding() {
  const { pathname } = useLocation();
  const page = LOCAL_SEO_PAGES[normalizePathname(pathname)];

  if (!page) {
    return null;
  }

  const A = "#9b7cff";

  return (
    <div className="page-wrap section-dark-deep">
      <section className="page-hero-dark" style={{ minHeight: "72vh", display: "flex", alignItems: "center" }}>
        <div className="page-container" style={{ padding: "130px 0 80px" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "2.5px",
              color: "#3a3a3a",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ width: "20px", height: "1px", background: A }} />
            {page.eyebrow}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            <span style={{ display: "block", fontSize: "clamp(38px,5vw,68px)", color: "white" }}>
              {page.h1}
            </span>
            <span style={{ display: "block", fontSize: "clamp(32px,4vw,56px)", color: A }}>
              {page.h1Accent}
            </span>
          </h1>
          <p style={{ maxWidth: "720px", marginTop: "24px", color: "#888", fontSize: "17px", lineHeight: 1.75 }}>
            {page.intro}
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                padding: "15px 30px",
                background: "white",
                color: "black",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Get a free strategy call
            </Link>
            <Link
              to="/packages#plans"
              style={{
                display: "inline-flex",
                padding: "15px 30px",
                color: "white",
                fontSize: "14px",
                textDecoration: "none",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,.15)",
              }}
            >
              View packages from $399/mo
            </Link>
          </div>
        </div>
      </section>

      <section className="section-solid-surface page-section">
        <div className="page-container">
          <div className="eyebrow-light" style={{ marginBottom: "16px" }}>
            WHAT WE DO
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(28px,3.5vw,44px)",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#141118",
              marginBottom: "32px",
            }}
          >
            Marketing, social media &amp; SEO — <span style={{ color: A }}>one team.</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
            className="local-seo-services-grid"
          >
            {page.services.map(({ title, body }) => (
              <article
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(20,17,24,.08)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  boxShadow: "0 12px 40px rgba(20,17,24,.04)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "18px",
                    color: "#141118",
                    margin: "0 0 10px",
                  }}
                >
                  {title}
                </h3>
                <p style={{ margin: 0, color: "#5c5868", fontSize: "15px", lineHeight: 1.7 }}>
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-surface-alt page-section">
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }} className="local-seo-split">
            <div>
              <div className="eyebrow-light" style={{ marginBottom: "16px" }}>
                AREAS WE SERVE
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(26px,3vw,38px)",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                  color: "#141118",
                  marginBottom: "16px",
                }}
              >
                Towns &amp; suburbs we help businesses grow in
              </h2>
              <p style={{ color: "#5c5868", fontSize: "15px", lineHeight: 1.75, marginBottom: "20px" }}>
                Remote-friendly across Victoria. Based in Noble Park — working with businesses throughout the regions below.
              </p>
              <p style={{ color: A, fontSize: "14px", fontWeight: 600, lineHeight: 1.8 }}>
                {page.towns.join(" · ")}
              </p>
            </div>
            <div
              style={{
                background: "#141118",
                borderRadius: "16px",
                padding: "28px 24px",
                color: "#ccc",
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#666", marginBottom: "14px" }}>
                PEOPLE SEARCH FOR
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {page.searches.map((term) => (
                  <li
                    key={term}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(255,255,255,.08)",
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    {term}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "20px 0 0", fontSize: "13px", color: "#888", lineHeight: 1.6 }}>
                We build your Google presence so you show up for searches like these — not just your business name.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-fade-to-dark page-section">
        <div className="page-container" style={{ textAlign: "center", padding: "80px 0 120px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "white",
              marginBottom: "16px",
            }}
          >
            Ready to rank for local searches?
          </h2>
          <p style={{ color: "#888", maxWidth: "560px", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Call {SITE.phone} or email {SITE.email}. Packages from $399/mo — websites from $699.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              padding: "16px 36px",
              background: "white",
              color: "black",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Contact Goonya →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .local-seo-services-grid { grid-template-columns: 1fr !important; }
          .local-seo-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
