import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {

  useEffect(() => {

    /* ── HERO ENTRANCE ── */
    const tl = gsap.timeline({ delay: 0.15 });

    tl.from(".home-kicker",      { opacity: 0, y: 30, duration: 0.7 })
      .from(".hero-line",        { opacity: 0, y: 100, stagger: 0.13, duration: 1.1, ease: "power4.out" }, "-=0.4")
      .from(".hero-description", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
      .from(".hero-actions",     { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-photo-wrap",  { opacity: 0, scale: 0.92, x: 40, duration: 1.2, ease: "power3.out" }, "-=0.9");

    /* Photo overlay shimmer */
    gsap.to(".photo-shimmer", {
      x: "110%",
      duration: 1.6,
      ease: "power2.inOut",
      delay: 1.2,
    });

    /* Floating cards */
    gsap.to(".floating-card", {
      y: -16, duration: 2.8,
      repeat: -1, yoyo: true,
      stagger: 0.6, ease: "sine.inOut",
    });

    /* Ambient orb drift */
    gsap.to(".hero-orb", {
      y: -40, x: 25,
      duration: 5,
      repeat: -1, yoyo: true,
      ease: "sine.inOut",
    });

    /* ── MARQUEE ── */
    gsap.to(".marquee-track", {
      xPercent: -50,
      duration: 22,
      repeat: -1,
      ease: "none",
    });

    /* ── SCROLL REVEALS ── */
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, y: 55, duration: 0.9, ease: "power3.out",
      });
    });

    /* Stagger grid children */
    gsap.utils.toArray(".stagger-parent").forEach((parent) => {
      gsap.from(parent.querySelectorAll(".stagger-child"), {
        scrollTrigger: { trigger: parent, start: "top 85%" },
        opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power3.out",
      });
    });

    /* ── STAT COUNTERS ── */
    gsap.utils.toArray(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = el.dataset.target.includes(".");
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = isFloat
                ? this.targets()[0].val.toFixed(1)
                : Math.round(this.targets()[0].val);
            },
          });
        },
      });
    });

    /* ── MAGNETIC BUTTONS ── */
    document.querySelectorAll(".primary-button, .secondary-button").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: dx * 0.28, y: dy * 0.28, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
      });
    });

    /* ── CARD TILT ── */
    document.querySelectorAll(".preview-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 8, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
      });
    });

    /* ── VIDEO PARALLAX ── */
    gsap.to(".home-video video", {
      scrollTrigger: {
        trigger: ".home-video",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: 80,
      ease: "none",
    });

    /* ── PHOTO PARALLAX ── */
    gsap.to(".hero-photo", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 60,
      ease: "none",
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">

        <div className="hero-content">

          <div className="home-kicker">
            <span />
            DIGITAL SYSTEMS FOR MODERN BUSINESS
          </div>

          <h1 className="hero-title">
            <div className="hero-line">YOUR BUSINESS.</div>
            <div className="hero-line hero-gradient">BUT SMARTER.</div>
            <div className="hero-line">AUTOMATED.</div>
          </h1>

          <p className="hero-description">
            Goonya builds websites, AI automation and digital systems
            that help ambitious businesses attract customers, save time and grow.
          </p>

          <div className="hero-actions">
            <Link to="/services" className="primary-button">
              Explore what we do <span>↗</span>
            </Link>
            <Link to="/our-work" className="secondary-button">
              See our work <span>↓</span>
            </Link>
          </div>

        </div>

        {/* PHOTO SIDE */}
        <div className="hero-photo-wrap">

          <div className="hero-orb" />

          {/* Real photo — replace src with your own image */}
          <div className="hero-photo-frame">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="Team working on digital systems"
            />
            <div className="photo-shimmer" />
            <div className="photo-gradient" />
          </div>

          {/* Floating stat cards */}
          <div className="floating-card card-one">
            <span className="status-dot" />
            New enquiry
            <strong>+1</strong>
          </div>

          <div className="floating-card card-two">
            <span className="status-dot green" />
            AI response
            <strong>0.8s</strong>
          </div>

          <div className="floating-card card-three">
            <span className="status-dot purple" />
            Customer converted
            <strong>$420</strong>
          </div>

        </div>

      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-inner">
              <b>AI AUTOMATION</b><em>✦</em>
              <b>WEBSITES</b><em>✦</em>
              <b>DIGITAL SYSTEMS</b><em>✦</em>
              <b>MARKETING</b><em>✦</em>
              <b>GOONYA.COM.AU</b><em>✦</em>
              <b>BUILD WHAT'S NEXT</b><em>✦</em>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="home-stats stagger-parent">
        {[
          { label: "Projects Delivered", value: "40", suffix: "+" },
          { label: "Avg Response Time",  value: "0.8", suffix: "s" },
          { label: "Client Satisfaction", value: "98", suffix: "%" },
          { label: "Hours Saved / Client", value: "120", suffix: "h" },
        ].map(({ label, value, suffix }) => (
          <div className="stat-item stagger-child" key={label}>
            <div className="stat-value">
              <span className="stat-number" data-target={value}>0</span>
              <sup>{suffix}</sup>
            </div>
            <p>{label}</p>
          </div>
        ))}
      </section>

      {/* ── STATEMENT ── */}
      <section className="statement-section">
        <span className="section-label reveal">01 / THE GOONYA IDEA</span>
        <h2 className="reveal">
          Your business has
          <span> enough to think about.</span>
        </h2>
        <p className="reveal">
          Your technology shouldn't be one of them. We connect the digital
          pieces behind your business so everything works together.
        </p>
      </section>

      {/* ── VIDEO ── */}
      <section className="home-video reveal">
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
          <div className="video-overlay" />
          <div className="video-copy">
            <span>THE DIGITAL MACHINE</span>
            <h2>BUILD ONCE.<br /><em>RUN SMARTER.</em></h2>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="home-services">
        <div className="section-header reveal">
          <span className="section-label">02 / WHAT WE DO</span>
          <h2>We build the <span>machine behind your business.</span></h2>
        </div>

        <div className="service-preview-grid stagger-parent">
          {[
            { n: "01", title: "AI AUTOMATION", desc: "Make repetitive work disappear." },
            { n: "02", title: "WEBSITES",      desc: "Turn attention into customers." },
            { n: "03", title: "MARKETING",     desc: "Get discovered. Get chosen." },
          ].map(({ n, title, desc }) => (
            <Link to="/services" className="preview-card stagger-child" key={n}>
              <span>{n}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
              <b>↗</b>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="home-process">
        <div className="section-header reveal">
          <span className="section-label">03 / HOW IT WORKS</span>
          <h2>Simple process. <span>Serious results.</span></h2>
        </div>

        <div className="process-steps stagger-parent">
          {[
            { n: "01", title: "Discovery", desc: "We learn your business, your bottlenecks, your goals." },
            { n: "02", title: "Strategy",  desc: "We map the digital system your business actually needs." },
            { n: "03", title: "Build",     desc: "We execute fast without cutting corners." },
            { n: "04", title: "Launch",    desc: "We go live and track what's working." },
          ].map(({ n, title, desc }) => (
            <div className="process-step stagger-child" key={n}>
              <div className="step-number">{n}</div>
              <div className="step-line" />
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta">
        <span className="section-label reveal">04 / READY?</span>
        <h2 className="reveal">
          Let's build something <span>people remember.</span>
        </h2>
        <div className="reveal">
          <Link to="/contact" className="primary-button cta-big">
            Start a project <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ── HOME STYLES ── */}
      <style>{`
        .home { overflow-x: hidden; }

        /* HERO */
        .hero {
          width: min(1400px, 90vw);
          margin: auto;
          padding: 120px 0 140px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .home-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #666;
          font-size: 11px;
          letter-spacing: 2.5px;
          margin-bottom: 38px;
        }
        .home-kicker span {
          width: 25px; height: 1px;
          background: var(--accent);
          display: block;
          flex-shrink: 0;
        }

        .hero-title { overflow: hidden; }

        .hero-line {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(52px, 6vw, 100px);
          line-height: .92;
          letter-spacing: -4px;
          font-weight: 700;
          overflow: hidden;
        }
        .hero-gradient {
          background: linear-gradient(90deg, var(--accent), #c4a9ff 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          max-width: 460px;
          margin-top: 44px;
          color: #888;
          font-size: 17px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 46px;
          flex-wrap: wrap;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 26px;
          background: white;
          color: black;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: box-shadow .3s ease;
          will-change: transform;
        }
        .primary-button:hover {
          box-shadow: 0 16px 50px rgba(155,124,255,.35);
        }
        .primary-button.cta-big {
          padding: 19px 36px;
          font-size: 16px;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 26px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          transition: background .3s, border-color .3s;
          will-change: transform;
        }
        .secondary-button:hover {
          background: rgba(255,255,255,.06);
          border-color: rgba(255,255,255,.3);
        }

        /* PHOTO SIDE */
        .hero-photo-wrap {
          position: relative;
          height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-orb {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(155,124,255,.22), transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .hero-photo-frame {
          position: relative;
          width: 88%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 4px;
        }

        .hero-photo {
          width: 100%;
          height: 110%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: brightness(.85) saturate(.8);
        }

        /* Shimmer sweep on load */
        .photo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.15) 50%, transparent 60%);
          transform: translateX(-110%);
          pointer-events: none;
        }

        /* Bottom gradient so text overlay on floating cards reads well */
        .photo-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(7,7,7,0) 40%,
            rgba(7,7,7,.55) 100%
          );
        }

        /* FLOATING CARDS */
        .floating-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 17px;
          background: rgba(10,10,10,.75);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 12px;
          font-size: 13px;
          backdrop-filter: blur(12px);
          white-space: nowrap;
          z-index: 2;
        }
        .floating-card strong { color: var(--accent); font-weight: 700; }
        .card-one   { top: 12%;    left: -6%; }
        .card-two   { top: 48%;    right: -6%; }
        .card-three { bottom: 12%; left: 4%; }

        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #f87171;
          box-shadow: 0 0 8px #f87171;
          flex-shrink: 0;
        }
        .status-dot.green  { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
        .status-dot.purple { background: var(--accent); box-shadow: 0 0 8px var(--accent); }

        /* MARQUEE */
        .marquee-strip {
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 15px 0;
          background: rgba(255,255,255,.015);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          gap: 30px;
          padding-right: 30px;
        }
        .marquee-inner b {
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 500;
          color: #444;
        }
        .marquee-inner em {
          font-style: normal;
          color: var(--accent);
          font-size: 9px;
        }

        /* STATS */
        .home-stats {
          width: min(1400px, 90vw);
          margin: 80px auto;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border: 1px solid var(--line);
          background: #0a0a0a;
        }
        .stat-item {
          padding: 50px 38px;
          border-right: 1px solid var(--line);
          transition: background .4s ease;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: rgba(155,124,255,.06); }
        .stat-value {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(40px, 3.5vw, 66px);
          font-weight: 700;
          letter-spacing: -3px;
          line-height: 1;
          color: white;
        }
        .stat-value sup {
          font-size: .4em;
          color: var(--accent);
          vertical-align: super;
          letter-spacing: 0;
        }
        .stat-item p {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 1px;
          color: #555;
        }

        /* STATEMENT */
        .statement-section {
          width: min(860px, 90vw);
          margin: 0 auto;
          padding: 110px 0;
          text-align: center;
        }
        .statement-section h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(34px, 4vw, 62px);
          font-weight: 600;
          letter-spacing: -2.5px;
          line-height: 1.06;
          margin: 24px 0 22px;
        }
        .statement-section h2 span { color: var(--accent); }
        .statement-section p { color: #666; font-size: 18px; line-height: 1.75; }

        /* VIDEO */
        .home-video {
          width: min(1400px, 90vw);
          margin: 0 auto 100px;
        }
        .video-container {
          position: relative;
          height: 540px;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .video-container video {
          width: 100%; height: 120%;
          object-fit: cover;
          display: block;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,7,.88) 0%, rgba(7,7,7,.3) 60%, transparent 100%);
        }
        .video-copy {
          position: absolute;
          bottom: 50px;
          left: 50px;
        }
        .video-copy span { font-size: 11px; letter-spacing: 2.5px; color: #555; }
        .video-copy h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(36px, 5vw, 76px);
          font-weight: 700;
          letter-spacing: -3px;
          line-height: .92;
          margin-top: 14px;
        }
        .video-copy h2 em { font-style: normal; color: var(--accent); }

        /* SERVICES PREVIEW */
        .home-services {
          width: min(1400px, 90vw);
          margin: 0 auto 100px;
        }
        .section-header { margin-bottom: 50px; }
        .section-label {
          font-size: 11px;
          letter-spacing: 2px;
          color: #555;
          display: block;
          margin-bottom: 16px;
        }
        .section-header h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(30px, 3.5vw, 52px);
          font-weight: 600;
          letter-spacing: -2px;
          line-height: 1.08;
        }
        .section-header h2 span { color: var(--accent); }

        .service-preview-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .preview-card {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 42px 34px;
          background: #0a0a0a;
          transition: background .4s ease;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .preview-card:hover { background: rgba(155,124,255,.07); }
        .preview-card > span {
          font-family: "Space Grotesk", sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: rgba(255,255,255,.06);
          letter-spacing: -2px;
          flex-shrink: 0;
        }
        .preview-card > div { flex: 1; }
        .preview-card strong {
          display: block;
          font-size: 12px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
        .preview-card p { color: #666; font-size: 14px; }
        .preview-card > b {
          font-size: 18px;
          color: var(--accent);
          flex-shrink: 0;
          transition: transform .3s ease;
        }
        .preview-card:hover > b { transform: translate(4px, -4px); }

        /* PROCESS */
        .home-process {
          width: min(1400px, 90vw);
          margin: 0 auto 100px;
        }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          margin-top: 50px;
        }
        .process-step {
          padding: 44px 34px;
          background: #0a0a0a;
          transition: background .4s ease;
        }
        .process-step:hover { background: rgba(155,124,255,.05); }
        .step-number {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 24px;
        }
        .step-line {
          width: 28px; height: 1px;
          background: var(--accent);
          margin-bottom: 18px;
          opacity: .4;
        }
        .process-step strong {
          display: block;
          font-size: 17px;
          font-family: "Space Grotesk", sans-serif;
          margin-bottom: 10px;
        }
        .process-step p { color: #666; font-size: 14px; line-height: 1.6; }

        /* CTA */
        .home-cta {
          width: min(1400px, 90vw);
          margin: 0 auto;
          padding: 120px 0 150px;
          text-align: center;
          border-top: 1px solid var(--line);
        }
        .home-cta h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(40px, 5vw, 86px);
          font-weight: 700;
          letter-spacing: -4px;
          line-height: .94;
          margin: 22px 0 50px;
        }
        .home-cta h2 span { color: var(--accent); }

        /* MOBILE */
        @media(max-width: 850px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 70px 0 90px;
            gap: 50px;
          }
          .hero-line { font-size: clamp(44px,13vw,78px); letter-spacing: -2.5px; }
          .hero-photo-wrap { height: 340px; width: 100%; }
          .card-one { left: 0; }
          .card-two { right: 0; }

          .home-stats {
            grid-template-columns: repeat(2,1fr);
          }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(1),
          .stat-item:nth-child(2) { border-bottom: 1px solid var(--line); }

          .service-preview-grid,
          .process-steps { grid-template-columns: 1fr; }

          .home-cta h2 { letter-spacing: -2px; }
          .hero-actions { flex-direction: column; align-items: flex-start; }

          .video-copy { left: 24px; bottom: 32px; }
        }
      `}</style>

    </div>
  );
}

export default Home;
