import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   DOT GRID + AURORA BG
───────────────────────────────────── */
function HeroBg() {
  const cvRef = useRef(null);
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, raf, t = 0;

    const blobs = [
      { x:.65, y:.4,  r:.45, hue:260, sp:.0003 },
      { x:.35, y:.7,  r:.35, hue:280, sp:.0004 },
      { x:.8,  y:.8,  r:.3,  hue:240, sp:.0005 },
    ];

    const resize = () => {
      W = cv.width  = cv.offsetWidth  || window.innerWidth;
      H = cv.height = cv.offsetHeight || window.innerHeight;
      if (W === 0) W = cv.width  = window.innerWidth;
      if (H === 0) H = cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      const gap = 40;
      blobs.forEach(b => {
        b._x = (b.x + Math.sin(t * b.sp * 3) * .08) * W;
        b._y = (b.y + Math.cos(t * b.sp * 2) * .06) * H;
      });
      for (let x = 0; x < W; x += gap) {
        for (let y = 0; y < H; y += gap) {
          let g = 0;
          blobs.forEach(b => {
            const d = Math.hypot(x - b._x, y - b._y);
            g += Math.max(0, 1 - d / (b.r * W)) * .8;
          });
          const a = Math.min(.05 + g * .32, .5);
          ctx.beginPath();
          ctx.arc(x, y, g > .1 ? 1.8 : 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155,124,255,${a})`;
          ctx.fill();
        }
      }
      blobs.forEach(b => {
        const gr = ctx.createRadialGradient(b._x, b._y, 0, b._x, b._y, b.r * W);
        gr.addColorStop(0,   `hsla(${b.hue},80%,65%,.11)`);
        gr.addColorStop(.5,  `hsla(${b.hue},70%,55%,.05)`);
        gr.addColorStop(1,   `hsla(${b.hue},60%,45%,0)`);
        ctx.beginPath();
        ctx.arc(b._x, b._y, b.r * W, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={cvRef} style={{
      position:"absolute", inset:0,
      width:"100%", height:"100%",
      display:"block", zIndex:0,
    }} />
  );
}

/* ─────────────────────────────────────
   ROBOT SVG — uses className not ID to avoid conflicts
───────────────────────────────────── */
function Robot() {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const arm1  = svg.querySelector(".r-arm1");
    const arm2  = svg.querySelector(".r-arm2");
    const cl1   = svg.querySelector(".r-claw1");
    const cl2   = svg.querySelector(".r-claw2");
    const eyes  = svg.querySelectorAll(".r-eye");
    const pkts  = svg.querySelectorAll(".r-pkt");
    const trs   = svg.querySelectorAll(".r-trace");
    const nodes = svg.querySelectorAll(".r-node");

    if (arm1)  gsap.to(arm1,  { rotation:8,   duration:2.5, repeat:-1, yoyo:true, ease:"sine.inOut", svgOrigin:"148 251" });
    if (arm2)  gsap.to(arm2,  { rotation:-10, duration:2,   repeat:-1, yoyo:true, ease:"sine.inOut", svgOrigin:"148 251", delay:.5 });
    if (cl1)   gsap.to(cl1,   { rotation:10,  duration:1.5, repeat:-1, yoyo:true, ease:"sine.inOut", svgOrigin:"30 248" });
    if (cl2)   gsap.to(cl2,   { rotation:-10, duration:1.5, repeat:-1, yoyo:true, ease:"sine.inOut", svgOrigin:"30 254" });
    if (eyes.length)  gsap.to(eyes,  { opacity:.25, duration:1.2, repeat:-1, yoyo:true, ease:"sine.inOut" });
    if (pkts.length)  gsap.to(pkts,  { strokeDashoffset:-200, duration:2, repeat:-1, ease:"none", stagger:.4 });
    if (trs.length)   gsap.to(trs,   { strokeDashoffset:0, duration:3, ease:"power2.inOut", stagger:.3 });
    if (nodes.length) gsap.to(nodes, { scale:1.12, duration:2, repeat:-1, yoyo:true, ease:"sine.inOut", stagger:.4, transformOrigin:"center" });

    return () => gsap.killTweensOf([arm1,arm2,cl1,cl2,eyes,pkts,trs,nodes]);
  }, []);

  const A = "#9b7cff";
  return (
    <svg ref={svgRef} viewBox="0 0 420 480" style={{ width:"100%", height:"100%", overflow:"visible" }}>
      <defs>
        <filter id="rb-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="rb-gsm"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* grid bg */}
      <g opacity=".1" stroke={A} strokeWidth=".7" fill="none">
        {[40,80,120,160,200,240,280,320,360,400].map(x=><line key={`vx${x}`} x1={x} y1="0" x2={x} y2="480" strokeDasharray="3 9"/>)}
        {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={`hy${y}`} x1="0" y1={y} x2="420" y2={y} strokeDasharray="3 9"/>)}
      </g>

      {/* animated traces */}
      <path className="r-trace" d="M40,440 L40,370 L120,370 L120,310" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" strokeDashoffset="220" opacity=".45"/>
      <path className="r-trace" d="M380,440 L380,350 L300,350 L300,270" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" strokeDashoffset="220" opacity=".45"/>
      {/* data packets */}
      <path className="r-pkt" d="M40,440 L40,370 L120,370 L120,310" stroke="rgba(155,124,255,.85)" strokeWidth="2.5" fill="none" strokeDasharray="6 214" strokeDashoffset="0" filter="url(#rb-gsm)"/>
      <path className="r-pkt" d="M380,440 L380,350 L300,350 L300,270" stroke="rgba(155,124,255,.85)" strokeWidth="2.5" fill="none" strokeDasharray="6 214" strokeDashoffset="0" filter="url(#rb-gsm)"/>

      {/* base + legs */}
      <rect x="155" y="378" width="110" height="20" rx="4" fill="#1a1230" stroke={A} strokeWidth="1"/>
      <rect x="175" y="368" width="70" height="12" rx="3" fill="#14102a" stroke={A} strokeWidth=".8"/>
      <rect x="165" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
      <rect x="225" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>

      {/* torso */}
      <rect x="145" y="228" width="130" height="140" rx="12" fill="#0f0c1e" stroke={A} strokeWidth="1.2"/>
      <line x1="145" y1="276" x2="275" y2="276" stroke={A} strokeWidth=".6" opacity=".35"/>
      <line x1="145" y1="316" x2="275" y2="316" stroke={A} strokeWidth=".6" opacity=".35"/>
      <circle cx="168" cy="252" r="4" fill={A} filter="url(#rb-gsm)" opacity=".9"/>
      <circle cx="185" cy="252" r="4" fill="#4ade80" filter="url(#rb-gsm)" opacity=".9"/>
      <circle cx="202" cy="252" r="4" fill="#f87171" filter="url(#rb-gsm)" opacity=".7"/>
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
      <ellipse cx="191" cy="170" rx="8" ry="7" fill={A} filter="url(#rb-glow)"/>
      <ellipse cx="229" cy="170" rx="8" ry="7" fill={A} filter="url(#rb-glow)"/>
      <circle cx="191" cy="170" r="3" fill="white"/>
      <circle cx="229" cy="170" r="3" fill="white"/>
      <rect x="178" y="196" width="64" height="6" rx="3" fill="#1a1230" stroke={A} strokeWidth=".8"/>
      <rect x="182" y="198" width="12" height="2" rx="1" fill={A} opacity=".8"/>
      <rect x="198" y="198" width="12" height="2" rx="1" fill={A} opacity=".5"/>
      <rect x="214" y="198" width="12" height="2" rx="1" fill={A} opacity=".8"/>

      {/* antenna */}
      <line x1="210" y1="138" x2="210" y2="113" stroke={A} strokeWidth="1.5"/>
      <circle cx="210" cy="106" r="7" fill="#0f0c1e" stroke={A} strokeWidth="1.5"/>
      <circle cx="210" cy="106" r="3" fill={A} filter="url(#rb-glow)"/>

      {/* LEFT ARM */}
      <g className="r-arm1">
        <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1"/>
        <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2"/>
        <g className="r-arm2">
          <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
          <g className="r-claw1"><path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9"/></g>
          <g className="r-claw2"><path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9"/></g>
        </g>
      </g>

      {/* RIGHT ARM (mirror) */}
      <g transform="translate(420,0) scale(-1,1)">
        <g className="r-arm1b">
          <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1"/>
          <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2"/>
          <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9"/>
          <path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9"/>
          <path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9"/>
        </g>
      </g>

      {/* floating nodes */}
      {[
        {cx:50,  cy:118, label:"GROW"},
        {cx:372, cy:98,  label:"BUILD"},
        {cx:388, cy:298, label:"SCALE"},
        {cx:32,  cy:318, label:"WIN"},
      ].map(({cx,cy,label})=>(
        <g key={label} className="r-node">
          <circle cx={cx} cy={cy} r="24" fill="#0a0818" stroke={A} strokeWidth="1" opacity=".85"/>
          <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={A} fontFamily="monospace" fontWeight="bold" letterSpacing="1">{label}</text>
          <line x1={cx<210?cx+24:cx-24} y1={cy} x2={cx<210?145:275} y2={cy<250?198:308} stroke={A} strokeWidth=".6" strokeDasharray="4 5" opacity=".28"/>
        </g>
      ))}

      {/* floor glow */}
      <ellipse cx="210" cy="398" rx="80" ry="12" fill={A} opacity=".1" filter="url(#rb-glow)"/>
    </svg>
  );
}

/* ─────────────────────────────────────
   PROFIT BARS — fixed scrollTrigger
───────────────────────────────────── */
function ProfitBars() {
  const wrapRef = useRef(null);
  useEffect(() => {
    const bars = wrapRef.current?.querySelectorAll(".pb-bar");
    const vals = wrapRef.current?.querySelectorAll(".pb-val");
    if (!bars?.length) return;

    // set initial state
    gsap.set(bars, { scaleY:0, transformOrigin:"bottom" });
    gsap.set(vals, { opacity:0, y:6 });

    // use toggleActions + markers off — works even if already in viewport on load
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top 95%",
      once: true,
      onEnter: () => {
        gsap.to(bars, { scaleY:1, duration:1.2, ease:"power3.out", stagger:.12, clearProps:"scaleY,transformOrigin" });
        gsap.to(vals, { opacity:1, y:0, duration:.5, stagger:.12, delay:.5, clearProps:"all" });
      },
    });

    // if already visible on load, fire immediately
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight * 0.95) {
      gsap.to(bars, { scaleY:1, duration:1.2, ease:"power3.out", stagger:.12, clearProps:"scaleY,transformOrigin" });
      gsap.to(vals, { opacity:1, y:0, duration:.5, stagger:.12, delay:.5, clearProps:"all" });
      trigger.kill();
    }
  }, []);

  const bars = [
    {h:34,q:"Q1",v:"$12k",c:"rgba(155,124,255,.3)"},
    {h:52,q:"Q2",v:"$18k",c:"rgba(155,124,255,.5)"},
    {h:43,q:"Q3",v:"$15k",c:"rgba(155,124,255,.6)"},
    {h:75,q:"Q4",v:"$27k",c:"#9b7cff"},
  ];

  return (
    <div ref={wrapRef} style={{ background:"rgba(10,8,22,.95)", border:"1px solid rgba(155,124,255,.25)", borderRadius:"16px", padding:"22px 26px", backdropFilter:"blur(16px)", width:"250px" }}>
      <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#555", marginBottom:"14px" }}>CLIENT REVENUE GROWTH</div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"10px", height:"76px", marginBottom:"8px" }}>
        {bars.map((b,i)=>(
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
            <div className="pb-val" style={{ fontSize:"9px", color:"#9b7cff", fontWeight:600 }}>{b.v}</div>
            <div className="pb-bar" style={{ width:"100%", height:`${b.h}px`, background:b.c, borderRadius:"4px 4px 0 0", boxShadow:i===3?"0 0 14px rgba(155,124,255,.4)":"none" }}/>
          </div>
        ))}
      </div>
      <div style={{ display:"flex" }}>
        {bars.map(b=><div key={b.q} style={{ flex:1, textAlign:"center", fontSize:"9px", color:"#444" }}>{b.q}</div>)}
      </div>
      <div style={{ marginTop:"12px", paddingTop:"12px", borderTop:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:"8px" }}>
        <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 8px #4ade80", flexShrink:0 }}/>
        <span style={{ fontSize:"11px", color:"#555" }}>Avg +125% client growth</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   CARD PARTICLE BG — uses ResizeObserver
───────────────────────────────────── */
function CardBg({ color }) {
  const cvRef = useRef(null);
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    let W = 0, H = 0, raf;

    const init = () => {
      W = cv.width  = cv.offsetWidth  || 300;
      H = cv.height = cv.offsetHeight || 200;
    };

    const ro = new ResizeObserver(init);
    ro.observe(cv.parentElement || cv);
    init();

    const pts = Array.from({length:14}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random()-.5) * .45, vy: (Math.random()-.5) * .45,
    }));

    const ctx = cv.getContext("2d");
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i+1; j < pts.length; j++) {
          const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `${color},${(1-d/110)*.18})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI*2);
        ctx.fillStyle = `${color},.45)`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color]);

  return <canvas ref={cvRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }}/>;
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
export default function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const el = homeRef.current;
    if (!el) return;

    const q  = (sel) => Array.from(el.querySelectorAll(sel));
    const q1 = (sel) => el.querySelector(sel);

    // small helper — only animate if element exists
    const safe = (target, ...args) => {
      if (!target) return null;
      if (target instanceof NodeList || Array.isArray(target)) {
        if (!target.length) return null;
      }
      return target;
    };

    // ── HERO ENTRANCE ──
    try {
      const kicker   = q1(".home-kicker");
      const lines    = q(".hero-line");
      const sub      = q1(".hero-sub");
      const ctas     = q1(".hero-ctas");
      const right    = q1(".hero-right");

      const tl = gsap.timeline({ delay:.15 });
      if (kicker) tl.fromTo(kicker, { opacity:0, y:14 }, { opacity:1, y:0, duration:.5, ease:"power2.out" });
      if (lines.length) tl.fromTo(lines, { opacity:0, y:36 }, { opacity:1, y:0, stagger:.09, duration:.75, ease:"power3.out" }, kicker ? "-=.25" : 0);
      if (sub)   tl.fromTo(sub,   { opacity:0, y:14 }, { opacity:1, y:0, duration:.55, ease:"power2.out" }, "-=.35");
      if (ctas)  tl.fromTo(ctas,  { opacity:0, y:10 }, { opacity:1, y:0, duration:.5,  ease:"power2.out" }, "-=.3");
      if (right) tl.fromTo(right, { opacity:0, x:36 }, { opacity:1, x:0, duration:.9,  ease:"power3.out" }, "-=.65");
    } catch(e) {
      // if animation fails, make sure everything is visible
      q(".hero-line, .home-kicker, .hero-sub, .hero-ctas, .hero-right").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    // ── MARQUEE ──
    const marquee = q1(".marquee-track");
    if (marquee) gsap.to(marquee, { xPercent:-50, duration:26, repeat:-1, ease:"none" });

    // ── SCROLL REVEALS ──
    q(".reveal").forEach(target => {
      try {
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          gsap.set(target, { opacity:1, y:0 });
        } else {
          gsap.fromTo(target,
            { opacity:0, y:32 },
            { opacity:1, y:0, duration:.8, ease:"power3.out",
              scrollTrigger:{ trigger:target, start:"top 88%", once:true } }
          );
        }
      } catch(e) { target.style.opacity = "1"; }
    });

    q(".stagger-parent").forEach(parent => {
      try {
        const children = Array.from(parent.querySelectorAll(".stagger-child"));
        if (!children.length) return;
        const rect = parent.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          gsap.set(children, { opacity:1, y:0 });
        } else {
          gsap.fromTo(children,
            { opacity:0, y:28 },
            { opacity:1, y:0, stagger:.08, duration:.65, ease:"power3.out",
              scrollTrigger:{ trigger:parent, start:"top 86%", once:true } }
          );
        }
      } catch(e) {}
    });

    // ── STAT COUNTERS ──
    q(".stat-n").forEach(target => {
      try {
        const val = parseFloat(target.dataset.t);
        const isF = target.dataset.t.includes(".");
        ScrollTrigger.create({
          trigger:target, start:"top 90%", once:true,
          onEnter:() => gsap.to({ v:0 }, {
            v:val, duration:2, ease:"power2.out",
            onUpdate:function() {
              target.textContent = isF
                ? this.targets()[0].v.toFixed(1)
                : Math.round(this.targets()[0].v);
            },
          }),
        });
      } catch(e) {}
    });

    // ── DASHBOARD BARS ──
    try {
      const dbars = q(".db-bar");
      const dash  = q1(".dashboard-section");
      if (dbars.length && dash) {
        gsap.set(dbars, { scaleY:0, transformOrigin:"bottom" });
        ScrollTrigger.create({
          trigger:dash, start:"top 85%", once:true,
          onEnter:() => gsap.to(dbars, { scaleY:1, duration:1, ease:"power3.out", stagger:.05, clearProps:"scaleY,transformOrigin" }),
        });
      }
    } catch(e) {}

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const A  = "#9b7cff";
  const L  = "rgba(255,255,255,.07)";
  const BG = "#070707";

  const services = [
    { n:"01", t:"AI Automation",       d:"Eliminate repetitive tasks. Intelligent systems handle the work so your team focuses on what matters.",          color:"rgba(155,124,255", glow:"rgba(155,124,255,.3)" },
    { n:"02", t:"Website Design",      d:"High-performance websites built to convert. Fast, modern, optimised to grow your business from day one.",         color:"rgba(0,210,190",   glow:"rgba(0,210,190,.25)"   },
    { n:"03", t:"Digital Marketing",   d:"Get discovered by the right people. Data-driven campaigns that grow revenue, not just impressions.",             color:"rgba(255,100,180", glow:"rgba(255,100,180,.2)"  },
    { n:"04", t:"Systems Integration", d:"Connect your tools, automate your workflows, and run your entire business as one efficient machine.",            color:"rgba(100,180,255", glow:"rgba(100,180,255,.2)"  },
  ];

  const dbHeights = [55,72,48,90,63,85,78,95,70,88,76,100];

  return (
    <div ref={homeRef} style={{ background:BG, overflowX:"hidden" }}>

      {/* ════ HERO ════ */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <HeroBg/>
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 60% 65% at 62% 45%, rgba(155,124,255,.09) 0%, transparent 70%)" }}/>

        <div style={{ position:"relative", zIndex:2, width:"min(1400px,90vw)", margin:"0 auto",
          padding:"130px 0 100px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }}>

          {/* LEFT */}
          <div>
            <div className="home-kicker" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"6px 16px", border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
              background:"rgba(155,124,255,.07)", fontSize:"11px", letterSpacing:"2.5px",
              color:A, marginBottom:"32px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:A,
                flexShrink:0, boxShadow:`0 0 10px ${A}`, animation:"pdot 2s infinite" }}/>
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            {/* HEADLINE — no overflow hidden anywhere near it */}
            <h1 style={{ margin:0, padding:0, lineHeight:.92 }}>
              {["YOUR BUSINESS.", "BUT SMARTER.", "AUTOMATED."].map((line, i) => (
                <span key={i} className="hero-line" style={{
                  display:"block",
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontWeight:700,
                  letterSpacing:"-4px",
                  paddingBottom:"6px",
                  fontSize:"clamp(72px, 7.5vw, 112px)",
                  color: i===1 ? "transparent" : "white",
                  background: i===1 ? `linear-gradient(90deg,${A},#e0b0ff 55%,${A})` : "none",
                  backgroundSize: i===1 ? "200%" : "auto",
                  WebkitBackgroundClip: i===1 ? "text" : "unset",
                  WebkitTextFillColor: i===1 ? "transparent" : "white",
                  backgroundClip: i===1 ? "text" : "unset",
                }}>{line}</span>
              ))}
            </h1>

            <p className="hero-sub" style={{ maxWidth:"440px", marginTop:"32px",
              color:"#666", fontSize:"17px", lineHeight:1.75 }}>
              Goonya builds websites, automation and digital systems that help
              ambitious businesses attract customers, save time and grow fast.
            </p>

            <div className="hero-ctas" style={{ display:"flex", alignItems:"center",
              gap:"14px", marginTop:"40px", flexWrap:"wrap" }}>
              <Link to="/services" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"14px", textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
                Explore what we do <span>↗</span>
              </Link>
              <Link to="/our-work" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
                borderRadius:"100px", border:`1px solid rgba(255,255,255,.14)` }}>
                See our work <span>↓</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="hero-right" style={{ position:"relative", height:"500px" }}>
            <Robot/>
            <div style={{ position:"absolute", bottom:"-10px", left:"-30px", zIndex:4 }}>
              <ProfitBars/>
            </div>
            <div style={{ position:"absolute", top:"20px", right:"-20px", zIndex:4,
              background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
              borderRadius:"14px", padding:"18px 20px", backdropFilter:"blur(14px)", minWidth:"185px" }}>
              {[
                {c:"#4ade80", l:"Systems live", v:"12"},
                {c:A,         l:"Tasks / day",  v:"840"},
                {c:"#f87171", l:"Hours saved",  v:"∞"},
              ].map(({c,l,v}) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                  <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:c, boxShadow:`0 0 6px ${c}`, flexShrink:0 }}/>
                  <span style={{ fontSize:"12px", color:"#555", flex:1 }}>{l}</span>
                  <span style={{ fontSize:"12px", color:"white", fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="marquee-track" style={{ display:"flex", width:"max-content" }}>
          {[...Array(2)].map((_,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"24px", paddingRight:"24px" }}>
              {["AI AUTOMATION","WEBSITES","DIGITAL SYSTEMS","MARKETING","GOONYA.COM.AU","BUILD WHAT'S NEXT"].map(w => (
                <span key={w} style={{ display:"inline-flex", alignItems:"center", gap:"24px" }}>
                  <b style={{ fontSize:"11px", letterSpacing:"2px", fontWeight:500, color:"#2a2a2a" }}>{w}</b>
                  <em style={{ fontStyle:"normal", color:A, fontSize:"9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════ STATS — always 4 columns ════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
        <div className="stagger-parent" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${L}` }}>
          {[
            {v:"40",  s:"+", l:"Projects Delivered"},
            {v:"0.8", s:"s", l:"Avg Response Time"},
            {v:"98",  s:"%", l:"Client Satisfaction"},
            {v:"120", s:"h", l:"Hours Saved / Client"},
          ].map(({v,s,l},i) => (
            <div className="stagger-child" key={l} style={{ padding:"64px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(48px,4.5vw,76px)", fontWeight:700, letterSpacing:"-3px", lineHeight:1, color:"white" }}>
                <span className="stat-n" data-t={v}>0</span>
                <sup style={{ fontSize:".4em", color:A, verticalAlign:"super" }}>{s}</sup>
              </div>
              <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════ STATEMENT ════ */}
      <div style={{ padding:"130px 0" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="reveal" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
            fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"26px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/> 01 / THE GOONYA IDEA
          </div>
          <h2 className="reveal" style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(42px,5.5vw,86px)", fontWeight:700, letterSpacing:"-3.5px",
            lineHeight:.96, color:"white", maxWidth:"860px", marginBottom:"28px" }}>
            Your business has<span style={{color:A}}> enough to think about.</span>
          </h2>
          <p className="reveal" style={{ color:"#444", fontSize:"18px", lineHeight:1.75, maxWidth:"500px" }}>
            Your technology shouldn't be one of them. We connect the digital pieces
            behind your business so everything works together — invisibly, reliably, at scale.
          </p>
        </div>
      </div>

      {/* ════ SERVICES 2×2 with animated card backgrounds ════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom:"56px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"10px",
            fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/> 02 / WHAT WE DO
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,4.2vw,64px)",
            fontWeight:700, letterSpacing:"-2.5px", color:"white" }}>
            The machine<span style={{color:A}}> behind your business.</span>
          </h2>
        </div>
        <div className="stagger-parent" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}` }}>
          {services.map(({n,t,d,color,glow}) => (
            <Link to="/services" key={n} className="stagger-child" style={{
              display:"block", padding:"56px 52px", background:"#08060f",
              textDecoration:"none", position:"relative", overflow:"hidden", minHeight:"280px",
            }}
              onMouseEnter={e => e.currentTarget.style.background="#0d0b18"}
              onMouseLeave={e => e.currentTarget.style.background="#08060f"}
            >
              <CardBg color={color}/>
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px",
                borderRadius:"50%", background:`radial-gradient(circle,${glow},transparent 70%)`,
                filter:"blur(28px)", pointerEvents:"none" }}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize:"11px", letterSpacing:"2px", color:A, marginBottom:"48px",
                  fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"28px",
                  fontWeight:700, letterSpacing:"-1px", color:"white", marginBottom:"14px" }}>{t}</h3>
                <p style={{ color:"#444", fontSize:"15px", lineHeight:1.65, maxWidth:"340px" }}>{d}</p>
                <div style={{ marginTop:"32px", fontSize:"20px", color:A }}>↗</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ════ DASHBOARD MOCKUP ════ */}
      <div className="reveal dashboard-section" style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ position:"relative", background:"#08060f", border:`1px solid ${L}`, overflow:"hidden", padding:"52px 48px 48px" }}>
          {/* browser bar */}
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"36px" }}>
            {["#f87171","#fbbf24","#4ade80"].map(c => <span key={c} style={{ width:"11px", height:"11px", borderRadius:"50%", background:c }}/>)}
            <span style={{ flex:1, background:"rgba(255,255,255,.04)", borderRadius:"6px", height:"26px",
              marginLeft:"10px", display:"flex", alignItems:"center", paddingLeft:"12px" }}>
              <span style={{ fontSize:"11px", color:"#2a2a2a" }}>goonya.com.au/dashboard</span>
            </span>
          </div>
          {/* stat cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginBottom:"18px" }}>
            {[
              {l:"Revenue",   v:"$84,200", c:"#4ade80", up:true},
              {l:"Leads",     v:"1,240",   c:A,         up:true},
              {l:"Automation",v:"97.3%",   c:"#fbbf24", up:true},
              {l:"Time Saved",v:"420h",    c:"#f87171", up:false},
            ].map(({l,v,c,up}) => (
              <div key={l} style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${L}`, borderRadius:"8px", padding:"18px 16px" }}>
                <div style={{ fontSize:"10px", color:"#444", letterSpacing:"1px", marginBottom:"8px" }}>{l}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px", fontWeight:700, color:"white", letterSpacing:"-1px" }}>{v}</div>
                <div style={{ fontSize:"10px", color:c, marginTop:"5px" }}>{up?"↑":"↓"} This month</div>
              </div>
            ))}
          </div>
          {/* bar chart */}
          <div style={{ background:"rgba(255,255,255,.02)", border:`1px solid ${L}`, borderRadius:"8px", padding:"22px 18px" }}>
            <div style={{ fontSize:"10px", color:"#444", letterSpacing:"1px", marginBottom:"14px" }}>PERFORMANCE OVERVIEW</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", height:"80px" }}>
              {dbHeights.map((h,i) => (
                <div key={i} className="db-bar" style={{ flex:1, height:`${h}%`,
                  background:`rgba(155,124,255,${.18+i*.055})`, borderRadius:"3px 3px 0 0" }}/>
              ))}
            </div>
          </div>
          {/* text overlay */}
          <div style={{ position:"absolute", bottom:"48px", right:"48px", textAlign:"right" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#333" }}>THE DIGITAL MACHINE</div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(34px,4vw,62px)",
              fontWeight:700, letterSpacing:"-2.5px", lineHeight:.92, marginTop:"10px", color:"white" }}>
              BUILD ONCE.<br/><em style={{ fontStyle:"normal", color:A }}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* ════ TESTIMONIALS ════ */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"80px 0", marginBottom:"130px" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:"56px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"10px",
              fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"14px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/> WHAT CLIENTS SAY
            </div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(30px,3.5vw,50px)",
              fontWeight:700, letterSpacing:"-2px", color:"white" }}>
              Results that <span style={{color:A}}>speak for themselves.</span>
            </h2>
          </div>
          <div className="stagger-parent" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
            gap:"1px", background:L, border:`1px solid ${L}` }}>
            {[
              {q:'"Goonya automated our entire lead follow-up. We went from missing enquiries to closing 3x more deals."', n:"Sarah M.", r:"Retail Business Owner"},
              {q:'"Our website traffic doubled in 60 days. The systems they built just work — we don\'t think about it."',  n:"James K.", r:"Trade Services CEO"},
              {q:'"Best investment we\'ve made. The tools save us 20+ hours a week, every single week."',                   n:"Lisa T.",  r:"Marketing Director"},
            ].map(({q,n,r},i) => (
              <div className="stagger-child" key={i} style={{ padding:"44px 38px", background:"#08060f" }}>
                <div style={{ fontSize:"26px", color:A, marginBottom:"18px", lineHeight:1 }}>"</div>
                <p style={{ color:"#555", fontSize:"15px", lineHeight:1.7, marginBottom:"26px" }}>{q}</p>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"14px", color:"white", fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:"12px", color:"#3a3a3a", marginTop:"4px" }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ PROCESS ════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom:"52px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"10px",
            fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/> 03 / HOW IT WORKS
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,4vw,62px)",
            fontWeight:700, letterSpacing:"-2.5px", color:"white" }}>
            Simple process. <span style={{color:A}}>Serious results.</span>
          </h2>
        </div>
        <div className="stagger-parent" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}` }}>
          {[
            {n:"01", t:"Discovery", d:"We learn your business, your bottlenecks, and your goals."},
            {n:"02", t:"Strategy",  d:"We map the exact digital system your business needs."},
            {n:"03", t:"Build",     d:"We execute fast, without cutting corners."},
            {n:"04", t:"Launch",    d:"We go live, track results, and keep improving."},
          ].map(({n,t,d}) => (
            <div className="stagger-child" key={n} style={{ padding:"44px 36px", background:BG }}>
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

      {/* ════ CTA ════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 160px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <div className="reveal" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
          fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"22px" }}>
          <span style={{ width:"20px", height:"1px", background:A }}/> 04 / READY?
        </div>
        <h2 className="reveal" style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(52px,7.5vw,120px)", fontWeight:700, letterSpacing:"-5px",
          lineHeight:.88, color:"white", margin:"0 0 56px" }}>
          Let's build something<br/><span style={{color:A}}>people remember.</span>
        </h2>
        <div className="reveal">
          <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
            padding:"20px 48px", background:"white", color:"black", borderRadius:"100px",
            fontWeight:700, fontSize:"16px", textDecoration:"none",
            boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
            Start a project <span>↗</span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pdot {
          0%,100% { box-shadow:0 0 6px #9b7cff; }
          50%      { box-shadow:0 0 18px #9b7cff, 0 0 32px rgba(155,124,255,.4); }
        }
        @media(max-width:850px){
          .hero-right { height:360px !important; }
          h1 span { font-size:clamp(56px,13vw,80px) !important; letter-spacing:-2.5px !important; }
        }
      `}</style>
    </div>
  );
}
