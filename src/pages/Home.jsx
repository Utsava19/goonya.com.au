import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ── ROBOT SVG (pure SVG + CSS animations, no GSAP) ── */
function Robot() {
  const A = "#9b7cff";
  return (
    <svg viewBox="0 0 420 480" style={{ width:"100%", height:"100%", overflow:"visible" }}>
      <defs>
        <filter id="glow4">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <style>{`
          .r-arm1 { animation: armSwing1 2.5s ease-in-out infinite alternate; transform-origin: 148px 249px; }
          .r-arm2 { animation: armSwing2 2s ease-in-out infinite alternate; transform-origin: 148px 249px; }
          .r-eye  { animation: eyePulse 1.2s ease-in-out infinite alternate; }
          .r-node { animation: nodePulse 2s ease-in-out infinite alternate; }
          .r-node:nth-child(2) { animation-delay: .5s; }
          .r-node:nth-child(3) { animation-delay: 1s; }
          .r-node:nth-child(4) { animation-delay: 1.5s; }
          .r-pkt1 { animation: pkt 2s linear infinite; }
          .r-pkt2 { animation: pkt 2s linear infinite .8s; }
          .r-ring1 { animation: spin 12s linear infinite; transform-origin: 210px 280px; }
          .r-ring2 { animation: spinR 8s linear infinite; transform-origin: 210px 280px; }
          @keyframes armSwing1 { from{transform:rotate(-8deg)} to{transform:rotate(8deg)} }
          @keyframes armSwing2 { from{transform:rotate(6deg)} to{transform:rotate(-6deg)} }
          @keyframes eyePulse  { from{opacity:.6} to{opacity:.2} }
          @keyframes nodePulse { from{transform:scale(1)} to{transform:scale(1.15)} }
          @keyframes pkt { from{stroke-dashoffset:0} to{stroke-dashoffset:-220} }
          @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes spinR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        `}</style>
      </defs>

      {/* grid bg */}
      <g opacity=".1" stroke={A} strokeWidth=".7" fill="none">
        {[40,80,120,160,200,240,280,320,360,400].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" strokeDasharray="3 9"/>)}
        {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={`h${y}`} x1="0" y1={y} x2="420" y2={y} strokeDasharray="3 9"/>)}
      </g>

      {/* orbit rings */}
      <ellipse className="r-ring1" cx="210" cy="280" rx="160" ry="50" fill="none" stroke={A} strokeWidth=".8" opacity=".2" strokeDasharray="4 8"/>
      <ellipse className="r-ring2" cx="210" cy="280" rx="120" ry="35" fill="none" stroke={A} strokeWidth=".8" opacity=".15" strokeDasharray="2 6"/>

      {/* traces */}
      <path d="M40,440 L40,370 L120,370 L120,310" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" strokeDashoffset="0" opacity=".4"/>
      <path d="M380,440 L380,350 L300,350 L300,270" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" strokeDashoffset="0" opacity=".4"/>

      {/* data packets */}
      <path className="r-pkt1" d="M40,440 L40,370 L120,370 L120,310" stroke={A} strokeWidth="2.5" fill="none" strokeDasharray="8 212" strokeDashoffset="0" filter="url(#glow2)" opacity=".8"/>
      <path className="r-pkt2" d="M380,440 L380,350 L300,350 L300,270" stroke={A} strokeWidth="2.5" fill="none" strokeDasharray="8 212" strokeDashoffset="0" filter="url(#glow2)" opacity=".8"/>

      {/* base + legs */}
      <rect x="155" y="378" width="110" height="20" rx="4" fill="#1a1230" stroke={A} strokeWidth="1"/>
      <rect x="165" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
      <rect x="225" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>

      {/* torso */}
      <rect x="145" y="228" width="130" height="140" rx="12" fill="#0f0c1e" stroke={A} strokeWidth="1.2"/>
      <line x1="145" y1="276" x2="275" y2="276" stroke={A} strokeWidth=".6" opacity=".35"/>
      <line x1="145" y1="316" x2="275" y2="316" stroke={A} strokeWidth=".6" opacity=".35"/>
      <circle cx="168" cy="252" r="4" fill={A} filter="url(#glow2)" opacity=".9"/>
      <circle cx="185" cy="252" r="4" fill="#4ade80" filter="url(#glow2)" opacity=".9"/>
      <circle cx="202" cy="252" r="4" fill="#f87171" filter="url(#glow2)" opacity=".7"/>
      {/* chest screen */}
      <rect x="162" y="288" width="96" height="50" rx="6" fill="#080614" stroke={A} strokeWidth=".8"/>
      <text x="210" y="308" textAnchor="middle" fontSize="9" fill="#4ade80" fontFamily="monospace">■■■■■■░░</text>
      <text x="210" y="326" textAnchor="middle" fontSize="8" fill={A} fontFamily="monospace" opacity=".6">STATUS: OK</text>

      {/* neck */}
      <rect x="196" y="226" width="28" height="14" rx="3" fill="#1a1230" stroke={A} strokeWidth=".8"/>

      {/* head */}
      <rect x="155" y="138" width="110" height="88" rx="14" fill="#0f0c1e" stroke={A} strokeWidth="1.5"/>
      <ellipse className="r-eye" cx="191" cy="170" rx="14" ry="10" fill={A} opacity=".6"/>
      <ellipse className="r-eye" cx="229" cy="170" rx="14" ry="10" fill={A} opacity=".6"/>
      <ellipse cx="191" cy="170" rx="8" ry="7" fill={A} filter="url(#glow4)"/>
      <ellipse cx="229" cy="170" rx="8" ry="7" fill={A} filter="url(#glow4)"/>
      <circle cx="191" cy="170" r="3" fill="white"/>
      <circle cx="229" cy="170" r="3" fill="white"/>
      <rect x="178" y="196" width="64" height="6" rx="3" fill="#1a1230" stroke={A} strokeWidth=".8"/>
      <rect x="182" y="198" width="12" height="2" rx="1" fill={A} opacity=".8"/>
      <rect x="198" y="198" width="12" height="2" rx="1" fill={A} opacity=".5"/>
      <rect x="214" y="198" width="12" height="2" rx="1" fill={A} opacity=".8"/>

      {/* antenna */}
      <line x1="210" y1="138" x2="210" y2="113" stroke={A} strokeWidth="1.5"/>
      <circle cx="210" cy="106" r="7" fill="#0f0c1e" stroke={A} strokeWidth="1.5"/>
      <circle cx="210" cy="106" r="3" fill={A} filter="url(#glow4)"/>

      {/* LEFT ARM */}
      <g className="r-arm1">
        <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1"/>
        <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2"/>
        <g className="r-arm2">
          <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
          <path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9"/>
          <path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9"/>
        </g>
      </g>

      {/* RIGHT ARM */}
      <g transform="translate(420,0) scale(-1,1)">
        <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1"/>
        <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2"/>
        <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
        <path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9"/>
        <path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9"/>
      </g>

      {/* floating nodes */}
      {[
        {cx:50,  cy:118, label:"GROW"},
        {cx:372, cy:98,  label:"BUILD"},
        {cx:388, cy:298, label:"SCALE"},
        {cx:32,  cy:318, label:"WIN"},
      ].map(({cx,cy,label}) => (
        <g key={label} className="r-node">
          <circle cx={cx} cy={cy} r="24" fill="#0a0818" stroke={A} strokeWidth="1" opacity=".85"/>
          <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill={A} fontFamily="monospace" fontWeight="bold" letterSpacing="1">{label}</text>
          <line x1={cx<210?cx+24:cx-24} y1={cy}
            x2={cx<210?145:275} y2={cy<250?198:308}
            stroke={A} strokeWidth=".6" strokeDasharray="4 5" opacity=".28"/>
        </g>
      ))}

      {/* floor glow */}
      <ellipse cx="210" cy="398" rx="80" ry="12" fill={A} opacity=".1" filter="url(#glow4)"/>
    </svg>
  );
}

