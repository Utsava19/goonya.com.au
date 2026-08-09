import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ── PARTICLE CANVAS ──
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const drawParticles = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,124,255,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      raf = requestAnimationFrame(drawParticles);
    };
    drawParticles();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    // ── FORCE VISIBLE ──
    gsap.set(".reveal, .stagger-child", { opacity: 1, y: 0 });
    gsap.set(".hero-line, .home-kicker, .hero-desc, .hero-actions, .hero-right", { opacity: 1, y: 0, x: 0, scale: 1 });

    // ── HERO ENTRANCE ──
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(".home-kicker",  { opacity: 0, y: 20, duration: 0.6, clearProps: "all" })
      .from(".hero-line",    { opacity: 0, y: 60, stagger: 0.1, duration: 0.9, ease: "power3.out", clearProps: "all" }, "-=0.3")
      .from(".hero-desc",    { opacity: 0, y: 20, duration: 0.6, clearProps: "all" }, "-=0.4")
      .from(".hero-actions", { opacity: 0, y: 15, duration: 0.5, clearProps: "all" }, "-=0.3")
      .from(".hero-right",   { opacity: 0, x: 50, duration: 1, ease: "power3.out", clearProps: "all" }, "-=0.6");

    // ── ROBOT PULSE ──
    gsap.to(".robot-core", { scale: 1.06, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".robot-ring-1", { rotation: 360, duration: 12, repeat: -1, ease: "none", transformOrigin: "center" });
    gsap.to(".robot-ring-2", { rotation: -360, duration: 8, repeat: -1, ease: "none", transformOrigin: "center" });
    gsap.to(".robot-ring-3", { rotation: 360, duration: 20, repeat: -1, ease: "none", transformOrigin: "center" });
    gsap.to(".robot-glow",   { opacity: 0.4, scale: 1.3, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // ── PROFIT COUNTER RISE ──
    gsap.to(".profit-bar", {
      scaleY: 1, duration: 2, ease: "power2.out", delay: 1,
      stagger: 0.15, transformOrigin: "bottom",
    });
    gsap.from(".profit-label", { opacity: 0, y: 10, duration: 0.5, stagger: 0.15, delay: 1.5, clearProps: "all" });

    // ── MARQUEE ──
    gsap.to(".marquee-track", { xPercent: -50, duration: 25, repeat: -1, ease: "none" });

    // ── SCROLL REVEALS ──
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", clearProps: "all",
      });
    });

    gsap.utils.toArray(".stagger-parent").forEach((parent) => {
      gsap.from(parent.querySelectorAll(".stagger-child"), {
        scrollTrigger: { trigger: parent, start: "top 90%" },
        opacity: 0, y: 35, stagger: 0.1, duration: 0.7, ease: "power3.out", clearProps: "all",
      });
    });

    // ── STAT COUNTERS ──
    gsap.utils.toArray(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = el.dataset.target.includes(".");
      ScrollTrigger.create({
        trigger: el, start: "top 90%",
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 2, ease: "power2.out",
            onUpdate: function () {
              el.textContent = isFloat
                ? this.targets()[0].val.toFixed(1)
                : Math.round(this.targets()[0].val);
            },
          });
        },
      });
    });

    // ── HORIZONTAL SCROLL SECTION ──
    const hScroll = document.querySelector(".h-scroll-track");
    if (hScroll) {
      gsap.to(hScroll, {
        x: () => -(hScroll.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-scroll-section",
          start: "top top",
          end: () => `+=${hScroll.scrollWidth - window.innerWidth + 80}`,
          scrub: 1,
          pin: true,
        },
      });
    }

    // ── SECTION BG COLOUR SHIFT ──
    ScrollTrigger.create({
      trigger: ".dark-section",
      start: "top 60%",
      onEnter: () => gsap.to("body", { backgroundColor: "#0a0818", duration: 1 }),
      onLeaveBack: () => gsap.to("body", { backgroundColor: "#070707", duration: 1 }),
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const s = {
    // layout
    page: { overflowX: "hidden", background: "#070707" },

    // hero section
    heroSection: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    },
    canvas: {
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    },
    heroBg: {
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(155,124,255,.12) 0%, transparent 70%)",
      zIndex: 0,
    },
    heroInner: {
      position: "relative", zIndex: 1,
      width: "min(1400px, 90vw)",
      margin: "0 auto",
      padding: "140px 0 100px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "60px",
      alignItems: "center",
    },
    kicker: {
      display: "inline-flex", alignItems: "center", gap: "10px",
      color: "#9b7cff", fontSize: "11px", letterSpacing: "3px",
      marginBottom: "32px",
      padding: "6px 14px",
      border: "1px solid rgba(155,124,255,.3)",
      borderRadius: "100px",
      background: "rgba(155,124,255,.08)",
    },
    kickerDot: {
      width: "6px", height: "6px", borderRadius: "50%",
      background: "#9b7cff", flexShrink: 0,
      boxShadow: "0 0 8px #9b7cff",
    },
    heroTitle: { marginBottom: 0 },
    heroLine: {
      display: "block",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(56px, 7vw, 110px)",
      lineHeight: 0.9,
      letterSpacing: "-4px",
      fontWeight: 700,
      color: "white",
    },
    heroLineGrad: {
      display: "block",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(56px, 7vw, 110px)",
      lineHeight: 0.9,
      letterSpacing: "-4px",
      fontWeight: 700,
      background: "linear-gradient(90deg, #9b7cff 0%, #e0b0ff 50%, #9b7cff 100%)",
      backgroundSize: "200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroDesc: {
      maxWidth: "440px", marginTop: "36px",
      color: "#888", fontSize: "17px", lineHeight: 1.75,
    },
    heroActions: {
      display: "flex", alignItems: "center", gap: "16px",
      marginTop: "44px", flexWrap: "wrap",
    },
    btnPrimary: {
      display: "inline-flex", alignItems: "center", gap: "10px",
      padding: "16px 30px", background: "white", color: "black",
      borderRadius: "100px", fontWeight: 700, fontSize: "14px",
      textDecoration: "none", letterSpacing: "0.3px",
      boxShadow: "0 0 30px rgba(155,124,255,.2)",
    },
    btnSecondary: {
      display: "inline-flex", alignItems: "center", gap: "10px",
      padding: "16px 30px", color: "white", fontSize: "14px",
      textDecoration: "none", borderRadius: "100px",
      border: "1px solid rgba(255,255,255,.18)",
    },

    // robot visual
    heroRight: {
      position: "relative", height: "560px",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    robotWrap: {
      position: "relative", width: "340px", height: "340px",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    robotGlow: {
      position: "absolute", width: "300px", height: "300px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(155,124,255,.5), transparent 70%)",
      filter: "blur(40px)",
    },
    robotRing1: {
      position: "absolute", width: "300px", height: "300px",
      borderRadius: "50%", border: "1px solid rgba(155,124,255,.4)",
    },
    robotRing2: {
      position: "absolute", width: "240px", height: "240px",
      borderRadius: "50%", border: "1px dashed rgba(155,124,255,.25)",
    },
    robotRing3: {
      position: "absolute", width: "360px", height: "360px",
      borderRadius: "50%", border: "1px solid rgba(155,124,255,.15)",
    },
    robotCore: {
      position: "relative", zIndex: 2,
      width: "150px", height: "150px",
      background: "linear-gradient(135deg, #1a1230, #0d0d14)",
      borderRadius: "24px",
      border: "1px solid rgba(155,124,255,.4)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "6px",
      boxShadow: "0 0 40px rgba(155,124,255,.3), inset 0 0 30px rgba(155,124,255,.05)",
    },
    robotEye: {
      display: "flex", gap: "16px", marginBottom: "4px",
    },
    robotEyeDot: {
      width: "16px", height: "16px", borderRadius: "50%",
      background: "#9b7cff",
      boxShadow: "0 0 12px #9b7cff, 0 0 24px rgba(155,124,255,.5)",
    },
    robotMouth: {
      width: "40px", height: "3px", borderRadius: "2px",
      background: "rgba(155,124,255,.6)",
    },
    robotLabel: {
      fontSize: "9px", letterSpacing: "2px", color: "#9b7cff", marginTop: "4px",
    },

    // profit bars
    profitWrap: {
      position: "absolute", bottom: "20px", left: "-20px",
      background: "rgba(10,10,10,.9)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: "16px", padding: "20px 24px",
      backdropFilter: "blur(12px)",
      zIndex: 3,
    },
    profitTitle: { fontSize: "10px", letterSpacing: "2px", color: "#555", marginBottom: "14px" },
    profitBars: { display: "flex", alignItems: "flex-end", gap: "8px", height: "60px" },
    profitBarWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
    profitLabel: { fontSize: "9px", color: "#555", letterSpacing: "1px" },

    // status card
    statusCard: {
      position: "absolute", top: "40px", right: "-20px",
      background: "rgba(10,10,10,.9)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: "14px", padding: "14px 18px",
      backdropFilter: "blur(12px)",
      zIndex: 3, minWidth: "170px",
    },
    statusRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" },
    statusDot: { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 },
    statusText: { fontSize: "12px", color: "#888" },
    statusVal: { fontSize: "12px", color: "white", fontWeight: 600, marginLeft: "auto" },

    // marquee
    marqueeWrap: {
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,.06)",
      borderBottom: "1px solid rgba(255,255,255,.06)",
      padding: "14px 0",
      background: "rgba(255,255,255,.01)",
    },
    marqueeTrack: { display: "flex", width: "max-content" },
    marqueeInner: { display: "flex", alignItems: "center", gap: "28px", paddingRight: "28px" },
    marqueeB: { fontSize: "11px", letterSpacing: "2px", fontWeight: 500, color: "#333" },
    marqueeEm: { fontStyle: "normal", color: "#9b7cff", fontSize: "9px" },

    // stats strip
    statsStrip: {
      width: "min(1400px, 90vw)", margin: "0 auto",
      padding: "70px 0",
      display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      borderBottom: "1px solid rgba(255,255,255,.06)",
    },
    statItem: {
      padding: "0 40px",
      borderRight: "1px solid rgba(255,255,255,.06)",
    },
    statItemLast: { padding: "0 40px" },
    statNum: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(42px, 4vw, 70px)",
      fontWeight: 700, letterSpacing: "-3px", lineHeight: 1,
      color: "white",
    },
    statSup: { fontSize: ".4em", color: "#9b7cff", verticalAlign: "super" },
    statLbl: { marginTop: "8px", fontSize: "12px", letterSpacing: "1px", color: "#444" },

    // dark section
    darkSection: {
      background: "linear-gradient(180deg, #070707 0%, #0d0818 50%, #070707 100%)",
      padding: "120px 0",
    },
    sectionInner: { width: "min(1400px, 90vw)", margin: "0 auto" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "10px",
      fontSize: "11px", letterSpacing: "2.5px", color: "#555",
      marginBottom: "28px",
    },
    eyebrowLine: { width: "20px", height: "1px", background: "#9b7cff" },
    sectionH2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(36px, 4.5vw, 68px)",
      fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.0,
      color: "white", marginBottom: "20px",
    },
    accent: { color: "#9b7cff" },
    sectionP: { color: "#555", fontSize: "18px", lineHeight: 1.75, maxWidth: "500px" },

    // horizontal scroll cards
    hScrollSection: { overflow: "hidden" },
    hScrollTrack: {
      display: "flex", gap: "24px",
      padding: "80px 5vw",
      width: "max-content",
    },
    hCard: {
      width: "380px", flexShrink: 0,
      padding: "48px 40px",
      background: "#0d0d14",
      border: "1px solid rgba(155,124,255,.15)",
      borderRadius: "4px",
      position: "relative", overflow: "hidden",
    },
    hCardGlow: {
      position: "absolute", top: "-80px", right: "-80px",
      width: "200px", height: "200px", borderRadius: "50%",
      filter: "blur(40px)", pointerEvents: "none",
    },
    hCardNum: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "11px", letterSpacing: "2px", color: "#9b7cff",
      marginBottom: "60px",
    },
    hCardTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "28px", fontWeight: 700, letterSpacing: "-1px",
      color: "white", marginBottom: "14px",
    },
    hCardDesc: { color: "#555", fontSize: "15px", lineHeight: 1.65 },
    hCardArrow: {
      position: "absolute", bottom: "36px", right: "36px",
      fontSize: "22px", color: "#9b7cff",
    },

    // video
    videoSection: { width: "min(1400px, 90vw)", margin: "0 auto 0" },
    videoWrap: {
      position: "relative", height: "560px",
      overflow: "hidden", borderRadius: "4px",
      border: "1px solid rgba(255,255,255,.06)",
    },
    videoEl: { width: "100%", height: "120%", objectFit: "cover", display: "block" },
    videoOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(to top, rgba(7,7,7,.92) 0%, rgba(7,7,7,.2) 60%, transparent 100%)",
    },
    videoCopy: { position: "absolute", bottom: "50px", left: "50px" },
    videoEyebrow: { fontSize: "11px", letterSpacing: "2.5px", color: "#555" },
    videoH2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(38px, 5vw, 78px)",
      fontWeight: 700, letterSpacing: "-3px", lineHeight: .92,
      marginTop: "14px", color: "white",
    },
    videoEm: { fontStyle: "normal", color: "#9b7cff" },

    // process
    processGrid: {
      display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      gap: "1px", background: "rgba(255,255,255,.06)",
      border: "1px solid rgba(255,255,255,.06)",
      marginTop: "60px",
    },
    processStep: { padding: "44px 36px", background: "#070707" },
    stepN: { fontSize: "11px", letterSpacing: "2px", color: "#9b7cff", marginBottom: "24px", fontFamily: "'Space Grotesk', sans-serif" },
    stepLine: { width: "28px", height: "1px", background: "#9b7cff", marginBottom: "20px", opacity: .35 },
    stepTitle: { display: "block", fontSize: "18px", fontFamily: "'Space Grotesk', sans-serif", color: "white", marginBottom: "10px" },
    stepDesc: { color: "#555", fontSize: "14px", lineHeight: 1.65 },

    // cta
    ctaSection: {
      width: "min(1400px, 90vw)", margin: "0 auto",
      padding: "140px 0 160px", textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,.06)",
    },
    ctaH2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(44px, 6vw, 100px)",
      fontWeight: 700, letterSpacing: "-5px", lineHeight: .9,
      color: "white", margin: "24px 0 56px",
    },
  };

  const profitData = [
    { h: 30, label: "Q1", color: "rgba(155,124,255,.4)" },
    { h: 45, label: "Q2", color: "rgba(155,124,255,.55)" },
    { h: 38, label: "Q3", color: "rgba(155,124,255,.5)" },
    { h: 58, label: "Q4", color: "#9b7cff" },
  ];

  const cards = [
    { n: "01", title: "AI Automation", desc: "Eliminate repetitive tasks. Let intelligent systems handle the work so your team focuses on what matters.", glow: "rgba(155,124,255,.4)" },
    { n: "02", title: "Website Design", desc: "High-performance websites that convert visitors into customers. Built fast, built to last.", glow: "rgba(0,210,190,.3)" },
    { n: "03", title: "Digital Marketing", desc: "Get discovered by the right people at the right time. Data-driven campaigns that actually grow revenue.", glow: "rgba(255,100,180,.25)" },
    { n: "04", title: "Systems Integration", desc: "Connect your tools, automate your workflows, and make your entire business run as one smart machine.", glow: "rgba(100,180,255,.25)" },
  ];

  return (
    <div style={s.page}>

      {/* ── HERO ── */}
      <section style={s.heroSection}>
        <canvas ref={canvasRef} style={s.canvas} />
        <div style={s.heroBg} />

        <div style={s.heroInner}>
          {/* LEFT */}
          <div>
            <div className="home-kicker" style={s.kicker}>
              <span style={s.kickerDot} />
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            <h1 style={s.heroTitle}>
              <span className="hero-line" style={s.heroLine}>YOUR BUSINESS.</span>
              <span className="hero-line" style={s.heroLineGrad}>BUT SMARTER.</span>
              <span className="hero-line" style={s.heroLine}>AUTOMATED.</span>
            </h1>

            <p className="hero-desc" style={s.heroDesc}>
              Goonya builds websites, AI automation and digital systems
              that help ambitious businesses attract customers, save time and grow.
            </p>

            <div className="hero-actions" style={s.heroActions}>
              <Link to="/services" style={s.btnPrimary}>
                Explore what we do <span>↗</span>
              </Link>
              <Link to="/our-work" style={s.btnSecondary}>
                See our work <span>↓</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="hero-right" style={s.heroRight}>

            {/* Robot */}
            <div style={s.robotWrap}>
              <div className="robot-glow" style={s.robotGlow} />
              <div className="robot-ring-3" style={s.robotRing3} />
              <div className="robot-ring-1" style={s.robotRing1} />
              <div className="robot-ring-2" style={s.robotRing2} />
              <div className="robot-core" style={s.robotCore}>
                <div style={s.robotEye}>
                  <div style={s.robotEyeDot} />
                  <div style={s.robotEyeDot} />
                </div>
                <div style={s.robotMouth} />
                <div style={s.robotLabel}>GOONYA AI</div>
              </div>
            </div>

            {/* Profit chart card */}
            <div style={s.profitWrap}>
              <div style={s.profitTitle}>REVENUE GROWTH</div>
              <div style={s.profitBars}>
                {profitData.map((b, i) => (
                  <div key={i} style={s.profitBarWrap}>
                    <div className="profit-bar" style={{
                      width: "28px",
                      height: `${b.h}px`,
                      background: b.color,
                      borderRadius: "4px 4px 0 0",
                      transform: "scaleY(0)",
                      transformOrigin: "bottom",
                    }} />
                    <div className="profit-label" style={s.profitLabel}>{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status card */}
            <div style={s.statusCard}>
              {[
                { color: "#4ade80", label: "Systems live", val: "12" },
                { color: "#9b7cff", label: "AI tasks/day", val: "840" },
                { color: "#f87171", label: "Hours saved", val: "∞" },
              ].map(({ color, label, val }) => (
                <div key={label} style={s.statusRow}>
                  <span style={{ ...s.statusDot, background: color, boxShadow: `0 0 6px ${color}` }} />
                  <span style={s.statusText}>{label}</span>
                  <span style={s.statusVal}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={s.marqueeWrap}>
        <div className="marquee-track" style={s.marqueeTrack}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={s.marqueeInner}>
              <b style={s.marqueeB}>AI AUTOMATION</b><em style={s.marqueeEm}>✦</em>
              <b style={s.marqueeB}>WEBSITES</b><em style={s.marqueeEm}>✦</em>
              <b style={s.marqueeB}>DIGITAL SYSTEMS</b><em style={s.marqueeEm}>✦</em>
              <b style={s.marqueeB}>MARKETING</b><em style={s.marqueeEm}>✦</em>
              <b style={s.marqueeB}>GOONYA.COM.AU</b><em style={s.marqueeEm}>✦</em>
              <b style={s.marqueeB}>BUILD WHAT'S NEXT</b><em style={s.marqueeEm}>✦</em>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={s.statsStrip} className="stagger-parent">
        {[
          { v: "40",  s: "+", l: "Projects Delivered" },
          { v: "0.8", s: "s", l: "Avg AI Response" },
          { v: "98",  s: "%", l: "Client Satisfaction" },
          { v: "120", s: "h", l: "Hours Saved / Client" },
        ].map(({ v, s: suffix, l }, i) => (
          <div className="stagger-child" key={l}
            style={i < 3 ? s.statItem : s.statItemLast}>
            <div style={s.statNum}>
              <span className="stat-number" data-target={v}>0</span>
              <sup style={s.statSup}>{suffix}</sup>
            </div>
            <p style={s.statLbl}>{l}</p>
          </div>
        ))}
      </div>

      {/* ── STATEMENT ── */}
      <div className="dark-section" style={s.darkSection}>
        <div style={s.sectionInner}>
          <div className="reveal" style={s.eyebrow}>
            <span style={s.eyebrowLine} />
            01 / THE GOONYA IDEA
          </div>
          <h2 className="reveal" style={{ ...s.sectionH2, maxWidth: "800px" }}>
            Your business has
            <span style={s.accent}> enough to think about.</span>
          </h2>
          <p className="reveal" style={s.sectionP}>
            Your technology shouldn't be one of them. We connect the digital
            pieces behind your business so everything works together — invisibly, reliably, at scale.
          </p>
        </div>
      </div>

      {/* ── HORIZONTAL SCROLL SERVICES ── */}
      <div className="h-scroll-section" style={s.hScrollSection}>
        <div style={{ padding: "80px 5vw 30px" }}>
          <div className="reveal" style={s.eyebrow}>
            <span style={s.eyebrowLine} />
            02 / WHAT WE DO
          </div>
          <h2 className="reveal" style={s.sectionH2}>
            The machine <span style={s.accent}>behind your business.</span>
          </h2>
        </div>
        <div className="h-scroll-track" style={s.hScrollTrack}>
          {cards.map(({ n, title, desc, glow }) => (
            <Link to="/services" key={n} style={{ ...s.hCard, textDecoration: "none" }}>
              <div style={{ ...s.hCardGlow, background: `radial-gradient(circle, ${glow}, transparent 70%)` }} />
              <div style={s.hCardNum}>{n}</div>
              <div style={s.hCardTitle}>{title}</div>
              <p style={s.hCardDesc}>{desc}</p>
              <span style={s.hCardArrow}>↗</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── VIDEO ── */}
      <div style={{ ...s.videoSection, margin: "80px auto 120px" }}>
        <div style={s.videoWrap}>
          <video
            style={s.videoEl}
            autoPlay muted playsInline
            onEnded={e => { e.target.currentTime = e.target.duration; e.target.play(); }}
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
          <div style={s.videoOverlay} />
          <div style={s.videoCopy}>
            <div style={s.videoEyebrow}>THE DIGITAL MACHINE</div>
            <h2 style={s.videoH2}>
              BUILD ONCE.<br />
              <em style={s.videoEm}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div style={{ background: "#070707", padding: "0 0 120px" }}>
        <div style={s.sectionInner}>
          <div className="reveal" style={s.eyebrow}>
            <span style={s.eyebrowLine} />
            03 / HOW IT WORKS
          </div>
          <h2 className="reveal" style={s.sectionH2}>
            Simple process. <span style={s.accent}>Serious results.</span>
          </h2>
          <div className="stagger-parent" style={s.processGrid}>
            {[
              { n: "01", t: "Discovery", d: "We learn your business, your bottlenecks, your goals." },
              { n: "02", t: "Strategy",  d: "We map the exact digital system your business needs." },
              { n: "03", t: "Build",     d: "We execute fast, without cutting corners." },
              { n: "04", t: "Launch",    d: "We go live, track results, and keep improving." },
            ].map(({ n, t, d }) => (
              <div className="stagger-child" key={n} style={s.processStep}>
                <div style={s.stepN}>{n}</div>
                <div style={s.stepLine} />
                <strong style={s.stepTitle}>{t}</strong>
                <p style={s.stepDesc}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={s.ctaSection}>
        <div className="reveal" style={s.eyebrow}>
          <span style={s.eyebrowLine} />
          04 / READY?
        </div>
        <h2 className="reveal" style={s.ctaH2}>
          Let's build something<br />
          <span style={s.accent}>people remember.</span>
        </h2>
        <div className="reveal">
          <Link to="/contact" style={{ ...s.btnPrimary, padding: "20px 40px", fontSize: "16px" }}>
            Start a project <span>↗</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;
