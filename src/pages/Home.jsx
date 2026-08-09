import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {

    /* ── CURSOR ── */
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.6, ease: "power3.out" });
    };

    const animateDot = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      gsap.set(cursorDot, { x: dotX, y: dotY });
      requestAnimationFrame(animateDot);
    };

    document.addEventListener("mousemove", onMouseMove);
    animateDot();

    /* Cursor scale on hover */
    const hoverEls = document.querySelectorAll("a, button, .preview-card");
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 }));
    });

    /* ── HERO ENTRANCE ── */
    const tl = gsap.timeline({ delay: 0.1 });

    tl.from(".home-kicker", { opacity: 0, y: 30, duration: 0.7 })
      .from(".hero-line", { opacity: 0, y: 120, stagger: 0.13, duration: 1.1, ease: "power4.out" }, "-=0.4")
      .from(".hero-description", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
      .from(".hero-actions", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-visual", { opacity: 0, scale: 0.75, duration: 1.3, ease: "power3.out" }, "-=0.9");

    /* ── HERO ORB / CARDS ── */
    gsap.to(".hero-orb", {
      y: -35, x: 22,
      duration: 4.5,
      repeat: -1, yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-card", {
      y: -16, duration: 2.8,
      repeat: -1, yoyo: true,
      stagger: 0.6, ease: "sine.inOut",
    });

    /* Subtle ring spin */
    gsap.to(".ring-one", { rotation: 360, duration: 18, repeat: -1, ease: "none", transformOrigin: "center center" });
    gsap.to(".ring-two", { rotation: -360, duration: 12, repeat: -1, ease: "none", transformOrigin: "center center" });

    /* ── MARQUEE ── */
    gsap.to(".marquee-track", {
      xPercent: -50,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    /* ── SCROLL REVEALS ── */
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 60, duration: 0.9, ease: "power3.out",
      });
    });

    gsap.utils.toArray(".reveal-left").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, x: -60, duration: 0.9, ease: "power3.out",
      });
    });

    gsap.utils.toArray(".reveal-right").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, x: 60, duration: 0.9, ease: "power3.out",
      });
    });

    /* Stagger children inside .stagger-parent */
    gsap.utils.toArray(".stagger-parent").forEach((parent) => {
      const kids = parent.querySelectorAll(".stagger-child");
      gsap.from(kids, {
        scrollTrigger: { trigger: parent, start: "top 85%" },
        opacity: 0, y: 50, stagger: 0.13, duration: 0.8, ease: "power3.out",
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

    /* ── PREVIEW CARDS tilt ── */
    document.querySelectorAll(".preview-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

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

          {/* VISUAL */}
          <div className="hero-visual">
            <div className="hero-orb" />
            <div className="hero-core">
              <div className="core-ring ring-one" />
              <div className="core-ring ring-two" />
              <div className="core-center">
                <span>✦</span>
                <small>GOONYA</small>
                <strong>AI</strong>
              </div>
            </div>
            <div className="floating-card card-one">
              <span className="status-dot" />
              New enquiry <strong>+1</strong>
            </div>
            <div className="floating-card card-two">
              <span className="status-dot green" />
              AI response <strong>0.8s</strong>
            </div>
            <div className="floating-card card-three">
              <span className="status-dot purple" />
              Customer converted <strong>$420</strong>
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
            { label: "Avg Response Time", value: "0.8", suffix: "s" },
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
              { n: "02", title: "WEBSITES", desc: "Turn attention into customers." },
              { n: "03", title: "MARKETING", desc: "Get discovered. Get chosen." },
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
              { n: "02", title: "Strategy", desc: "We map the digital system your business actually needs." },
              { n: "03", title: "Build", desc: "We execute fast without cutting corners." },
              { n: "04", title: "Launch", desc: "We go live and track what's working." },
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

      </div>

      {/* HOME CSS */}
      <style>{`
        /* ── CURSOR ── */
        .cursor-ring {
          position: fixed;
          top: -20px; left: -20px;
          width: 40px; height: 40px;
          border: 1px solid rgba(155,124,255,.7);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          will-change: transform;
        }
        .cursor-dot {
          position: fixed;
          top: -4px; left: -4px;
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
        }
        @media(max-width:850px){
          .cursor-ring,.cursor-dot { display:none; }
        }

        /* ── HOME ── */
        .home { overflow: hidden; }

        /* ── HERO ── */
        .hero {
          width: min(1400px, 90vw);
          margin: auto;
          padding: 130px 0 160px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .home-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #777;
          font-size: 11px;
          letter-spacing: 2.5px;
          margin-bottom: 38px;
        }
        .home-kicker span {
          width: 25px; height: 1px;
          background: var(--accent);
          display: block;
        }

        .hero-title {
          overflow: hidden;
        }
        .hero-line {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(52px, 6.5vw, 110px);
          line-height: .9;
          letter-spacing: -5px;
          font-weight: 600;
          overflow: hidden;
        }
        .hero-gradient {
          background: linear-gradient(90deg, var(--accent), #c4a9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          max-width: 480px;
          margin-top: 50px;
          color: #999;
          font-size: 18px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 48px;
          flex-wrap: wrap;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 26px;
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
          box-shadow: 0 15px 50px rgba(155,124,255,.3);
        }
        .primary-button.cta-big {
          padding: 20px 36px;
          font-size: 16px;
        }
        .secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 26px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          transition: background .3s, color .3s;
          will-change: transform;
        }
        .secondary-button:hover {
          background: rgba(255,255,255,.07);
        }

        /* HERO VISUAL */
        .hero-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-orb {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(155,124,255,.35), transparent 70%);
          filter: blur(40px);
        }
        .hero-core {
          position: relative;
          width: 180px; height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .core-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(155,124,255,.3);
        }
        .ring-one { width: 180px; height: 180px; }
        .ring-two { width: 240px; height: 240px; border-style: dashed; }
        .core-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-family: "Space Grotesk", sans-serif;
        }
        .core-center span { font-size: 20px; color: var(--accent); }
        .core-center small { font-size: 9px; letter-spacing: 2px; color: #666; }
        .core-center strong { font-size: 22px; font-weight: 700; }

        .floating-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 12px;
          font-size: 13px;
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .floating-card strong { color: var(--accent); font-weight: 700; }
        .card-one { top: 15%; left: -5%; }
        .card-two { top: 50%; right: -5%; }
        .card-three { bottom: 15%; left: 5%; }

        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #f87171;
          box-shadow: 0 0 8px #f87171;
          flex-shrink: 0;
        }
        .status-dot.green {
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
        }
        .status-dot.purple {
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        /* ── MARQUEE ── */
        .marquee-strip {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 16px 0;
          background: rgba(255,255,255,.02);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-right: 32px;
          white-space: nowrap;
        }
        .marquee-inner b {
          font-size: 11px;
          letter-spacing: 2.5px;
          font-weight: 500;
          color: #555;
        }
        .marquee-inner em {
          font-style: normal;
          color: var(--accent);
          font-size: 10px;
        }

        /* ── STATS ── */
        .home-stats {
          width: min(1400px, 90vw);
          margin: 80px auto;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border: 1px solid var(--line);
        }
        .stat-item {
          padding: 48px 36px;
          border-right: 1px solid var(--line);
          transition: background .4s ease;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: rgba(155,124,255,.05); }
        .stat-value {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(42px, 4vw, 72px);
          font-weight: 700;
          letter-spacing: -3px;
          line-height: 1;
          color: white;
        }
        .stat-value sup {
          font-size: 0.4em;
          color: var(--accent);
          vertical-align: super;
          letter-spacing: 0;
        }
        .stat-item p {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #555;
        }

        /* ── STATEMENT ── */
        .statement-section {
          width: min(900px, 90vw);
          margin: 0 auto;
          padding: 120px 0;
          text-align: center;
        }
        .statement-section h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(36px, 4.5vw, 68px);
          font-weight: 600;
          letter-spacing: -3px;
          line-height: 1.05;
          margin: 28px 0 24px;
        }
        .statement-section h2 span { color: var(--accent); }
        .statement-section p {
          color: #777;
          font-size: 18px;
          line-height: 1.7;
        }

        /* ── VIDEO ── */
        .home-video {
          width: min(1400px, 90vw);
          margin: 0 auto 120px;
        }
        .video-container {
          position: relative;
          height: 560px;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .video-container video {
          width: 100%;
          height: 120%;
          object-fit: cover;
          display: block;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,7,.9) 0%, rgba(7,7,7,.4) 60%, transparent 100%);
        }
        .video-copy {
          position: absolute;
          bottom: 50px;
          left: 50px;
        }
        .video-copy span {
          font-size: 11px;
          letter-spacing: 2.5px;
          color: #666;
        }
        .video-copy h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(38px, 5vw, 80px);
          font-weight: 700;
          letter-spacing: -4px;
          line-height: .9;
          margin-top: 16px;
        }
        .video-copy h2 em {
          font-style: normal;
          color: var(--accent);
        }

        /* ── SERVICES PREVIEW ── */
        .home-services {
          width: min(1400px, 90vw);
          margin: 0 auto 120px;
        }
        .section-header { margin-bottom: 55px; }
        .section-label {
          font-size: 11px;
          letter-spacing: 2.5px;
          color: #555;
          display: block;
          margin-bottom: 18px;
        }
        .section-header h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(32px, 3.5vw, 54px);
          font-weight: 600;
          letter-spacing: -2px;
          line-height: 1.05;
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
          gap: 24px;
          padding: 40px 36px;
          background: var(--bg);
          transition: background .4s ease;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .preview-card:hover { background: rgba(155,124,255,.06); }
        .preview-card > span {
          font-family: "Space Grotesk", sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: rgba(255,255,255,.07);
          letter-spacing: -2px;
          flex-shrink: 0;
        }
        .preview-card > div { flex: 1; }
        .preview-card strong {
          display: block;
          font-size: 13px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
        .preview-card p { color: #666; font-size: 14px; }
        .preview-card > b {
          font-size: 20px;
          color: var(--accent);
          flex-shrink: 0;
          transition: transform .3s ease;
        }
        .preview-card:hover > b { transform: translate(4px, -4px); }

        /* ── PROCESS ── */
        .home-process {
          width: min(1400px, 90vw);
          margin: 0 auto 120px;
        }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          margin-top: 55px;
        }
        .process-step {
          padding: 44px 36px;
          background: var(--bg);
          position: relative;
          transition: background .4s ease;
        }
        .process-step:hover { background: rgba(155,124,255,.05); }
        .step-number {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 28px;
        }
        .step-line {
          width: 30px;
          height: 1px;
          background: var(--accent);
          margin-bottom: 20px;
          opacity: .5;
        }
        .process-step strong {
          display: block;
          font-size: 18px;
          font-family: "Space Grotesk", sans-serif;
          margin-bottom: 12px;
        }
        .process-step p { color: #666; font-size: 14px; line-height: 1.6; }

        /* ── CTA ── */
        .home-cta {
          width: min(1400px, 90vw);
          margin: 0 auto;
          padding: 130px 0 160px;
          text-align: center;
          border-top: 1px solid var(--line);
        }
        .home-cta h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(42px, 5.5vw, 90px);
          font-weight: 600;
          letter-spacing: -4px;
          line-height: .95;
          margin: 24px 0 52px;
        }
        .home-cta h2 span { color: var(--accent); }

        /* ── MOBILE ── */
        @media(max-width:850px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 80px 0 100px;
            gap: 60px;
          }
          .hero-line { font-size: clamp(48px,13vw,80px); letter-spacing: -3px; }
          .hero-visual { height: 360px; }
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
        }
      `}</style>
    </>
  );
}

export default Home;
