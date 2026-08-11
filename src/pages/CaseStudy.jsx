import { Link, useParams } from "react-router-dom";
import BeforeAfter from "../components/BeforeAfter";
import WebsiteMockupPair from "../components/WebsiteMockupPair";
import { getCaseStudy } from "../data/caseStudies";

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  if (!study) {
    return (
      <div className="page-container" style={{ padding: "160px 0", textAlign: "center" }}>
        <h1 style={{ color: "white", fontFamily: "'Space Grotesk',sans-serif" }}>Case study not found</h1>
        <Link to="/our-work" style={{ color: A }}>Back to our work</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#070707", overflowX: "hidden" }}>
      <section style={{
        minHeight: "50vh", display: "flex", alignItems: "flex-end",
        background: `linear-gradient(to bottom, rgba(7,7,7,.4), #070707), url(${study.cover}) center/cover no-repeat`,
      }}>
        <div className="page-container" style={{ padding: "140px 0 48px", width: "100%" }}>
          <Link to="/our-work" style={{ color: "#666", fontSize: "13px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
            ← Back to our work
          </Link>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "12px" }}>
            {study.industry.toUpperCase()} · {study.location}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)",
            fontWeight: 700, letterSpacing: "-2px", color: "white", marginBottom: "16px", maxWidth: "800px" }}>
            {study.client}
          </h1>
          <p style={{ fontSize: "20px", color: "#aaa", maxWidth: "640px", lineHeight: 1.5 }}>
            {study.headline}
          </p>
        </div>
      </section>

      <div className="page-container" style={{ paddingBottom: "120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "64px" }}
          className="cs-problem-grid">
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "28px", marginBottom: "16px" }}>
              The problem
            </h2>
            <p style={{ color: "#888", fontSize: "16px", lineHeight: 1.75, marginBottom: "20px" }}>{study.problem}</p>
            {study.challenge && (
              <p style={{ color: "#aaa", fontSize: "15px", lineHeight: 1.7, padding: "20px",
                background: "rgba(155,124,255,.06)", borderRadius: "12px",
                border: `1px solid rgba(155,124,255,.15)` }}>
                <strong style={{ color: "white" }}>What they really needed: </strong>
                {study.challenge}
              </p>
            )}
          </div>
          <div style={{ padding: "28px", background: "#08060f", border: `1px solid ${L}`, borderRadius: "16px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#666", marginBottom: "16px" }}>WHAT WASN'T WORKING</div>
            {study.beforePoints.map((p) => (
              <div key={p} style={{ color: "#888", fontSize: "14px", padding: "10px 0", borderBottom: `1px solid ${L}` }}>
                ✕ {p}
              </div>
            ))}
          </div>
        </div>

        {study.websiteTransform && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "28px",
              marginBottom: "12px", textAlign: "center" }}>
              The website transformation
            </h2>
            <p style={{ color: "#666", fontSize: "15px", textAlign: "center", maxWidth: "640px",
              margin: "0 auto 32px", lineHeight: 1.65 }}>
              Their old site looked untrustworthy and didn&apos;t work on phones.
              Here&apos;s what customers saw before vs what they see now.
            </p>
            <WebsiteMockupPair client={study.client} industry={study.industry} />
          </div>
        )}

        <div style={{ marginBottom: "64px", padding: "40px", background: "#08060f", border: `1px solid ${L}`, borderRadius: "20px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "28px", marginBottom: "24px" }}>
            What we did
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {study.solution.map((s, i) => (
              <div key={s} style={{ padding: "20px", background: "rgba(155,124,255,.06)", borderRadius: "12px",
                border: `1px solid rgba(155,124,255,.15)` }}>
                <div style={{ color: A, fontWeight: 700, marginBottom: "8px" }}>0{i + 1}</div>
                <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {study.timeline && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "28px", marginBottom: "24px" }}>
              How we rolled it out
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {study.timeline.map(({ week, detail }) => (
                <div key={week} style={{ padding: "24px", background: "#08060f",
                  border: `1px solid ${L}`, borderRadius: "12px" }}>
                  <div style={{ color: A, fontSize: "12px", letterSpacing: "1.5px", marginBottom: "10px" }}>{week}</div>
                  <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "28px",
            marginBottom: "24px", textAlign: "center" }}>
            Before & after
          </h2>
          <BeforeAfter study={study} linkToDetail={false} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "64px" }}
          className="cs-results">
          {study.results.map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center", padding: "32px 20px",
              background: "#08060f", border: `1px solid ${L}`, borderRadius: "16px" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "40px", fontWeight: 700, color: A }}>
                {value}
              </div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>{label}</div>
            </div>
          ))}
        </div>

        <blockquote style={{
          margin: "0 0 48px", padding: "40px", background: "rgba(155,124,255,.06)",
          border: `1px solid rgba(155,124,255,.2)`, borderRadius: "16px", textAlign: "center",
        }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(18px,2.5vw,24px)",
            color: "white", lineHeight: 1.5, margin: "0 0 20px", fontStyle: "normal" }}>
            "{study.quote}"
          </p>
          <footer style={{ color: "#888", fontSize: "14px" }}>
            — {study.quoteName}, {study.quoteRole}
          </footer>
        </blockquote>

        <div style={{ textAlign: "center" }}>
          <Link to="/contact" style={{
            display: "inline-flex", padding: "16px 36px", background: "white", color: "black",
            borderRadius: "100px", fontWeight: 700, textDecoration: "none",
          }}>
            Get similar results →
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .cs-problem-grid, .cs-results { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
