import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── ANIMATED BACKGROUND CANVAS ── */
function LiveBg() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, raf, t = 0;
    const resize = () => {
      W = cv.width = cv.offsetWidth || window.innerWidth;
      H = cv.height = cv.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // nodes that connect like a brain/network
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      vx: (Math.random() - .5) * .015, vy: (Math.random() - .5) * .015,
      r: Math.random() * 1.5 + .5,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += .008;
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 100) n.vx *= -1;
        if (n.y < 0 || n.y > 100) n.vy *= -1;
        n.pulse += .03;
      });
      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = nodes[i].x / 100 * W, ay = nodes[i].y / 100 * H;
          const bx = nodes[j].x / 100 * W, by = nodes[j].y / 100 * H;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(155,124,255,${(1 - d / 120) * .15})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }
      }
      // nodes
      nodes.forEach(n => {
        const x = n.x / 100 * W, y = n.y / 100 * H;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y, n.r + glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,124,255,${.3 + glow * .4})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", zIndex:0, opacity:.6 }} />;
}

/* ── TYPEWRITER ── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    let timeout;
    if (!deleting && ci < word.length) {
      timeout = setTimeout(() => setCi(c => c + 1), 80);
    } else if (!deleting && ci === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && ci > 0) {
      timeout = setTimeout(() => setCi(c => c - 1), 45);
    } else if (deleting && ci === 0) {
      setDeleting(false);
      setWi(w => (w + 1) % words.length);
    }
    setDisplay(word.slice(0, ci));
    return () => clearTimeout(timeout);
  }, [ci, deleting, wi, words]);

  return (
    <span style={{ color:"#9b7cff" }}>
      {display}
      <span style={{ animation:"blink .7s infinite", borderRight:"2px solid #9b7cff", marginLeft:"2px" }}/>
    </span>
  );
}

/* ── COUNTER ── */
function AnimCounter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const isFloat = String(to).includes(".");
        const num = parseFloat(to);
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(isFloat ? (num * ease).toFixed(1) : Math.round(num * ease));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── SCROLL REVEAL HOOK ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0) scale(1)";
          }, (e.target.dataset.delay || 0) * 1);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .12 });
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px) scale(.98)";
      el.style.transition = "opacity .7s ease, transform .7s ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

