import { Link } from "react-router-dom";

const A = "#9b7cff";

export default function BeforeAfter({ study, linkToDetail = true }) {
  const before = study.beforePoints ?? [];
  const after = study.afterPoints ?? [];

  return (
    <div className="before-after">
      <div className="before-after-card before-side">
        <span className="ba-label">Before</span>
        <div className="ba-photo-wrap ba-photo-before">
          {study.clientPhoto ? (
            <>
              <img src={study.clientPhoto} alt={`${study.quoteName} before`} className="ba-photo ba-photo-img" />
            </>
          ) : (
            <span className="ba-photo-fallback">{study.client?.[0] ?? "?"}</span>
          )}
        </div>
        <ul className="ba-list">
          {before.map((item) => (
            <li key={item}>✕ {item}</li>
          ))}
        </ul>
      </div>

      <div className="ba-arrow" aria-hidden="true">→</div>

      <div className="before-after-card after-side">
        <span className="ba-label ba-label-after">After Goonya</span>
        <div className="ba-photo-wrap ba-photo-after">
          {study.clientPhoto ? (
            <img src={study.clientPhoto} alt={study.quoteName} className="ba-photo" />
          ) : (
            <span className="ba-photo-fallback">{study.client?.[0] ?? "?"}</span>
          )}
        </div>
        <ul className="ba-list ba-list-after">
          {after.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>

      {linkToDetail && study.slug && (
        <div className="ba-footer">
          <p className="ba-client">
            <strong>{study.client}</strong> · {study.industry}
          </p>
          <Link to={`/our-work/${study.slug}`} className="ba-link">
            Read full case study →
          </Link>
        </div>
      )}

      <style>{`
        .before-after {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          justify-content: center;
          gap: 24px;
          background: #fff;
          border-radius: 24px;
          padding: 40px 32px 32px;
          box-shadow: 0 24px 80px rgba(0,0,0,.08);
        }
        .before-after-card {
          flex: 1 1 240px;
          max-width: 320px;
          text-align: center;
          padding: 8px;
        }
        .ba-label {
          display: block;
          font-size: 11px;
          letter-spacing: 2px;
          color: #999;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .ba-label-after { color: ${A}; }
        .ba-photo-wrap {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .ba-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ba-photo-before {
          border: 3px solid #bbb;
        }
        .ba-photo-before .ba-photo-img {
          filter: grayscale(1) contrast(0.9) brightness(0.78) saturate(0.6);
          transform: scale(1.08);
        }
        .ba-photo-after .ba-photo {
          filter: none;
        }
        .ba-photo-after {
          border: 3px solid ${A};
          box-shadow: 0 0 32px rgba(155,124,255,.25);
        }
        .ba-photo-fallback {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #888;
        }
        .ba-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        .ba-list li {
          font-size: 14px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          color: #666;
          line-height: 1.45;
        }
        .ba-list-after li { color: #333; }
        .ba-arrow {
          flex: 0 0 auto;
          align-self: center;
          font-size: 28px;
          font-weight: 700;
          color: ${A};
        }
        .ba-footer {
          flex: 1 1 100%;
          text-align: center;
          margin-top: 8px;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }
        .ba-client {
          color: #888;
          font-size: 14px;
          margin: 0 0 12px;
        }
        .ba-link {
          color: ${A};
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
        }
        @media (max-width: 640px) {
          .ba-arrow {
            flex: 1 1 100%;
            transform: rotate(90deg);
            text-align: center;
          }
          .before-after-card { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
