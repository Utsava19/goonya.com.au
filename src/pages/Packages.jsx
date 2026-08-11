import { useEffect, useRef, useState } from "react";
import "./Packages.css";

function Runner({ progress }) {
  const runnerRef = useRef(null);

  useEffect(() => {
    if (!runnerRef.current) return;

    const maxDistance =
      document.documentElement.scrollHeight - window.innerHeight;

    const distance = Math.max(0, maxDistance * progress);

    runnerRef.current.style.setProperty("--runner-progress", progress);
    runnerRef.current.style.setProperty(
      "--runner-distance",
      `${distance}px`
    );
  }, [progress]);

  return (
    <div className="runner-track" aria-hidden="true">
      <div ref={runnerRef} className="runner">
        <svg
          viewBox="0 0 80 100"
          role="presentation"
          className="runner-svg"
        >
          <circle cx="42" cy="14" r="9" />

          <path
            d="M39 25 L34 48 L49 62"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M35 34 L17 47"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M38 35 L58 43"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M48 61 L29 82"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M48 61 L68 77"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>

        <span className="runner-speed-line speed-one" />
        <span className="runner-speed-line speed-two" />
        <span className="runner-speed-line speed-three" />
      </div>
    </div>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="score-row">
      <div className="score-row-top">
        <span>{label}</span>
        <strong>{score}</strong>
      </div>

      <div className="score-bar">
        <span style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function Packages() {
  const [form, setForm] = useState({
    business: "",
    website: "",
    suburb: "",
    industry: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      document
        .getElementById("business-analysis")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="packages-page">
      <Runner progress={scrollProgress} />

      {/* HERO */}
      <section className="packages-hero">
        <div className="packages-grid-bg" />

        <div className="packages-container packages-hero-content">
          <div className="eyebrow">
            <span />
            GO ON YA / DIGITAL GROWTH
          </div>

          <h1>
            HOW'S YOUR BUSINESS
            <br />
            <span>REALLY DOING ONLINE?</span>
          </h1>

          <p className="hero-copy">
            Find out what's holding your business back, see where you're
            already winning, and get a clear path to move forward.
          </p>

          <a href="#business-check" className="primary-button">
            CHECK MY BUSINESS
            <span>→</span>
          </a>
        </div>

        <div className="hero-scroll">
          SCROLL TO GET MOVING
          <span>↓</span>
        </div>
      </section>

      {/* BUSINESS CHECK */}
      <section id="business-check" className="business-check section">
        <div className="packages-container">
          <div className="section-heading">
            <span className="section-number">01</span>

            <div>
              <div className="eyebrow">
                <span />
                BUSINESS CHECK
              </div>

              <h2>
                LET'S SEE
                <br />
                <em>WHERE YOU'RE AT.</em>
              </h2>

              <p>
                Give us a few details and we'll show you where your digital
                presence could be doing more.
              </p>
            </div>
          </div>

          <form className="business-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="business">BUSINESS NAME</label>
              <input
                id="business"
                name="business"
                value={form.business}
                onChange={handleChange}
                placeholder="Your business"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="website">WEBSITE</label>
              <input
                id="website"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="yourbusiness.com.au"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="suburb">SUBURB</label>
              <input
                id="suburb"
                name="suburb"
                value={form.suburb}
                onChange={handleChange}
                placeholder="Your suburb"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="industry">INDUSTRY</label>
              <input
                id="industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="What do you do?"
                required
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@business.com.au"
                required
              />
            </div>

            <button className="primary-button form-button" type="submit">
              CHECK MY BUSINESS
              <span>→</span>
            </button>
          </form>
        </div>
      </section>

      {/* ANALYSIS */}
      {submitted && (
        <section id="business-analysis" className="analysis section">
          <div className="packages-container">
            <div className="analysis-header">
              <div>
                <div className="eyebrow">
                  <span />
                  DIGITAL HEALTH CHECK
                </div>

                <h2>
                  YOUR DIGITAL
                  <br />
                  <em>SCORE.</em>
                </h2>
              </div>

              <div className="big-score">
                <span>72</span>
                <small>/100</small>
              </div>
            </div>

            <div className="analysis-message">
              <h3>
                You're moving.
                <br />
                <span>But there's room to GO ON YA.</span>
              </h3>

              <p>
                Your digital foundations are heading in the right direction,
                but there are opportunities to improve visibility, conversion
                and momentum.
              </p>
            </div>

            <div className="scores-grid">
              <ScoreBar label="WEBSITE" score={78} />
              <ScoreBar label="SEO" score={64} />
              <ScoreBar label="GOOGLE VISIBILITY" score={57} />
              <ScoreBar label="GOOGLE PROFILE" score={81} />
              <ScoreBar label="REVIEWS" score={74} />
              <ScoreBar label="CONTENT" score={62} />
              <ScoreBar label="CTA / CONVERSION" score={49} />
            </div>
          </div>
        </section>
      )}

      {/* WHAT'S HOLDING YOU BACK */}
      <section className="holding-back section">
        <div className="packages-container">
          <div className="section-heading">
            <span className="section-number">02</span>

            <div>
              <div className="eyebrow">
                <span />
                THE ROAD AHEAD
              </div>

              <h2>
                WHAT'S HOLDING
                <br />
                <em>YOU BACK?</em>
              </h2>
            </div>
          </div>

          <div className="problem-grid">
            <article className="problem-card">
              <span className="problem-number">01</span>

              <h3>YOU'RE HARD TO FIND.</h3>

              <p>
                Your local search presence could be stronger, meaning potential
                customers may be finding your competitors first.
              </p>

              <div className="problem-arrow">↗</div>
            </article>

            <article className="problem-card">
              <span className="problem-number">02</span>

              <h3>YOUR WEBSITE ISN'T CONVERTING ENOUGH.</h3>

              <p>
                People can find information about your business, but the path
                from visitor to customer could be much clearer.
              </p>

              <div className="problem-arrow">↗</div>
            </article>

            <article className="problem-card">
              <span className="problem-number">03</span>

              <h3>YOUR CONTENT COULD WORK HARDER.</h3>

              <p>
                There's an opportunity to build more authority, trust and
                visibility around what your business actually does best.
              </p>

              <div className="problem-arrow">↗</div>
            </article>
          </div>

          <div className="moving-message">
            <span>LET'S GET YOU</span>
            <strong>MOVING.</strong>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages-section section">
        <div className="packages-container">
          <div className="section-heading">
            <span className="section-number">03</span>

            <div>
              <div className="eyebrow">
                <span />
                CHOOSE YOUR SPEED
              </div>

              <h2>
                READY TO
                <br />
                <em>GO ON YA?</em>
              </h2>

              <p>
                No bloated retainers. No confusing digital jargon. Just clear
                packages designed to get your business moving.
              </p>
            </div>
          </div>

          <div className="package-grid">
            {/* BOOST */}
            <article className="package-card">
              <div className="package-top">
                <span className="package-index">01</span>
                <span className="package-label">GET MOVING</span>
              </div>

              <h3>BOOST</h3>

              <p className="package-description">
                Get your digital foundations moving in the right direction.
              </p>

              <div className="package-price">
                <small>$</small>
                399
              </div>

              <span className="price-note">ONE-OFF</span>

              <ul>
                <li>Digital presence review</li>
                <li>Website optimisation recommendations</li>
                <li>Google Business Profile review</li>
                <li>Local SEO opportunities</li>
                <li>Action plan</li>
              </ul>

              <a href="#contact" className="package-button">
                BOOST MY BUSINESS →
              </a>
            </article>

            {/* MOMENTUM */}
            <article className="package-card featured">
              <div className="popular-badge">MOST POPULAR</div>

              <div className="package-top">
                <span className="package-index">02</span>
                <span className="package-label">BUILD MOMENTUM</span>
              </div>

              <h3>MOMENTUM</h3>

              <p className="package-description">
                Build a stronger digital presence and start turning visibility
                into real enquiries.
              </p>

              <div className="package-price">
                <small>$</small>
                899
              </div>

              <div className="special-price">
                <strong>$499</strong>
                <span>ONE-OFF OFFER</span>
              </div>

              <ul>
                <li>Everything in BOOST</li>
                <li>Website conversion improvements</li>
                <li>Local SEO setup</li>
                <li>Google Business optimisation</li>
                <li>Content recommendations</li>
                <li>Conversion-focused CTA strategy</li>
              </ul>

              <a href="#contact" className="package-button">
                BUILD MOMENTUM →
              </a>
            </article>

            {/* ACCELERATE */}
            <article className="package-card">
              <div className="package-top">
                <span className="package-index">03</span>
                <span className="package-label">FULL SPEED</span>
              </div>

              <h3>ACCELERATE</h3>

              <p className="package-description">
                A comprehensive digital growth push for businesses ready to
                seriously level up.
              </p>

              <div className="package-price">
                <small>$</small>
                1,699
              </div>

              <span className="price-note">ONE-OFF</span>

              <ul>
                <li>Everything in MOMENTUM</li>
                <li>Advanced SEO strategy</li>
                <li>Full website conversion review</li>
                <li>Content strategy</li>
                <li>Google visibility strategy</li>
                <li>Growth roadmap</li>
              </ul>

              <a href="#contact" className="package-button">
                ACCELERATE →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="packages-final section">
        <div className="packages-final-glow" />

        <div className="packages-container final-content">
          <div className="eyebrow">
            <span />
            YOUR NEXT MOVE
          </div>

          <h2>
            YOUR BUSINESS
            <br />
            IS ALREADY <em>MOVING.</em>
          </h2>

          <p>Let's get it moving faster.</p>

          <a href="/contact" className="primary-button">
            GO ON YA
            <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
