import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQ_ITEMS } from "../data/faq";
import { SITE } from "../data/siteMeta";

const A = "#9b7cff";
const LL = "rgba(20,17,24,.08)";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <div className="page-wrap section-dark-deep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero-dark" style={{ padding: "120px 0 60px" }}>
        <div className="page-container">
          <div className="eyebrow-dark" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 20, height: 1, background: A }} />
            FAQ
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(36px,5vw,56px)",
            color: "white",
            letterSpacing: "-2px",
            marginBottom: 16,
            maxWidth: 720,
          }}>
            Questions we get <span style={{ color: A }}>all the time.</span>
          </h1>
          <p style={{ color: "#666", fontSize: "16px", maxWidth: 560, lineHeight: 1.75 }}>
            Straight answers about packages, websites, marketing and how Goonya works —
            no jargon, no sales fluff.
          </p>
        </div>
      </section>

      <section className="section-fade-to-surface page-section">
        <div className="page-container" style={{ maxWidth: 820, paddingBottom: 80 }}>
          <div className="faq-list">
            {FAQ_ITEMS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <article key={question} className={`faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{question}</span>
                    <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className="faq-answer-wrap" aria-hidden={!isOpen}>
                    <p className="faq-answer">{answer}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="faq-cta">
            <h2 style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(24px,3vw,32px)",
              color: "#141118",
              letterSpacing: "-1px",
              marginBottom: 12,
            }}>
              Still have a question?
            </h2>
            <p style={{ color: "#5c5868", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Send us a message — we'll get back to you within 24 hours on business days.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" style={{
                display: "inline-flex", padding: "14px 28px", background: "#141118", color: "#fff",
                borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: "none",
              }}>
                Contact us →
              </Link>
              <a href={`mailto:${SITE.email}`} style={{
                display: "inline-flex", padding: "14px 28px", color: "#141118",
                borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: "none",
                border: `1px solid ${LL}`,
              }}>
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 64px;
        }
        .faq-item {
          background: #fff;
          border: 1px solid ${LL};
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(20,17,24,.04);
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .faq-item.is-open {
          border-color: rgba(155,124,255,.25);
          box-shadow: 0 12px 40px rgba(155,124,255,.08);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #141118;
          line-height: 1.35;
        }
        .faq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: ${A};
          background: rgba(155,124,255,.1);
          border: 1px solid rgba(155,124,255,.2);
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .3s ease;
        }
        .faq-item.is-open .faq-answer-wrap {
          grid-template-rows: 1fr;
        }
        .faq-answer {
          overflow: hidden;
          margin: 0;
          padding: 0 24px 22px;
          color: #5c5868;
          font-size: 15px;
          line-height: 1.75;
        }
        .faq-cta {
          padding: 36px;
          background: #fff;
          border: 1px solid ${LL};
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(20,17,24,.04);
        }
        @media (max-width: 600px) {
          .faq-question { font-size: 16px; padding: 18px 18px; }
          .faq-answer { padding: 0 18px 18px; }
          .faq-cta { padding: 28px 22px; }
        }
      `}</style>
    </div>
  );
}
