import { useState } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../data/siteContent";
import { formatGrowthReportEmail, sendFormEmail } from "../utils/formSubmit";
import { SITE } from "../data/siteMeta";
import {
  runGrowthAudit,
  scoreHeadline,
  scoreLabel,
  validateGrowthForm,
} from "../utils/growthScore";

const A = "#9b7cff";
const L = "rgba(255,255,255,.08)";

const levelColor = {
  good: "#4ade80",
  warn: "#fbbf24",
  bad: "#ff6b6b",
};

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
              minHeight: "200px",
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

              {result && !loading && (() => {
                const previewCount = Math.max(2, Math.ceil(result.findings.length / 2));
                const previewFindings = result.findings.slice(0, previewCount);
                const lockedFindings = result.findings.slice(previewCount);

                return (
                <>
                  <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "8px" }}>
                    YOUR GOONYA GROWTH SCORE
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "clamp(56px, 8vw, 80px)",
                    fontWeight: 700,
                    color: A,
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}>
                    {result.score}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "20px", color: "white", marginBottom: "10px" }}>
                    {scoreHeadline(result.score)}
                  </h3>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.65, marginBottom: "12px" }}>
                    {scoreLabel(result.score)} Analysis for <strong style={{ color: "#aaa" }}>{result.business}</strong>.
                    {result.scanned
                      ? ` Live scan of ${result.finalUrl || form.website}.`
                      : " Full scan limited — site unreachable."}
                    {result.pageSpeedSeo != null && (
                      <> Google mobile SEO: <strong style={{ color: "#ccc" }}>{result.pageSpeedSeo}/100</strong>.</>
                    )}
                  </p>

                  {result.problems?.length > 0 && (
                    <div style={{
                      marginBottom: "20px", padding: "16px",
                      background: "rgba(255,100,100,.06)", border: "1px solid rgba(255,100,100,.2)",
                      borderRadius: "12px",
                    }}>
                      <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#ff6b6b", marginBottom: "10px" }}>
                        TOP PROBLEMS FOUND
                      </div>
                      {result.problems.map((p, i) => (
                        <div key={i} style={{ fontSize: "13px", color: "#ccc", lineHeight: 1.55, marginBottom: "8px" }}>
                          ✕ <strong>{p.area}:</strong> {p.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}
                    className="breakdown-grid">
                    {result.breakdown.map((b) => (
                      <div key={b.label} style={{
                        padding: "12px", background: "rgba(0,0,0,.25)", borderRadius: "10px", textAlign: "center",
                      }}>
                        <div style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>{b.score}</div>
                        <div style={{ fontSize: "10px", color: "#666", letterSpacing: "1px" }}>{b.label}</div>
                      </div>
                    ))}
                  </div>

                  {previewFindings.length > 0 && (
                    <div style={{ marginBottom: lockedFindings.length > 0 ? "16px" : "24px" }}>
                      <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#666", marginBottom: "10px" }}>
                        AUDIT PREVIEW
                      </div>
                      {previewFindings.map((f, i) => (
                        <div key={i} style={{
                          display: "flex", gap: "10px", padding: "10px 0",
                          borderBottom: `1px solid ${L}`, fontSize: "13px", lineHeight: 1.5,
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
                  )}

                  {lockedFindings.length > 0 && (
                    <div className="growth-audit-locked-wrap" style={{ marginBottom: "24px" }}>
                      <div className="growth-audit-locked-blur" aria-hidden="true">
                        <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#666", marginBottom: "10px" }}>
                          FULL DETAILED AUDIT
                        </div>
                        {lockedFindings.map((f, i) => (
                          <div key={i} style={{
                            display: "flex", gap: "10px", padding: "10px 0",
                            borderBottom: `1px solid ${L}`, fontSize: "13px", lineHeight: 1.5,
                          }}>
                            <span style={{ color: levelColor[f.level], flexShrink: 0, fontWeight: 700 }}>!</span>
                            <span>
                              <strong style={{ color: "#ccc" }}>{f.area}:</strong>{" "}
                              <span style={{ color: "#777" }}>{f.text}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="growth-audit-locked-cta">
                        <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "8px" }}>
                          FULL REPORT AVAILABLE
                        </div>
                        <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.6, margin: "0 0 16px" }}>
                          Call us for the complete website audit and a plan to fix what's costing you enquiries.
                        </p>
                        <a href={`tel:${SITE.phoneTel}`} className="growth-call-cta">
                          Call us now — {SITE.phone}
                        </a>
                        <Link to="/contact" className="growth-contact-link">
                          Or send an enquiry →
                        </Link>
                      </div>
                    </div>
                  )}

                  {lockedFindings.length === 0 && (
                    <Link to="/contact" style={{
                      display: "inline-flex", padding: "14px 28px", background: "white",
                      color: "black", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
                    }}>
                      Book a Strategy Call →
                    </Link>
                  )}
                </>
                );
              })()}
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
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(155,124,255,.2);
        }
        .growth-audit-locked-blur {
          filter: blur(7px);
          user-select: none;
          pointer-events: none;
          padding: 20px;
          max-height: 220px;
          overflow: hidden;
          opacity: 0.55;
        }
        .growth-audit-locked-cta {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          background: rgba(8, 6, 15, 0.72);
          backdrop-filter: blur(2px);
        }
        .growth-call-cta {
          display: inline-flex;
          padding: 14px 28px;
          background: #9b7cff;
          color: #fff;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          margin-bottom: 12px;
        }
        .growth-contact-link {
          color: #9b7cff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
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
