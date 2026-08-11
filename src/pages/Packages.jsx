import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PACKAGES, BUILD_ITEMS } from "../data/siteContent";
import GrowthScoreCheck from "../components/GrowthScoreCheck";
import "./Packages.css";

const plans = PACKAGES;

const buildGroups = [...new Set(BUILD_ITEMS.map((i) => i.category))].map((category) => ({
  category,
  items: BUILD_ITEMS.filter((i) => i.category === category),
}));

const RUNNER_WAYPOINTS = [
  { progress: 0,    x: 14, y: 76, pace: 1.5 },
  { progress: 0.07, x: 86, y: 70, pace: 1.5 },
  { progress: 0.16, x: 12, y: 62, pace: 1.45 },
  { progress: 0.25, x: 88, y: 56, pace: 1.35 },
  { progress: 0.34, x: 18, y: 50, pace: 1.5 },
  { progress: 0.42, x: 34, y: 48, pace: 1.5 },
  { progress: 0.48, x: 52, y: 46, pace: 1.0 },
  { progress: 0.54, x: 72, y: 44, pace: 0.68 },
  { progress: 0.62, x: 88, y: 48, pace: 1.0 },
  { progress: 0.72, x: 16, y: 54, pace: 1.2 },
  { progress: 0.82, x: 84, y: 62, pace: 1.35 },
  { progress: 0.91, x: 22, y: 70, pace: 1.2 },
  { progress: 1,    x: 50, y: 82, pace: 0.68 },
];

const PACE_WALK = 1.5;
const PACE_JOG = 1.0;
const PACE_SPRINT = 0.68;

function buildJourneyPath(waypoints) {
  if (waypoints.length < 2) return "";

  let path = `M ${waypoints[0].x} ${waypoints[0].y}`;

  for (let i = 1; i < waypoints.length; i += 1) {
    const prev = waypoints[i - 1];
    const curr = waypoints[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }

  const end = waypoints[waypoints.length - 1];
  path += ` L ${end.x} ${end.y}`;
  return path;
}

const JOURNEY_PATH = buildJourneyPath(RUNNER_WAYPOINTS);

function smoothStep(t) {
  return t * t * (3 - 2 * t);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

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
  const rawT = span > 0 ? (p - start.progress) / span : 0;
  const t = smoothStep(rawT);

  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
    pace: start.pace + (end.pace - start.pace) * t,
  };
}

function getPlanPace() {
  const launch = document.getElementById("plan-0");
  const grow = document.getElementById("plan-1");
  const scale = document.getElementById("plan-2");

  const visible = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const overlap =
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return Math.max(overlap, 0);
  };

  const vLaunch = visible(launch);
  const vGrow = visible(grow);
  const vScale = visible(scale);

  if (vScale >= vGrow && vScale >= vLaunch && vScale > 0) return PACE_SPRINT;
  if (vGrow >= vLaunch && vGrow >= vScale && vGrow > 0) return PACE_JOG;
  if (vLaunch > 0) return PACE_WALK;
  return null;
}

function paceToMode(pace) {
  if (pace >= 1.25) return "walk";
  if (pace >= 0.85) return "jog";
  return "sprint";
}

