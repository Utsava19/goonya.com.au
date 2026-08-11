import { useEffect, useRef, useState } from "react";
import "./GrowthPlans.css";

const plans = [
  {
    name: "KICKSTART",
    price: "$499",
    period: "one-off",
    description: "Fix the digital foundation and make sure your business looks credible, findable and ready for growth.",
    features: [
      "Website audit",
      "Google Business Profile optimisation",
      "Local SEO foundations",
      "Website conversion recommendations",
      "Google Search optimisation",
      "Analytics & tracking setup",
    ],
  },
  {
    name: "GROW",
    price: "$899",
    period: "/ month",
    popular: true,
    description: "Build a consistent system that gets you found, builds trust and generates more enquiries.",
    features: [
      "Website strategy & optimisation",
      "SEO",
      "Google Business Profile",
      "Google Search optimisation",
      "Facebook & Instagram",
      "Short-form content",
      "Meta Ads",
      "Lead generation",
      "Retargeting",
      "Analytics & monthly reporting",
    ],
  },
  {
    name: "SCALE",
    price: "$1,699",
    period: "/ month",
    description: "Turn your digital presence into a serious growth engine with marketing, content, advertising and automation working together.",
    features: [
      "Website strategy & development",
      "Advanced SEO",
      "Google Business Profile",
      "Google Ads",
      "Meta Ads",
      "Content strategy",
      "Short-form video",
      "Lead generation",
      "CRM & automation",
      "Email / SMS follow-up",
      "Retargeting",
      "Advanced reporting",
    ],
  },
];

const buildOptions = [
  {
    category: "WEBSITE",
    items: ["Website audit", "Landing page", "Website rebuild", "New website"],
  },
  {
    category: "GET FOUND",
    items: ["Local SEO", "Google Business Profile", "Google Search optimisation", "Technical SEO"],
  },
  {
    category: "SOCIAL",
    items: ["Instagram", "Facebook", "TikTok", "Reels"],
  },
  {
    category: "ADS",
    items: ["Meta Ads", "Google Ads", "Retargeting"],
  },
  {
    category: "AUTOMATION",
    items: ["Lead capture", "CRM", "Email follow-up", "SMS follow-up"],
  },
];

