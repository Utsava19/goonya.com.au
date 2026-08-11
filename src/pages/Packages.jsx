import { useEffect, useRef, useState } from "react";
import "./Packages.css";

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

const RUNNER_WAYPOINTS = [
  { progress: 0,    x: 14, y: 76, pace: 0.95 },
  { progress: 0.08, x: 86, y: 70, pace: 0.95 },
  { progress: 0.18, x: 12, y: 62, pace: 0.9 },
  { progress: 0.28, x: 88, y: 56, pace: 0.75 },
  { progress: 0.36, x: 18, y: 50, pace: 0.95 },
  { progress: 0.44, x: 34, y: 48, pace: 0.95 },
  { progress: 0.5,  x: 52, y: 46, pace: 0.55 },
  { progress: 0.56, x: 72, y: 44, pace: 0.28 },
  { progress: 0.64, x: 88, y: 48, pace: 0.55 },
  { progress: 0.74, x: 16, y: 54, pace: 0.75 },
  { progress: 0.84, x: 84, y: 62, pace: 0.9 },
  { progress: 0.92, x: 22, y: 70, pace: 0.75 },
  { progress: 1,    x: 50, y: 82, pace: 0.28 },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function interpolateWaypoints(progress, waypoints) {
  const p = clamp(progress, 0, 1);
  let index = 0;

  while (index < waypoints.length - 1 && waypoints[index + 1].progress < p) {
    index += 1;
  }

  const start = waypoints[index];
  const end = waypoints[index + 1] ?? start;
  const span = end.progress - start.progress;
  const t = span > 0 ? (p - start.progress) / span : 0;

  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
    pace: start.pace + (end.pace - start.pace) * t,
  };
}

function getPlanPace() {
  const kick = document.getElementById("plan-0");
  const grow = document.getElementById("plan-1");
  const scale = document.getElementById("plan-2");

  const visible = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const overlap =
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return Math.max(overlap, 0);
  };

  const vKick = visible(kick);
  const vGrow = visible(grow);
  const vScale = visible(scale);

  if (vScale >= vGrow && vScale >= vKick && vScale > 0) return 0.28;
  if (vGrow >= vKick && vGrow >= vScale && vGrow > 0) return 0.55;
  if (vKick > 0) return 0.95;
  return null;
}