function Runner() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pathProgressRef = useRef(null);
  const facingRef = useRef(1);
  const posRef = useRef({ x: RUNNER_WAYPOINTS[0].x, y: RUNNER_WAYPOINTS[0].y });
  const particlesRef = useRef([]);
  const frameRef = useRef(null);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetProgress = 0;
    let currentProgress = 0;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw =
        maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0;
      targetProgress = easeOutCubic(raw);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const spawnParticles = (xVw, yVh, pace, facing) => {
      const count =
        pace <= PACE_SPRINT ? 4 : pace <= PACE_JOG ? 2 : 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const originX = (xVw / 100) * w;
      const originY = (yVh / 100) * h;

      for (let i = 0; i < count; i += 1) {
        particlesRef.current.push({
          px: originX + (Math.random() - 0.5) * 28,
          py: originY + (Math.random() - 0.5) * 20,
          vx: facing * -(0.25 + Math.random() * 0.9),
          vy: (Math.random() - 0.5) * 0.6,
          life: 1,
          decay: 0.006 + Math.random() * 0.006,
          size: 1.2 + Math.random() * 3.2,
        });
      }

      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.px += particle.vx;
        particle.py += particle.vy;
        particle.vy += 0.02;
        particle.life -= particle.decay;

        if (particle.life <= 0) return false;

        const glow = ctx.createRadialGradient(
          particle.px,
          particle.py,
          0,
          particle.px,
          particle.py,
          particle.size * 3
        );
        glow.addColorStop(0, `rgba(155, 124, 255, ${particle.life * 0.45})`);
        glow.addColorStop(1, "rgba(155, 124, 255, 0)");

        ctx.beginPath();
        ctx.arc(
          particle.px,
          particle.py,
          particle.size * particle.life,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = glow;
        ctx.fill();

        return true;
      });
    };

    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) {
        frameRef.current = requestAnimationFrame(update);
        return;
      }

      currentProgress += (targetProgress - currentProgress) * 0.035;

      const waypoint = interpolateWaypoints(currentProgress, RUNNER_WAYPOINTS);
      const planPace = getPlanPace();
      const pace = planPace ?? waypoint.pace;

      const prevX = posRef.current.x;
      posRef.current.x += (waypoint.x - posRef.current.x) * 0.045;
      posRef.current.y += (waypoint.y - posRef.current.y) * 0.045;

      const x = posRef.current.x;
      const y = posRef.current.y;
      const deltaX = x - prevX;

      if (Math.abs(deltaX) > 0.04) {
        facingRef.current = deltaX > 0 ? 1 : -1;
      }

      const facing = facingRef.current;
      const bodyScale = 0.86 + currentProgress * 0.12;
      const now = performance.now();
      const spawnGap =
        pace <= PACE_SPRINT ? 220 : pace <= PACE_JOG ? 320 : 480;

      if (now - lastSpawnRef.current > spawnGap) {
        lastSpawnRef.current = now;
        spawnParticles(x, y, pace, facing);
      }

      drawParticles();

      wrap.style.transform = `translate3d(calc(${x}vw - 50%), calc(${y}vh - 50%), 0)`;
      wrap.style.setProperty("--run-speed", `${pace}s`);
      wrap.style.setProperty("--runner-scale", String(bodyScale));
      wrap.style.setProperty("--runner-facing", String(facing));
      wrap.style.setProperty("--journey-progress", String(currentProgress));
      wrap.dataset.pace = paceToMode(pace);

      if (pathProgressRef.current) {
        const pathLength = pathProgressRef.current.getTotalLength();
        pathProgressRef.current.style.strokeDashoffset = String(
          pathLength * (1 - currentProgress)
        );
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="runner-layer" aria-hidden="true">
      <div className="runner-ambient" />
      <div className="runner-ambient runner-ambient-alt" />

      <svg
        className="runner-journey-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(155, 124, 255, 0.05)" />
            <stop offset="50%" stopColor="rgba(155, 124, 255, 0.22)" />
            <stop offset="100%" stopColor="rgba(155, 124, 255, 0.08)" />
          </linearGradient>
        </defs>
        <path
          className="runner-journey-path"
          d={JOURNEY_PATH}
          pathLength="1"
        />
        <path
          ref={pathProgressRef}
          className="runner-journey-progress"
          d={JOURNEY_PATH}
          pathLength="1"
        />
      </svg>

      <canvas ref={canvasRef} className="runner-particle-canvas" />

      <div ref={wrapRef} className="runner-wrap" data-pace="walk">
        <div className="runner-aura" />
        <div className="runner-orbit" />

        <div className="runner-trail-wrap">
          <div className="runner-trail" />
          <div className="runner-trail runner-trail-soft" />
        </div>

        <div className="runner-speed-lines">
          <div className="runner-speed-line line-one" />
          <div className="runner-speed-line line-two" />
          <div className="runner-speed-line line-three" />
          <div className="runner-speed-line line-four" />
          <div className="runner-speed-line line-five" />
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

export default function Packages() {
  const location = useLocation();
  const [openPlan, setOpenPlan] = useState(1);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (location.hash === "#plans") {
      setTimeout(() => {
        document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash, location.pathname]);

  const toggleSelection = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  };

  const selectedItems = BUILD_ITEMS.filter((i) => selected.includes(i.id));
  const onceTotal = selectedItems.filter((i) => !i.recurring).reduce((s, i) => s + i.price, 0);
  const monthlyTotal = selectedItems.filter((i) => i.recurring).reduce((s, i) => s + i.price, 0);

  return (
    <div className="growth-page">
      <Runner />

      {/* HERO */}
      <section className="growth-hero section-shell">
        <div className="eyebrow">GOONYA PACKAGES</div>
        <h1>
          Clear pricing.
          <br />
          <span>No guessing what we cost.</span>
        </h1>
        <p className="hero-copy">
          Three packages built around one goal — more enquiries, bookings and sales.
          Pick Launch, Growth or Scale based on where your business is today.
        </p>
        <div className="hero-services">
          <span>WEBSITE</span>
          <span>SEO</span>
          <span>SOCIAL</span>
          <span>ADS</span>
          <span>AUTOMATION</span>
        </div>
        <a href="#plans" className="primary-button hero-button">
          SEE PLANS & PRICING <span>→</span>
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
          Scroll with the runner — walking at Launch, jogging at Growth, sprinting at Scale.
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
                    From {plan.price}
                    <small>{plan.period}</small>
                  </div>
                  {plan.altPrice && (
                    <div className="plan-alt-price">
                      or {plan.altPrice}
                      <small>{plan.altPeriod}</small>
                      {plan.altNote && <span className="plan-alt-note">{plan.altNote}</span>}
                    </div>
                  )}
                  <p>{plan.tagline}</p>
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
                  {plan.cta}
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
            {buildGroups.map((group) => (
              <div className="builder-group" key={group.category}>
                <h3>{group.category}</h3>
                <div className="builder-items">
                  {group.items.map((item) => {
                    const active = selected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        className={active ? "selected" : ""}
                        onClick={() => toggleSelection(item.id)}
                      >
                        <span>{active ? "✓" : "+"}</span>
                        {item.label}
                        <em style={{ marginLeft: "auto", fontStyle: "normal", color: active ? "#9b7cff" : "#666", fontSize: "0.75rem" }}>
                          ${item.price}{item.recurring ? "/mo" : ""}
                        </em>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <aside className="builder-summary">
            <div className="summary-label">YOUR GOONYA PLAN</div>
            {onceTotal > 0 && (
              <div className="custom-price" style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                ${onceTotal.toLocaleString()}
                <small> one-off</small>
              </div>
            )}
            {monthlyTotal > 0 && (
              <div className="custom-price">
                ${monthlyTotal.toLocaleString()}
                <small>/ month</small>
              </div>
            )}
            {onceTotal === 0 && monthlyTotal === 0 && (
              <div className="custom-price" style={{ fontSize: "1.5rem", color: "#666" }}>
                $0
              </div>
            )}
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

      <GrowthScoreCheck id="growth-check" onPackagesPage />

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
