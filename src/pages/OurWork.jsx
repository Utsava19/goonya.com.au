import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CASE_STUDIES } from "../data/caseStudies";

export default function OurWork() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  useEffect(() => {
    document.querySelectorAll(".ow-fi").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .6s ease ${i * 0.08}s, transform .6s ease ${i * 0.08}s`;
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 40);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".ow-card").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrap section-dark-deep">
      <section className="page-hero-dark" style={{
        minHeight: "50vh", display: "flex", alignItems: "center",
      }}>
        <div className="page-container" style={{ padding: "130px 0 80px" }}>
          <div className="ow-fi" style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#3a3a3a",
            marginBottom: "28px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "20px", height: "1px", background: A }} />OUR WORK
          </div>
          <h1 className="ow-fi" style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.05, maxWidth: "800px" }}>
            <span style={{ display: "block", fontSize: "clamp(42px,5vw,72px)", color: "white" }}>
              Real businesses.
            </span>
            <span style={{ display: "block", fontSize: "clamp(42px,5vw,72px)", color: A }}>
              Real problems solved.
            </span>
          </h1>
          <p className="ow-fi" style={{ maxWidth: "560px", marginTop: "24px", color: "#666", fontSize: "17px", lineHeight: 1.75 }}>
            Every project starts with a problem — missed calls, empty tables, lost DMs.
            Here's how we've helped Australian small businesses fix what's actually broken.
          </p>
        </div>
      </section>

      <section className="section-solid-surface page-section">
      <div className="page-container" style={{ paddingBottom: "100px" }}>
        <div className="ow-list">
          {CASE_STUDIES.map((study, i) => (
            <article key={study.slug} className="ow-card" style={{
              display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "0",
              background: "#fff", border: `1px solid ${study.featured ? "rgba(155,124,255,.35)" : "rgba(20,17,24,.08)"}`,
              marginBottom: "24px",
              borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 16px 50px rgba(20,17,24,.06)",
              opacity: 0, transform: "translateY(32px)",
              transition: `opacity .7s ease ${i * 0.1}s, transform .7s ease ${i * 0.1}s`,
              position: "relative",
            }}>
              {study.featured && (
                <div className="ow-card-badge" style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2,
                  background: A, color: "white", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "1.5px", padding: "5px 12px", borderRadius: "100px" }}>
                  FEATURED
                </div>
              )}
              {study.websiteTransform && (
                <div className="ow-card-badge" style={{ position: "absolute", top: "16px", right: "16px", zIndex: 2,
                  background: "rgba(0,0,0,.7)", color: "#ccc", fontSize: "10px",
                  letterSpacing: "1px", padding: "5px 12px", borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,.15)" }}>
                  Website before & after
                </div>
              )}
              <div className="ow-card-cover" style={{ minHeight: "320px", background: "#111",
                backgroundImage: `url(${study.cover})`, backgroundSize: "cover", backgroundPosition: "center" }} />

              <div style={{ padding: "40px 36px", background: "#ffffff", display: "flex", flexDirection: "column",
                borderLeft: `1px solid rgba(20,17,24,.08)` }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: A, marginBottom: "12px" }}>
                  {study.industry.toUpperCase()} · {study.location}
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "26px", color: "#141118",
                  fontWeight: 700, marginBottom: "8px" }}>
                  {study.client}
                </h2>
                <p style={{ color: A, fontSize: "15px", marginBottom: "16px", fontWeight: 600 }}>
                  {study.headline}
                </p>
                <p style={{ color: "#5c5868", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px", flex: 1 }}>
                  {study.summary}
                </p>

                <div style={{ marginBottom: "20px" }}>
                  <div className="eyebrow-light" style={{ marginBottom: "10px" }}>
                    THE PROBLEM
                  </div>
                  {study.beforePoints.slice(0, 3).map((p) => (
                    <div key={p} style={{ fontSize: "13px", color: "#5c5868", padding: "4px 0" }}>✕ {p}</div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
                  {study.results.map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "22px",
                        fontWeight: 700, color: A }}>{value}</div>
                      <div style={{ fontSize: "11px", color: "#8a8499" }}>{label}</div>
                    </div>
                  ))}
                </div>

                <Link to={`/our-work/${study.slug}`} style={{
                  display: "inline-flex", alignSelf: "flex-start", padding: "12px 24px",
                  border: `1px solid rgba(155,124,255,.35)`, borderRadius: "100px",
                  background: "#141118", color: "white", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                }}>
                  Read case study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      </section>

      <section className="section-fade-to-dark page-section">
      <div className="page-container" style={{ padding: "80px 0 140px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)",
          fontWeight: 700, letterSpacing: "-2px", color: "white", marginBottom: "16px" }}>
          Got a similar problem?
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>Tell us what's not working — we'll show you how to fix it.</p>
        <Link to="/contact" style={{
          display: "inline-flex", padding: "16px 36px", background: "white", color: "black",
          borderRadius: "100px", fontWeight: 700, textDecoration: "none",
        }}>
          Send an enquiry
        </Link>
      </div>
      </section>

      <style>{`
        @media(max-width:850px){
          .ow-card { grid-template-columns:1fr !important; }
          .ow-card-cover { min-height:220px !important; }
          .ow-card > div:last-child { border-left:none !important; border-top:1px solid rgba(20,17,24,.08) !important; }
        }
      `}</style>
    </div>
  );
}
