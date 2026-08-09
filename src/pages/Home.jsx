import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   NEURAL NETWORK CANVAS
───────────────────────────────────────── */
function NeuralNet({ style }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let W = cv.width  = cv.offsetWidth;
    let H = cv.height = cv.offsetHeight;

    const NODE_COUNT = 28;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(155,124,255,${(1 - dist / 130) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach(n => {
        n.pulse += 0.04;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,124,255,${0.5 + glow * 0.5})`;
        ctx.fill();

        // move
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = cv.width  = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block", ...style }} />;
}

/* ─────────────────────────────────────────
   PROFIT BARS
───────────────────────────────────────── */
function ProfitChart() {
  const bars = [
    { h: 35, label: "Q1", val: "$12k" },
    { h: 52, label: "Q2", val: "$18k" },
    { h: 44, label: "Q3", val: "$15k" },
    { h: 78, label: "Q4", val: "$27k" },
  ];

  useEffect(() => {
    gsap.from(".pchart-bar", {
      scaleY: 0, duration: 1.2, ease: "power3.out",
      stagger: 0.15, transformOrigin: "bottom",
      scrollTrigger: { trigger: ".profit-chart-wrap", start: "top 85%" },
    });
    gsap.from(".pchart-val", {
      opacity: 0, y: 8, duration: 0.5,
      stagger: 0.15, delay: 0.6,
      scrollTrigger: { trigger: ".profit-chart-wrap", start: "top 85%" },
      clearProps: "all",
    });
  }, []);

  return (
    <div className="profit-chart-wrap" style={{
      background: "rgba(13,13,20,.95)",
      border: "1px solid rgba(155,124,255,.2)",
      borderRadius: "16px",
      padding: "28px 32px",
      backdropFilter: "blur(12px)",
      width: "280px",
    }}>
      <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#555", marginBottom: "20px" }}>
        REVENUE GROWTH
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "80px", marginBottom: "10px" }}>
        {bars.map((b, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 }}>
            <div className="pchart-val" style={{ fontSize: "9px", color: "#9b7cff", fontWeight: 600, letterSpacing: "0.5px" }}>
              {b.val}
            </div>
            <div className="pchart-bar" style={{
              width: "100%",
              height: `${b.h}px`,
              background: i === 3
                ? "linear-gradient(180deg, #9b7cff, #6b4cff)"
                : `rgba(155,124,255,${0.2 + i * 0.1})`,
              borderRadius: "4px 4px 0 0",
              transformOrigin: "bottom",
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {bars.map((b, i) => (
          <div key={i} style={{ fontSize: "9px", color: "#444", flex: 1, textAlign: "center" }}>{b.label}</div>
        ))}
      </div>
      <div style={{
        marginTop: "16px", paddingTop: "14px",
        borderTop: "1px solid rgba(255,255,255,.06)",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
        <span style={{ fontSize: "11px", color: "#666" }}>+125% avg client growth</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // ── FORCE VISIBLE ──
    gsap.set(".hero-line, .home-kicker, .hero-desc, .hero-ctas, .hero-right", {
      opacity: 1, y: 0, x: 0, scale: 1,
    });
    gsap.set(".reveal, .stagger-child", { opacity: 1, y: 0 });

    // ── HERO ENTRANCE ──
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(".home-kicker",  { opacity: 0, y: 20, duration: 0.6, clearProps: "all" })
      .from(".hero-line",    { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power3.out", clearProps: "all" }, "-=0.3")
      .from(".hero-desc",    { opacity: 0, y: 20, duration: 0.6, clearProps: "all" }, "-=0.4")
      .from(".hero-ctas",    { opacity: 0, y: 15, duration: 0.5, clearProps: "all" }, "-=0.3")
      .from(".hero-right",   { opacity: 0, x: 40, duration: 1, ease: "power3.out", clearProps: "all" }, "-=0.7");

    // ── MARQUEE ──
    gsap.to(".marquee-track", { xPercent: -50, duration: 28, repeat: -1, ease: "none" });

    // ── SCROLL REVEALS ──
    gsap.utils.toArray(".reveal").forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0, y: 40, duration: 0.85, ease: "power3.out", clearProps: "all",
      });
    });

    gsap.utils.toArray(".stagger-parent").forEach(parent => {
      gsap.from(parent.querySelectorAll(".stagger-child"), {
        scrollTrigger: { trigger: parent, start: "top 88%" },
        opacity: 0, y: 35, stagger: 0.1, duration: 0.7, ease: "power3.out", clearProps: "all",
      });
    });

    // ── STAT COUNTERS ──
    gsap.utils.toArray(".stat-num").forEach(el => {
      const target = parseFloat(el.dataset.target);
      const isFloat = String(target).includes(".");
      ScrollTrigger.create({
        trigger: el, start: "top 90%",
        onEnter: () => gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: "power2.out",
          onUpdate: function () {
            el.textContent = isFloat
              ? this.targets()[0].val.toFixed(1)
              : Math.round(this.targets()[0].val);
          },
        }),
      });
    });

    // ── VIDEO PING-PONG ──
    const vid = videoRef.current;
    if (vid) {
      vid.playbackRate = 0.65;
      vid.addEventListener("ended", () => {
        vid.playbackRate = -0.65;
        vid.play().catch(() => {
          // fallback: just restart
          vid.currentTime = 0;
          vid.playbackRate = 0.65;
          vid.play();
        });
      });
    }

    // ── NUMBER COUNT ON HERO ──
    let count = 0;
    const heroCount = document.querySelector(".hero-count");
    if (heroCount) {
      const iv = setInterval(() => {
        count += Math.floor(Math.random() * 12) + 1;
        if (count >= 840) { count = 840; clearInterval(iv); }
        heroCount.textContent = count;
      }, 30);
    }

    // ── BG COLOUR SHIFT ON SCROLL ──
    ScrollTrigger.create({
      trigger: ".shift-section",
      start: "top 55%",
      onEnter: () => gsap.to(".home-page", { backgroundColor: "#08061a", duration: 1.5 }),
      onLeaveBack: () => gsap.to(".home-page", { backgroundColor: "#070707", duration: 1.5 }),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const accent = "#9b7cff";
  const line   = "rgba(255,255,255,.07)";

  return (
    <div className="home-page" style={{ background: "#070707", overflowX: "hidden" }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>

        {/* ambient bg */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 70% 70% at 65% 50%, rgba(155,124,255,.1) 0%, transparent 70%)`,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          width: "min(1400px, 90vw)",
          margin: "0 auto",
          padding: "130px 0 100px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}>

          {/* ── LEFT ── */}
          <div>
            {/* kicker pill */}
            <div className="home-kicker" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "7px 16px",
              border: `1px solid rgba(155,124,255,.35)`,
              borderRadius: "100px",
              background: "rgba(155,124,255,.08)",
              fontSize: "11px", letterSpacing: "2.5px", color: accent,
              marginBottom: "36px",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: accent, boxShadow: `0 0 10px ${accent}`,
                flexShrink: 0, animation: "pulse-dot 2s infinite",
              }} />
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            {/* headline — big, never shrinks below 64px */}
            <h1 style={{ margin: 0, lineHeight: 0.88 }}>
              <span className="hero-line" style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(64px, 7.5vw, 112px)",
                fontWeight: 700, letterSpacing: "-4px",
                color: "white",
              }}>YOUR BUSINESS.</span>

              <span className="hero-line" style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(64px, 7.5vw, 112px)",
                fontWeight: 700, letterSpacing: "-4px",
                background: `linear-gradient(90deg, ${accent} 0%, #e0b0ff 60%, ${accent} 100%)`,
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>BUT SMARTER.</span>

              <span className="hero-line" style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(64px, 7.5vw, 112px)",
                fontWeight: 700, letterSpacing: "-4px",
                color: "white",
              }}>AUTOMATED.</span>
            </h1>

            <p className="hero-desc" style={{
              maxWidth: "440px", marginTop: "36px",
              color: "#777", fontSize: "17px", lineHeight: 1.75,
            }}>
              Goonya builds websites, AI automation and digital systems
              that help ambitious businesses attract customers,
              save time and grow fast.
            </p>

            <div className="hero-ctas" style={{
              display: "flex", alignItems: "center", gap: "16px",
              marginTop: "44px", flexWrap: "wrap",
            }}>
              <Link to="/services" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 32px",
                background: "white", color: "black",
                borderRadius: "100px", fontWeight: 700, fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 0 40px rgba(155,124,255,.25)",
              }}>
                Explore what we do <span>↗</span>
              </Link>
              <Link to="/our-work" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 32px", color: "white", fontSize: "14px",
                textDecoration: "none", borderRadius: "100px",
                border: `1px solid rgba(255,255,255,.15)`,
              }}>
                See our work <span>↓</span>
              </Link>
            </div>

            {/* live counter pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginTop: "36px",
              padding: "8px 16px",
              background: "rgba(74,222,128,.08)",
              border: "1px solid rgba(74,222,128,.2)",
              borderRadius: "100px",
              fontSize: "12px", color: "#4ade80",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#4ade80", boxShadow: "0 0 8px #4ade80",
              }} />
              <span className="hero-count">0</span> AI tasks automated today
            </div>
          </div>

          {/* ── RIGHT — Neural Net + Charts ── */}
          <div className="hero-right" style={{ position: "relative", height: "520px" }}>

            {/* neural net canvas */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "4px",
              overflow: "hidden",
              border: `1px solid ${line}`,
              background: "rgba(13,10,26,.6)",
            }}>
              <NeuralNet style={{}} />
              {/* centre label */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px", letterSpacing: "3px", color: accent,
                  marginBottom: "6px",
                }}>GOONYA AI</div>
                <div style={{
                  width: "48px", height: "48px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(155,124,255,.6), transparent 70%)`,
                  filter: "blur(8px)",
                  margin: "0 auto",
                }} />
              </div>
            </div>

            {/* profit chart — bottom left */}
            <div style={{
              position: "absolute", bottom: "-20px", left: "-24px", zIndex: 3,
            }}>
              <ProfitChart />
            </div>

            {/* status card — top right */}
            <div style={{
              position: "absolute", top: "20px", right: "-20px", zIndex: 3,
              background: "rgba(13,13,20,.95)",
              border: `1px solid ${line}`,
              borderRadius: "14px",
              padding: "18px 22px",
              backdropFilter: "blur(12px)",
              minWidth: "190px",
            }}>
              {[
                { color: "#4ade80", label: "Systems live",  val: "12" },
                { color: accent,    label: "AI tasks / day", val: "840" },
                { color: "#f87171", label: "Hours saved",   val: "∞" },
              ].map(({ color, label, val }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "12px",
                }}>
                  <span style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: color, boxShadow: `0 0 6px ${color}`,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "12px", color: "#666", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: "12px", color: "white", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MARQUEE
      ══════════════════════════════ */}
      <div style={{
        overflow: "hidden",
        borderTop: `1px solid ${line}`,
        borderBottom: `1px solid ${line}`,
        padding: "13px 0",
        background: "rgba(255,255,255,.01)",
      }}>
        <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "28px", paddingRight: "28px" }}>
              {["AI AUTOMATION","WEBSITES","DIGITAL SYSTEMS","MARKETING","GOONYA.COM.AU","BUILD WHAT'S NEXT"].map(w => (
                <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: "28px" }}>
                  <b style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: 500, color: "#333" }}>{w}</b>
                  <em style={{ fontStyle: "normal", color: accent, fontSize: "9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          STATS
      ══════════════════════════════ */}
      <div style={{ width: "min(1400px, 90vw)", margin: "0 auto" }}>
        <div className="stagger-parent" style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          borderBottom: `1px solid ${line}`,
        }}>
          {[
            { v: "40",  s: "+", l: "Projects Delivered" },
            { v: "0.8", s: "s", l: "Avg AI Response" },
            { v: "98",  s: "%", l: "Client Satisfaction" },
            { v: "120", s: "h", l: "Hours Saved / Client" },
          ].map(({ v, s, l }, i) => (
            <div className="stagger-child" key={l} style={{
              padding: "60px 40px",
              borderRight: i < 3 ? `1px solid ${line}` : "none",
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(44px, 4vw, 72px)",
                fontWeight: 700, letterSpacing: "-3px", lineHeight: 1,
                color: "white",
              }}>
                <span className="stat-num" data-target={v}>0</span>
                <sup style={{ fontSize: ".4em", color: accent, verticalAlign: "super" }}>{s}</sup>
              </div>
              <p style={{ marginTop: "8px", fontSize: "12px", letterSpacing: "1px", color: "#444" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          STATEMENT (bg shift)
      ══════════════════════════════ */}
      <div className="shift-section" style={{ padding: "130px 0" }}>
        <div style={{ width: "min(1400px, 90vw)", margin: "0 auto" }}>
          <div className="reveal" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontSize: "11px", letterSpacing: "2.5px", color: "#444",
            marginBottom: "28px",
          }}>
            <span style={{ width: "20px", height: "1px", background: accent }} />
            01 / THE GOONYA IDEA
          </div>

          <h2 className="reveal" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(40px, 5vw, 80px)",
            fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.0,
            color: "white", maxWidth: "900px", marginBottom: "28px",
          }}>
            Your business has
            <span style={{ color: accent }}> enough to think about.</span>
          </h2>

          <p className="reveal" style={{
            color: "#555", fontSize: "18px", lineHeight: 1.75,
            maxWidth: "520px",
          }}>
            Your technology shouldn't be one of them. We connect the digital
            pieces behind your business so everything works together —
            invisibly, reliably, at scale.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          SERVICES GRID
      ══════════════════════════════ */}
      <div style={{ width: "min(1400px, 90vw)", margin: "0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontSize: "11px", letterSpacing: "2.5px", color: "#444",
            marginBottom: "20px",
          }}>
            <span style={{ width: "20px", height: "1px", background: accent }} />
            02 / WHAT WE DO
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 4vw, 62px)",
            fontWeight: 700, letterSpacing: "-2.5px",
            color: "white",
          }}>
            The machine <span style={{ color: accent }}>behind your business.</span>
          </h2>
        </div>

        <div className="stagger-parent" style={{
          display: "grid", gridTemplateColumns: "repeat(2,1fr)",
          gap: "1px", background: line,
          border: `1px solid ${line}`,
        }}>
          {[
            { n:"01", title:"AI Automation", desc:"Eliminate repetitive tasks. Let intelligent systems handle the work so your team focuses on what actually matters.", glow:"rgba(155,124,255,.35)" },
            { n:"02", title:"Website Design", desc:"High-performance websites that convert visitors into customers. Built fast, designed to last, optimised to grow.", glow:"rgba(0,210,190,.25)" },
            { n:"03", title:"Digital Marketing", desc:"Get discovered by the right people at the right time. Data-driven campaigns that grow revenue, not just traffic.", glow:"rgba(255,100,180,.2)" },
            { n:"04", title:"Systems Integration", desc:"Connect your tools, automate your workflows, and make your entire business run as one smart, efficient machine.", glow:"rgba(100,200,255,.2)" },
          ].map(({ n, title, desc, glow }) => (
            <Link to="/services" key={n} style={{
              display: "block", padding: "52px 48px",
              background: "#0a0a12",
              textDecoration: "none",
              position: "relative", overflow: "hidden",
              transition: "background .3s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#0f0f1a"}
              onMouseLeave={e => e.currentTarget.style.background = "#0a0a12"}
            >
              <div style={{
                position: "absolute", top: "-60px", right: "-60px",
                width: "200px", height: "200px", borderRadius: "50%",
                background: `radial-gradient(circle, ${glow}, transparent 70%)`,
                filter: "blur(30px)", pointerEvents: "none",
              }} />
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: accent, marginBottom: "48px", fontFamily: "'Space Grotesk', sans-serif" }}>{n}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, letterSpacing: "-1px", color: "white", marginBottom: "14px" }}>{title}</h3>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.65, maxWidth: "340px" }}>{desc}</p>
              <div style={{ marginTop: "36px", fontSize: "20px", color: accent }}>↗</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          VIDEO (ping-pong, slow)
      ══════════════════════════════ */}
      <div className="reveal" style={{ width: "min(1400px, 90vw)", margin: "0 auto 130px" }}>
        <div style={{
          position: "relative", height: "560px",
          overflow: "hidden",
          border: `1px solid ${line}`,
        }}>
          <video
            ref={videoRef}
            autoPlay muted playsInline
            style={{ width: "100%", height: "120%", objectFit: "cover", display: "block" }}
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(7,7,7,.9) 0%, rgba(7,7,7,.2) 60%, transparent 100%)",
          }} />
          <div style={{ position: "absolute", bottom: "52px", left: "52px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#555" }}>THE DIGITAL MACHINE</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(40px, 5.5vw, 82px)",
              fontWeight: 700, letterSpacing: "-3px", lineHeight: .9,
              marginTop: "14px", color: "white",
            }}>
              BUILD ONCE.<br />
              <em style={{ fontStyle: "normal", color: accent }}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          PROCESS
      ══════════════════════════════ */}
      <div style={{ width: "min(1400px, 90vw)", margin: "0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontSize: "11px", letterSpacing: "2.5px", color: "#444",
            marginBottom: "20px",
          }}>
            <span style={{ width: "20px", height: "1px", background: accent }} />
            03 / HOW IT WORKS
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 4vw, 62px)",
            fontWeight: 700, letterSpacing: "-2.5px",
            color: "white",
          }}>
            Simple process. <span style={{ color: accent }}>Serious results.</span>
          </h2>
        </div>

        <div className="stagger-parent" style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: "1px", background: line, border: `1px solid ${line}`,
        }}>
          {[
            { n:"01", t:"Discovery",  d:"We learn your business, bottlenecks and goals." },
            { n:"02", t:"Strategy",   d:"We map the exact digital system you need." },
            { n:"03", t:"Build",      d:"We execute fast, without cutting corners." },
            { n:"04", t:"Launch",     d:"We go live, track results, keep improving." },
          ].map(({ n, t, d }) => (
            <div className="stagger-child" key={n} style={{ padding: "44px 36px", background: "#070707" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: accent, marginBottom: "24px", fontFamily: "'Space Grotesk', sans-serif" }}>{n}</div>
              <div style={{ width: "28px", height: "1px", background: accent, marginBottom: "20px", opacity: .3 }} />
              <strong style={{ display: "block", fontSize: "18px", fontFamily: "'Space Grotesk', sans-serif", color: "white", marginBottom: "10px" }}>{t}</strong>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <div style={{
        width: "min(1400px, 90vw)", margin: "0 auto",
        padding: "130px 0 160px", textAlign: "center",
        borderTop: `1px solid ${line}`,
      }}>
        <div className="reveal" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontSize: "11px", letterSpacing: "2.5px", color: "#444",
          marginBottom: "24px",
        }}>
          <span style={{ width: "20px", height: "1px", background: accent }} />
          04 / READY?
        </div>

        <h2 className="reveal" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(48px, 7vw, 110px)",
          fontWeight: 700, letterSpacing: "-5px", lineHeight: .88,
          color: "white", margin: "0 0 56px",
        }}>
          Let's build something<br />
          <span style={{ color: accent }}>people remember.</span>
        </h2>

        <div className="reveal">
          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            padding: "20px 44px",
            background: "white", color: "black",
            borderRadius: "100px", fontWeight: 700, fontSize: "16px",
            textDecoration: "none",
            boxShadow: "0 0 60px rgba(155,124,255,.3)",
          }}>
            Start a project <span>↗</span>
          </Link>
        </div>
      </div>

      {/* pulse dot keyframe */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 6px #9b7cff; }
          50% { box-shadow: 0 0 16px #9b7cff, 0 0 30px rgba(155,124,255,.4); }
        }
      `}</style>

    </div>
  );
}
