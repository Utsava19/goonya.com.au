import { useState } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../data/siteContent";
import {
  calculateGrowthScore,
  scoreHeadline,
  scoreLabel,
  validateGrowthForm,
} from "../utils/growthScore";

const A = "#9b7cff";
const L = "rgba(255,255,255,.08)";

export default function GrowthScoreCheck({ id = "growth-check", compact = false }) {
  const [form, setForm] = useState({
    business: "",
    website: "",
    suburb: "",
    industry: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateGrowthForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setResult(null);
      return;
    }

    const score = calculateGrowthScore(form);
    setResult({ score, business: form.business.trim() });
    setErrors({});
  }

  return (
    <section
      id={id}
      style={{
        padding: compact ? "0" : "80px 0",
        borderTop: compact ? "none" : `1px solid ${L}`,
        borderBottom: compact ? "none" : `1px solid ${L}`,
      }}
    >
      <div style={{ width: "min(1400px, 90vw)", margin: "0 auto" }}>
        {!compact && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "2.5px",
                color: "#3a3a3a",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ width: "20px", height: "1px", background: A }} />
              FREE GROWTH CHECK
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-2px",
                color: "white",
                marginBottom: "12px",
              }}
            >
              How strong is your{" "}
              <span style={{ color: A }}>online presence?</span>
            </h2>
            <p style={{ color: "#666", fontSize: "16px", maxWidth: "520px", lineHeight: 1.7 }}>
              We'll analyse your website, Google presence and marketing basics —
              and show you what's costing you customers.
            </p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: result ? "1fr 1fr" : "1fr",
            gap: "24px",
            alignItems: "start",
          }}
          className="growth-check-grid"
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#08060f",
              border: `1px solid ${L}`,
              borderRadius: "16px",
              padding: compact ? "28px" : "36px",
            }}
            noValidate
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
              className="growth-form-grid"
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Business name *</label>
                <input
                  name="business"
                  value={form.business}
                  onChange={updateField}
                  placeholder="Your business name"
                  style={inputStyle(errors.business)}
                  maxLength={80}
                />
                {errors.business && <span style={errorStyle}>{errors.business}</span>}
              </div>

              <div>
                <label style={labelStyle}>Website</label>
                <input
                  name="website"
                  value={form.website}
                  onChange={updateField}
                  placeholder="yourbusiness.com.au"
                  style={inputStyle(errors.website)}
                  maxLength={120}
                />
                {errors.website && <span style={errorStyle}>{errors.website}</span>}
              </div>

              <div>
                <label style={labelStyle}>Suburb *</label>
                <input
                  name="suburb"
                  value={form.suburb}
                  onChange={updateField}
                  placeholder="Noble Park"
                  style={inputStyle(errors.suburb)}
                  maxLength={60}
                />
                {errors.suburb && <span style={errorStyle}>{errors.suburb}</span>}
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Industry *</label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={updateField}
                  style={{
                    ...inputStyle(errors.industry),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.industry && <span style={errorStyle}>{errors.industry}</span>}
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "16px 24px",
                background: A,
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              Check My Business Growth →
            </button>
          </form>

          {result && (
            <div
              style={{
                background: "rgba(155,124,255,.06)",
                border: `1px solid rgba(155,124,255,.25)`,
                borderRadius: "16px",
                padding: "36px",
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "8px" }}>
                YOUR GOONYA GROWTH SCORE
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(64px, 10vw, 88px)",
                  fontWeight: 700,
                  color: A,
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                {result.score}
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "22px",
                  color: "white",
                  marginBottom: "10px",
                }}
              >
                {scoreHeadline(result.score)}
              </h3>
              <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.65, marginBottom: "24px" }}>
                {scoreLabel(result.score)} Based on what you entered for{" "}
                <strong style={{ color: "#aaa" }}>{result.business}</strong>.
              </p>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  padding: "14px 28px",
                  background: "white",
                  color: "black",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Book a Strategy Call →
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .growth-check-grid{ grid-template-columns:1fr !important; }
          .growth-form-grid{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "1.5px",
  color: "#555",
  marginBottom: "8px",
  textTransform: "uppercase",
};

function inputStyle(hasError) {
  return {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,.04)",
    border: hasError
      ? "1px solid rgba(255,100,100,.5)"
      : "1px solid rgba(255,255,255,.1)",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    outline: "none",
  };
}

const errorStyle = {
  display: "block",
  fontSize: "12px",
  color: "#ff6b6b",
  marginTop: "6px",
};