/* ════════ ABOUT PAGE ════════ */
export default function About() {
  useReveal();
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  useEffect(() => {
    // hero text animate in
    const els = document.querySelectorAll(".ab-hero");
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity .8s ease ${i * .13}s, transform .8s ease ${i * .13}s`;
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
    });
  }, []);

  const values = [
    { title:"Speed over perfection",    desc:"We move fast, test quickly and improve continuously. Done beats perfect every time.", icon:"⚡" },
    { title:"Built for business owners", desc:"We're not an agency that disappears after launch. We're your digital partner long-term.", icon:"🤝" },
    { title:"Results you can measure",  desc:"Every system we build is tied to a real outcome — more leads, more time, more revenue.", icon:"📊" },
    { title:"No jargon, no bullshit",   desc:"We explain everything in plain language and only recommend what you actually need.", icon:"💬" },
  ];

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* ══ HERO with live background ══ */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden" }}>
        <LiveBg />
        {/* gradient overlay */}
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 80% 60% at 20% 50%, rgba(155,124,255,.12) 0%, transparent 60%)" }}/>

        <div style={{ position:"relative", zIndex:2, width:"min(1400px,90vw)",
          margin:"0 auto", padding:"130px 0 100px" }}>

          <div className="ab-hero" style={{ fontSize:"11px", letterSpacing:"2.5px",
            color:"#3a3a3a", marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>ABOUT GOONYA
          </div>

          {/* Typewriter headline */}
          <h1 className="ab-hero" style={{ margin:"0 0 12px", fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-3px", lineHeight:.92,
            fontSize:"clamp(48px,6.5vw,108px)", color:"white" }}>
            We build systems
          </h1>
          <h1 className="ab-hero" style={{ margin:"0 0 40px", fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-3px", lineHeight:.92,
            fontSize:"clamp(48px,6.5vw,108px)" }}>
            that make you&nbsp;
            <Typewriter words={["faster.", "smarter.", "better.", "unstoppable."]} />
          </h1>

          <p className="ab-hero" style={{ maxWidth:"500px", color:"#666",
            fontSize:"17px", lineHeight:1.75, marginBottom:"36px" }}>
            Goonya helps ambitious Australian businesses use technology, automation
            and digital systems to work smarter — and compete like companies twice their size.
          </p>

          <div className="ab-hero" style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
            <Link to="/services" style={{ display:"inline-flex", alignItems:"center",
              padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
              fontWeight:700, fontSize:"14px", textDecoration:"none",
              boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
              What we do
            </Link>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
              padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
              borderRadius:"100px", border:"1px solid rgba(255,255,255,.15)" }}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", borderBottom:`1px solid ${L}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}
          className="ab-stats-grid">
          {[
            { to:"40", suffix:"+", l:"Projects Delivered" },
            { to:"3",  suffix:"+", l:"Years Experience" },
            { to:"98", suffix:"%", l:"Client Satisfaction" },
            { to:"120",suffix:"h", l:"Avg Hours Saved" },
          ].map(({to,suffix,l},i) => (
            <div key={l} className="rv" data-delay={i * 120}
              style={{ padding:"60px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(44px,4vw,68px)", fontWeight:700, letterSpacing:"-3px",
                color:"white" }}>
                <AnimCounter to={to} suffix={suffix} />
              </div>
              <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ VALUES — horizontal scroll on mobile ══ */}
      <div style={{ padding:"100px 0" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="rv" style={{ fontSize:"11px", letterSpacing:"2.5px",
            color:"#3a3a3a", marginBottom:"48px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>WHAT WE STAND FOR
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)",
            gap:"1px", background:L, border:`1px solid ${L}` }}
            className="ab-values-grid">
            {values.map(({title,desc,icon},i) => (
              <div key={title} className="rv" data-delay={i * 100}
                style={{ padding:"44px 40px", background:"#08060f",
                  position:"relative", overflow:"hidden",
                  transition:"background .3s ease" }}
                onMouseEnter={e=>e.currentTarget.style.background="#0d0b18"}
                onMouseLeave={e=>e.currentTarget.style.background="#08060f"}>
                {/* animated corner glow */}
                <div style={{ position:"absolute", top:"-40px", right:"-40px",
                  width:"120px", height:"120px", borderRadius:"50%",
                  background:`radial-gradient(circle, rgba(155,124,255,.15), transparent 70%)`,
                  filter:"blur(20px)", pointerEvents:"none",
                  animation:`pulse ${2 + i * .4}s ease-in-out infinite alternate` }}/>
                <div style={{ fontSize:"28px", marginBottom:"16px" }}>{icon}</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
                  fontWeight:700, color:"white", marginBottom:"10px",
                  letterSpacing:"-.5px" }}>{title}</h3>
                <p style={{ fontSize:"14px", color:"#555", lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WHO WE ARE ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
        background:L, border:`1px solid ${L}` }} className="ab-who-grid">

        <div className="rv" style={{ padding:"70px 60px", background:"#08060f" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"22px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>WHO WE ARE
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(28px,3.5vw,48px)", fontWeight:700, letterSpacing:"-2px",
            color:"white", marginBottom:"22px", lineHeight:1.05 }}>
            A small team that<span style={{color:A}}> punches above its weight.</span>
          </h2>
          <p style={{ color:"#555", fontSize:"16px", lineHeight:1.8, marginBottom:"18px" }}>
            We're designers, developers and strategists based in Australia,
            working with ambitious businesses that want to grow — not just maintain.
          </p>
          <p style={{ color:"#444", fontSize:"16px", lineHeight:1.8 }}>
            We don't take on every client. We take on the right ones —
            businesses serious about using technology as a real competitive advantage.
          </p>
        </div>

        {/* animated mini dashboard */}
        <div className="rv" style={{ background:"#050410", padding:"60px 52px",
          position:"relative", overflow:"hidden", display:"flex",
          flexDirection:"column", justifyContent:"center" }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px",
            width:"300px", height:"300px", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(155,124,255,.12),transparent 70%)",
            filter:"blur(40px)", pointerEvents:"none" }}/>

          {/* live activity feed */}
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"11px", letterSpacing:"2px", color:"#3a3a3a",
              marginBottom:"20px" }}>LIVE ACTIVITY</div>
            {[
              { t:"New website launched", sub:"Hospitality client · just now",    c:"#4ade80", dot:"●" },
              { t:"Automation running",   sub:"840 tasks handled today",          c:A,         dot:"●" },
              { t:"Campaign live",        sub:"Instagram · 2,400 new reach",      c:"#f97316", dot:"●" },
              { t:"Admin tasks done",     sub:"14 / 14 complete today",           c:"#e879f9", dot:"●" },
            ].map(({t,sub,c,dot},i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px",
                padding:"12px 14px", background:"rgba(255,255,255,.03)",
                borderRadius:"10px", marginBottom:"8px",
                border:"1px solid rgba(255,255,255,.05)",
                animation:`slideIn .5s ease ${i*.15+.2}s both` }}>
                <span style={{ color:c, fontSize:"8px", flexShrink:0,
                  textShadow:`0 0 8px ${c}`, animation:`dotPulse 1.5s ease ${i*.3}s infinite` }}>{dot}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"13px", color:"white", fontWeight:500 }}>{t}</div>
                  <div style={{ fontSize:"11px", color:"#444", marginTop:"2px" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA ══ */}
      <div className="rv" style={{ width:"min(1400px,90vw)", margin:"0 auto",
        padding:"100px 0 140px", textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700, letterSpacing:"-4px",
          lineHeight:.9, color:"white", margin:"0 0 48px" }}>
          Ready to move<br/><span style={{color:A}}>faster?</span>
        </h2>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
          padding:"18px 44px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Start a project
        </Link>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { from{opacity:.4;transform:scale(.9)} to{opacity:1;transform:scale(1.1)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        @keyframes dotPulse { 0%,100%{opacity:.4} 50%{opacity:1} }

        @media(max-width:850px){
          .ab-stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .ab-stats-grid > div:nth-child(2){ border-right:none !important; }
          .ab-stats-grid > div:nth-child(1),
          .ab-stats-grid > div:nth-child(2){ border-bottom:1px solid rgba(255,255,255,.08) !important; }
          .ab-stats-grid > div { padding:36px 24px !important; }
          .ab-values-grid { grid-template-columns:1fr !important; }
          .ab-who-grid { grid-template-columns:1fr !important; margin:0 auto 80px !important; }
          div[style*="padding:70px 60px"] { padding:40px 28px !important; }
          div[style*="padding:60px 52px"] { padding:36px 28px !important; }
          h1[style*="clamp(48px"] { letter-spacing:-2px !important; }
        }
      `}</style>
    </div>
  );
}
