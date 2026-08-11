import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GROWTH_SYSTEM,
  PACKAGES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "../data/siteContent";

const A = "#9b7cff";
const L = "rgba(255,255,255,.08)";

export function GoonyaPromise() {
  const items = [
    { title: "One team", desc: "Website, marketing and automation under one roof — not five different freelancers." },
    { title: "One plan", desc: "A growth system built around enquiries and revenue, not random posts and pretty slides." },
    { title: "One invoice", desc: "Clear packages from $399/mo — without the big agency retainers." },
  ];

  return (
    <div className="page-container page-section">
      <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#3a3a3a", marginBottom: "18px" }}>
          THE GOONYA DIFFERENCE
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,56px)",
          fontWeight: 700, letterSpacing: "-2.5px", color: "white", lineHeight: 1.1 }}>
          Your digital growth system —<span style={{ color: A }}> not another pile of logins.</span>
        </h2>
      </div>
      <div className="promise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        {items.map((item) => (
          <div key={item.title} style={{
            padding: "36px 28px", background: "#08060f", border: `1px solid ${L}`, borderRadius: "16px",
          }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "22px", color: "white", marginBottom: "12px" }}>
              {item.title}
            </h3>
            <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){ .promise-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

export function PackagePreview() {
  const preview = PACKAGES.filter((p) => p.id !== "kickstart");
  return (
    <div style={{ padding: "100px 0", borderTop: `1px solid ${L}`, borderBottom: `1px solid ${L}` }}>
      <div className="page-container">
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#3a3a3a", marginBottom: "18px",
            display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "20px", height: "1px", background: A }} />PACKAGES
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,64px)",
            fontWeight: 700, letterSpacing: "-2.5px", color: "white" }}>
            Clear pricing.<span style={{ color: A }}> No guessing.</span>
          </h2>
          <p style={{ color: "#666", fontSize: "16px", marginTop: "12px" }}>
            Don't contact us just to find out if we're $300 or $3,000. See the packages upfront.
          </p>
        </div>
        <div className="pkg-preview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {preview.map((pkg) => (
            <article key={pkg.id} style={{
              padding: "32px", borderRadius: "16px", background: "#08060f",
              border: pkg.popular ? `1px solid ${A}` : `1px solid ${L}`,
              position: "relative",
            }}>
              {pkg.popular && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: A, color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                  padding: "4px 14px", borderRadius: "20px" }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "22px", color: "white",
                marginBottom: "8px" }}>{pkg.name}</h3>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                From {pkg.price}<small style={{ fontSize: "14px", color: "#666" }}>{pkg.period}</small>
              </div>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{pkg.tagline}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {pkg.features.slice(0, 5).map((f) => (
                  <li key={f} style={{ color: "#888", fontSize: "13px", padding: "6px 0",
                    borderBottom: `1px solid ${L}` }}>+ {f}</li>
                ))}
              </ul>
              <Link to="/packages" style={{ color: A, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                See full details →
              </Link>
            </article>
          ))}
        </div>
        <p style={{ color: "#666", fontSize: "14px", marginTop: "20px", textAlign: "center" }}>
          Also available: <strong style={{ color: "#aaa" }}>Goonya Kickstart</strong> at $499 one-off.
        </p>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link to="/packages" style={{ display: "inline-flex", padding: "16px 32px", background: "white",
            color: "black", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            View All Packages →
          </Link>
        </div>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link to="/packages" style={{ display: "inline-flex", padding: "16px 32px", background: "white",
            color: "black", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            View All Packages →
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .pkg-preview-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div style={{ padding: "100px 0", width: "min(1400px,90vw)", margin: "0 auto" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#3a3a3a", marginBottom: "18px",
          display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "20px", height: "1px", background: A }} />HOW GOONYA WORKS
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,64px)",
          fontWeight: 700, letterSpacing: "-2.5px", color: "white" }}>
          What happens<span style={{ color: A }}> after you contact us?</span>
        </h2>
      </div>
      <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }}>
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.step} style={{ position: "relative" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "rgba(155,124,255,.2)", marginBottom: "8px" }}>
              {step.step}
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "white", fontSize: "16px",
              marginBottom: "8px" }}>{step.title}</h3>
            <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6 }}>{step.desc}</p>
            {i < PROCESS_STEPS.length - 1 && (
              <div style={{ position: "absolute", top: "20px", right: "-8px", color: A, fontSize: "18px",
                opacity: 0.4 }} className="process-arrow">↓</div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media(max-width:900px){ .process-grid{ grid-template-columns:repeat(2,1fr) !important; } .process-arrow{ display:none; } }
        @media(max-width:520px){ .process-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}

export function CaseStudyHighlight() {
  return (
    <div style={{ padding: "80px 0", background: "#f5f5f5" }}>
      <div className="page-container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#888", marginBottom: "12px" }}>
            REAL RESULTS
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,48px)",
            fontWeight: 700, letterSpacing: "-2px", color: "#111" }}>
            From frustrated owner to <span style={{ color: A }}>fully booked.</span>
          </h2>
        </div>

        <div className="case-visual" style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "32px", alignItems: "center",
          background: "white", borderRadius: "24px", padding: "48px 40px",
          boxShadow: "0 24px 80px rgba(0,0,0,.08)",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#999", marginBottom: "16px" }}>BEFORE</div>
            <img
              src="https://images.unsplash.com/photo-1584824486509-048e875e8038?w=400&h=400&fit=crop&crop=face"
              alt="Frustrated business owner before"
              style={{ width: "160px", height: "160px", borderRadius: "50%", objectFit: "cover",
                border: "4px solid #eee", filter: "grayscale(1) contrast(.9)", marginBottom: "20px" }}
            />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", maxWidth: "260px", marginInline: "auto" }}>
              {["Website didn't work on mobile", "No clear way to book", "Invisible on Google"].map((t) => (
                <li key={t} style={{ color: "#666", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                  ✕ {t}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontSize: "32px", color: A, fontWeight: 700 }}>→</div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "16px" }}>AFTER GOONYA</div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
              alt="Happy business owner after Goonya"
              style={{ width: "160px", height: "160px", borderRadius: "50%", objectFit: "cover",
                border: `4px solid ${A}`, boxShadow: `0 0 30px rgba(155,124,255,.25)`, marginBottom: "20px" }}
            />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", maxWidth: "260px", marginInline: "auto" }}>
              {["+68% more enquiries", "3× online bookings", "Google visibility up 45%"].map((t) => (
                <li key={t} style={{ color: "#333", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                  ✓ {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link to="/our-work" style={{ color: A, fontWeight: 600, textDecoration: "none" }}>See more work →</Link>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .case-visual{ grid-template-columns:1fr !important; padding:32px 24px !important; }
          .case-visual > div:nth-child(2){ transform:rotate(90deg); margin:0 auto; }
        }
      `}</style>
    </div>
  );
}

export function RoiCalculator() {
  return (
    <RoiCalcInner />
  );
}

function RoiCalcInner() {
  const [customerValue, setCustomerValue] = useState(500);
  const [currentCustomers, setCurrentCustomers] = useState(10);
  const [additional, setAdditional] = useState(5);

  const revenue = customerValue * additional;

  return (
    <div style={{ padding: "100px 0", width: "min(1400px,90vw)", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#3a3a3a", marginBottom: "18px",
          display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "20px", height: "1px", background: A }} />ROI
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,52px)",
          fontWeight: 700, letterSpacing: "-2px", color: "white" }}>
          How much could better marketing <span style={{ color: A }}>be worth?</span>
        </h2>
      </div>
      <div className="roi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <RoiSlider label="Average customer value ($)" value={customerValue} min={100} max={5000} step={50}
            onChange={setCustomerValue} />
          <RoiSlider label="New customers per month" value={currentCustomers} min={1} max={50} step={1}
            onChange={setCurrentCustomers} />
          <RoiSlider label="Additional customers (goal)" value={additional} min={1} max={30} step={1}
            onChange={setAdditional} />
        </div>
        <div style={{ padding: "40px", background: "rgba(155,124,255,.08)", border: `1px solid rgba(155,124,255,.2)`,
          borderRadius: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#666", letterSpacing: "2px", marginBottom: "12px" }}>
            POTENTIAL ADDITIONAL REVENUE
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,64px)",
            fontWeight: 700, color: "white" }}>
            ${revenue.toLocaleString()}<span style={{ fontSize: "20px", color: "#666" }}>/mo</span>
          </div>
          <p style={{ color: "#666", fontSize: "15px", marginTop: "20px", lineHeight: 1.6 }}>
            Goonya's job isn't to get you "likes". It's to help turn attention into revenue.
          </p>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .roi-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

function RoiSlider({ label, value, min, max, step, onChange }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "14px", color: "#888" }}>{label}</span>
        <span style={{ fontSize: "14px", color: "white", fontWeight: 600 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: A }} />
    </div>
  );
}

export function GrowthSystemVisual() {
  return (
    <div style={{ padding: "80px 0", borderTop: `1px solid ${L}` }}>
      <div style={{ width: "min(1400px,90vw)", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,48px)",
          fontWeight: 700, letterSpacing: "-2px", color: "white", marginBottom: "40px", textAlign: "center" }}>
          The <span style={{ color: A }}>Goonya Growth System</span>
        </h2>
        <div className="system-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
          {GROWTH_SYSTEM.map((block, i) => (
            <div key={block.phase} style={{ textAlign: "center" }}>
              <div style={{ padding: "28px 20px", background: "#08060f", border: `1px solid ${L}`, borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "12px" }}>{block.phase}</div>
                {block.items.map((item) => (
                  <div key={item} style={{ color: "#888", fontSize: "13px", padding: "4px 0" }}>{item}</div>
                ))}
              </div>
              {i < GROWTH_SYSTEM.length - 1 && (
                <div style={{ color: A, margin: "8px 0", fontSize: "20px" }} className="system-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .system-grid{ grid-template-columns:1fr !important; }
          .system-arrow{ display:none; }
        }
      `}</style>
    </div>
  );
}

export function TestimonialsWithPhotos() {
  return (
    <div style={{ borderTop: `1px solid ${L}`, borderBottom: `1px solid ${L}`, padding: "80px 0" }}>
      <div style={{ width: "min(1400px,90vw)", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,3.5vw,50px)",
          fontWeight: 700, letterSpacing: "-2px", color: "white", textAlign: "center", marginBottom: "52px" }}>
          Results that <span style={{ color: A }}>speak for themselves.</span>
        </h2>
        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: "1px", background: L, border: `1px solid ${L}` }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ padding: "40px 32px", background: "#08060f" }}>
              <div style={{ color: A, fontSize: "14px", marginBottom: "12px" }}>
                {"★".repeat(t.stars)}
              </div>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src={t.photo} alt={t.name} width={48} height={48}
                  style={{ borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(155,124,255,.3)` }} />
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "white",
                    fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#3a3a3a" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}