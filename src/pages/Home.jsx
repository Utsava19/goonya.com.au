import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GrowthScoreCheck from "../components/GrowthScoreCheck";
import SiteStatsRow from "../components/SiteStatsRow";
import { SITE } from "../data/siteMeta";
import {
  HomeGrowthSystem,
  CaseStudyShowcase,
  PackagePreview,
  HowItWorks,
  RoiCalculator,
  GrowthSystemVisual,
  TestimonialsWithPhotos,
  SeoSpotlight,
  ContentCreationSpotlight,
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
      { x: 0.65, y: 0.4, r: 0.5, hue: 260, sp: 0.0003 },
      { x: 0.2, y: 0.7, r: 0.35, hue: 280, sp: 0.0004 },
      { x: 0.85, y: 0.75, r: 0.3, hue: 240, sp: 0.0005 },
    ];
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      blobs.forEach((b) => {
        b._x = (b.x + Math.sin(t * b.sp * 3) * 0.08) * W;
        b._y = (b.y + Math.cos(t * b.sp * 2) * 0.06) * H;
      });
      const gap = 40;
      for (let x = 0; x < W; x += gap) {
        for (let y = 0; y < H; y += gap) {
          let g = 0;
          blobs.forEach((b) => {
            const d = Math.hypot(x - b._x, y - b._y);
            g += Math.max(0, 1 - d / (b.r * W)) * 0.8;
          });
          const a = Math.min(0.04 + g * 0.3, 0.5);
          ctx.beginPath();
          ctx.arc(x, y, g > 0.1 ? 1.8 : 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155,124,255,${a})`;
          ctx.fill();
        }
      }
      blobs.forEach((b) => {
        const gr = ctx.createRadialGradient(b._x, b._y, 0, b._x, b._y, b.r * W);
        gr.addColorStop(0, `hsla(${b.hue},80%,65%,.1)`);
        gr.addColorStop(0.5, `hsla(${b.hue},70%,55%,.04)`);
        gr.addColorStop(1, `hsla(${b.hue},60%,45%,0)`);
        ctx.beginPath();
        ctx.arc(b._x, b._y, b.r * W, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }}
    />
  );
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

  return (
    <div style={{ overflowX:"hidden" }}>

      {/* ══ HERO ══ */}
      <section className="home-hero section-dark-deep" style={{
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

            <div className="fi" style={{ display:"flex", alignItems:"center",
              gap:"14px", marginTop:"36px", flexWrap:"wrap" }}>
              <Link to="/packages#plans" style={{ display:"inline-flex", alignItems:"center",
                padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"14px", textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
                View Our Packages
              </Link>
              <Link to="/contact" target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex", alignItems:"center", padding:"15px 30px", color:"white",
                fontSize:"14px", textDecoration:"none", borderRadius:"100px",
                border:"1px solid rgba(255,255,255,.15)" }}>
                Contact Us
              </Link>
            </div>

            <div className="fi" style={{
              marginTop:"18px", fontSize:"13px", color:"#555",
            }}>
              {SITE.address.suburb}, {SITE.address.state} ·{" "}
              <a href={`tel:${SITE.phoneTel}`} style={{ color:"#888", textDecoration:"none" }}>
                Call {SITE.phone}
              </a>
            </div>
          </div>

          {/* RIGHT — Growth Score Check (urgency pulse until user interacts) */}
          <div className="fi hero-growth-wrap">
            <GrowthScoreCheck id="growth-check" compact embedded urgent />
          </div>
        </div>
      </section>

      <HomeGrowthSystem />

      {/* ══ MARQUEE ══ */}
      <div className="home-marquee" style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="mq-track" style={{ display:"flex", width:"max-content" }}>
          {[...Array(3)].map((_,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"26px", paddingRight:"26px" }}>
              {["GET FOUND","GET LEADS","SAVE TIME","GOONYA.COM.AU","MORE CUSTOMERS","GROWTH SYSTEM"].map(w => (
                <span key={w} style={{ display:"inline-flex", alignItems:"center", gap:"26px" }}>
                  <b style={{ fontSize:"11px", letterSpacing:"2px", fontWeight:500, color:"#888" }}>{w}</b>
                  <em style={{ fontStyle:"normal", color:A, fontSize:"9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <SiteStatsRow
        className="home-stats-bridge"
        items={[
          { value: 40, suffix: "+", label: "Projects Delivered" },
          { value: 0.8, suffix: "s", label: "Avg Response Time" },
          { value: 98, suffix: "%", label: "Client Satisfaction" },
          { value: 120, suffix: "h", label: "Hours Saved / Client" },
        ]}
      />

      <CaseStudyShowcase />

      <TestimonialsWithPhotos />

      <PackagePreview />

      <HowItWorks />

      <section className="section-surface page-section">
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
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
      </section>

      <SeoSpotlight />

      <ContentCreationSpotlight />

      <RoiCalculator />

      <GrowthSystemVisual />

      {/* ══ CTA ══ */}
      <section className="section-dark-deep page-section" style={{ textAlign:"center" }}>
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 160px" }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700,
          letterSpacing:"-4px", lineHeight:.92, color:"white", margin:"0 0 24px" }}>
          Ready to get more customers<br/><span style={{color:A}}>without the big agency bill?</span>
        </h2>
        <p style={{ color:"#666", fontSize:"17px", maxWidth:"480px", margin:"0 auto 40px", lineHeight:1.7 }}>
          Check your growth score, pick a package, or book a strategy call — whatever fits where you're at.
        </p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
          <Link to="/packages#plans" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
            padding:"18px 36px", background:"white", color:"black", borderRadius:"100px",
            fontWeight:700, fontSize:"15px", textDecoration:"none",
            boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
            View Our Packages
          </Link>
          <Link to="/contact" target="_blank" rel="noopener noreferrer" style={{
            display:"inline-flex", alignItems:"center", padding:"18px 36px", color:"white",
            borderRadius:"100px", fontWeight:600, fontSize:"15px", textDecoration:"none",
            border:"1px solid rgba(255,255,255,.2)" }}>
            Contact Us
          </Link>
        </div>
      </div>
      </section>

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

          /* hero — single column */
          .hero-grid { grid-template-columns:1fr !important; padding:100px 0 70px !important; }

          /* hero text smaller but still big */
          .hero-h1 span { font-size:clamp(48px,13vw,72px) !important; letter-spacing:-2px !important; lineHeight:0.92 !important; }

          /* all 2-col grids → 1 col */
          .grid-2col { grid-template-columns:1fr !important; }
          .grid-1p2col { grid-template-columns:1fr !important; }

          /* stats → 2 col — handled by .site-stats-inner in theme.css */
          .home-stats-bridge .site-stat-cell { padding: 36px 20px !important; }

          .home-marquee { background: #0c0a14; }

          /* services row → 2 col on mobile */
          .services-row { grid-template-columns:repeat(2,1fr) !important; }
          .services-row a { padding:24px 18px !important; }

          /* work showcase → 1 col */
          .showcase-grid { grid-template-columns:1fr !important; }

          /* social section → 1 col */
          .social-grid { grid-template-columns:1fr !important; }

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
