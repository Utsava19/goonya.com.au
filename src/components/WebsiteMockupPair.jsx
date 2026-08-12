function hexToRgb(hex) {
  if (typeof hex !== "string") {
    return { r: 155, g: 124, b: 255 };
  }
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function BrowserFrame({ label, url, captionColor, children, screenClass }) {
  return (
    <div className="wm-browser">
      <div className="wm-chrome">
        <div className="wm-dots">
          <span /><span /><span />
        </div>
        <div className="wm-url">{url}</div>
      </div>
      <div className={`wm-screen ${screenClass}`}>{children}</div>
      <div className="wm-caption" style={{ color: captionColor }}>{label}</div>
    </div>
  );
}

function BadSite({ before, coverImage }) {
  const imageSrc = before.image || coverImage;

  return (
    <div className="wm-bad-site">
      <div className="wm-bad-header" style={{ color: before.headerColor ?? "#003399" }}>{before.header}</div>
      {before.sub && <div className="wm-bad-sub">{before.sub}</div>}
      <div className="wm-bad-nav">
        {(before.nav ?? ["Home", "About", "Contact"]).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="wm-bad-hero">
        <div className="wm-bad-box">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt=""
              className="wm-bad-photo"
              loading="lazy"
            />
          ) : (
            <div className="wm-bad-photo-fallback">
              <span className="wm-bad-photo-icon" aria-hidden="true">🖼</span>
              <span>{before.imageLabel ?? "Broken image"}</span>
            </div>
          )}
        </div>
        <p>{before.body}</p>
        <div className="wm-bad-btn">{before.btn ?? "CLICK HERE"}</div>
      </div>
      <div className="wm-bad-footer">{before.footer ?? "© old site · not mobile friendly"}</div>
    </div>
  );
}

