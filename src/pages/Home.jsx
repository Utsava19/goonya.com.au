import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── DOT GRID + AURORA CANVAS ── */
function HeroBg() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let W, H, raf;
    const resize = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // aurora blobs
    const blobs = [
      { x: 0.65, y: 0.4,  r: 0.45, hue: 260, speed: 0.0003 },
      { x: 0.35, y: 0.7,  r: 0.35, hue: 280, speed: 0.0004 },
      { x: 0.8,  y: 0.8,  r: 0.3,  hue: 240, speed: 0.0005 },
    ];
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      // dot grid
      const gap = 38;
      for (let x = 0; x < W; x += gap) {
        for (let y = 0; y < H; y += gap) {
          // distance from nearest blob
          let glow = 0;
          blobs.forEach(b => {
            const bx = (b.x + Math.sin(t * b.speed * 3) * 0.08) * W;
            const by = (b.y + Math.cos(t * b.speed * 2) * 0.06) * H;
            const d = Math.sqrt((x - bx) ** 2 + (y - by) ** 2);
            glow += Math.max(0, 1 - d / (b.r * W)) * 0.8;
          });
          const a = Math.min(0.06 + glow * 0.35, 0.55);
          const r = glow > 0.1 ? 1.8 : 1;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155,124,255,${a})`;
          ctx.fill();
        }
      }

      // aurora blobs
      blobs.forEach(b => {
        const bx = (b.x + Math.sin(t * b.speed * 3) * 0.08) * W;
        const by = (b.y + Math.cos(t * b.speed * 2) * 0.06) * H;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * W);
        grad.addColorStop(0,   `hsla(${b.hue},80%,65%,0.12)`);
        grad.addColorStop(0.5, `hsla(${b.hue},70%,55%,0.05)`);
        grad.addColorStop(1,   `hsla(${b.hue},60%,45%,0)`);
        ctx.beginPath();
        ctx.arc(bx, by, b.r * W, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", zIndex:0 }} />;
}

/* ── ROBOT ARM SVG ── */
function RobotArm() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // arm segments
    gsap.to("#seg1", { rotation: 8,  duration: 2.5, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"0% 50%" });
    gsap.to("#seg2", { rotation:-12, duration: 2,   repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"0% 50%", delay:.5 });
    gsap.to("#seg3", { rotation: 15, duration: 1.8, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"0% 50%", delay:.3 });
    gsap.to("#claw1",{ rotation: 10, duration: 1.5, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"100% 100%" });
    gsap.to("#claw2",{ rotation:-10, duration: 1.5, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"100% 0%"  });
    // data packets travelling
    gsap.to(".data-pkt", {
      strokeDashoffset: -200,
      duration: 2, repeat:-1, ease:"none", stagger: 0.4,
    });
    // eye glow
    gsap.to(".eye-glow", { opacity:.3, duration:1.2, repeat:-1, yoyo:true, ease:"sine.inOut" });
    // circuit traces
    gsap.to(".trace", {
      strokeDashoffset: 0,
      duration: 3, ease:"none", stagger:.2,
    });
  }, []);

  const ACC = "#9b7cff";

  return (
    <svg ref={ref} viewBox="0 0 420 480" style={{ width:"100%", height:"100%", overflow:"visible" }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-sm">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── circuit board background lines ── */}
      <g opacity=".18" stroke={ACC} strokeWidth=".8" fill="none">
        {[40,80,120,160,200,240,280,320,360,400].map(x=>(
          <line key={x} x1={x} y1="0" x2={x} y2="480" strokeDasharray="4 8"/>
        ))}
        {[40,80,120,160,200,240,280,320,360,400,440].map(y=>(
          <line key={y} x1="0" y1={y} x2="420" y2={y} strokeDasharray="4 8"/>
        ))}
      </g>

      {/* circuit traces animated */}
      {[
        "M40,440 L40,380 L120,380 L120,320",
        "M380,440 L380,360 L300,360 L300,280",
        "M200,440 L200,400",
      ].map((d,i) => (
        <path key={i} className="trace" d={d} stroke={ACC} strokeWidth="1.5" fill="none"
          strokeDasharray="200" strokeDashoffset="200" opacity=".5" />
      ))}

      {/* data packets on traces */}
      {["M40,440 L40,380 L120,380 L120,320","M380,440 L380,360 L300,360 L300,280"].map((d,i)=>(
        <path key={i} className="data-pkt" d={d} stroke="rgba(155,124,255,.9)" strokeWidth="2.5"
          fill="none" strokeDasharray="6 194" strokeDashoffset="0" filter="url(#glow-sm)"/>
      ))}

      {/* ── ROBOT BODY ── */}
      {/* base */}
      <rect x="155" y="380" width="110" height="20" rx="4" fill="#1a1230" stroke={ACC} strokeWidth="1"/>
      <rect x="175" y="370" width="70"  height="12" rx="3" fill="#14102a" stroke={ACC} strokeWidth=".8"/>

      {/* torso */}
      <rect x="145" y="230" width="130" height="140" rx="12" fill="#0f0c1e" stroke={ACC} strokeWidth="1.2"/>
      {/* torso panel lines */}
      <line x1="145" y1="280" x2="275" y2="280" stroke={ACC} strokeWidth=".6" opacity=".4"/>
      <line x1="145" y1="320" x2="275" y2="320" stroke={ACC} strokeWidth=".6" opacity=".4"/>
      {/* torso lights */}
      <circle cx="168" cy="255" r="4" fill={ACC} filter="url(#glow-sm)" opacity=".9"/>
      <circle cx="185" cy="255" r="4" fill="#4ade80" filter="url(#glow-sm)" opacity=".9"/>
      <circle cx="202" cy="255" r="4" fill="#f87171" filter="url(#glow-sm)" opacity=".7"/>
      {/* chest screen */}
      <rect x="162" y="290" width="96" height="50" rx="6" fill="#080614" stroke={ACC} strokeWidth=".8" opacity=".9"/>
      <text x="210" y="312" textAnchor="middle" fontSize="9" fill="#4ade80" fontFamily="monospace">■■■■■■░░</text>
      <text x="210" y="328" textAnchor="middle" fontSize="8" fill={ACC} fontFamily="monospace" opacity=".6">STATUS: OK</text>

      {/* head */}
      <rect x="155" y="140" width="110" height="88" rx="14" fill="#0f0c1e" stroke={ACC} strokeWidth="1.5"/>
      {/* eyes */}
      <ellipse className="eye-glow" cx="191" cy="172" rx="14" ry="10" fill={ACC} opacity=".6"/>
      <ellipse className="eye-glow" cx="229" cy="172" rx="14" ry="10" fill={ACC} opacity=".6"/>
      <ellipse cx="191" cy="172" rx="8" ry="7" fill={ACC} filter="url(#glow)"/>
      <ellipse cx="229" cy="172" rx="8" ry="7" fill={ACC} filter="url(#glow)"/>
      {/* pupils */}
      <circle cx="191" cy="172" r="3" fill="white"/>
      <circle cx="229" cy="172" r="3" fill="white"/>
      {/* mouth */}
      <rect x="178" y="198" width="64" height="6" rx="3" fill="#1a1230" stroke={ACC} strokeWidth=".8"/>
      <rect x="182" y="200" width="12" height="2" rx="1" fill={ACC} opacity=".8"/>
      <rect x="198" y="200" width="12" height="2" rx="1" fill={ACC} opacity=".5"/>
      <rect x="214" y="200" width="12" height="2" rx="1" fill={ACC} opacity=".8"/>
      {/* antenna */}
      <line x1="210" y1="140" x2="210" y2="115" stroke={ACC} strokeWidth="1.5"/>
      <circle cx="210" cy="108" r="7" fill="#0f0c1e" stroke={ACC} strokeWidth="1.5"/>
      <circle cx="210" cy="108" r="3" fill={ACC} filter="url(#glow)"/>

      {/* neck */}
      <rect x="196" y="228" width="28" height="14" rx="3" fill="#1a1230" stroke={ACC} strokeWidth=".8"/>

      {/* ── LEFT ARM ── */}
      <g id="seg1">
        <rect x="80" y="240" width="68" height="22" rx="8" fill="#0f0c1e" stroke={ACC} strokeWidth="1"/>
        <circle cx="80" cy="251" r="10" fill="#1a1230" stroke={ACC} strokeWidth="1.2"/>
        <g id="seg2">
          <rect x="30" y="245" width="54" height="16" rx="6" fill="#0f0c1e" stroke={ACC} strokeWidth=".9"/>
          <g id="seg3">
            {/* claw */}
            <g id="claw1"><path d="M30,248 Q15,240 8,245 Q15,253 30,253" fill="#1a1230" stroke={ACC} strokeWidth=".9"/></g>
            <g id="claw2"><path d="M30,254 Q15,260 8,255 Q15,248 30,254" fill="#1a1230" stroke={ACC} strokeWidth=".9"/></g>
          </g>
        </g>
      </g>

      {/* ── RIGHT ARM ── */}
      <g transform="scale(-1,1) translate(-420,0)">
        <g id="rseg1">
          <rect x="80" y="240" width="68" height="22" rx="8" fill="#0f0c1e" stroke={ACC} strokeWidth="1"/>
          <circle cx="80" cy="251" r="10" fill="#1a1230" stroke={ACC} strokeWidth="1.2"/>
          <rect x="30" y="245" width="54" height="16" rx="6" fill="#0f0c1e" stroke={ACC} strokeWidth=".9"/>
          <path d="M30,248 Q15,240 8,245 Q15,253 30,253" fill="#1a1230" stroke={ACC} strokeWidth=".9"/>
          <path d="M30,254 Q15,260 8,255 Q15,248 30,254" fill="#1a1230" stroke={ACC} strokeWidth=".9"/>
        </g>
      </g>

      {/* ── LEGS ── */}
      <rect x="165" y="368" width="30" height="14" rx="4" fill="#0f0c1e" stroke={ACC} strokeWidth=".9"/>
      <rect x="225" y="368" width="30" height="14" rx="4" fill="#0f0c1e" stroke={ACC} strokeWidth=".9"/>

      {/* floating data nodes */}
      {[
        {cx:50,  cy:120, label:"LEADS"},
        {cx:370, cy:100, label:"DATA"},
        {cx:390, cy:300, label:"AUTO"},
        {cx:30,  cy:320, label:"ROI"},
      ].map(({cx,cy,label},i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="22" fill="#0a0818" stroke={ACC} strokeWidth="1" opacity=".8"/>
          <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill={ACC} fontFamily="monospace" fontWeight="bold">{label}</text>
          <line x1={cx<210?cx+22:cx-22} y1={cy} x2={cx<210?140:280} y2={cy<250?200:310}
            stroke={ACC} strokeWidth=".6" strokeDasharray="4 4" opacity=".3"/>
        </g>
      ))}

      {/* glow under robot */}
      <ellipse cx="210" cy="400" rx="80" ry="12" fill={ACC} opacity=".12" filter="url(#glow)"/>
    </svg>
  );
}

/* ── PROFIT CHART ── */
function ProfitBars() {
  useEffect(() => {
    gsap.from(".pbar", {
      scaleY: 0, duration: 1.4, ease: "power3.out",
      stagger: .12, transformOrigin: "bottom",
      scrollTrigger: { trigger: ".profit-wrap", start: "top 88%" },
      clearProps: "transform",
    });
    gsap.from(".pval", {
      opacity: 0, y: 6, duration: .5, stagger: .12, delay: .7,
      scrollTrigger: { trigger: ".profit-wrap", start: "top 88%" },
      clearProps: "all",
    });
  }, []);

  const bars = [
    { h:34, q:"Q1", v:"$12k", c:"rgba(155,124,255,.3)" },
    { h:52, q:"Q2", v:"$18k", c:"rgba(155,124,255,.5)" },
    { h:43, q:"Q3", v:"$15k", c:"rgba(155,124,255,.6)" },
    { h:75, q:"Q4", v:"$27k", c:"#9b7cff" },
  ];

  return (
    <div className="profit-wrap" style={{
      background:"rgba(10,8,22,.95)",
      border:"1px solid rgba(155,124,255,.25)",
      borderRadius:"16px", padding:"24px 28px",
      backdropFilter:"blur(16px)", width:"260px",
    }}>
      <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#555", marginBottom:"16px" }}>
        CLIENT REVENUE GROWTH
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"10px", height:"76px", marginBottom:"8px" }}>
        {bars.map((b,i)=>(
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
            <div className="pval" style={{ fontSize:"9px", color:"#9b7cff", fontWeight:600 }}>{b.v}</div>
            <div className="pbar" style={{
              width:"100%", height:`${b.h}px`,
              background: b.c,
              borderRadius:"4px 4px 0 0",
              boxShadow: i===3 ? "0 0 16px rgba(155,124,255,.4)" : "none",
            }}/>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:"10px" }}>
        {bars.map(b=>(
          <div key={b.q} style={{ flex:1, textAlign:"center", fontSize:"9px", color:"#444" }}>{b.q}</div>
        ))}
      </div>
      <div style={{
        marginTop:"14px", paddingTop:"12px",
        borderTop:"1px solid rgba(255,255,255,.05)",
        display:"flex", alignItems:"center", gap:"8px",
      }}>
        <div style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade80" }}/>
        <span style={{ fontSize:"11px", color:"#555" }}>Avg +125% client growth</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // force visible
    gsap.set(".hero-line,.home-kicker,.hero-sub,.hero-ctas,.hero-right", {
      opacity:1, y:0, x:0, scale:1,
    });
    gsap.set(".reveal,.stagger-child", { opacity:1, y:0 });

    // hero entrance — words fly in, NOT shrink
    const tl = gsap.timeline({ delay:.2 });
    tl.from(".home-kicker",  { opacity:0, y:16, duration:.5, clearProps:"all" })
      .from(".hero-line",    { opacity:0, y:50, stagger:.1, duration:.8, ease:"power3.out", clearProps:"all" }, "-=.2")
      .from(".hero-sub",     { opacity:0, y:16, duration:.6, clearProps:"all" }, "-=.3")
      .from(".hero-ctas",    { opacity:0, y:12, duration:.5, clearProps:"all" }, "-=.3")
      .from(".hero-right",   { opacity:0, x:50, duration:1, ease:"power3.out", clearProps:"all" }, "-=.7");

    // counter
    let n = 0;
    const cel = document.querySelector(".live-count");
    if (cel) {
      const iv = setInterval(()=>{
        n += Math.floor(Math.random()*14)+2;
        if(n>=840){n=840;clearInterval(iv);}
        cel.textContent = n;
      },28);
    }

    // marquee
    gsap.to(".marquee-track", { xPercent:-50, duration:28, repeat:-1, ease:"none" });

    // scroll reveals
    gsap.utils.toArray(".reveal").forEach(el=>{
      gsap.from(el,{
        scrollTrigger:{trigger:el,start:"top 90%"},
        opacity:0, y:36, duration:.85, ease:"power3.out", clearProps:"all",
      });
    });
    gsap.utils.toArray(".stagger-parent").forEach(p=>{
      gsap.from(p.querySelectorAll(".stagger-child"),{
        scrollTrigger:{trigger:p,start:"top 88%"},
        opacity:0, y:32, stagger:.09, duration:.7, ease:"power3.out", clearProps:"all",
      });
    });

    // stat counters
    document.querySelectorAll(".stat-n").forEach(el=>{
      const t = parseFloat(el.dataset.t);
      const isF = String(t).includes(".");
      ScrollTrigger.create({
        trigger:el, start:"top 90%",
        onEnter:()=>gsap.to({v:0},{
          v:t, duration:2, ease:"power2.out",
          onUpdate:function(){
            el.textContent = isF
              ? this.targets()[0].v.toFixed(1)
              : Math.round(this.targets()[0].v);
          },
        }),
      });
    });

    // video ping-pong
    const vid = videoRef.current;
    if (vid) {
      vid.playbackRate = 0.6;
      vid.addEventListener("ended", ()=>{
        vid.currentTime = 0;
        vid.play();
      });
    }

    // scroll-pinned overlap: stat strip slides up over the section below
    gsap.from(".overlap-strip", {
      scrollTrigger: {
        trigger:".overlap-trigger",
        start:"top 80%",
        toggleActions:"play none none reverse",
      },
      y:60, opacity:0, duration:1, ease:"power3.out", clearProps:"all",
    });

    return ()=>ScrollTrigger.getAll().forEach(t=>t.kill());
  },[]);

  const A  = "#9b7cff";
  const L  = "rgba(255,255,255,.07)";
  const BG = "#070707";

  return (
    <div style={{ background:BG, overflowX:"hidden" }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden" }}>

        <HeroBg />

        {/* centre radial spotlight */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 60% 70% at 60% 45%, rgba(155,124,255,.08) 0%, transparent 70%)",
        }}/>

        <div style={{
          position:"relative", zIndex:2,
          width:"min(1400px, 90vw)", margin:"0 auto",
          padding:"130px 0 100px",
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"60px", alignItems:"center",
        }}>

          {/* LEFT */}
          <div>
            <div className="home-kicker" style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"6px 16px",
              border:`1px solid rgba(155,124,255,.3)`,
              borderRadius:"100px",
              background:"rgba(155,124,255,.07)",
              fontSize:"11px", letterSpacing:"2.5px", color:A,
              marginBottom:"32px",
            }}>
              <span style={{
                width:"7px",height:"7px",borderRadius:"50%",
                background:A, flexShrink:0,
                boxShadow:`0 0 10px ${A}`,
                animation:"pdot 2s infinite",
              }}/>
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            {/* HEADLINE — min 72px always */}
            <h1 style={{ margin:0 }}>
              {["YOUR BUSINESS.", "BUT SMARTER.", "AUTOMATED."].map((line,i)=>(
                <span key={i} className="hero-line" style={{
                  display:"block",
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:"clamp(72px, 7.5vw, 112px)",
                  fontWeight:700,
                  letterSpacing:"-4px",
                  lineHeight:.9,
                  color: i===1 ? "transparent" : "white",
                  background: i===1
                    ? `linear-gradient(90deg,${A},#e0b0ff 55%,${A})`
                    : "none",
                  backgroundSize: i===1 ? "200%" : "auto",
                  WebkitBackgroundClip: i===1 ? "text" : "unset",
                  WebkitTextFillColor: i===1 ? "transparent" : "white",
                  backgroundClip: i===1 ? "text" : "unset",
                }}>{line}</span>
              ))}
            </h1>

            <p className="hero-sub" style={{
              maxWidth:"440px", marginTop:"32px",
              color:"#666", fontSize:"17px", lineHeight:1.75,
            }}>
              Goonya builds websites, AI automation and digital systems
              that help ambitious businesses attract customers,
              save time and grow fast.
            </p>

            <div className="hero-ctas" style={{
              display:"flex", alignItems:"center", gap:"14px",
              marginTop:"40px", flexWrap:"wrap",
            }}>
              <Link to="/services" style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", background:"white", color:"black",
                borderRadius:"100px", fontWeight:700, fontSize:"14px",
                textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)",
              }}>Explore what we do <span>↗</span></Link>

              <Link to="/our-work" style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", color:"white", fontSize:"14px",
                textDecoration:"none", borderRadius:"100px",
                border:`1px solid rgba(255,255,255,.14)`,
              }}>See our work <span>↓</span></Link>
            </div>

            {/* live counter */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              marginTop:"32px", padding:"8px 16px",
              background:"rgba(74,222,128,.07)",
              border:"1px solid rgba(74,222,128,.18)",
              borderRadius:"100px", fontSize:"12px", color:"#4ade80",
            }}>
              <span style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade80" }}/>
              <span className="live-count">0</span> tasks automated today
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="hero-right" style={{ position:"relative", height:"500px" }}>
            <RobotArm />

            {/* profit card — bottom left */}
            <div style={{ position:"absolute", bottom:"-10px", left:"-30px", zIndex:4 }}>
              <ProfitBars />
            </div>

            {/* status card — top right */}
            <div style={{
              position:"absolute", top:"20px", right:"-20px", zIndex:4,
              background:"rgba(10,8,22,.95)",
              border:`1px solid ${L}`,
              borderRadius:"14px", padding:"18px 20px",
              backdropFilter:"blur(14px)", minWidth:"185px",
            }}>
              {[
                {c:"#4ade80",l:"Systems live",v:"12"},
                {c:A,        l:"Tasks/day", v:"840"},
                {c:"#f87171",l:"Hours saved",  v:"∞"},
              ].map(({c,l,v})=>(
                <div key={l} style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px" }}>
                  <span style={{ width:"8px",height:"8px",borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,flexShrink:0 }}/>
                  <span style={{ fontSize:"12px",color:"#555",flex:1 }}>{l}</span>
                  <span style={{ fontSize:"12px",color:"white",fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="marquee-track" style={{ display:"flex", width:"max-content" }}>
          {[...Array(2)].map((_,i)=>(
            <span key={i} style={{ display:"flex",alignItems:"center",gap:"26px",paddingRight:"26px" }}>
              {["AI AUTOMATION","WEBSITES","DIGITAL SYSTEMS","MARKETING","GOONYA.COM.AU","BUILD WHAT'S NEXT"].map(w=>(
                <span key={w} style={{ display:"inline-flex",alignItems:"center",gap:"26px" }}>
                  <b style={{ fontSize:"11px",letterSpacing:"2px",fontWeight:500,color:"#2a2a2a" }}>{w}</b>
                  <em style={{ fontStyle:"normal",color:A,fontSize:"9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <div className="overlap-trigger" style={{ position:"relative" }}>
        <div className="overlap-strip stagger-parent" style={{
          width:"min(1400px,90vw)", margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          borderBottom:`1px solid ${L}`,
        }}>
          {[
            {v:"40", s:"+", l:"Projects Delivered"},
            {v:"0.8",s:"s", l:"Avg Response Time"},
            {v:"98", s:"%", l:"Client Satisfaction"},
            {v:"120",s:"h", l:"Hours Saved / Client"},
          ].map(({v,s,l},i)=>(
            <div className="stagger-child" key={l} style={{
              padding:"64px 40px",
              borderRight: i<3 ? `1px solid ${L}` : "none",
            }}>
              <div style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(48px,4.5vw,76px)",
                fontWeight:700, letterSpacing:"-3px", lineHeight:1,
                color:"white",
              }}>
                <span className="stat-n" data-t={v}>0</span>
                <sup style={{ fontSize:".4em",color:A,verticalAlign:"super" }}>{s}</sup>
              </div>
              <p style={{ marginTop:"8px",fontSize:"12px",letterSpacing:"1px",color:"#3a3a3a" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ STATEMENT ══════════ */}
      <div style={{ padding:"130px 0" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="reveal" style={{ display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",marginBottom:"26px" }}>
            <span style={{ width:"20px",height:"1px",background:A }}/>
            01 / THE GOONYA IDEA
          </div>
          <h2 className="reveal" style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(42px,5.5vw,86px)",
            fontWeight:700, letterSpacing:"-3.5px", lineHeight:.96,
            color:"white", maxWidth:"860px", marginBottom:"28px",
          }}>
            Your business has<span style={{color:A}}> enough to think about.</span>
          </h2>
          <p className="reveal" style={{ color:"#444",fontSize:"18px",lineHeight:1.75,maxWidth:"500px" }}>
            Your technology shouldn't be one of them. We connect the digital
            pieces behind your business so everything works together — invisibly, reliably, at scale.
          </p>
        </div>
      </div>

      {/* ══════════ SERVICES — 2×2 GRID ══════════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom:"56px" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",marginBottom:"18px" }}>
            <span style={{ width:"20px",height:"1px",background:A }}/>02 / WHAT WE DO
          </div>
          <h2 style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(36px,4.2vw,64px)",
            fontWeight:700, letterSpacing:"-2.5px",
            color:"white",
          }}>
            The machine<span style={{color:A}}> behind your business.</span>
          </h2>
        </div>

        <div className="stagger-parent" style={{
          display:"grid", gridTemplateColumns:"repeat(2,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}`,
        }}>
          {[
            {n:"01",t:"AI Automation",    d:"Eliminate repetitive tasks. Intelligent systems handle the work so your team focuses on what actually matters.",       glow:"rgba(155,124,255,.4)"},
            {n:"02",t:"Website Design",   d:"High-performance websites built to convert. Fast, modern, optimised to grow your business from day one.",              glow:"rgba(0,210,190,.28)"},
            {n:"03",t:"Digital Marketing",d:"Get discovered by the right people at the right time. Data-driven campaigns that grow revenue, not just impressions.", glow:"rgba(255,100,180,.22)"},
            {n:"04",t:"Systems Integration",d:"Connect your tools, automate your workflows, and make your entire business run as one smart, efficient machine.",    glow:"rgba(100,180,255,.22)"},
          ].map(({n,t,d,glow},i)=>(
            <Link to="/services" key={n} className="stagger-child" style={{
              display:"block", padding:"56px 52px",
              background:"#08060f",
              textDecoration:"none",
              position:"relative", overflow:"hidden",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="#0d0b18"}
              onMouseLeave={e=>e.currentTarget.style.background="#08060f"}
            >
              <div style={{
                position:"absolute", top:"-60px", right:"-60px",
                width:"220px", height:"220px", borderRadius:"50%",
                background:`radial-gradient(circle,${glow},transparent 70%)`,
                filter:"blur(30px)", pointerEvents:"none",
              }}/>
              <div style={{ fontSize:"11px",letterSpacing:"2px",color:A,marginBottom:"52px",fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
              <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"28px",fontWeight:700,letterSpacing:"-1px",color:"white",marginBottom:"14px" }}>{t}</h3>
              <p style={{ color:"#444",fontSize:"15px",lineHeight:1.65,maxWidth:"340px" }}>{d}</p>
              <div style={{ marginTop:"36px",fontSize:"20px",color:A }}>↗</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════ VIDEO — SCROLL OVERLAP ══════════ */}
      <div className="reveal" style={{
        position:"relative",
        width:"min(1400px,90vw)", margin:"0 auto 130px",
      }}>
        <div style={{
          position:"relative", height:"580px",
          overflow:"hidden", border:`1px solid ${L}`,
        }}>
          <video ref={videoRef} autoPlay muted playsInline style={{ width:"100%",height:"120%",objectFit:"cover",display:"block" }}>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4"/>
          </video>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,7,7,.92) 0%,rgba(7,7,7,.2) 55%,transparent 100%)" }}/>
          <div style={{ position:"absolute",bottom:"52px",left:"52px" }}>
            <div style={{ fontSize:"11px",letterSpacing:"2.5px",color:"#444" }}>THE DIGITAL MACHINE</div>
            <h2 style={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(40px,5.5vw,84px)",
              fontWeight:700, letterSpacing:"-3px", lineHeight:.9,
              marginTop:"14px", color:"white",
            }}>
              BUILD ONCE.<br/><em style={{fontStyle:"normal",color:A}}>RUN SMARTER.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"80px 0", marginBottom:"130px" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center",marginBottom:"60px" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",marginBottom:"16px" }}>
              <span style={{ width:"20px",height:"1px",background:A }}/>WHAT CLIENTS SAY
            </div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(32px,3.5vw,52px)",fontWeight:700,letterSpacing:"-2px",color:"white" }}>
              Results that <span style={{color:A}}>speak for themselves.</span>
            </h2>
          </div>
          <div className="stagger-parent" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:L,border:`1px solid ${L}` }}>
            {[
              {q:'"Goonya automated our entire lead follow-up. We went from missing enquiries to closing 3x more deals."', n:"Sarah M.", r:"Retail Business Owner"},
              {q:'"Our website traffic doubled in 60 days. The systems they built just work — we don\'t think about it."', n:"James K.", r:"Trade Services CEO"},
              {q:'"Best investment we\'ve made. The AI tools save us 20+ hours a week, every single week."', n:"Lisa T.", r:"Marketing Director"},
            ].map(({q,n,r},i)=>(
              <div className="stagger-child" key={i} style={{ padding:"48px 40px",background:"#08060f" }}>
                <div style={{ fontSize:"28px",color:A,marginBottom:"20px",lineHeight:1 }}>"</div>
                <p style={{ color:"#666",fontSize:"15px",lineHeight:1.7,marginBottom:"28px" }}>{q}</p>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"14px",color:"white",fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:"12px",color:"#444",marginTop:"4px" }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ PROCESS ══════════ */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div className="reveal" style={{ marginBottom:"56px" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",marginBottom:"18px" }}>
            <span style={{ width:"20px",height:"1px",background:A }}/>03 / HOW IT WORKS
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(36px,4vw,62px)",fontWeight:700,letterSpacing:"-2.5px",color:"white" }}>
            Simple process. <span style={{color:A}}>Serious results.</span>
          </h2>
        </div>
        <div className="stagger-parent" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:L,border:`1px solid ${L}` }}>
          {[
            {n:"01",t:"Discovery",d:"We learn your business, your bottlenecks, and your goals."},
            {n:"02",t:"Strategy", d:"We map the exact digital system your business needs."},
            {n:"03",t:"Build",    d:"We execute fast, without cutting corners."},
            {n:"04",t:"Launch",   d:"We go live, track results, and keep improving."},
          ].map(({n,t,d})=>(
            <div className="stagger-child" key={n} style={{ padding:"44px 36px",background:BG }}>
              <div style={{ fontSize:"11px",letterSpacing:"2px",color:A,marginBottom:"24px",fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
              <div style={{ width:"28px",height:"1px",background:A,marginBottom:"20px",opacity:.3 }}/>
              <strong style={{ display:"block",fontSize:"18px",fontFamily:"'Space Grotesk',sans-serif",color:"white",marginBottom:"10px" }}>{t}</strong>
              <p style={{ color:"#444",fontSize:"14px",lineHeight:1.65 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ CTA ══════════ */}
      <div style={{ width:"min(1400px,90vw)",margin:"0 auto",padding:"130px 0 160px",textAlign:"center",borderTop:`1px solid ${L}` }}>
        <div className="reveal" style={{ display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",marginBottom:"22px" }}>
          <span style={{ width:"20px",height:"1px",background:A }}/>04 / READY?
        </div>
        <h2 className="reveal" style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(52px,7.5vw,120px)",
          fontWeight:700, letterSpacing:"-5px", lineHeight:.88,
          color:"white", margin:"0 0 56px",
        }}>
          Let's build something<br/><span style={{color:A}}>people remember.</span>
        </h2>
        <div className="reveal">
          <Link to="/contact" style={{
            display:"inline-flex",alignItems:"center",gap:"12px",
            padding:"20px 48px",background:"white",color:"black",
            borderRadius:"100px",fontWeight:700,fontSize:"16px",
            textDecoration:"none",
            boxShadow:"0 0 60px rgba(155,124,255,.35)",
          }}>Start a project <span>↗</span></Link>
        </div>
      </div>

      <style>{`@keyframes pdot{0%,100%{box-shadow:0 0 6px #9b7cff}50%{box-shadow:0 0 18px #9b7cff,0 0 32px rgba(155,124,255,.4)}}`}</style>
    </div>
  );
}