function Runner() {
  const wrapRef = useRef(null);
  const facingRef = useRef(1);
  const posRef = useRef({ x: RUNNER_WAYPOINTS[0].x, y: RUNNER_WAYPOINTS[0].y });
  const frameRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetProgress = 0;
    let currentProgress = 0;

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress =
        maxScroll > 0
          ? clamp(window.scrollY / maxScroll, 0, 1)
          : 0;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) {
        frameRef.current = requestAnimationFrame(update);
        return;
      }

      currentProgress += (targetProgress - currentProgress) * 0.1;

      const waypoint = interpolateWaypoints(currentProgress, RUNNER_WAYPOINTS);
      const planPace = getPlanPace();
      const pace = planPace ?? waypoint.pace;

      const prevX = posRef.current.x;
      posRef.current.x += (waypoint.x - posRef.current.x) * 0.12;
      posRef.current.y += (waypoint.y - posRef.current.y) * 0.12;

      const x = posRef.current.x;
      const y = posRef.current.y;
      const deltaX = x - prevX;

      if (Math.abs(deltaX) > 0.08) {
        facingRef.current = deltaX > 0 ? 1 : -1;
      }

      const facing = facingRef.current;
      const bodyScale = 0.88 + currentProgress * 0.14;

      wrap.style.transform = `translate3d(calc(${x}vw - 50%), calc(${y}vh - 50%), 0)`;
      wrap.style.setProperty("--run-speed", `${pace}s`);
      wrap.style.setProperty("--runner-scale", String(bodyScale));
      wrap.style.setProperty("--runner-facing", String(facing));
      wrap.dataset.pace =
        pace >= 0.8 ? "walk" : pace >= 0.45 ? "jog" : "sprint";

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="runner-layer" aria-hidden="true">
      <div ref={wrapRef} className="runner-wrap" data-pace="walk">
        <div className="runner-trail-wrap">
          <div className="runner-trail" />
        </div>

        <div className="runner-speed-lines">
          <div className="runner-speed-line line-one" />
          <div className="runner-speed-line line-two" />
          <div className="runner-speed-line line-three" />
        </div>

        <div className="runner-body">
          <div className="runner-shadow" />
          <div className="runner-motion">
            <svg
              className="runner-svg"
              viewBox="0 0 240 360"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="124" cy="42" r="25" className="runner-skin" />
              <path
                d="M101 39 C102 13 126 8 145 22 C153 29 153 42 148 51
                   C144 35 132 29 115 32 C110 35 106 40 101 39"
                className="runner-hair"
              />
              <path d="M114 61 L116 77 L137 77 L137 58" className="runner-skin" />
              <path
                d="M111 72 C95 75 82 87 78 105 L72 148 L122 160
                   L151 129 L158 94 C151 81 142 74 134 72 Z"
                className="runner-shirt"
              />
              <path d="M108 76 L119 154 L135 148 L129 76 Z" className="runner-purple" />
              <path
                d="M86 90 C72 104 58 122 47 143 L29 175
                   C26 181 29 188 35 190 C40 192 45 188 49 183
                   L72 154 L101 119 Z"
                className="runner-skin"
              />
              <path
                d="M86 91 C72 103 63 117 55 130 L72 145 L101 118 Z"
                className="runner-shirt"
              />
              <path
                d="M149 92 C166 106 179 125 188 146 L205 176
                   C208 182 205 189 199 192 C193 195 188 191 184 185
                   L164 157 L139 123 Z"
                className="runner-skin"
              />
              <path
                d="M149 92 C164 103 174 119 181 133 L163 147 L139 123 Z"
                className="runner-shirt"
              />
              <path
                d="M74 144 L122 157 L148 128 L161 166
                   L129 190 L106 178 L91 170 Z"
                className="runner-shorts"
              />
              <path
                d="M108 174 C94 185 83 199 73 214 L55 242
                   C51 249 53 257 60 261 C66 264 73 260 77 254
                   L103 224 L132 192 Z"
                className="runner-skin"
              />
              <path
                d="M129 181 C145 186 158 197 166 211 L181 238
                   C185 245 182 252 176 256 C170 260 163 256 159 250
                   L141 226 L116 199 Z"
                className="runner-skin"
              />
              <path
                d="M73 244 L56 278 L35 307
                   C31 313 33 320 39 324 C44 327 51 325 55 320
                   L78 294 L99 257 Z"
                className="runner-skin"
              />
              <path
                d="M177 239 L193 270 L216 296
                   C221 302 220 309 214 313 C209 317 202 315 198 311
                   L173 288 L151 255 Z"
                className="runner-skin"
              />
              <path
                d="M36 304 C28 309 18 316 10 323
                   C6 328 10 335 17 336 L50 334
                   C57 333 60 326 55 321 Z"
                className="runner-shoe"
              />
              <path
                d="M198 294 C207 296 220 299 231 306
                   C238 310 237 317 230 320 L202 319
                   C194 318 190 310 194 304 Z"
                className="runner-shoe"
              />
              <path d="M15 325 L48 325" className="runner-shoe-detail" />
              <path d="M201 308 L229 313" className="runner-shoe-detail" />
            </svg>
          </div>
        </div>
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
    setForm({ ...form, [e.target.name]: e.target.value });
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

export default function Packages() {
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

      {/* HERO */}
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

      {/* PROBLEM */}
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

      {/* PLANS */}
      <section id="plans" className="plans-section section-shell">
        <div className="eyebrow">CHOOSE YOUR LEVEL</div>
        <h2>
          Where does your
          <span> business need to go?</span>
        </h2>
        <p className="speed-hint">
          Scroll with the runner — walking at KICKSTART, jogging at GROW, sprinting at SCALE.
        </p>
        <div className="plans-grid">
          {plans.map((plan, index) => {
            const isOpen = openPlan === index;
            return (
              <article
                id={`plan-${index}`}
                className={`plan-card ${plan.popular ? "featured" : ""} ${isOpen ? "expanded" : ""}`}
                key={plan.name}
              >
                {plan.popular && (
                  <div className="popular-badge">MOST POPULAR</div>
                )}
                <div className="plan-top">
                  <div className="plan-index">0{index + 1}</div>
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price}
                    <small>{plan.period}</small>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <button
                  className="plan-toggle"
                  onClick={() => setOpenPlan(isOpen ? -1 : index)}
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

      {/* BUILD YOUR OWN */}
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
                : `${selected.length} service${selected.length === 1 ? "" : "s"} selected.`}
            </p>
            <a href="/contact" className="primary-button">
              LET'S BUILD IT <span>→</span>
            </a>
          </aside>
        </div>
      </section>

      {/* GROWTH SCORE */}
      <GrowthScore />

      {/* FINAL CTA */}
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