function GoodSite({ mockup }) {
  const { brand, after } = mockup;
  const isLight = after.theme === "light";

  return (
    <div
      className="wm-good-site"
      style={{
        color: isLight ? "#1a1a1a" : "#fff",
        background: after.bg,
      }}
    >
      <div className="wm-good-nav">
        <strong style={{ color: brand.primary }}>{after.siteName}</strong>
        {(after.nav ?? []).map((item) => (
          <span key={item} style={{ color: isLight ? "#666" : "#888" }}>{item}</span>
        ))}
      </div>
      <div
        className="wm-good-hero"
        style={{
          background: isLight
            ? `linear-gradient(135deg, ${rgba(brand.primary, 0.12)}, ${rgba(brand.secondary, 0.08)})`
            : `linear-gradient(135deg, ${rgba(brand.primary, 0.35)}, ${rgba(brand.secondary, 0.15)})`,
          border: `1px solid ${rgba(brand.primary, 0.35)}`,
        }}
      >
        <div className="wm-good-tag" style={{ color: brand.secondary }}>{after.tagline}</div>
        <h3 style={{ color: isLight ? "#111" : "#fff" }}>
          {after.headline.split("\n").map((line, i) => (
            <span key={i}>{line}{i < after.headline.split("\n").length - 1 && <br />}</span>
          ))}
        </h3>
        <div className="wm-good-actions">
          <span
            className="wm-good-cta"
            style={{ background: brand.primary, color: after.ctaTextColor ?? "#fff" }}
          >
            {after.cta}
          </span>
          {after.secondary && (
            <span
              className="wm-good-secondary"
              style={{
                color: brand.secondary,
                borderColor: rgba(brand.secondary, 0.45),
              }}
            >
              {after.secondary}
            </span>
          )}
        </div>
      </div>
      <div className="wm-good-cards">
        {(after.cards ?? []).map((card) => (
          <div
            key={card}
            style={{
              background: isLight ? rgba(brand.primary, 0.06) : "rgba(255,255,255,0.04)",
              border: `1px solid ${rgba(brand.primary, 0.2)}`,
              color: isLight ? "#555" : "#bbb",
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WebsiteMockupPair({ mockup, industry = "Business", coverImage }) {
  if (!mockup) return null;

  const { slug, brand, before, afterNote } = mockup;
  const dividerColor = brand.primary;

  return (
    <div className="website-mockup-pair">
      <BrowserFrame
        label="Before — old website"
        url={`${slug}.com.au/old`}
        captionColor="#888"
        screenClass="wm-screen-bad"
      >
        <BadSite before={before} coverImage={coverImage} />
      </BrowserFrame>

      <div className="wm-divider" style={{ color: dividerColor }} aria-hidden="true">→</div>

      <BrowserFrame
        label={`After — ${mockup.after.siteName} rebuild`}
        url={`${slug}.com.au`}
        captionColor={brand.primary}
        screenClass="wm-screen-good"
      >
        <GoodSite mockup={mockup} />
      </BrowserFrame>

      {afterNote && (
        <p className="wm-note">{afterNote.replace("{industry}", industry.toLowerCase())}</p>
      )}

      <style>{`
        .website-mockup-pair {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .wm-browser { flex: 1 1 280px; max-width: 420px; }
        .wm-chrome {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; background: #111;
          border: 1px solid rgba(255,255,255,.08);
          border-bottom: none; border-radius: 12px 12px 0 0;
        }
        .wm-dots { display: flex; gap: 5px; }
        .wm-dots span {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,.15);
        }
        .wm-url {
          flex: 1; font-size: 10px; color: #666;
          background: rgba(255,255,255,.04); border-radius: 6px;
          padding: 5px 10px; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .wm-screen {
          min-height: 260px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 0 0 12px 12px; overflow: hidden;
        }
        .wm-screen-bad { background: #eef2ff; }
        .wm-screen-good { background: #08060f; }
        .wm-caption {
          margin-top: 12px; font-size: 12px;
          letter-spacing: 1.5px; text-transform: uppercase; text-align: center;
        }
        .wm-divider { flex: 0 0 auto; font-size: 28px; font-weight: 700; }
        .wm-note {
          flex: 1 1 100%; text-align: center; color: #666;
          font-size: 14px; line-height: 1.65; margin: 8px 0 0;
          max-width: 720px; margin-inline: auto;
        }
        .wm-bad-site { padding: 12px; font-family: Georgia, serif; color: #333; }
        .wm-bad-header {
          font-size: 16px; font-weight: 700; text-align: center; text-decoration: underline;
        }
        .wm-bad-sub { font-size: 10px; text-align: center; color: #c00; margin: 4px 0 10px; }
        .wm-bad-nav {
          display: flex; justify-content: center; gap: 12px;
          font-size: 11px; color: #00f; text-decoration: underline; margin-bottom: 10px;
        }
        .wm-bad-hero { text-align: center; }
        .wm-bad-box {
          height: 88px;
          background: #d4d4d4;
          border: 2px dashed #888;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .wm-bad-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(0.85) contrast(0.85) saturate(0.5);
          opacity: 0.75;
        }
        .wm-bad-photo-fallback {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 10px;
          color: #555;
          background: linear-gradient(135deg, #cfcfcf, #e8e8e8);
        }
        .wm-bad-photo-icon {
          font-size: 22px;
          line-height: 1;
        }
        .wm-bad-hero p { font-size: 11px; margin: 0 0 8px; }
        .wm-bad-btn {
          display: inline-block; background: #ff0; border: 2px outset #999;
          padding: 4px 12px; font-size: 11px; font-weight: 700;
        }
        .wm-bad-footer { margin-top: 14px; font-size: 9px; text-align: center; color: #999; }
        .wm-good-site { padding: 14px; min-height: 232px; }
        .wm-good-nav {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; margin-bottom: 14px;
        }
        .wm-good-nav strong { margin-right: auto; font-size: 11px; }
        .wm-good-hero { padding: 16px; border-radius: 10px; margin-bottom: 12px; }
        .wm-good-tag { font-size: 9px; letter-spacing: 1px; margin-bottom: 8px; }
        .wm-good-hero h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; line-height: 1.35; margin: 0 0 12px;
        }
        .wm-good-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .wm-good-cta {
          font-size: 10px; font-weight: 700;
          padding: 6px 12px; border-radius: 100px;
        }
        .wm-good-secondary {
          font-size: 10px; padding: 6px 10px;
          border: 1px solid; border-radius: 100px;
        }
        .wm-good-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .wm-good-cards div {
          font-size: 9px; text-align: center; padding: 10px 4px; border-radius: 8px;
        }
        @media (max-width: 640px) {
          .wm-divider { flex: 1 1 100%; text-align: center; transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
