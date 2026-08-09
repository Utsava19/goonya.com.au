import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const styles = {
  home: { overflowX: "hidden" },
  hero: {
    width: "min(1400px, 90vw)",
    margin: "auto",
    padding: "120px 0 140px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "70px",
    alignItems: "center",
  },
  kicker: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#666",
    fontSize: "11px",
    letterSpacing: "2.5px",
    marginBottom: "38px",
  },
  kickerLine: {
    width: "25px",
    height: "1px",
    background: "#9b7cff",
    display: "block",
    flexShrink: 0,
  },
  heroTitle: { overflow: "hidden" },
  heroLine: {
    display: "block",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(52px, 6vw, 100px)",
    lineHeight: 0.92,
    letterSpacing: "-4px",
    fontWeight: 700,
    overflow: "hidden",
    color: "white",
  },
  heroGradient: {
    display: "block",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(52px, 6vw, 100px)",
    lineHeight: 0.92,
    letterSpacing: "-4px",
    fontWeight: 700,
    overflow: "hidden",
    background: "linear-gradient(90deg, #9b7cff, #c4a9ff 80%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroDesc: {
    maxWidth: "460px",
    marginTop: "44px",
    color: "#888",
    fontSize: "17px",
    lineHeight: 1.75,
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "46px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 26px",
    background: "white",
    color: "black",
    borderRadius: "100px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 26px",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: "100px",
    fontSize: "14px",
    cursor: "pointer",
    color: "white",
    textDecoration: "none",
  },
  photoWrap: {
    position: "relative",
    height: "560px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orb: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(155,124,255,.22), transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  photoFrame: {
    position: "relative",
    width: "88%",
    height: "100%",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "4px",
  },
  photo: {
    width: "100%",
    height: "110%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
    filter: "brightness(.85) saturate(.8)",
  },
  photoGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(7,7,7,0) 40%, rgba(7,7,7,.55) 100%)",
  },
  card: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "11px 17px",
    background: "rgba(10,10,10,.85)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: "12px",
    fontSize: "13px",
    backdropFilter: "blur(12px)",
    whiteSpace: "nowrap",
    zIndex: 2,
    color: "white",
  },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#f87171", boxShadow: "0 0 8px #f87171", flexShrink: 0 },
  dotGreen: { width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", flexShrink: 0 },
  dotPurple: { width: "8px", height: "8px", borderRadius: "50%", background: "#9b7cff", boxShadow: "0 0 8px #9b7cff", flexShrink: 0 },
  cardStrong: { color: "#9b7cff", fontWeight: 700 },
  marquee: {
    overflow: "hidden",
    borderTop: "1px solid rgba(255,255,255,.08)",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    padding: "15px 0",
    background: "rgba(255,255,255,.015)",
  },
  marqueeTrack: { display: "flex", width: "max-content" },
  marqueeInner: { display: "flex", alignItems: "center", gap: "30px", paddingRight: "30px" },
  marqueeB: { fontSize: "11px", letterSpacing: "2px", fontWeight: 500, color: "#444" },
  marqueeEm: { fontStyle: "normal", color: "#9b7cff", fontSize: "9px" },
  stats: {
    width: "min(1400px, 90vw)",
    margin: "80px auto",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    border: "1px solid rgba(255,255,255,.08)",
    background: "#0a0a0a",
  },
  statItem: { padding: "50px 38px", borderRight: "1px solid rgba(255,255,255,.08)" },
  statItemLast: { padding: "50px 38px" },
  statValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(40px, 3.5vw, 66px)",
    fontWeight: 700,
    letterSpacing: "-3px",
    lineHeight: 1,
    color: "white",
  },
  statSup: { fontSize: ".4em", color: "#9b7cff", verticalAlign: "super", letterSpacing: 0 },
  statLabel: { marginTop: "10px", fontSize: "12px", letterSpacing: "1px", color: "#555" },
  statement: {
    width: "min(860px, 90vw)",
    margin: "0 auto",
    padding: "110px 0",
    textAlign: "center",
  },
  sectionLabel: { fontSize: "11px", letterSpacing: "2px", color: "#555", display: "block", marginBottom: "16px" },
  statementH2: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(34px, 4vw, 62px)",
    fontWeight: 600,
    letterSpacing: "-2.5px",
    lineHeight: 1.06,
    margin: "24px 0 22px",
    color: "white",
  },
  accent: { color: "#9b7cff" },
  statementP: { color: "#666", fontSize: "18px", lineHeight: 1.75 },
  videoSection: { width: "min(1400px, 90vw)", margin: "0 auto 100px" },
  videoContainer: { position: "relative", height: "540px", overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" },
  videoEl: { width: "100%", height: "120%", objectFit: "cover", display: "block" },
  videoOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,7,7,.88) 0%, rgba(7,7,7,.3) 60%, transparent 100%)" },
  videoCopy: { position: "absolute", bottom: "50px", left: "50px" },
  videoCopySpan: { fontSize: "11px", letterSpacing: "2.5px", color: "#555" },
  videoCopyH2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 5vw, 76px)", fontWeight: 700, letterSpacing: "-3px", lineHeight: .92, marginTop: "14px", color: "white" },
  videoCopyEm: { fontStyle: "normal", color: "#9b7cff" },
  servicesSection: { width: "min(1400px, 90vw)", margin: "0 auto 100px" },
  sectionHeader: { marginBottom: "50px" },
  sectionH2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 600, letterSpacing: "-2px", lineHeight: 1.08, color: "white" },
  previewGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)" },
  previewCard: { display: "flex", alignItems: "center", gap: "22px", padding: "42px 34px", background: "#0a0a0a", cursor: "pointer", textDecoration: "none" },
  previewNum: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "38px", fontWeight: 700, color: "rgba(255,255,255,.06)", letterSpacing: "-2px", flexShrink: 0 },
  previewDiv: { flex: 1 },
  previewStrong: { display: "block", fontSize: "12px", letterSpacing: "1.5px", marginBottom: "8px", color: "white" },
  previewP: { color: "#666", fontSize: "14px" },
  previewArrow: { fontSize: "18px", color: "#9b7cff", flexShrink: 0 },
  processSection: { width: "min(1400px, 90vw)", margin: "0 auto 100px" },
  processGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)", marginTop: "50px" },
  processStep: { padding: "44px 34px", background: "#0a0a0a" },
  stepNum: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "#9b7cff", marginBottom: "24px" },
  stepLine: { width: "28px", height: "1px", background: "#9b7cff", marginBottom: "18px", opacity: .4 },
  stepTitle: { display: "block", fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "10px", color: "white" },
  stepDesc: { color: "#666", fontSize: "14px", lineHeight: 1.6 },
  cta: { width: "min(1400px, 90vw)", margin: "0 auto", padding: "120px 0 150px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.08)" },
  ctaH2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5vw, 86px)", fontWeight: 700, letterSpacing: "-4px", lineHeight: .94, margin: "22px 0 50px", color: "white" },
  ctaBtn: { display: "inline-flex", alignItems: "center", gap: "10px", padding: "19px 36px", background: "white", color: "black", borderRadius: "100px", fontWeight: 600, fontSize: "16px", cursor: "pointer", textDecoration: "none" },
};

