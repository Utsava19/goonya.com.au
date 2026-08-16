import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CASE_STUDIES, FEATURED_CASE } from "../data/caseStudies";
import Robot from "./Robot";
import { PACKAGES, PROCESS_STEPS, TESTIMONIALS } from "../data/siteContent";

const A = "#9b7cff";

const promiseItems = [
  { title: "One team", desc: "Website, marketing and automation under one roof — not five different freelancers." },
  { title: "One plan", desc: "A growth system built around enquiries and revenue, not random posts and pretty slides." },
  { title: "One invoice", desc: "Clear packages from $399/mo — without the big agency retainers." },
];

export function HomeGrowthSystem() {
  return (
    <section className="home-growth-system section-dark page-section">
      <div className="page-container home-growth-system-grid">
        <div className="home-growth-system-copy">
          <div className="eyebrow-dark" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 20, height: 1, background: A }} />
            THE GOONYA DIFFERENCE
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(32px,4.5vw,52px)",
            fontWeight: 700,
            letterSpacing: "-2px",
            color: "#fff",
            lineHeight: 1.12,
            marginBottom: 20,
          }}>
            Your digital growth system —<span style={{ color: A }}> not another pile of logins.</span>
          </h2>
          <p style={{ color: "#888", fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>
            One team, one plan, one invoice. We connect your website, marketing and automation so you stop juggling tools.
          </p>
          <div className="promise-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {promiseItems.map((item) => (
              <div key={item.title} style={{
                padding: "20px 22px",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
              }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, color: "#fff", marginBottom: 6 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-growth-system-visual">
          <Robot compact onDark />
        </div>
      </div>
      <style>{`
        .home-growth-system-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        .home-growth-system-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .home-growth-system-grid { grid-template-columns: 1fr !important; }
          .home-growth-system-visual { order: -1; }
        }
      `}</style>
    </section>
  );
}

function CaseStudyCard({ study, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="case-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${index * 0.08}s, transform .7s ease ${index * 0.08}s`,
      }}
    >
      <div className="case-card-image-wrap">
        <img src={study.cover} alt="" className="case-card-cover" loading="lazy" />
        <img src={study.clientPhoto} alt={study.quoteName} className="case-card-person" loading="lazy" />
      </div>
      <div className="case-card-body">
        <div className="case-card-meta">{study.industry} · {study.location}</div>
        <h3>{study.client}</h3>
        <p className="case-card-headline">{study.headline}</p>
        <div className="case-card-results">
          {study.results.slice(0, 2).map(({ label, value }) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="case-card-work">
          <div className="case-card-work-label">What we did</div>
          <ul>
            {study.solution.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <blockquote>"{study.quote}"</blockquote>
        <div className="case-card-author">{study.quoteName}, {study.quoteRole}</div>
        <Link to={`/our-work/${study.slug}`} className="case-card-link">Read full case study →</Link>
      </div>
      <style>{`
        .case-card {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(20,17,24,.06);
          box-shadow: 0 20px 60px rgba(20,17,24,.06);
        }
        .case-card-image-wrap { position: relative; min-height: 280px; }
        .case-card-cover {
          width: 100%; height: 100%; object-fit: cover; display: block; min-height: 280px;
        }
        .case-card-person {
          position: absolute; bottom: 18px; left: 18px;
          width: 72px; height: 72px; border-radius: 50%; object-fit: cover;
          border: 3px solid #fff; box-shadow: 0 8px 24px rgba(0,0,0,.15);
        }
        .case-card-body { padding: 32px 28px; }
        .case-card-meta {
          font-size: 10px; letter-spacing: 1.5px; color: ${A}; margin-bottom: 10px; text-transform: uppercase;
        }
        .case-card-body h3 {
          font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: #141118; margin: 0 0 8px;
        }
        .case-card-headline { color: #5c5868; font-size: 15px; line-height: 1.6; margin: 0 0 18px; }
        .case-card-results {
          display: flex; gap: 24px; margin-bottom: 18px;
        }
        .case-card-results strong {
          display: block; font-family: 'Space Grotesk', sans-serif; font-size: 22px; color: ${A};
        }
        .case-card-results span { font-size: 11px; color: #8a8499; }
        .case-card-work-label {
          font-size: 10px; letter-spacing: 1.5px; color: #8a8499; margin-bottom: 8px;
        }
        .case-card-work ul {
          list-style: none; padding: 0; margin: 0 0 16px;
        }
        .case-card-work li {
          font-size: 13px; color: #5c5868; padding: 5px 0; border-bottom: 1px solid rgba(20,17,24,.06);
        }
        .case-card-body blockquote {
          margin: 0 0 10px; font-size: 14px; line-height: 1.65; color: #141118; font-style: italic;
        }
        .case-card-author { font-size: 12px; color: #8a8499; margin-bottom: 16px; }
        .case-card-link { color: ${A}; font-weight: 600; font-size: 14px; text-decoration: none; }
        @media (max-width: 900px) {
          .case-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </article>
  );
}

export function CaseStudyShowcase() {
  const featured = CASE_STUDIES.filter((s) => s.featured).slice(0, 2);
  const cards = featured.length >= 2 ? featured : CASE_STUDIES.slice(0, 2);

  return (
    <section className="section-fade-to-surface-after-stats page-section">
      <div className="page-container">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
          <div className="eyebrow-light" style={{ marginBottom: 12 }}>REAL CLIENT RESULTS</div>
          <h2 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(32px,4vw,48px)",
            fontWeight: 700,
            letterSpacing: "-2px",
            color: "#141118",
          }}>
            Proof from businesses <span style={{ color: A }}>like yours.</span>
          </h2>
          <p style={{ color: "#5c5868", fontSize: 16, marginTop: 12, lineHeight: 1.7 }}>
            Real clients, real photos, real outcomes — not stock emojis.
          </p>
        </div>
        <div style={{ display: "grid", gap: 28 }}>
          {cards.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link to="/our-work" style={{
            display: "inline-flex", padding: "14px 28px", background: "#141118", color: "#fff",
            borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: "none",
          }}>
            See all case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function GoonyaPromise() {
  return <HomeGrowthSystem />;
}

export function CaseStudyHighlight() {
  return <CaseStudyShowcase />;
}

export function PackagePreview() {
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="section-surface-alt page-section">
      <div className="page-container">
        <div style={{ marginBottom: "48px" }}>
          <div className="eyebrow-light" style={{ marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "20px", height: "1px", background: A }} />PACKAGES
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,64px)",
            fontWeight: 700, letterSpacing: "-2.5px", color: "#141118" }}>
            Clear pricing.<span style={{ color: A }}> No guessing.</span>
          </h2>
          <p style={{ color: "#5c5868", fontSize: "16px", marginTop: "12px" }}>
            Don't contact us just to find out if we're $300 or $3,000. See the packages upfront.
          </p>
        </div>
        <div ref={gridRef} className={`pkg-preview-grid ${visible ? "pkg-preview-visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {PACKAGES.map((pkg, index) => (
            <article key={pkg.id} className={`pkg-preview-card ${pkg.popular ? "pkg-preview-popular" : ""}`} style={{
              padding: "32px", borderRadius: "16px", background: "#fff",
              border: pkg.popular ? `1px solid ${A}` : "1px solid rgba(20,17,24,.08)",
              position: "relative",
              boxShadow: "0 12px 40px rgba(20,17,24,.04)",
              transitionDelay: `${index * 0.1}s`,
            }}>
              {pkg.popular && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: A, color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                  padding: "4px 14px", borderRadius: "20px" }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "22px", color: "#141118",
                marginBottom: "4px" }}>{pkg.name}</h3>
              {pkg.subtitle && (
                <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: A, fontWeight: 700,
                  marginBottom: "10px", textTransform: "uppercase" }}>
                  {pkg.subtitle}
                </div>
              )}
              <div style={{ fontSize: "32px", fontWeight: 700, color: "#141118", marginBottom: "4px" }}>
                {pkg.price}<small style={{ fontSize: "14px", color: "#8a8499" }}>{pkg.period}</small>
              </div>
              {pkg.bonus && (
                <div style={{ fontSize: "12px", color: "#16a34a", marginBottom: "12px", lineHeight: 1.5 }}>
                  {pkg.bonus}
                </div>
              )}
              <p style={{ color: "#5c5868", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{pkg.tagline}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {(pkg.highlights ?? pkg.features).slice(0, 5).map((f) => (
                  <li key={f} style={{ color: "#5c5868", fontSize: "13px", padding: "6px 0",
                    borderBottom: "1px solid rgba(20,17,24,.06)" }}>+ {f}</li>
                ))}
              </ul>
              <Link to="/packages#plans" style={{ color: A, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                See full details →
              </Link>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link to="/packages#plans" style={{ display: "inline-flex", padding: "16px 32px", background: "#141118",
            color: "white", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            View All Packages →
          </Link>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .pkg-preview-grid{ grid-template-columns:1fr !important; } }
        .pkg-preview-card {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity .65s ease, transform .65s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .pkg-preview-visible .pkg-preview-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .pkg-preview-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 24px 60px rgba(20,17,24,.1);
        }
        .pkg-preview-popular {
          animation: pkgPopularGlow 3s ease-in-out infinite;
        }
        @keyframes pkgPopularGlow {
          0%, 100% { box-shadow: 0 12px 40px rgba(155,124,255,.12); }
          50% { box-shadow: 0 20px 56px rgba(155,124,255,.22); }
        }
      `}</style>
    </div>
  );
}

export function SeoSpotlight() {
  const seoItems = [
    "Google Business Profile setup & optimisation",
    "Local SEO for your suburb and service area",
    "On-page SEO — titles, meta, headings & speed",
    "Schema markup so Google understands your business",
    "Monthly ranking and enquiry tracking",
  ];
  const featured = FEATURED_CASE;

  return (
    <section className="section-fade-to-dark page-section">
      <div className="page-container">
        <div className="seo-spotlight-grid">
          <div>
            <div className="eyebrow-dark" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: A }} />
              SEO & LOCAL VISIBILITY
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              Get found on Google<span style={{ color: A }}> before your competitors do.</span>
            </h2>
            <p style={{ color: "#888", fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>
              Most small businesses lose enquiries because they are invisible locally. We fix your Google presence,
              website SEO and tracking so the right people find you first.
            </p>
            <ul className="seo-spotlight-list">
              {seoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/services#seo-local" style={{
              display: "inline-flex", marginTop: 28, padding: "14px 28px",
              background: "rgba(155,124,255,.12)", border: "1px solid rgba(155,124,255,.35)",
              borderRadius: 100, color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}>
              See SEO services →
            </Link>
          </div>

          <div className="seo-spotlight-visual">
            <div className="seo-search-mock">
              <div className="seo-search-bar">social media manager grampians</div>
              {[
                { rank: 1, name: "Goonya — marketing, SEO & social media", highlight: true, meta: "★★★★★ · Horsham · Stawell · Free strategy call" },
                { rank: 2, name: "Competitor A", highlight: false, meta: "★★★ · Closed · No website" },
                { rank: 3, name: "Competitor B", highlight: false, meta: "★★★★ · Slow site · No booking" },
              ].map((row) => (
                <div key={row.rank} className={`seo-result-row ${row.highlight ? "seo-result-highlight" : ""}`}>
                  <span className="seo-result-rank">{row.rank}</span>
                  <div>
                    <div className="seo-result-name">{row.name}</div>
                    <div className="seo-result-meta">{row.meta}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="seo-testimonial-card">
              <div style={{ color: A, fontSize: 14, marginBottom: 10 }}>{"★".repeat(featured.stars)}</div>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>"{featured.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={featured.clientPhoto} alt={featured.quoteName} width={48} height={48}
                  style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(155,124,255,.35)" }} />
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#fff", fontWeight: 600, fontSize: 14 }}>
                    {featured.quoteName}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>{featured.quoteRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .seo-spotlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .seo-spotlight-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .seo-spotlight-list li {
          position: relative;
          padding: 10px 0 10px 22px;
          color: #aaa;
          font-size: 14px;
          line-height: 1.55;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .seo-spotlight-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 17px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${A};
          box-shadow: 0 0 8px rgba(155,124,255,.5);
        }
        .seo-spotlight-visual {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .seo-search-mock {
          background: #08060f;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 20px;
        }
        .seo-search-bar {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 100px;
          padding: 12px 18px;
          color: #888;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .seo-result-row {
          display: flex;
          gap: 12px;
          padding: 14px 12px;
          border-radius: 10px;
          margin-bottom: 8px;
          border: 1px solid transparent;
        }
        .seo-result-highlight {
          background: rgba(155,124,255,.1);
          border-color: rgba(155,124,255,.35);
          animation: seoRankPulse 2.5s ease-in-out infinite;
        }
        @keyframes seoRankPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(155,124,255,0); }
          50% { box-shadow: 0 0 24px rgba(155,124,255,.15); }
        }
        .seo-result-rank {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          color: #555;
          min-width: 20px;
        }
        .seo-result-highlight .seo-result-rank { color: ${A}; }
        .seo-result-name { color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .seo-result-meta { color: #666; font-size: 12px; }
        .seo-testimonial-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 28px;
        }
        @media (max-width: 900px) {
          .seo-spotlight-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const CONTENT_BG_IMAGE = "/brand/gbp/goonya-inside-office-01.jpg";

export function ContentCreationSpotlight() {
  const sectionRef = useRef(null);

  const platforms = [
    { name: "Instagram", color: "#e1306c", items: ["Reels & Stories", "Feed posts", "Carousels"] },
    { name: "Facebook", color: "#1877f2", items: ["Page posts", "Ad creatives", "Cover videos"] },
    { name: "TikTok", color: "#69c9d0", items: ["Short-form video", "Trend edits", "Hooks & captions"] },
    { name: "Animation", color: A, items: ["Promo explainers", "Logo motion", "Product demos"] },
  ];

  return (
    <section ref={sectionRef} className="content-creation-spotlight" aria-label="Content creation services">
      <img
        className="content-creation-video"
        src={CONTENT_BG_IMAGE}
        alt="Goonya social media and digital marketing team in Noble Park, Melbourne"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
      />
      <div className="content-creation-overlay" aria-hidden="true" />
      <div className="page-container content-creation-inner">
        <div className="content-creation-copy">
          <div className="content-creation-eyebrow">CONTENT CREATION</div>
          <h2>
            Scroll-stopping content<br />
            <span>for your brand.</span>
          </h2>
          <p>
            Facebook, Instagram, TikTok and animated video — we plan, film, edit and deliver content
            that looks professional and actually gets engagement. Not generic stock posts. Yours.
          </p>
          <div className="content-creation-tags">
            {["Reels & Stories", "Animated promos", "Brand graphics", "Video editing", "Ad creatives"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link to="/services#content-creation" className="content-creation-cta">
            See content creation services →
          </Link>
        </div>
        <div className="content-creation-platforms">
          {platforms.map(({ name, color, items }) => (
            <div key={name} className="content-platform-card" style={{ borderColor: `${color}44` }}>
              <div className="content-platform-head">
                <span className="content-platform-dot" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                <span>{name}</span>
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .content-creation-spotlight {
          position: relative;
          min-height: min(88vh, 760px);
          display: flex;
          align-items: center;
          overflow: hidden;
          margin: 0 0 130px;
        }
        .content-creation-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .content-creation-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(105deg, rgba(5,4,16,.94) 0%, rgba(5,4,16,.82) 42%, rgba(5,4,16,.55) 100%),
            linear-gradient(180deg, rgba(5,4,16,.2) 0%, rgba(5,4,16,.75) 100%);
        }
        .content-creation-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 40px;
          align-items: center;
          padding: 100px 0;
        }
        .content-creation-eyebrow {
          font-size: 11px;
          letter-spacing: 2.5px;
          color: #888;
          margin-bottom: 18px;
        }
        .content-creation-copy h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(34px, 4.5vw, 58px);
          font-weight: 700;
          letter-spacing: -2px;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 18px;
        }
        .content-creation-copy h2 span { color: ${A}; }
        .content-creation-copy p {
          color: #bbb;
          font-size: 16px;
          line-height: 1.75;
          max-width: 520px;
          margin: 0 0 24px;
        }
        .content-creation-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }
        .content-creation-tags span {
          padding: 7px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06);
          font-size: 12px;
          color: #ddd;
          backdrop-filter: blur(8px);
        }
        .content-creation-cta {
          display: inline-flex;
          padding: 14px 28px;
          background: #fff;
          color: #141118;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          box-shadow: 0 0 40px rgba(155,124,255,.25);
        }
        .content-creation-platforms {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .content-platform-card {
          padding: 18px 18px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(8,6,15,.72);
          backdrop-filter: blur(12px);
          animation: contentCardFloat 4s ease-in-out infinite;
        }
        .content-platform-card:nth-child(2) { animation-delay: .5s; }
        .content-platform-card:nth-child(3) { animation-delay: 1s; }
        .content-platform-card:nth-child(4) { animation-delay: 1.5s; }
        @keyframes contentCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .content-platform-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .content-platform-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .content-platform-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .content-platform-card li {
          font-size: 12px;
          color: #999;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        @media (max-width: 900px) {
          .content-creation-inner {
            grid-template-columns: 1fr !important;
            padding: 80px 0;
          }
          .content-creation-platforms { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export function HowItWorks() {
  return (
    <div className="section-surface page-section">
      <div className="page-container">
        <div style={{ marginBottom: "48px" }}>
          <div className="eyebrow-light" style={{ marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "20px", height: "1px", background: A }} />HOW GOONYA WORKS
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,64px)",
            fontWeight: 700, letterSpacing: "-2.5px", color: "#141118" }}>
            What happens<span style={{ color: A }}> after you contact us?</span>
          </h2>
        </div>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.step} style={{
              position: "relative", padding: 24, background: "#fff", borderRadius: 14,
              border: "1px solid rgba(20,17,24,.06)",
            }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "rgba(155,124,255,.35)", marginBottom: "8px" }}>
                {step.step}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#141118", fontSize: "16px",
                marginBottom: "8px" }}>{step.title}</h3>
              <p style={{ color: "#5c5868", fontSize: "13px", lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .process-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:520px){ .process-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}

export function RoiCalculator() {
  return <RoiCalcInner />;
}

function RoiCalcInner() {
  const [customerValue, setCustomerValue] = useState(500);
  const [currentCustomers, setCurrentCustomers] = useState(10);
  const [additional, setAdditional] = useState(5);
  const revenue = customerValue * additional;

  return (
    <div className="section-dark page-section">
      <div className="page-container">
        <div style={{ marginBottom: "40px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
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
          </div>
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
    <div className="section-dark page-section">
      <div className="page-container">
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,48px)",
          fontWeight: 700, letterSpacing: "-2px", color: "#fff", marginBottom: "40px", textAlign: "center" }}>
          The <span style={{ color: A }}>Goonya Growth System</span>
        </h2>
        <div className="system-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
          {[
            { phase: "GET FOUND", items: ["Google", "SEO", "Social Media", "Website"] },
            { phase: "GET LEADS", items: ["Landing Pages", "Ads", "Enquiry Forms", "Bookings"] },
            { phase: "CONVERT", items: ["CRM", "Follow-ups", "Reviews", "Email / SMS"] },
            { phase: "SAVE TIME", items: ["Automation", "Integrations", "Reporting", "Workflows"] },
          ].map((block) => (
            <div key={block.phase} style={{
              padding: "28px 20px", background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)", borderRadius: "12px", textAlign: "center",
            }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: A, marginBottom: "12px" }}>{block.phase}</div>
              {block.items.map((item) => (
                <div key={item} style={{ color: "#888", fontSize: "13px", padding: "4px 0" }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ .system-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

export function TestimonialsWithPhotos() {
  return (
    <section className="section-surface page-section">
      <div className="page-container">
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,3.5vw,50px)",
          fontWeight: 700, letterSpacing: "-2px", color: "#141118", textAlign: "center", marginBottom: "52px" }}>
          Results that <span style={{ color: A }}>speak for themselves.</span>
        </h2>
        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{
              padding: "32px 28px", background: "#fff", borderRadius: 16,
              border: "1px solid rgba(20,17,24,.06)", boxShadow: "0 12px 40px rgba(20,17,24,.04)",
            }}>
              <div style={{ color: A, fontSize: "14px", marginBottom: "12px" }}>
                {"★".repeat(t.stars)}
              </div>
              <p style={{ color: "#5c5868", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src={t.photo} alt={t.name} width={52} height={52}
                  style={{ borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(155,124,255,.3)` }} />
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "#141118",
                    fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#8a8499" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .testi-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

const LOCAL_AREAS = [
  {
    region: "Noble Park & South-East Melbourne",
    terms: ["SEO Noble Park", "digital marketing Noble Park", "social media manager", "Google Ads & advertising"],
    suburbs: ["Noble Park", "Dandenong", "Springvale", "Keysborough", "Casey", "Cranbourne"],
  },
  {
    region: "Greater Melbourne",
    terms: ["local SEO", "website design", "Meta advertising", "content creation"],
    suburbs: ["Melbourne", "Monash", "Bayside", "Eastern suburbs"],
  },
  {
    region: "Grampians & Western Victoria",
    terms: ["digital marketing Grampians", "SEO Horsham", "social media management", "online advertising"],
    suburbs: ["Horsham", "Stawell", "Ararat", "Hamilton", "Ballarat", "Warrnambool"],
  },
];

export function LocalServiceAreas() {
  return (
    <section className="section-surface page-section local-service-areas" aria-label="Areas we serve">
      <div className="page-container">
        <div className="local-areas-head">
          <div className="eyebrow-light">WHERE WE HELP BUSINESSES GROW</div>
          <h2>
            SEO, digital marketing &amp; social media across{" "}
            <span>Noble Park, Melbourne &amp; the Grampians.</span>
          </h2>
          <p>
            Goonya helps small businesses get found when people search for SEO, digital marketing,
            social media managers and advertising in Noble Park, across Melbourne and throughout
            the Grampians region — without the big-agency price tag.
          </p>
        </div>
        <div className="local-areas-grid">
          {LOCAL_AREAS.map(({ region, terms, suburbs }) => (
            <article key={region} className="local-area-card">
              <h3>{region}</h3>
              <p className="local-area-terms">{terms.join(" · ")}</p>
              <p className="local-area-suburbs">{suburbs.join(" · ")}</p>
            </article>
          ))}
        </div>
        <p className="local-areas-foot">
          Based in Noble Park, VIC. Remote-friendly for businesses across Victoria.
          {" "}
          <Link to="/digital-marketing-grampians">Grampians digital marketing →</Link>
          {" · "}
          <Link to="/seo-noble-park">SEO Noble Park →</Link>
          {" · "}
          <Link to="/contact">Book a free strategy call →</Link>
        </p>
      </div>
      <style>{`
        .local-areas-head { max-width: 760px; margin: 0 auto 40px; text-align: center; }
        .local-areas-head h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 3.5vw, 48px);
          font-weight: 700;
          letter-spacing: -2px;
          color: #141118;
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .local-areas-head h2 span { color: ${A}; }
        .local-areas-head p { color: #5c5868; font-size: 16px; line-height: 1.75; margin: 0; }
        .local-areas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .local-area-card {
          background: #fff;
          border: 1px solid rgba(20,17,24,.06);
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 12px 40px rgba(20,17,24,.04);
        }
        .local-area-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          color: #141118;
          margin: 0 0 12px;
        }
        .local-area-terms {
          color: ${A};
          font-size: 13px;
          font-weight: 600;
          line-height: 1.6;
          margin: 0 0 10px;
        }
        .local-area-suburbs { color: #8a8499; font-size: 13px; line-height: 1.6; margin: 0; }
        .local-areas-foot {
          text-align: center;
          margin: 32px 0 0;
          color: #5c5868;
          font-size: 14px;
        }
        .local-areas-foot a { color: ${A}; font-weight: 600; text-decoration: none; }
        @media (max-width: 900px) {
          .local-areas-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
