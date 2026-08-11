import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GrowthScoreCheck from "../components/GrowthScoreCheck";
import {
  GoonyaPromise,
  PackagePreview,
  HowItWorks,
  CaseStudyHighlight,
  RoiCalculator,
  GrowthSystemVisual,
  TestimonialsWithPhotos,
} from "../components/HomeMarketingSections";

/* ── HERO ROTATING OUTCOME ── */
function HeroRotator() {
  const words = ["enquiries", "bookings", "sales", "calls"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span style={{
      display: "inline-block",
      minWidth: "180px",
      background: "linear-gradient(90deg,#9b7cff,#e0b0ff,#9b7cff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      transition: "opacity .4s ease",
    }}>
      {words[index]}
    </span>
  );
}

/* ── LIVE HERO STATS ── */
function HeroLiveStats() {
  const [n, setN] = useState(12);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "28px" }}>
      {[
        { label: "NEW ENQUIRIES THIS WEEK", value: `+${n}`, color: "#4ade80" },
        { label: "AVG. RESPONSE TIME", value: "0.8s", color: "#9b7cff" },
      ].map((s) => (
        <div key={s.label} style={{
          display: "inline-flex", alignItems: "center", gap: "12px",
          padding: "10px 18px", borderRadius: "100px",
          border: "1px solid rgba(155,124,255,.2)", background: "rgba(155,124,255,.06)",
          width: "fit-content", animation: "heroPulse 3s ease-in-out infinite",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color,
            boxShadow: `0 0 10px ${s.color}` }} />
          <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#666" }}>{s.label}</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "white" }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

function HeroBg() {
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
    const blobs = [
      { x:.65, y:.4,  r:.5,  hue:260, sp:.0003 },
      { x:.2,  y:.7,  r:.35, hue:280, sp:.0004 },
      { x:.85, y:.75, r:.3,  hue:240, sp:.0005 },
    ];
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      t++;
      blobs.forEach(b => {
        b._x = (b.x + Math.sin(t*b.sp*3)*.08)*W;
        b._y = (b.y + Math.cos(t*b.sp*2)*.06)*H;
      });
      // dot grid
      const gap = 40;
      for (let x=0;x<W;x+=gap) {
        for (let y=0;y<H;y+=gap) {
          let g=0;
          blobs.forEach(b=>{
            const d=Math.hypot(x-b._x,y-b._y);
            g+=Math.max(0,1-d/(b.r*W))*.8;
          });
          const a=Math.min(.04+g*.3,.5);
          ctx.beginPath();
          ctx.arc(x,y,g>.1?1.8:1,0,Math.PI*2);
          ctx.fillStyle=`rgba(155,124,255,${a})`;
          ctx.fill();
        }
      }
      // aurora blobs
      blobs.forEach(b=>{
        const gr=ctx.createRadialGradient(b._x,b._y,0,b._x,b._y,b.r*W);
        gr.addColorStop(0,`hsla(${b.hue},80%,65%,.1)`);
        gr.addColorStop(.5,`hsla(${b.hue},70%,55%,.04)`);
        gr.addColorStop(1,`hsla(${b.hue},60%,45%,0)`);
        ctx.beginPath();ctx.arc(b._x,b._y,b.r*W,0,Math.PI*2);
        ctx.fillStyle=gr;ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",display:"block",zIndex:0 }}/>;
}

/* ── SCATTER TEXT — letters scatter out then reform ── */
function ScatterText({ text, style }) {
  const [phase, setPhase] = useState("visible"); // visible → scatter → reform
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const cycle = () => {
      // scatter
      setPhase("scatter");
      setTimeout(() => {
        setPhase("hidden");
        setTimeout(() => {
          setPhase("reform");
          setTimeout(() => {
            setPhase("visible");
          }, 800);
        }, 300);
      }, 600);
    };
    const iv = setInterval(cycle, 4000);
    return () => clearInterval(iv);
  }, []);

  const letters = text.split("");

  const getLetterStyle = (i) => {
    const base = {
      display:"inline-block",
      transition:`transform .5s ease ${i*.04}s, opacity .5s ease ${i*.04}s`,
    };
    if (phase === "scatter") {
      const angle = (i / letters.length) * Math.PI * 2;
      const dist = 40 + Math.sin(i * 2.3) * 20;
      return { ...base,
        transform:`translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) rotate(${(i%2===0?1:-1)*15}deg)`,
        opacity:.1,
      };
    }
    if (phase === "hidden") {
      return { ...base, transform:"translate(0,0) scale(.8)", opacity:0, transition:"none" };
    }
    if (phase === "reform") {
      return { ...base,
        transform:`translate(${(Math.random()-.5)*60}px, ${(Math.random()-.5)*30}px)`,
        opacity:.3,
        transition:`transform .6s cubic-bezier(.34,1.56,.64,1) ${i*.05}s, opacity .4s ease ${i*.05}s`,
      };
    }
    // visible
    return { ...base, transform:"translate(0,0) rotate(0deg)", opacity:1 };
  };

  return (
    <span style={style}>
      {letters.map((l, i) => (
        <span key={i} style={getLetterStyle(i)}>{l === " " ? "\u00A0" : l}</span>
      ))}
    </span>
  );
}

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

/* ── WEBSITE SHOWCASE — auto-flipping industry cards ── */
function WebsiteShowcase({ A, L }) {
  const sites = [
    {
      industry: "Hospitality",
      name: "The Rustic Table",
      color: "#f97316",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=70",
      tags: ["Menu", "Reservations", "Gallery"],
      desc: "Restaurant & cafe websites that fill seats.",
    },
    {
      industry: "Tradies",
      name: "ProBuild Co.",
      color: "#fbbf24",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70",
      tags: ["Quotes", "Portfolio", "Contact"],
      desc: "Trade websites that generate real enquiries.",
    },
    {
      industry: "Healthcare",
      name: "Wellcare Clinic",
      color: "#4ade80",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70",
      tags: ["Bookings", "Services", "Team"],
      desc: "Healthcare sites patients trust and book from.",
    },
    {
      industry: "Retail",
      name: "Bloom Boutique",
      color: "#e879f9",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=70",
      tags: ["Shop", "Products", "Checkout"],
      desc: "eCommerce stores built to convert browsers.",
    },
    {
      industry: "Fitness",
      name: "Iron & Flow",
      color: "#38bdf8",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=70",
      tags: ["Classes", "Memberships", "Booking"],
      desc: "Gym & studio sites that sign up members.",
    },
    {
      industry: "Real Estate",
      name: "Apex Property",
      color: "#a78bfa",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70",
      tags: ["Listings", "Appraisals", "Contact"],
      desc: "Property sites that capture serious buyers.",
    },
  ];

  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % sites.length);
    }, 2800);
    return () => clearInterval(timerRef.current);
  }, []);

  const s = sites[active];

  return (
    <div style={{ background:"#050410", padding:"40px 44px",
      display:"flex", flexDirection:"column", gap:"20px", minHeight:"420px" }}>

      {/* dot nav */}
      <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
        {sites.map((site,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i===active ? "24px" : "8px",
            height:"8px", borderRadius:"4px",
            background: i===active ? A : "rgba(255,255,255,.15)",
            border:"none", cursor:"pointer", padding:0,
            transition:"all .3s ease",
          }}/>
        ))}
        <span style={{ marginLeft:"auto", fontSize:"11px", color:"#3a3a3a",
          letterSpacing:"1px" }}>{active+1} / {sites.length}</span>
      </div>

      {/* card */}
      <div key={active} style={{
        flex:1, borderRadius:"8px", overflow:"hidden",
        border:`1px solid rgba(255,255,255,.08)`,
        animation:"cardFlip .4s ease",
        position:"relative",
      }}>
        {/* screenshot */}
        <img src={s.img} alt={s.industry}
          style={{ width:"100%", height:"200px", objectFit:"cover", display:"block" }}
          onError={e => { e.target.style.background="#1a1230"; e.target.style.height="200px"; }}/>

        {/* overlay gradient */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"200px",
          background:"linear-gradient(to bottom, transparent 40%, rgba(5,4,16,.9) 100%)" }}/>

        {/* industry badge */}
        <div style={{ position:"absolute", top:"14px", left:"14px",
          padding:"4px 12px", borderRadius:"100px",
          background:`${s.color}22`, border:`1px solid ${s.color}44`,
          fontSize:"10px", letterSpacing:"1.5px", color:s.color, fontWeight:600 }}>
          {s.industry.toUpperCase()}
        </div>

        {/* info */}
        <div style={{ padding:"16px 20px", background:"rgba(5,4,16,.95)" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"18px",
            fontWeight:700, color:"white", marginBottom:"6px", letterSpacing:"-.5px" }}>
            {s.name}
          </div>
          <div style={{ fontSize:"13px", color:"#555", marginBottom:"12px" }}>{s.desc}</div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {s.tags.map(tag => (
              <span key={tag} style={{ padding:"3px 10px", borderRadius:"100px",
                background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)",
                fontSize:"11px", color:"#666" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* cta */}
      <Link to="/our-work" style={{ display:"inline-flex", alignItems:"center", gap:"8px",
        fontSize:"13px", color:A, textDecoration:"none", fontWeight:500 }}>
        See our work 
      </Link>
    </div>
  );
}


/* ── WORDS MERGE ANIMATION ── */
function WordsMerge({ A }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // each word flies in from a different direction
  const words = [
    { text:"Your",     from:[-120, -60],  delay:0    },
    { text:"business", from:[80,  -80],   delay:0.08 },
    { text:"has",      from:[-60,  60],   delay:0.16 },
    { text:"enough",   from:[100,  40],   delay:0.24 },
    { text:"to",       from:[-80, -40],   delay:0.32 },
    { text:"think",    from:[60,   80],   delay:0.4  },
    { text:"about.",   from:[-100,  60],  delay:0.48, accent:true },
  ];

  return (
    <h2 ref={ref} style={{
      fontFamily:"'Space Grotesk',sans-serif",
      fontSize:"clamp(36px,5.5vw,86px)",
      fontWeight:700, letterSpacing:"-3px", lineHeight:1.05,
      maxWidth:"900px", margin:0,
      display:"flex", flexWrap:"wrap", gap:"0.25em",
      alignItems:"baseline",
    }}>
      {words.map(({text, from, delay, accent}) => (
        <span key={text} style={{
          display:"inline-block",
          color: accent ? A : "white",
          opacity: triggered ? 1 : 0,
          transform: triggered
            ? "translate(0,0) rotate(0deg)"
            : `translate(${from[0]}px, ${from[1]}px) rotate(${from[0] > 0 ? 6 : -6}deg)`,
          transition: triggered
            ? `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.34,1.4,.64,1) ${delay}s`
            : "none",
          filter: triggered ? "none" : "blur(4px)",
        }}>
          {text}
        </span>
      ))}
    </h2>
  );
}

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

    // scroll reveal for sections
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });

    document.querySelectorAll(".sr").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = "opacity .8s ease, transform .8s ease";
      obs.observe(el);
    });

    // stagger children
    const stObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".sr-child").forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
            }, i * 100);
          });
          stObs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });

    document.querySelectorAll(".sr-parent").forEach(p => {
      p.querySelectorAll(".sr-child").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px) scale(.97)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
      });
      stObs.observe(p);
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
    }

    return () => { obs.disconnect(); stObs.disconnect(); };
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
        background:"radial-gradient(ellipse 70% 65% at 62% 45%, rgba(155,124,255,.08) 0%, transparent 70%)",
      }}>
        <HeroBg />
        <div className="hero-grid page-container" style={{ position:"relative", zIndex:1,
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
              AUSTRALIAN SMALL BUSINESS GROWTH
            </div>

            <h1 className="fi hero-h1" style={{ margin:0, padding:0 }}>
              <span style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(44px,5.8vw,78px)", fontWeight:700,
                letterSpacing:"-3px", lineHeight:1.05, color:"white", paddingBottom:"8px" }}>
                Stop losing customers online.
              </span>
              <span style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(36px,4.5vw,64px)", fontWeight:700,
                letterSpacing:"-2px", lineHeight:1.1, color:"#888", paddingBottom:"8px" }}>
                We build systems that bring you more <HeroRotator />.
              </span>
            </h1>

            <p className="fi" style={{ maxWidth:"520px", marginTop:"20px",
              color:"#666", fontSize:"17px", lineHeight:1.75 }}>
              Without the big agency price tag. Websites, marketing and smart automation —
              built around one goal: more revenue for your business.
            </p>

            <HeroLiveStats />

            <div className="fi" style={{ display:"flex", alignItems:"center",
              gap:"14px", marginTop:"36px", flexWrap:"wrap" }}>
              <a href="#growth-check" style={{ display:"inline-flex", alignItems:"center",
                padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"14px", textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
                Check Your Business Growth
              </a>
              <Link to="/packages" style={{ display:"inline-flex", alignItems:"center",
                padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
                borderRadius:"100px", border:`1px solid rgba(255,255,255,.15)` }}>
                View Our Packages
              </Link>
            </div>
          </div>

          {/* RIGHT — ROBOT (hidden on mobile) */}
          <div className="hero-robot fi" style={{ position:"relative", height:"500px" }}>
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

          </div>
        </div>
      </section>

      <GrowthScoreCheck id="growth-check" />

      {/* ══ MARQUEE ══ */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="mq-track" style={{ display:"flex", width:"max-content" }}>
          {[...Array(3)].map((_,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"26px", paddingRight:"26px" }}>
              {["GET FOUND","GET LEADS","SAVE TIME","GOONYA.COM.AU","MORE CUSTOMERS","GROWTH SYSTEM"].map(w => (
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
      <div className="stats-grid" style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${L}` }}>
        {[
          {target:40,  suffix:"+", label:"Projects Delivered"},
          {target:0.8, suffix:"s", label:"Avg Response Time"},
          {target:98,  suffix:"%", label:"Client Satisfaction"},
          {target:120, suffix:"h", label:"Hours Saved / Client"},
        ].map(({target,suffix,label},i) => (
          <div key={label} className="stat-cell" style={{ padding:"64px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(48px,4.5vw,76px)", fontWeight:700,
              letterSpacing:"-3px", lineHeight:1, color:"white" }}>
              <Counter target={target} suffix={suffix}/>
            </div>
            <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{label}</p>
          </div>
        ))}
      </div>

      <GoonyaPromise />

      <PackagePreview />

      <HowItWorks />

      <CaseStudyHighlight />

      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
          background:L, border:`1px solid ${L}` }}>

          {/* LEFT — label */}
          <div style={{ padding:"52px 52px", background:"#08060f",
            display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px",
              display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>WE BUILD FOR EVERY INDUSTRY
            </div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(28px,3vw,46px)", fontWeight:700,
              letterSpacing:"-2px", color:"white", marginBottom:"20px", lineHeight:1.05 }}>
              Whatever your industry,<br/><span style={{color:A}}>we've got you covered.</span>
            </h3>
            <p style={{ color:"#555", fontSize:"15px", lineHeight:1.75, maxWidth:"380px", marginBottom:"36px" }}>
              From tradies to healthcare, hospitality to retail — we build
              websites and systems tailored to how your industry actually works.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {["Hospitality","Tradies","Healthcare","Retail","Real Estate","Fitness","Legal","Education"].map(tag => (
                <span key={tag} style={{ padding:"6px 14px",
                  border:`1px solid rgba(155,124,255,.2)`, borderRadius:"100px",
                  fontSize:"12px", color:"#666", background:"rgba(155,124,255,.05)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — flipping website cards */}
          <WebsiteShowcase A={A} L={L} />
        </div>
      </div>

      {/* ══ SOCIAL MEDIA SECTION ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ marginBottom:"56px" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"18px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>BUILD ONCE. RUN SMARTER.
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,4.2vw,64px)",
            fontWeight:700, letterSpacing:"-2.5px", color:"white", maxWidth:"700px" }}>
            Your brand, everywhere<span style={{color:A}}> that matters.</span>
          </h2>
          <p style={{ color:"#444", fontSize:"17px", lineHeight:1.75, maxWidth:"520px", marginTop:"20px" }}>
            Facebook, Instagram, TikTok — we create content, run campaigns and
            build automated systems that grow your audience while you sleep.
          </p>
        </div>

        {/* big visual block */}
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"1px",
          background:L, border:`1px solid ${L}` }}>

          {/* LEFT — phone mockup with social feed */}
          <div style={{ background:"#08060f", padding:"60px 52px",
            position:"relative", overflow:"hidden", minHeight:"560px",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {/* bg glow */}
            <div style={{ position:"absolute", top:"-100px", left:"-100px", width:"400px", height:"400px",
              borderRadius:"50%", background:"radial-gradient(circle,rgba(155,124,255,.15),transparent 70%)",
              filter:"blur(40px)" }}/>
            <div style={{ position:"absolute", bottom:"-80px", right:"-80px", width:"300px", height:"300px",
              borderRadius:"50%", background:"radial-gradient(circle,rgba(255,100,180,.1),transparent 70%)",
              filter:"blur(40px)" }}/>

            {/* phone frame */}
            <div style={{ position:"relative", zIndex:2, width:"220px",
              background:"#0a0818", border:"1px solid rgba(255,255,255,.12)",
              borderRadius:"32px", padding:"16px 10px",
              boxShadow:"0 0 60px rgba(155,124,255,.2), 0 40px 80px rgba(0,0,0,.6)" }}>
              {/* notch */}
              <div style={{ width:"60px", height:"6px", background:"rgba(255,255,255,.1)",
                borderRadius:"3px", margin:"0 auto 14px" }}/>
              {/* social posts */}
              {[
                { platform:"Instagram", icon:"📸", metric:"↑ 2,400 followers", color:"#e1306c",
                  img:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&q=60",
                  label:"New campaign live" },
                { platform:"TikTok",    icon:"🎵", metric:"↑ 48K views",        color:"#69c9d0",
                  img:"https://images.unsplash.com/photo-1622556498246-755f44ca76f3?w=200&q=60",
                  label:"Video boosted" },
                { platform:"Facebook",  icon:"👍", metric:"↑ 320 leads",         color:"#1877f2",
                  img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=60",
                  label:"Ad running" },
              ].map(({platform,icon,metric,color,img,label},i) => (
                <div key={platform} style={{
                  background:"rgba(255,255,255,.04)", borderRadius:"12px",
                  marginBottom:"8px", overflow:"hidden",
                  border:"1px solid rgba(255,255,255,.06)",
                  animation:`slideUp .5s ease ${i*.15+.3}s both`,
                }}>
                  <img src={img} alt={platform}
                    style={{ width:"100%", height:"80px", objectFit:"cover", display:"block" }}
                    onError={e => { e.target.style.display="none"; }}/>
                  <div style={{ padding:"8px 10px" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                        <span style={{ fontSize:"9px" }}>{icon}</span>
                        <span style={{ fontSize:"9px", color:"#555", letterSpacing:"1px" }}>{platform.toUpperCase()}</span>
                      </div>
                      <span style={{ fontSize:"9px", color:color, fontWeight:600 }}>{metric}</span>
                    </div>
                    <div style={{ fontSize:"8px", color:"#4ade80", marginTop:"3px" }}>● {label}</div>
                  </div>
                </div>
              ))}
              {/* bottom bar */}
              <div style={{ display:"flex", justifyContent:"space-around", marginTop:"12px",
                paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
                {["🏠","🔍","➕","❤️","👤"].map(ic=>(
                  <span key={ic} style={{ fontSize:"14px", opacity:.5 }}>{ic}</span>
                ))}
              </div>
            </div>

            {/* floating metric cards */}
            <div style={{ position:"absolute", top:"60px", right:"40px",
              background:"rgba(10,8,22,.95)", border:"1px solid rgba(255,255,255,.08)",
              borderRadius:"12px", padding:"12px 16px", animation:"float1 3s ease-in-out infinite" }}>
              <div style={{ fontSize:"9px", color:"#555", letterSpacing:"1px", marginBottom:"4px" }}>REACH TODAY</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"22px",
                fontWeight:700, color:"white", letterSpacing:"-1px" }}>84.2K</div>
              <div style={{ fontSize:"10px", color:"#4ade80", marginTop:"2px" }}>↑ 23% vs yesterday</div>
            </div>

            <div style={{ position:"absolute", bottom:"80px", right:"30px",
              background:"rgba(10,8,22,.95)", border:"1px solid rgba(255,255,255,.08)",
              borderRadius:"12px", padding:"12px 16px", animation:"float2 3.5s ease-in-out infinite" }}>
              <div style={{ fontSize:"9px", color:"#555", letterSpacing:"1px", marginBottom:"4px" }}>CONVERSIONS</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"22px",
                fontWeight:700, color:"white", letterSpacing:"-1px" }}>$4,820</div>
              <div style={{ fontSize:"10px", color:A, marginTop:"2px" }}>↑ This week</div>
            </div>
          </div>

          {/* RIGHT — services list */}
          <div style={{ background:"#08060f" }}>
            {[
              { title:"Social Media Management",   desc:"Daily content, scheduling and engagement across Facebook, Instagram and TikTok.", color:"#e1306c" },
              { title:"TikTok & Reel Creation",     desc:"Scroll-stopping short-form videos custom made for your brand and audience.",       color:"#69c9d0" },
              { title:"Animated Video Production",  desc:"Professional animated explainers and promos that tell your story beautifully.",    color:A },
              { title:"Paid Social Campaigns",      desc:"Facebook and Instagram ads that target the right people and convert them.",        color:"#1877f2" },
              { title:"Growth & Analytics",         desc:"We track every metric and optimise continuously so results compound over time.",   color:"#4ade80" },
            ].map(({title,desc,color},i) => (
              <div key={title} className="social-row" style={{
                padding:"24px 32px",
                borderBottom:`1px solid ${L}`,
                display:"flex", alignItems:"flex-start", gap:"14px",
                transition:"background .25s ease, transform .25s ease",
                animation:`rowSlideIn .5s ease ${i*.1+.1}s both`,
              }}
                onMouseEnter={e=>{ e.currentTarget.style.background="#0d0b18"; e.currentTarget.style.transform="translateX(4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateX(0)"; }}
              >
                {/* coloured dot icon */}
                <div style={{ width:"32px", height:"32px", borderRadius:"10px", flexShrink:0,
                  background:`${color}18`, border:`1px solid ${color}35`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginTop:"2px" }}>
                  <div style={{ width:"8px", height:"8px", borderRadius:"50%",
                    background:color, boxShadow:`0 0 6px ${color}` }}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"15px",
                    fontWeight:600, color:"white", marginBottom:"4px" }}>{title}</div>
                  <div style={{ fontSize:"13px", color:"#555", lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══ ADMIN WORK ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
          background:L, border:`1px solid ${L}` }}>

          {/* LEFT — text */}
          <div style={{ padding:"70px 60px", background:"#08060f" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"22px",
              display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>04 / ADMIN & OPERATIONS
            </div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(32px,3.5vw,54px)", fontWeight:700,
              letterSpacing:"-2.5px", color:"white", marginBottom:"22px", lineHeight:1.05 }}>
              We handle the back-end<span style={{color:A}}> so you don't have to.</span>
            </h2>
            <p style={{ color:"#555", fontSize:"16px", lineHeight:1.75, marginBottom:"36px", maxWidth:"420px" }}>
              From data entry to inbox management, scheduling, reporting
              and operations — we take the tedious tasks off your plate
              so you can focus on growing your business.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {[
                "Email & inbox management",
                "Data entry & cleanup",
                "Scheduling & calendars",
                "Reporting & spreadsheets",
                "Document preparation",
                "Customer follow-ups",
                "Research & sourcing",
                "Process documentation",
              ].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%",
                    background:A, flexShrink:0, boxShadow:`0 0 6px ${A}` }}/>
                  <span style={{ fontSize:"13px", color:"#666" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:"40px" }}>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"13px 26px", background:"rgba(155,124,255,.1)",
                border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
                fontSize:"13px", fontWeight:500, color:"white", textDecoration:"none" }}>
                Talk to us about admin 
              </Link>
            </div>
          </div>

          {/* RIGHT — animated desk visual */}
          <div style={{ background:"#050410", position:"relative",
            overflow:"hidden", minHeight:"500px",
            display:"flex", alignItems:"center", justifyContent:"center" }}>

            {/* ambient glow */}
            <div style={{ position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              width:"300px", height:"300px", borderRadius:"50%",
              background:"radial-gradient(circle, rgba(155,124,255,.15), transparent 70%)",
              filter:"blur(40px)", pointerEvents:"none" }}/>

            {/* desk mockup */}
            <div style={{ position:"relative", zIndex:2, width:"340px" }}>

              {/* laptop screen */}
              <div style={{ background:"#0a0818", border:`1px solid rgba(155,124,255,.2)`,
                borderRadius:"12px 12px 0 0", padding:"16px",
                boxShadow:"0 0 40px rgba(155,124,255,.15)" }}>
                {/* screen top bar */}
                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"12px" }}>
                  {["#f87171","#fbbf24","#4ade80"].map(c=>(
                    <span key={c} style={{ width:"8px", height:"8px", borderRadius:"50%", background:c }}/>
                  ))}
                  <div style={{ flex:1, background:"rgba(255,255,255,.04)", borderRadius:"4px",
                    height:"18px", marginLeft:"8px", display:"flex", alignItems:"center", paddingLeft:"8px" }}>
                    <span style={{ fontSize:"9px", color:"#2a2a2a" }}>admin.goonya.com.au</span>
                  </div>
                </div>
                {/* fake emails */}
                {[
                  {from:"Client — Sarah",  subj:"Q4 Report ready",      time:"9:41am", unread:true},
                  {from:"Supplier",        subj:"Invoice #0042",         time:"9:15am", unread:true},
                  {from:"Team",            subj:"Monday standup notes",  time:"8:50am", unread:false},
                  {from:"CRM",             subj:"3 new leads this week", time:"8:00am", unread:false},
                ].map(({from,subj,time,unread},i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px",
                    padding:"8px 6px", borderRadius:"6px", marginBottom:"4px",
                    background: unread ? "rgba(155,124,255,.06)" : "transparent",
                    borderLeft: unread ? `2px solid ${A}` : "2px solid transparent",
                    animation:`slideUp .4s ease ${i*.1+.2}s both` }}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"50%",
                      background:`rgba(155,124,255,${unread?.18:.08})`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"11px", flexShrink:0 }}>
                      {from[0]}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"10px", color: unread ? "white" : "#555",
                        fontWeight: unread ? 600 : 400, whiteSpace:"nowrap",
                        overflow:"hidden", textOverflow:"ellipsis" }}>{from}</div>
                      <div style={{ fontSize:"9px", color:"#3a3a3a", whiteSpace:"nowrap",
                        overflow:"hidden", textOverflow:"ellipsis" }}>{subj}</div>
                    </div>
                    <div style={{ fontSize:"9px", color:"#3a3a3a", flexShrink:0 }}>{time}</div>
                  </div>
                ))}
                {/* calendar row */}
                <div style={{ marginTop:"10px", padding:"8px 6px",
                  background:"rgba(74,222,128,.05)", border:"1px solid rgba(74,222,128,.15)",
                  borderRadius:"6px", display:"flex", alignItems:"center", gap:"8px" }}>
                  <span style={{ fontSize:"12px" }}>📆</span>
                  <div>
                    <div style={{ fontSize:"10px", color:"white" }}>2:00pm — Client call</div>
                    <div style={{ fontSize:"9px", color:"#4ade80" }}>Scheduled & confirmed</div>
                  </div>
                </div>
              </div>

              {/* laptop base */}
              <div style={{ height:"8px", background:"#1a1230",
                borderRadius:"0 0 6px 6px", margin:"0 8px" }}/>
              <div style={{ height:"4px", background:"#120e24",
                borderRadius:"0 0 8px 8px", margin:"0 16px" }}/>

              {/* floating cards — desktop: absolute, mobile: inline row */}
              <div className="admin-cards-wrap" style={{ marginTop:"16px" }}>

                {/* tasks card */}
                <div className="admin-float-card" style={{ position:"absolute", top:"-20px", right:"-40px",
                  background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
                  borderRadius:"12px", padding:"12px 16px",
                  animation:"float1 3s ease-in-out infinite",
                  boxShadow:"0 8px 32px rgba(0,0,0,.4)", zIndex:3 }}>
                  <div style={{ fontSize:"9px", color:"#555", marginBottom:"6px", letterSpacing:"1px" }}>TASKS DONE TODAY</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"24px",
                    fontWeight:700, color:"white", letterSpacing:"-1px" }}>14 / 14</div>
                  <div style={{ fontSize:"10px", color:"#4ade80", marginTop:"3px" }}>All complete</div>
                </div>

                {/* hours card */}
                <div className="admin-float-card" style={{ position:"absolute", bottom:"20px", left:"-40px",
                  background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
                  borderRadius:"12px", padding:"12px 16px",
                  animation:"float2 3.5s ease-in-out infinite",
                  boxShadow:"0 8px 32px rgba(0,0,0,.4)", zIndex:3 }}>
                  <div style={{ fontSize:"9px", color:"#555", marginBottom:"6px", letterSpacing:"1px" }}>HOURS SAVED</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"24px",
                    fontWeight:700, color:"white", letterSpacing:"-1px" }}>12h</div>
                  <div style={{ fontSize:"10px", color:A, marginTop:"3px" }}>This week</div>
                </div>

                {/* mobile-only inline cards */}
                <div className="admin-mobile-cards" style={{ display:"none", gap:"10px", marginTop:"4px" }}>
                  <div style={{ flex:1, background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
                    borderRadius:"10px", padding:"12px 14px" }}>
                    <div style={{ fontSize:"9px", color:"#555", marginBottom:"4px", letterSpacing:"1px" }}>TASKS TODAY</div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
                      fontWeight:700, color:"white", letterSpacing:"-1px" }}>14/14</div>
                    <div style={{ fontSize:"10px", color:"#4ade80", marginTop:"2px" }}>All done</div>
                  </div>
                  <div style={{ flex:1, background:"rgba(10,8,22,.95)", border:`1px solid ${L}`,
                    borderRadius:"10px", padding:"12px 14px" }}>
                    <div style={{ fontSize:"9px", color:"#555", marginBottom:"4px", letterSpacing:"1px" }}>HOURS SAVED</div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
                      fontWeight:700, color:"white", letterSpacing:"-1px" }}>12h</div>
                    <div style={{ fontSize:"10px", color:A, marginTop:"2px" }}>This week</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <RoiCalculator />

      <GrowthSystemVisual />

      <TestimonialsWithPhotos />

      {/* ══ CTA ══ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 160px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700,
          letterSpacing:"-4px", lineHeight:.92, color:"white", margin:"0 0 24px" }}>
          Ready to get more customers<br/><span style={{color:A}}>without the big agency bill?</span>
        </h2>
        <p style={{ color:"#666", fontSize:"17px", maxWidth:"480px", margin:"0 auto 40px", lineHeight:1.7 }}>
          Check your growth score, pick a package, or book a strategy call — whatever fits where you're at.
        </p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#growth-check" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
            padding:"18px 36px", background:"white", color:"black", borderRadius:"100px",
            fontWeight:700, fontSize:"15px", textDecoration:"none",
            boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
            Check My Business Growth
          </a>
          <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
            padding:"18px 36px", color:"white", borderRadius:"100px",
            fontWeight:600, fontSize:"15px", textDecoration:"none",
            border:`1px solid rgba(255,255,255,.2)` }}>
            Book a Strategy Call
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes rowSlideIn {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes blink {
          0%,100%{opacity:1} 50%{opacity:0}
        }
        @keyframes heroPulse {
          0%,100%{ opacity:1; transform:translateY(0); }
          50%{ opacity:.85; transform:translateY(-2px); }
        }
        @keyframes pdot {
          0%,100%{box-shadow:0 0 6px #9b7cff}
          50%{box-shadow:0 0 16px #9b7cff,0 0 28px rgba(155,124,255,.4)}
        }
        @keyframes barRise {
          from{transform:scaleY(0);transform-origin:bottom}
          to{transform:scaleY(1);transform-origin:bottom}
        }
        @keyframes cardFlip {
          from{opacity:0;transform:translateY(12px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes float1 {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        @keyframes float2 {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-14px)}
        }

        /* ── MOBILE ── */
        @media(max-width:850px){

          /* hero — single column, robot hidden */
          .hero-grid { grid-template-columns:1fr !important; padding:100px 0 70px !important; }
          .hero-robot { display:none !important; }

          /* hero text smaller but still big */
          .hero-h1 span { font-size:clamp(48px,13vw,72px) !important; letter-spacing:-2px !important; lineHeight:0.92 !important; }

          /* all 2-col grids → 1 col */
          .grid-2col { grid-template-columns:1fr !important; }
          .grid-1p2col { grid-template-columns:1fr !important; }

          /* stats → 2 col */
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .stat-cell { padding:36px 20px !important; }
          .stat-cell:nth-child(2){ border-right:none !important; }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2){ border-bottom:1px solid rgba(255,255,255,.08) !important; }

          /* services row → 2 col on mobile */
          .services-row { grid-template-columns:repeat(2,1fr) !important; }
          .services-row a { padding:24px 18px !important; }

          /* work showcase → 1 col */
          .showcase-grid { grid-template-columns:1fr !important; }

          /* social section → 1 col */
          .social-grid { grid-template-columns:1fr !important; }

          /* admin grid → 1 col */
          .admin-grid { grid-template-columns:1fr !important; }

          /* hide admin floating cards on mobile, show inline ones */
          .admin-float-card { display:none !important; }
          .admin-mobile-cards { display:flex !important; }

          /* testimonials → 1 col */
          .testi-grid { grid-template-columns:1fr !important; }

          /* process → 2 col */
          .process-grid { grid-template-columns:repeat(2,1fr) !important; }

          /* section padding tighter */
          .section-pad { padding:80px 0 !important; }

          /* marquee font */
          .mq-track b { font-size:10px !important; }

          /* general inline grids */
          div[style*="repeat(4,1fr)"] { grid-template-columns:repeat(2,1fr) !important; }
          div[style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; }
          div[style*="1.4fr 1fr"]     { grid-template-columns:1fr !important; }
          div[style*="1.2fr 1fr"]     { grid-template-columns:1fr !important; }
          div[style*="1fr 1fr"]       { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
