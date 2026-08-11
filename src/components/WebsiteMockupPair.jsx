const A = "#9b7cff";

function BrowserFrame({ label, url, variant, children }) {
  const isBad = variant === "before";

  return (
    <div className="wm-browser">
      <div className="wm-chrome">
        <div className="wm-dots">
          <span /><span /><span />
        </div>
        <div className="wm-url">{url}</div>
      </div>
      <div className={`wm-screen ${isBad ? "wm-screen-bad" : "wm-screen-good"}`}>
        {children}
      </div>
      <div className={`wm-caption ${isBad ? "wm-caption-bad" : "wm-caption-good"}`}>{label}</div>
    </div>
  );
}

function BadPlumbingSite() {
  return (
    <div className="wm-bad-site">
      <div className="wm-bad-header">NORTHLINE PLUMBING!!!</div>
      <div className="wm-bad-sub">Welcome to our website — under construction</div>
      <div className="wm-bad-nav">
        <span>Home</span><span>About</span><span>Contact</span>
      </div>
      <div className="wm-bad-hero">
        <div className="wm-bad-box">[ stock photo ]</div>
        <p>We do all plumbing work. Call us maybe.</p>
        <div className="wm-bad-btn">CLICK HERE</div>
      </div>
      <div className="wm-bad-footer">© 2019 · Best viewed in Internet Explorer</div>
    </div>
  );
}

function GoodPlumbingSite() {
  return (
    <div className="wm-good-site">
      <div className="wm-good-nav">
        <strong>Northline</strong>
        <span>Services</span><span>Areas</span><span>Reviews</span>
      </div>
      <div className="wm-good-hero">
        <div className="wm-good-tag">Dandenong · 24/7 emergency</div>
        <h3>Blocked drain? Burst pipe?<br />We&apos;re there fast.</h3>
        <div className="wm-good-actions">
          <span className="wm-good-cta">Get a quote</span>
          <span className="wm-good-phone">0434 785 800</span>
        </div>
      </div>
      <div className="wm-good-cards">
        <div>Hot water</div><div>Blocked drains</div><div>Gas fitting</div>
      </div>
    </div>
  );
}

export default function WebsiteMockupPair({ client = "Client", industry = "Business" }) {
  const slug = client.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="website-mockup-pair">
      <BrowserFrame
        label="Before — old website"
        url={`${slug}.com.au/old`}
        variant="before"
      >
        <BadPlumbingSite />
      </BrowserFrame>

      <div className="wm-divider" aria-hidden="true">→</div>

      <BrowserFrame
        label="After — Goonya rebuild"
        url={`${slug}.com.au`}
        variant="after"
      >
        <GoodPlumbingSite />
      </BrowserFrame>

      <p className="wm-note">
        Real {industry.toLowerCase()} example — the old site looked outdated and didn&apos;t convert.
        The new site is built mobile-first with clear quote CTAs and click-to-call.
      </p>

      <style>{`
        .website-mockup-pair {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .wm-browser {
          flex: 1 1 280px;
          max-width: 420px;
        }
        .wm-chrome {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: #111;
          border: 1px solid rgba(255,255,255,.08);
          border-bottom: none;
          border-radius: 12px 12px 0 0;
        }
        .wm-dots { display: flex; gap: 5px; }
        .wm-dots span {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,.15);
        }
        .wm-url {
          flex: 1;
          font-size: 10px;
          color: #666;
          background: rgba(255,255,255,.04);
          border-radius: 6px;
          padding: 5px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .wm-screen {
          min-height: 260px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 0 0 12px 12px;
          overflow: hidden;
        }
        .wm-screen-bad { background: #eef2ff; }
        .wm-screen-good { background: #08060f; }
        .wm-caption {
          margin-top: 12px;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-align: center;
        }
        .wm-caption-bad { color: #888; }
        .wm-caption-good { color: ${A}; }
        .wm-divider {
          flex: 0 0 auto;
          font-size: 28px;
          font-weight: 700;
          color: ${A};
        }
        .wm-note {
          flex: 1 1 100%;
          text-align: center;
          color: #666;
          font-size: 14px;
          line-height: 1.65;
          margin: 8px 0 0;
          max-width: 720px;
          margin-inline: auto;
        }

        /* Bad site */
        .wm-bad-site { padding: 12px; font-family: Georgia, serif; color: #333; }
        .wm-bad-header {
          font-size: 18px; font-weight: 700; color: #003399;
          text-align: center; text-decoration: underline;
        }
        .wm-bad-sub {
          font-size: 10px; text-align: center; color: #c00; margin: 4px 0 10px;
        }
        .wm-bad-nav {
          display: flex; justify-content: center; gap: 12px;
          font-size: 11px; color: #00f; text-decoration: underline; margin-bottom: 10px;
        }
        .wm-bad-hero { text-align: center; }
        .wm-bad-box {
          height: 70px; background: #ccc; border: 2px dashed #999;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: #666; margin-bottom: 8px;
        }
        .wm-bad-hero p { font-size: 11px; margin: 0 0 8px; }
        .wm-bad-btn {
          display: inline-block; background: #ff0; border: 2px outset #999;
          padding: 4px 12px; font-size: 11px; font-weight: 700;
        }
        .wm-bad-footer {
          margin-top: 14px; font-size: 9px; text-align: center; color: #999;
        }

        /* Good site */
        .wm-good-site { padding: 14px; color: white; }
        .wm-good-nav {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; color: #888; margin-bottom: 14px;
        }
        .wm-good-nav strong { color: white; margin-right: auto; font-size: 11px; }
        .wm-good-hero {
          padding: 16px;
          background: linear-gradient(135deg, rgba(155,124,255,.2), rgba(7,7,7,.2));
          border: 1px solid rgba(155,124,255,.2);
          border-radius: 10px;
          margin-bottom: 12px;
        }
        .wm-good-tag {
          font-size: 9px; letter-spacing: 1px; color: ${A}; margin-bottom: 8px;
        }
        .wm-good-hero h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; line-height: 1.35; margin: 0 0 12px;
        }
        .wm-good-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .wm-good-cta {
          background: white; color: black;
          font-size: 10px; font-weight: 700;
          padding: 6px 12px; border-radius: 100px;
        }
        .wm-good-phone {
          font-size: 10px; color: ${A};
          padding: 6px 10px;
          border: 1px solid rgba(155,124,255,.35);
          border-radius: 100px;
        }
        .wm-good-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
        }
        .wm-good-cards div {
          font-size: 9px; text-align: center; padding: 10px 4px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px; color: #aaa;
        }

        @media (max-width: 640px) {
          .wm-divider {
            flex: 1 1 100%;
            text-align: center;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