function Runner() {
  const runnerRef = useRef(null);
  const lastScroll = useRef(window.scrollY);
  const frame = useRef(null);

  useEffect(() => {
    const updateRunner = () => {
      const runner = runnerRef.current;
      if (!runner) return;

      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

      const direction = scrollTop >= lastScroll.current ? 1 : -1;
      lastScroll.current = scrollTop;

      /*
        Corner-to-corner movement:

        0%   = top-left
        25%  = upper-right
        50%  = centre-left
        75%  = lower-right
        100% = bottom-left/right depending on wave

        The sine wave creates the large sweeping movement.
      */

      const x =
        8 +
        progress * 84 +
        Math.sin(progress * Math.PI * 4) * 8;

      const y =
        10 +
        progress * 72 +
        Math.sin(progress * Math.PI * 6) * 5;

      const rotation =
        Math.sin(progress * Math.PI * 4) * 8;

      const scale =
        0.9 +
        progress * 0.35;

      runner.style.transform = `
        translate3d(${x}vw, ${y}vh, 0)
        rotate(${rotation}deg)
        scale(${scale})
        scaleX(${direction})
      `;

      /*
        Faster movement as the user progresses
        through the page.
      */
      const speed =
        1.1 +
        progress * 1.7;

      runner.style.setProperty("--runner-speed", `${speed}s`);

      frame.current = requestAnimationFrame(updateRunner);
    };

    frame.current = requestAnimationFrame(updateRunner);

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div className="runner-layer" aria-hidden="true">
      <div ref={runnerRef} className="runner">
        <div className="runner-glow" />
        <img
          src="/images/runner.png"
          alt=""
          draggable="false"
        />
      </div>
    </div>
  );
}

function GrowthScore() {
  const [form, setForm] = useState({
    business: "",
    website: "",
    suburb: "",
    industry: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="score-section section-shell">
      <div className="eyebrow">FREE BUSINESS CHECK</div>

      <h2>
        How strong is your
        <span> online presence?</span>
      </h2>

      <p className="section-intro">
        Give us a few details and we'll show you where your
        digital presence could be working harder.
      </p>

      {!submitted ? (
        <form className="score-form" onSubmit={handleSubmit}>
          <input
            name="business"
            placeholder="BUSINESS NAME"
            value={form.business}
            onChange={updateField}
            required
          />

          <input
            name="website"
            placeholder="WEBSITE"
            value={form.website}
            onChange={updateField}
          />

          <input
            name="suburb"
            placeholder="SUBURB"
            value={form.suburb}
            onChange={updateField}
          />

          <input
            name="industry"
            placeholder="INDUSTRY"
            value={form.industry}
            onChange={updateField}
          />

          <button type="submit" className="primary-button">
            CHECK MY BUSINESS <span>→</span>
          </button>
        </form>
      ) : (
        <div className="score-preview">
          <div className="score-number">62</div>

          <div>
            <div className="score-label">YOUR GOONYA GROWTH SCORE</div>
            <h3>There's room to GO ON YA.</h3>
            <p>
              This is where your real analysis will eventually
              connect to the backend audit system.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function GrowthPlans() {
  const [openPlan, setOpenPlan] = useState(1);
  const [selected, setSelected] = useState([]);

  const toggleSelection = (item) => {
    setSelected((current) =>
      current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item]
    );
  };

  const customPrice = 399 + selected.length * 99;

  return (
    <div className="growth-page">
      <Runner />

      <section className="growth-hero section-shell">
        <div className="eyebrow">GOONYA GROWTH PLANS</div>

        <h1>
          Your business deserves
          <br />
          <span>more than random marketing.</span>
        </h1>

        <p className="hero-copy">
          Build a digital system that gets you found,
          builds trust and generates enquiries.
        </p>

        <div className="hero-services">
          <span>WEBSITE</span>
          <span>SEO</span>
          <span>SOCIAL</span>
          <span>ADS</span>
          <span>AUTOMATION</span>
        </div>

        <a href="#plans" className="primary-button hero-button">
          FIND MY PLAN <span>→</span>
        </a>
      </section>

      <section className="problem-section section-shell">
        <div className="eyebrow">THE PROBLEM</div>

        <h2>
          Your customers are already looking.
          <span> Can they find you?</span>
        </h2>

        <div className="problem-grid">
          <article>
            <div className="problem-number">01</div>
            <h3>CAN'T FIND YOU</h3>
            <p>
              Weak search visibility means potential customers
              can discover your competitors before they discover you.
            </p>
          </article>

          <article>
            <div className="problem-number">02</div>
            <h3>DON'T TRUST YOU</h3>
            <p>
              An outdated website, weak social presence or lack
              of proof can make a customer keep looking.
            </p>
          </article>

          <article>
            <div className="problem-number">03</div>
            <h3>DON'T CONVERT</h3>
            <p>
              Getting traffic is only half the job. Your digital
              presence needs to turn attention into enquiries.
            </p>
          </article>
        </div>

        <div className="solution-line">
          <span>GOONYA FIXES ALL THREE.</span>
        </div>

        <div className="solution-grid">
          <strong>GET FOUND</strong>
          <strong>GET TRUSTED</strong>
          <strong>GET CHOSEN</strong>
        </div>
      </section>

      <section id="plans" className="plans-section section-shell">
        <div className="eyebrow">CHOOSE YOUR LEVEL</div>

        <h2>
          Where does your
          <span> business need to go?</span>
        </h2>

        <div className="plans-grid">
          {plans.map((plan, index) => {
            const isOpen = openPlan === index;

            return (
              <article
                className={`plan-card ${
                  plan.popular ? "featured" : ""
                } ${isOpen ? "expanded" : ""}`}
                key={plan.name}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>
                )}

                <div className="plan-top">
                  <div className="plan-index">
                    0{index + 1}
                  </div>

                  <h3>{plan.name}</h3>

                  <div className="plan-price">
                    {plan.price}
                    <small>{plan.period}</small>
                  </div>

                  <p>{plan.description}</p>
                </div>

                <button
                  className="plan-toggle"
                  onClick={() =>
                    setOpenPlan(isOpen ? -1 : index)
                  }
                >
                  {isOpen ? "HIDE DETAILS" : "SEE WHAT'S INCLUDED"}
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="feature-list">
                    {plan.features.map((feature) => (
                      <div key={feature}>
                        <span>+</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                <a href="/contact" className="plan-button">
                  {plan.name === "KICKSTART"
                    ? "START HERE"
                    : plan.name === "GROW"
                    ? "GROW MY BUSINESS"
                    : "SCALE MY BUSINESS"}
                  <span>→</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="build-section section-shell">
        <div className="eyebrow">BUILD YOUR GOONYA</div>

        <h2>
          Don't need the whole package?
          <span> Build exactly what you need.</span>
        </h2>

        <p className="section-intro">
          Pick the services that make sense for your business
          and build your own growth system.
        </p>

        <div className="builder">
          <div className="builder-options">
            {buildOptions.map((group) => (
              <div className="builder-group" key={group.category}>
                <h3>{group.category}</h3>

                <div className="builder-items">
                  {group.items.map((item) => {
                    const active = selected.includes(item);

                    return (
                      <button
                        key={item}
                        className={active ? "selected" : ""}
                        onClick={() => toggleSelection(item)}
                      >
                        <span>{active ? "✓" : "+"}</span>
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="builder-summary">
            <div className="summary-label">YOUR GOONYA PLAN</div>

            <div className="custom-price">
              ${customPrice.toLocaleString()}
              <small>/ month</small>
            </div>

            <p>
              {selected.length === 0
                ? "Start selecting services to build your plan."
                : `${selected.length} service${
                    selected.length === 1 ? "" : "s"
                  } selected.`}
            </p>

            <a href="/contact" className="primary-button">
              LET'S BUILD IT <span>→</span>
            </a>
          </aside>
        </div>
      </section>

      <GrowthScore />

      <section className="final-section section-shell">
        <div className="final-runner-line">
          <span />
        </div>

        <div className="eyebrow">READY?</div>

        <h2>
          Ready to
          <span> GO ON YA?</span>
        </h2>

        <p>
          Stop guessing what your marketing should be doing.
          Let's build something that actually moves your business.
        </p>

        <a href="/contact" className="primary-button">
          BUILD MY GROWTH PLAN <span>→</span>
        </a>
      </section>
    </div>
  );
}
