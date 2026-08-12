import { useRef, useState } from "react";
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
const URGENT_RED = "rgba(255,107,107,.55)";

export default function GrowthScoreCheck({
  id = "growth-check",
  compact = false,
  embedded = false,
  urgent = false,
  onPackagesPage = false,
}) {
  const wrapRef = useRef(null);
  const [urgentActive, setUrgentActive] = useState(urgent);
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

  function pauseUrgent() {
    if (urgent) setUrgentActive(false);
  }

  function resumeUrgent(e) {
    if (!urgent) return;
    requestAnimationFrame(() => {
      const next = e?.relatedTarget;
      if (!wrapRef.current?.contains(next) && !wrapRef.current?.contains(document.activeElement)) {
        setUrgentActive(true);
      }
    });
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
      setUrgentActive(false);

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

  const showSuccess = Boolean(result && !loading);
  const showLoading = Boolean(loading && !result);
  const showForm = !showSuccess && !showLoading;

  return (
    <section
      ref={wrapRef}
      id={id}
      className={[
        onPackagesPage ? "packages-growth-check" : "",
        embedded ? "growth-check-embedded" : "",
        urgent ? "growth-check-urgent-host" : "",
        urgent && urgentActive ? "growth-check-urgent-active" : "",
      ].filter(Boolean).join(" ")}
      onFocusCapture={pauseUrgent}
      onBlurCapture={resumeUrgent}
      style={{
        padding: compact || embedded ? "0" : "80px 0",
        borderTop: compact || embedded || onPackagesPage ? "none" : `1px solid ${L}`,
        borderBottom: compact || embedded || onPackagesPage ? "none" : `1px solid ${L}`,
        position: "relative",
        zIndex: onPackagesPage ? 25 : 1,
      }}
    >
      <div className={embedded ? "" : "page-container"}>
        <div
          className={[
            urgent ? "growth-check-urgent-inner" : "",
            urgent && urgentActive ? "growth-check-urgent-active" : "",
          ].filter(Boolean).join(" ")}
        >
        {!compact && !embedded && (
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

        {embedded && showForm && (
          <div className="growth-embedded-header">
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#ff6b6b", marginBottom: "8px" }}>
              FREE GROWTH CHECK · DON&apos;T WAIT
            </div>
            <h3 style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(22px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "8px",
              letterSpacing: "-1px",
            }}>
              Check your business growth
            </h3>
            <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>
              Live scan of your website — SEO, mobile, Google signals and more.
            </p>
          </div>
        )}

        <div className="growth-check-layout">
          {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#08060f",
              border: `1px solid ${L}`,
              borderRadius: embedded ? "0 0 16px 16px" : "16px",
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

            <button type="submit" disabled={loading} className={urgent && urgentActive ? "growth-urgent-submit" : ""} style={{
              ...submitStyle,
              ...(urgent && urgentActive ? urgentSubmitStyle : {}),
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}>
              {loading ? "Scanning your website…" : "Check My Growth Now →"}
            </button>
            {submitError && <p style={{ ...errorStyle, marginTop: "12px" }}>{submitError}</p>}
          </form>
          )}

          {showLoading && (
            <div className="growth-state-panel growth-loading-panel">
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#ff6b6b", marginBottom: "10px" }}>
                SCANNING YOUR WEBSITE
              </div>
              <div style={{ marginBottom: "12px", color: A, fontWeight: 600, fontSize: "15px" }}>
                Checking {form.website || "your site"}…
              </div>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                SEO tags, mobile setup, local signals, contact CTAs and Google PageSpeed.
              </p>
            </div>
          )}

          {showSuccess && (
            <div className="growth-state-panel growth-success-panel">
              <div className="growth-success-badge">AUDIT COMPLETE</div>
              <div className="growth-success-score">
                {result.score}
                <span>/100</span>
              </div>
              <p className="growth-success-copy">
                {result.problems?.length > 0 ? (
                  <>
                    We found <strong>{result.problems.length} problem{result.problems.length === 1 ? "" : "s"}</strong> holding{" "}
                    <strong>{result.business}</strong> back. Call now for a free review.
                  </>
                ) : (
                  <>
                    Your audit for <strong>{result.business}</strong> is ready. Call now for a free walkthrough.
                  </>
                )}
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
          )}
        </div>
        </div>
      </div>

      <style>{`
        .growth-check-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }
        .growth-state-panel {
          background: #08060f;
          border: 2px solid ${URGENT_RED};
          border-radius: 16px;
          padding: ${compact ? "28px" : "36px"};
          box-shadow: 0 0 0 1px rgba(255,107,107,.25), 0 0 36px rgba(255,107,107,.18);
          text-align: center;
        }
        .growth-loading-panel {
          animation: growthPanelIn 0.25s ease-out;
        }
        .growth-success-panel {
          animation: growthSuccessPop 0.4s cubic-bezier(.2,.9,.3,1);
        }
        @keyframes growthPanelIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growthSuccessPop {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .growth-success-badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 700;
          color: #fff;
          background: rgba(255,107,107,.18);
          border: 1px solid rgba(255,107,107,.55);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 14px;
        }
        .growth-success-score {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(48px, 10vw, 64px);
          font-weight: 700;
          color: ${A};
          line-height: 1;
          margin-bottom: 12px;
        }
        .growth-success-score span {
          font-size: 0.35em;
          color: #666;
          font-weight: 600;
          margin-left: 4px;
        }
        .growth-success-copy {
          color: #bbb;
          font-size: 14px;
          line-height: 1.65;
          margin: 0 auto 20px;
          max-width: 320px;
        }
        .growth-success-copy strong {
          color: #fff;
        }
        @media (min-width: 960px) {
          .growth-check-layout {
            grid-template-columns: 1fr;
          }
        }
        .growth-check-embedded .growth-embedded-header {
          background: #08060f;
          border: 2px solid rgba(255,107,107,.45);
          border-bottom: none;
          border-radius: 16px 16px 0 0;
          padding: 22px 22px 0;
        }
        .growth-check-embedded form {
          border: 2px solid rgba(255,107,107,.45) !important;
          border-top: 1px solid rgba(255,107,107,.25) !important;
          border-radius: 0 0 16px 16px !important;
        }
        .growth-check-embedded .growth-state-panel {
          border-radius: 16px;
        }
        .growth-check-urgent-inner {
          will-change: transform;
        }
        .growth-check-urgent-inner.growth-check-urgent-active {
          animation: growthUrgentBounce 0.45s ease-in-out infinite;
        }
        .growth-check-urgent-inner.growth-check-urgent-active .growth-embedded-header,
        .growth-check-urgent-inner.growth-check-urgent-active form {
          box-shadow: 0 0 0 1px rgba(255,107,107,.65), 0 0 48px rgba(255,107,107,.28);
        }
        @keyframes growthUrgentBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.03);
          }
        }
        @keyframes growthUrgentBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .growth-check-urgent-active .growth-embedded-header > div:first-child {
          animation: growthUrgentBlink 0.35s ease-in-out infinite;
        }
        .growth-urgent-submit {
          animation: growthUrgentBounce 0.45s ease-in-out infinite;
        }
        .growth-success-panel .growth-call-cta {
          margin-bottom: 12px;
        }
        .packages-growth-check {
          background: #070707;
          padding: 48px 0 56px !important;
          margin-bottom: 0;
        }
        .growth-call-cta {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 20px 48px 16px;
          background: linear-gradient(135deg, #c4a8ff 0%, #9b7cff 50%, #6d4db8 100%);
          color: #fff;
          border-radius: 100px;
          font-weight: 800;
          font-size: clamp(20px, 4vw, 26px);
          letter-spacing: 0.02em;
          text-decoration: none;
          border: 3px solid rgba(255,107,107,.65);
          box-shadow: 0 12px 40px rgba(155,124,255,.45), 0 0 24px rgba(255,107,107,.25);
        }
        .growth-call-bounce {
          animation: growth-call-bounce 0.65s ease-in-out infinite;
        }
        .growth-call-icon {
          font-size: 28px;
          line-height: 1;
        }
        .growth-call-phone {
          font-size: 14px;
          font-weight: 600;
          opacity: 0.95;
          letter-spacing: 0.06em;
        }
        @keyframes growth-call-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 12px 40px rgba(155,124,255,.45), 0 0 24px rgba(255,107,107,.25);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 22px 52px rgba(155,124,255,.65), 0 0 32px rgba(255,107,107,.4);
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
          .growth-form-grid { grid-template-columns: 1fr !important; }
          .growth-state-panel {
            padding: 22px 20px !important;
          }
          .growth-success-score {
            font-size: clamp(40px, 12vw, 52px) !important;
          }
          .growth-call-cta {
            padding: 14px 28px 12px;
            font-size: 18px;
          }
          .growth-call-icon {
            font-size: 22px;
          }
          .growth-call-phone {
            font-size: 12px;
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

const urgentSubmitStyle = {
  background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
  color: "#141118",
  boxShadow: "0 8px 32px rgba(245,158,11,.45)",
  fontSize: "15px",
  fontWeight: 800,
};