function Home() {
  useEffect(() => {

    // Force everything visible first as fallback
    gsap.set(".hero-line, .home-kicker, .hero-description, .hero-actions, .hero-photo-wrap", {
      opacity: 1, y: 0, x: 0, scale: 1,
    });
    gsap.set(".reveal, .stagger-child", { opacity: 1, y: 0 });

    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(".home-kicker",      { opacity: 0, y: 30, duration: 0.7, clearProps: "all" })
      .from(".hero-line",        { opacity: 0, y: 80, stagger: 0.12, duration: 1, ease: "power4.out", clearProps: "all" }, "-=0.4")
      .from(".hero-description", { opacity: 0, y: 30, duration: 0.7, clearProps: "all" }, "-=0.5")
      .from(".hero-actions",     { opacity: 0, y: 20, duration: 0.6, clearProps: "all" }, "-=0.4")
      .from(".hero-photo-wrap",  { opacity: 0, scale: 0.92, x: 40, duration: 1.2, ease: "power3.out", clearProps: "all" }, "-=0.9");

    // Floating cards
    gsap.to(".floating-card", { y: -16, duration: 2.8, repeat: -1, yoyo: true, stagger: 0.6, ease: "sine.inOut" });

    // Orb drift
    gsap.to(".hero-orb", { y: -40, x: 25, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Marquee
    gsap.to(".marquee-track", { xPercent: -50, duration: 22, repeat: -1, ease: "none" });

    // Scroll reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", clearProps: "all",
      });
    });

    // Stagger children
    gsap.utils.toArray(".stagger-parent").forEach((parent) => {
      gsap.from(parent.querySelectorAll(".stagger-child"), {
        scrollTrigger: { trigger: parent, start: "top 90%" },
        opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: "power3.out", clearProps: "all",
      });
    });

    // Stat counters
    gsap.utils.toArray(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = el.dataset.target.includes(".");
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
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

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={styles.home}>

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <div className="home-kicker" style={styles.kicker}>
            <span style={styles.kickerLine} />
            DIGITAL SYSTEMS FOR MODERN BUSINESS
          </div>
          <h1 style={styles.heroTitle}>
            <div className="hero-line" style={styles.heroLine}>YOUR BUSINESS.</div>
            <div className="hero-line" style={styles.heroGradient}>BUT SMARTER.</div>
            <div className="hero-line" style={styles.heroLine}>AUTOMATED.</div>
          </h1>
          <p className="hero-description" style={styles.heroDesc}>
            Goonya builds websites, AI automation and digital systems that help
            ambitious businesses attract customers, save time and grow.
          </p>
          <div className="hero-actions" style={styles.heroActions}>
            <Link to="/services" style={styles.primaryBtn}>Explore what we do <span>↗</span></Link>
            <Link to="/our-work" style={styles.secondaryBtn}>See our work <span>↓</span></Link>
          </div>
        </div>

        <div className="hero-photo-wrap" style={styles.photoWrap}>
          <div className="hero-orb" style={styles.orb} />
          <div style={styles.photoFrame}>
            <img
              className="hero-photo"
              style={styles.photo}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="Team working"
            />
            <div style={styles.photoGradient} />
          </div>
          <div className="floating-card" style={{...styles.card, top:"12%", left:"-6%"}}>
            <span style={styles.dot}/> New enquiry <strong style={styles.cardStrong}>+1</strong>
          </div>
          <div className="floating-card" style={{...styles.card, top:"48%", right:"-6%"}}>
            <span style={styles.dotGreen}/> AI response <strong style={styles.cardStrong}>0.8s</strong>
          </div>
          <div className="floating-card" style={{...styles.card, bottom:"12%", left:"4%"}}>
            <span style={styles.dotPurple}/> Customer converted <strong style={styles.cardStrong}>$420</strong>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={styles.marquee}>
        <div className="marquee-track" style={styles.marqueeTrack}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={styles.marqueeInner}>
              <b style={styles.marqueeB}>AI AUTOMATION</b><em style={styles.marqueeEm}>✦</em>
              <b style={styles.marqueeB}>WEBSITES</b><em style={styles.marqueeEm}>✦</em>
              <b style={styles.marqueeB}>DIGITAL SYSTEMS</b><em style={styles.marqueeEm}>✦</em>
              <b style={styles.marqueeB}>MARKETING</b><em style={styles.marqueeEm}>✦</em>
              <b style={styles.marqueeB}>GOONYA.COM.AU</b><em style={styles.marqueeEm}>✦</em>
              <b style={styles.marqueeB}>BUILD WHAT'S NEXT</b><em style={styles.marqueeEm}>✦</em>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="stagger-parent" style={styles.stats}>
        {[
          { label: "Projects Delivered",  value: "40",  suffix: "+" },
          { label: "Avg Response Time",   value: "0.8", suffix: "s" },
          { label: "Client Satisfaction", value: "98",  suffix: "%" },
          { label: "Hours Saved / Client",value: "120", suffix: "h" },
        ].map(({ label, value, suffix }, i) => (
          <div className="stagger-child" key={label}
            style={i === 3 ? styles.statItemLast : styles.statItem}>
            <div style={styles.statValue}>
              <span className="stat-number" data-target={value}>0</span>
              <sup style={styles.statSup}>{suffix}</sup>
            </div>
            <p style={styles.statLabel}>{label}</p>
          </div>
        ))}
      </section>

      {/* STATEMENT */}
      <section style={styles.statement}>
        <span className="reveal" style={styles.sectionLabel}>01 / THE GOONYA IDEA</span>
        <h2 className="reveal" style={styles.statementH2}>
          Your business has <span style={styles.accent}>enough to think about.</span>
        </h2>
        <p className="reveal" style={styles.statementP}>
          Your technology shouldn't be one of them. We connect the digital
          pieces behind your business so everything works together.
        </p>
      </section>

      {/* VIDEO */}
      <section className="reveal" style={styles.videoSection}>
        <div style={styles.videoContainer}>
          <video autoPlay muted loop playsInline style={styles.videoEl}>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
          <div style={styles.videoOverlay} />
          <div style={styles.videoCopy}>
            <span style={styles.videoCopySpan}>THE DIGITAL MACHINE</span>
            <h2 style={styles.videoCopyH2}>
              BUILD ONCE.<br />
              <em style={styles.videoCopyEm}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={styles.servicesSection}>
        <div className="reveal" style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>02 / WHAT WE DO</span>
          <h2 style={styles.sectionH2}>
            We build the <span style={styles.accent}>machine behind your business.</span>
          </h2>
        </div>
        <div className="stagger-parent" style={styles.previewGrid}>
          {[
            { n: "01", title: "AI AUTOMATION", desc: "Make repetitive work disappear." },
            { n: "02", title: "WEBSITES",      desc: "Turn attention into customers." },
            { n: "03", title: "MARKETING",     desc: "Get discovered. Get chosen." },
          ].map(({ n, title, desc }) => (
            <Link to="/services" className="stagger-child" key={n} style={styles.previewCard}>
              <span style={styles.previewNum}>{n}</span>
              <div style={styles.previewDiv}>
                <strong style={styles.previewStrong}>{title}</strong>
                <p style={styles.previewP}>{desc}</p>
              </div>
              <b style={styles.previewArrow}>↗</b>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section style={styles.processSection}>
        <div className="reveal" style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>03 / HOW IT WORKS</span>
          <h2 style={styles.sectionH2}>
            Simple process. <span style={styles.accent}>Serious results.</span>
          </h2>
        </div>
        <div className="stagger-parent" style={styles.processGrid}>
          {[
            { n: "01", title: "Discovery", desc: "We learn your business, your bottlenecks, your goals." },
            { n: "02", title: "Strategy",  desc: "We map the digital system your business actually needs." },
            { n: "03", title: "Build",     desc: "We execute fast without cutting corners." },
            { n: "04", title: "Launch",    desc: "We go live and track what's working." },
          ].map(({ n, title, desc }) => (
            <div className="stagger-child" key={n} style={styles.processStep}>
              <div style={styles.stepNum}>{n}</div>
              <div style={styles.stepLine} />
              <strong style={styles.stepTitle}>{title}</strong>
              <p style={styles.stepDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <span className="reveal" style={styles.sectionLabel}>04 / READY?</span>
        <h2 className="reveal" style={styles.ctaH2}>
          Let's build something <span style={styles.accent}>people remember.</span>
        </h2>
        <div className="reveal">
          <Link to="/contact" style={styles.ctaBtn}>
            Start a project <span>↗</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
