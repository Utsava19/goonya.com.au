import { useState } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../data/siteContent";
import { formatGrowthReportEmail, sendFormEmail } from "../utils/formSubmit";
import { SITE } from "../data/siteMeta";
import {
  runGrowthAudit,
  validateGrowthForm,
} from "../utils/growthScore";

const A = "#9b7cff";
const L = "rgba(255,255,255,.08)";

const levelColor = {
  good: "#4ade80",
  warn: "#fbbf24",
  bad: "#ff6b6b",
};

function problemTeaser(score, problemCount) {
  if (problemCount > 0) {
    return `We found ${problemCount} problem${problemCount === 1 ? "" : "s"} that could be costing you enquiries — your full audit is ready.`;
  }
  if (score >= 75) {
    return "Your score is okay, but there are still gaps that could be holding you back.";
  }
  return "There are problems with your online presence that could be costing you customers.";
}

export default function GrowthScoreCheck({
  id = "growth-check",
  compact = false,
  onPackagesPage = false,
}) {
  const [form, setForm] = useState({
    business: "",
    website: "",
    suburb: "",
    industry: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateGrowthForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setSubmitError("");
    try {
      const audit = await runGrowthAudit(form);
      setResult(audit);
      setErrors({});

      sendFormEmail({
        subject: `Growth audit: ${form.business.trim()} — score ${audit.score}/100`,
        fields: {
          business: form.business.trim(),
          website: form.website.trim(),
          suburb: form.suburb.trim(),
          industry: form.industry.trim(),
          score: `${audit.score}/100`,
          scanned_url: audit.finalUrl || form.website.trim(),
          full_report: formatGrowthReportEmail(form, audit),
        },
      }).catch(() => {
        /* report email is best-effort — results still show on screen */
      });
    } catch (err) {
      setSubmitError(err.message || "Could not complete the growth check.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id={id}
      className={onPackagesPage ? "packages-growth-check" : ""}
      style={{
        padding: compact ? "0" : "80px 0",
        borderTop: compact || onPackagesPage ? "none" : `1px solid ${L}`,
        borderBottom: compact || onPackagesPage ? "none" : `1px solid ${L}`,
        position: "relative",
        zIndex: onPackagesPage ? 25 : 1,
      }}
    >
      <div className="page-container">
        {!compact && (
          <div style={{ marginBottom: "40px" }}>
            <div style={eyebrowStyle}>
              <span style={{ width: "20px", height: "1px", background: A }} />
              FREE GROWTH CHECK
            </div>
            <h2 style={titleStyle}>
              How strong is your <span style={{ color: A }}>online presence?</span>
            </h2>
            <p style={{ color: "#666", fontSize: "16px", maxWidth: "560px", lineHeight: 1.7 }}>
              Enter your website and we scan it live — SEO, mobile, Google signals, local presence
              and conversion issues. Every business gets a different score.
            </p>
          </div>
        )}

        <div className="growth-check-layout">
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
            <div className="growth-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Business name *</label>
                <input name="business" value={form.business} onChange={updateField}
                  placeholder="Your business name" style={inputStyle(errors.business)} maxLength={80} />
                {errors.business && <span style={errorStyle}>{errors.business}</span>}
              </div>
              <div>
                <label style={labelStyle}>Website *</label>
                <input name="website" value={form.website} onChange={updateField}
                  placeholder="yourbusiness.com.au" style={inputStyle(errors.website)} maxLength={120} />
                {errors.website && <span style={errorStyle}>{errors.website}</span>}
              </div>
              <div>
                <label style={labelStyle}>Suburb *</label>
                <input name="suburb" value={form.suburb} onChange={updateField}
                  placeholder="Noble Park" style={inputStyle(errors.suburb)} maxLength={60} />
                {errors.suburb && <span style={errorStyle}>{errors.suburb}</span>}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Industry *</label>
                <select name="industry" value={form.industry} onChange={updateField}
                  style={{ ...inputStyle(errors.industry), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.industry && <span style={errorStyle}>{errors.industry}</span>}
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              ...submitStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}>
              {loading ? "Scanning your website…" : "Check My Business Growth →"}
            </button>
            {submitError && <p style={{ ...errorStyle, marginTop: "12px" }}>{submitError}</p>}
          </form>

          {(loading || result) && (
            <div className="growth-result-panel" style={{
              background: "rgba(155,124,255,.06)",
              border: `1px solid rgba(155,124,255,.25)`,
              borderRadius: "16px",
              padding: "36px",
              minHeight: result ? "520px" : "200px",
            }}>
              {loading && (
                <div style={{ color: "#888", fontSize: "15px", lineHeight: 1.7 }}>
                  <div style={{ marginBottom: "16px", color: A, fontWeight: 600 }}>
                    Scanning {form.website || "your site"}…
                  </div>
                  Fetching your homepage, checking SEO tags, mobile setup, local signals,
                  contact CTAs and Google PageSpeed SEO score.
                </div>
              )}

              {result && !loading && (
                <>
                  <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "8px" }}>
                    YOUR GOONYA GROWTH SCORE
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "clamp(64px, 10vw, 96px)",
                    fontWeight: 700,
                    color: A,
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}>
                    {result.score}
                    <span style={{ fontSize: "0.35em", color: "#666", fontWeight: 600, marginLeft: "4px" }}>/100</span>
                  </div>
                  <p style={{
                    color: result.problems?.length ? "#ffb4b4" : "#aaa",
                    fontSize: "16px",
                    lineHeight: 1.65,
                    marginBottom: "28px",
                    maxWidth: "420px",
                  }}>
                    {problemTeaser(result.score, result.problems?.length ?? 0)}
                  </p>

                  <div className="growth-audit-locked-wrap">
                    <div className="growth-audit-locked-blur" aria-hidden="true">
                      <div style={{ fontSize: "12px", letterSpacing: "1.5px", color: "#666", marginBottom: "16px" }}>
                        FULL WEBSITE AUDIT — LOCKED
                      </div>

                      {result.problems?.length > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                          <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#ff6b6b", marginBottom: "12px" }}>
                            TOP PROBLEMS FOUND
                          </div>
                          {result.problems.map((p, i) => (
                            <div key={i} style={{ fontSize: "14px", color: "#ccc", lineHeight: 1.55, marginBottom: "10px" }}>
                              ✕ <strong>{p.area}:</strong> {p.text}
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}
                        className="breakdown-grid">
                        {result.breakdown.map((b) => (
                          <div key={b.label} style={{
                            padding: "16px", background: "rgba(0,0,0,.25)", borderRadius: "10px", textAlign: "center",
                          }}>
                            <div style={{ fontSize: "26px", fontWeight: 700, color: "white" }}>{b.score}</div>
                            <div style={{ fontSize: "10px", color: "#666", letterSpacing: "1px" }}>{b.label}</div>
                          </div>
                        ))}
                      </div>

                      {result.findings.map((f, i) => (
                        <div key={i} style={{
                          display: "flex", gap: "10px", padding: "12px 0",
                          borderBottom: `1px solid ${L}`, fontSize: "14px", lineHeight: 1.5,
                        }}>
                          <span style={{ color: levelColor[f.level], flexShrink: 0, fontWeight: 700 }}>
                            {f.level === "good" ? "✓" : f.level === "warn" ? "!" : "✕"}
                          </span>
                          <span>
                            <strong style={{ color: "#ccc" }}>{f.area}:</strong>{" "}
                            <span style={{ color: "#777" }}>{f.text}</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="growth-audit-locked-cta">
                      <div className="growth-audit-locked-badge">FULL REPORT READY</div>
                      <h4 className="growth-audit-locked-title">
                        See exactly what to fix —<br />and how to get more enquiries
                      </h4>
                      <p className="growth-audit-locked-copy">
                        Call now and we'll walk you through your complete audit for{" "}
                        <strong>{result.business}</strong>.
                      </p>
                      <a href={`tel:${SITE.phoneTel}`} className="growth-call-cta growth-call-bounce">
                        <span className="growth-call-icon" aria-hidden="true">📞</span>
                        Call now
                        <span className="growth-call-phone">{SITE.phone}</span>
                      </a>
                      <Link to="/contact" className="growth-contact-link">
                        Prefer email? Send an enquiry →
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .growth-check-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }
        .growth-result-panel {
          overflow: visible;
        }
        @media (min-width: 960px) {
          .growth-check-layout {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .growth-form-grid { grid-template-columns: 1fr !important; }
          .breakdown-grid { grid-template-columns: 1fr !important; }
        }
        .packages-growth-check {
          background: #070707;
          padding: 48px 0 56px !important;
          margin-bottom: 0;
        }
        .growth-audit-locked-wrap {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(155,124,255,.28);
          min-height: 420px;
          background: rgba(0,0,0,.2);
        }
        .growth-audit-locked-blur {
          filter: blur(9px);
          user-select: none;
          pointer-events: none;
          padding: 32px 28px 48px;
          min-height: 420px;
          opacity: 0.7;
          transform: scale(1.02);
        }
        .growth-audit-locked-cta {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px 24px;
          background: linear-gradient(
            180deg,
            rgba(8, 6, 15, 0.55) 0%,
            rgba(8, 6, 15, 0.88) 45%,
            rgba(8, 6, 15, 0.92) 100%
          );
        }
        .growth-audit-locked-badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 700;
          color: #fff;
          background: rgba(155,124,255,.25);
          border: 1px solid rgba(155,124,255,.45);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .growth-audit-locked-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.5px;
        }
        .growth-audit-locked-copy {
          color: #bbb;
          font-size: 15px;
          line-height: 1.65;
          margin: 0 0 24px;
          max-width: 340px;
        }
        .growth-audit-locked-copy strong {
          color: #fff;
        }
        .growth-call-cta {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 18px 40px 16px;
          background: linear-gradient(135deg, #b79cff 0%, #9b7cff 55%, #7c5cbf 100%);
          color: #fff;
          border-radius: 100px;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.02em;
          text-decoration: none;
          margin-bottom: 14px;
          border: 2px solid rgba(255,255,255,.25);
          box-shadow: 0 8px 32px rgba(155,124,255,.45);
        }
        .growth-call-bounce {
          animation: growth-call-bounce 1.25s ease-in-out infinite;
        }
        .growth-call-icon {
          font-size: 22px;
          line-height: 1;
        }
        .growth-call-phone {
          font-size: 13px;
          font-weight: 600;
          opacity: 0.92;
          letter-spacing: 0.04em;
        }
        @keyframes growth-call-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 8px 32px rgba(155,124,255,.45);
          }
          50% {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 16px 48px rgba(155,124,255,.65);
          }
        }
        .growth-contact-link {
          color: rgba(255,255,255,.55);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color .2s;
        }
        .growth-contact-link:hover {
          color: #9b7cff;
        }
        @media (max-width: 768px) {
          .growth-audit-locked-wrap,
          .growth-audit-locked-blur {
            min-height: 360px;
          }
          .growth-call-cta {
            padding: 16px 32px 14px;
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2.5px",
  color: "#3a3a3a",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const titleStyle = {
  fontFamily: "'Space Grotesk',sans-serif",
  fontSize: "clamp(32px, 4vw, 52px)",
  fontWeight: 700,
  letterSpacing: "-2px",
  color: "white",
  marginBottom: "12px",
};

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
    border: hasError ? "1px solid rgba(255,100,100,.5)" : "1px solid rgba(255,255,255,.1)",
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

const submitStyle = {
  marginTop: "20px",
  width: "100%",
  padding: "16px 24px",
  background: "#9b7cff",
  color: "#fff",
  border: "none",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  letterSpacing: "0.5px",
  opacity: 1,
};