/* ── NUMBER COUNTER (safe, no GSAP) ── */
function Counter({ target, suffix }) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isFloat = String(target).includes(".");

    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 2000;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // IntersectionObserver — fires when visible
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { run(); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);

    // also run immediately if already visible
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) run();

    return () => obs.disconnect();
  }, [target, suffix]);

  return (
    <span ref={ref}>0{suffix}</span>
  );
}

/* ════════════════ HOME ════════════════ */
export default function Home() {
  useEffect(() => {
    // fade-in on load
    const items = document.querySelectorAll(".fi");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity .6s ease ${i * 0.08}s, transform .6s ease ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 30);
    });

    // marquee
    const track = document.querySelector(".mq-track");
    if (track) {
      let x = 0;
      const half = track.scrollWidth / 2;
      let raf;
      const move = () => {
        x -= 0.5;
        if (Math.abs(x) >= half) x = 0;
        track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(move);
      };
      move();
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";
  const BG = "#070707";

  return (
    <div style={{ background:BG, overflowX:"hidden" }}>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden",
        background:"radial-gradient(ellipse 70% 65% at 62% 45%, rgba(155,124,255,.1) 0%, transparent 70%)",
      }}>
        <div style={{ position:"relative", zIndex:1, width:"min(1400px,90vw)", margin:"0 auto",
          padding:"130px 0 100px", display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"60px", alignItems:"center" }}>

          {/* LEFT */}
          <div>
            <div className="fi" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"6px 16px", border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
              background:"rgba(155,124,255,.07)", fontSize:"11px", letterSpacing:"2.5px",
              color:A, marginBottom:"32px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:A,
                boxShadow:`0 0 10px ${A}`, animation:"pdot 2s infinite" }}/>
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            <h1 className="fi" style={{ margin:0, padding:0 }}>
              <span style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(72px,7.5vw,112px)", fontWeight:700,
                letterSpacing:"-4px", lineHeight:.92, color:"white", paddingBottom:"4px" }}>
                YOUR BUSINESS.
              </span>
              <span style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(72px,7.5vw,112px)", fontWeight:700,
                letterSpacing:"-4px", lineHeight:.92, paddingBottom:"4px",
                background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                BUT SMARTER.
              </span>
              <span style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(72px,7.5vw,112px)", fontWeight:700,
                letterSpacing:"-4px", lineHeight:.92, color:"white", paddingBottom:"4px" }}>
                AUTOMATED.
              </span>
            </h1>

            <p className="fi" style={{ maxWidth:"440px", marginTop:"32px",
              color:"#666", fontSize:"17px", lineHeight:1.75 }}>
              Goonya builds websites, automation and digital systems that help
              ambitious businesses attract customers, save time and grow fast.
            </p>

            <div className="fi" style={{ display:"flex", alignItems:"center",
              gap:"14px", marginTop:"40px", flexWrap:"wrap" }}>
              <Link to="/services" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"14px", textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
                Explore what we do <span>↗</span>
              </Link>
              <Link to="/our-work" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
                borderRadius:"100px", border:`1px solid rgba(255,255,255,.15)` }}>
                See our work <span>↓</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="fi" style={{ position:"relative", height:"500px" }}>
            <Robot/>

            {/* profit card */}
            <div style={{ position:"absolute", bottom:"-10px", left:"-20px", zIndex:4,
              background:"rgba(10,8,22,.95)", border:`1px solid rgba(155,124,255,.25)`,
              borderRadius:"16px", padding:"20px 24px", backdropFilter:"blur(16px)", width:"220px" }}>
              <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#555", marginBottom:"12px" }}>
                CLIENT REVENUE GROWTH
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"60px", marginBottom:"8px" }}>
                {[{h:34,c:"rgba(155,124,255,.3)"},{h:52,c:"rgba(155,124,255,.5)"},
                  {h:43,c:"rgba(155,124,255,.6)"},{h:75,c:"#9b7cff"}].map((b,i)=>(
                  <div key={i} style={{ flex:1, height:`${b.h}px`, background:b.c,
                    borderRadius:"3px 3px 0 0",
                    boxShadow:i===3?"0 0 12px rgba(155,124,255,.4)":"none",
                    animation:`barRise .8s ease ${i*.12}s both` }}/>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                {["Q1","Q2","Q3","Q4"].map(q=>(
                  <div key={q} style={{ fontSize:"9px", color:"#444", flex:1, textAlign:"center" }}>{q}</div>
                ))}
              </div>
              <div style={{ marginTop:"10px", paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,.05)",
                display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%",
                  background:"#4ade80", boxShadow:"0 0 6px #4ade80" }}/>
                <span style={{ fontSize:"10px", color:"#555" }}>+125% avg growth</span>
              </div>
            </div>

            {/* status card */}
            <div style={{ position:"absolute", top:"20px", right:"-20px", zIndex:4,
              background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
              borderRadius:"14px", padding:"16px 18px", backdropFilter:"blur(14px)", minWidth:"170px" }}>
              {[
                {c:"#4ade80", l:"Systems live", v:"12"},
                {c:A,         l:"Tasks / day",  v:"840"},
                {c:"#f87171", l:"Hours saved",  v:"∞"},
              ].map(({c,l,v}) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                  <span style={{ width:"7px", height:"7px", borderRadius:"50%",
                    background:c, boxShadow:`0 0 5px ${c}`, flexShrink:0 }}/>
                  <span style={{ fontSize:"11px", color:"#555", flex:1 }}>{l}</span>
                  <span style={{ fontSize:"11px", color:"white", fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="mq-track" style={{ display:"flex", width:"max-content" }}>
          {[...Array(3)].map((_,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"26px", paddingRight:"26px" }}>
              {["AI AUTOMATION","WEBSITES","DIGITAL SYSTEMS","MARKETING","GOONYA.COM.AU","BUILD WHAT'S NEXT"].map(w => (
                <span key={w} style={{ display:"inline-flex", alignItems:"center", gap:"26px" }}>
                  <b style={{ fontSize:"11px", letterSpacing:"2px", fontWeight:500, color:"#2a2a2a" }}>{w}</b>
                  <em style={{ fontStyle:"normal", color:A, fontSize:"9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS with counting numbers ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${L}` }}>
        {[
          {target:40,  suffix:"+", label:"Projects Delivered"},
          {target:0.8, suffix:"s", label:"Avg Response Time"},
          {target:98,  suffix:"%", label:"Client Satisfaction"},
          {target:120, suffix:"h", label:"Hours Saved / Client"},
        ].map(({target,suffix,label},i) => (
          <div key={label} style={{ padding:"64px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(48px,4.5vw,76px)", fontWeight:700,
              letterSpacing:"-3px", lineHeight:1, color:"white" }}>
              <Counter target={target} suffix={suffix}/>
            </div>
            <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ══ STATEMENT ══ */}
      <div style={{ padding:"130px 0" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"26px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>01 / THE GOONYA IDEA
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(42px,5.5vw,86px)", fontWeight:700,
            letterSpacing:"-3.5px", lineHeight:.96, color:"white",
            maxWidth:"860px", marginBottom:"28px" }}>
            Your business has<span style={{color:A}}> enough to think about.</span>
          </h2>
          <p style={{ color:"#444", fontSize:"18px", lineHeight:1.75, maxWidth:"500px" }}>
            Your technology shouldn't be one of them. We connect the digital
            pieces behind your business so everything works together.
          </p>
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ marginBottom:"56px" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>02 / WHAT WE DO
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,4.2vw,64px)",
            fontWeight:700, letterSpacing:"-2.5px", color:"white" }}>
            The machine<span style={{color:A}}> behind your business.</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}` }}>
          {[
            {n:"01",t:"AI Automation",       d:"Eliminate repetitive tasks. Intelligent systems handle the work so your team focuses on what matters.",       glow:"rgba(155,124,255,.3)"},
            {n:"02",t:"Website Design",      d:"High-performance websites built to convert. Fast, modern, optimised to grow your business from day one.",      glow:"rgba(0,210,190,.25)"},
            {n:"03",t:"Digital Marketing",   d:"Get discovered by the right people. Data-driven campaigns that grow revenue, not just impressions.",           glow:"rgba(255,100,180,.2)"},
            {n:"04",t:"Systems Integration", d:"Connect your tools and automate your workflows — run your entire business as one efficient machine.",          glow:"rgba(100,180,255,.2)"},
          ].map(({n,t,d,glow}) => (
            <Link to="/services" key={n} style={{ display:"block", padding:"56px 52px",
              background:"#08060f", textDecoration:"none", position:"relative",
              overflow:"hidden", minHeight:"260px" }}
              onMouseEnter={e=>e.currentTarget.style.background="#0d0b18"}
              onMouseLeave={e=>e.currentTarget.style.background="#08060f"}>
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px",
                borderRadius:"50%", background:`radial-gradient(circle,${glow},transparent 70%)`,
                filter:"blur(25px)", pointerEvents:"none" }}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize:"11px", letterSpacing:"2px", color:A, marginBottom:"40px",
                  fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"26px",
                  fontWeight:700, letterSpacing:"-1px", color:"white", marginBottom:"12px" }}>{t}</h3>
                <p style={{ color:"#444", fontSize:"15px", lineHeight:1.65, maxWidth:"320px" }}>{d}</p>
                <div style={{ marginTop:"28px", fontSize:"18px", color:A }}>↗</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ VIDEO ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ position:"relative", overflow:"hidden", border:`1px solid ${L}`, height:"520px" }}>
          <video autoPlay muted loop playsInline
            style={{ width:"100%", height:"120%", objectFit:"cover", display:"block" }}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-working-on-a-laptop-in-a-cafe-42701-large.mp4" type="video/mp4"/>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-close-up-1024-large.mp4" type="video/mp4"/>
          </video>
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to top, rgba(7,7,7,.92) 0%, rgba(7,7,7,.2) 60%, transparent 100%)" }}/>
          <div style={{ position:"absolute", bottom:"52px", left:"52px" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#555", marginBottom:"14px" }}>
              THE DIGITAL MACHINE
            </div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(40px,5.5vw,82px)", fontWeight:700,
              letterSpacing:"-3px", lineHeight:.9, color:"white" }}>
              BUILD ONCE.<br/>
              <em style={{ fontStyle:"normal", color:A }}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* ══ PROCESS ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ marginBottom:"52px" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>03 / HOW IT WORKS
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,4vw,62px)",
            fontWeight:700, letterSpacing:"-2.5px", color:"white" }}>
            Simple process. <span style={{color:A}}>Serious results.</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}` }}>
          {[
            {n:"01",t:"Discovery", d:"We learn your business, your bottlenecks, and your goals."},
            {n:"02",t:"Strategy",  d:"We map the exact digital system your business needs."},
            {n:"03",t:"Build",     d:"We execute fast, without cutting corners."},
            {n:"04",t:"Launch",    d:"We go live, track results, and keep improving."},
          ].map(({n,t,d}) => (
            <div key={n} style={{ padding:"44px 36px", background:BG }}>
              <div style={{ fontSize:"11px", letterSpacing:"2px", color:A, marginBottom:"22px",
                fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
              <div style={{ width:"28px", height:"1px", background:A, marginBottom:"18px", opacity:.3 }}/>
              <strong style={{ display:"block", fontSize:"17px", fontFamily:"'Space Grotesk',sans-serif",
                color:"white", marginBottom:"10px" }}>{t}</strong>
              <p style={{ color:"#444", fontSize:"14px", lineHeight:1.65 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TESTIMONIALS ══ */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`,
        padding:"80px 0", marginBottom:"130px" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"52px" }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(30px,3.5vw,50px)",
              fontWeight:700, letterSpacing:"-2px", color:"white" }}>
              Results that <span style={{color:A}}>speak for themselves.</span>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
            gap:"1px", background:L, border:`1px solid ${L}` }}>
            {[
              {q:'"Goonya automated our lead follow-up. We went from missing enquiries to closing 3x more deals."', n:"Sarah M.", r:"Retail Business Owner"},
              {q:'"Our website traffic doubled in 60 days. The systems they built just work."',                      n:"James K.", r:"Trade Services CEO"},
              {q:'"Best investment we\'ve made. Saves us 20+ hours a week, every single week."',                    n:"Lisa T.",  r:"Marketing Director"},
            ].map(({q,n,r},i) => (
              <div key={i} style={{ padding:"44px 38px", background:"#08060f" }}>
                <div style={{ fontSize:"26px", color:A, marginBottom:"18px" }}>"</div>
                <p style={{ color:"#555", fontSize:"15px", lineHeight:1.7, marginBottom:"26px" }}>{q}</p>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"14px",
                  color:"white", fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:"12px", color:"#3a3a3a", marginTop:"4px" }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 160px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(52px,7.5vw,120px)", fontWeight:700,
          letterSpacing:"-5px", lineHeight:.88, color:"white", margin:"0 0 56px" }}>
          Let's build something<br/><span style={{color:A}}>people remember.</span>
        </h2>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
          padding:"20px 48px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Start a project <span>↗</span>
        </Link>
      </div>

      <style>{`
        @keyframes pdot {
          0%,100%{box-shadow:0 0 6px #9b7cff}
          50%{box-shadow:0 0 16px #9b7cff,0 0 28px rgba(155,124,255,.4)}
        }
        @keyframes barRise {
          from{transform:scaleY(0);transform-origin:bottom}
          to{transform:scaleY(1);transform-origin:bottom}
        }
        @media(max-width:850px){
          div[style*="1fr 1fr"] { grid-template-columns:1fr !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns:repeat(2,1fr) !important; }
          div[style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
