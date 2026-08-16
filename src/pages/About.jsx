import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteStatsRow from "../components/SiteStatsRow";

/* ── LIVE NETWORK BG ── */
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
    const nodes = Array.from({ length: 35 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      vx: (Math.random() - .5) * .012, vy: (Math.random() - .5) * .012,
      pulse: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += .008;
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 100) n.vx *= -1;
        if (n.y < 0 || n.y > 100) n.vy *= -1;
        n.pulse += .025;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = nodes[i].x / 100 * W, ay = nodes[i].y / 100 * H;
          const bx = nodes[j].x / 100 * W, by = nodes[j].y / 100 * H;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(155,124,255,${(1 - d / 130) * .12})`;
            ctx.lineWidth = .7;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const x = n.x / 100 * W, y = n.y / 100 * H;
        const g = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y, 1 + g, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,124,255,${.25 + g * .35})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", zIndex:0 }} />;
}

/* ── TYPEWRITER ── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    let tm;
    if (!del && ci < word.length) tm = setTimeout(() => setCi(c => c + 1), 80);
    else if (!del && ci === word.length) tm = setTimeout(() => setDel(true), 1800);
    else if (del && ci > 0) tm = setTimeout(() => setCi(c => c - 1), 45);
    else { setDel(false); setWi(w => (w + 1) % words.length); }
    setDisplay(word.slice(0, ci));
    return () => clearTimeout(tm);
  }, [ci, del, wi, words]);
  return (
    <span style={{ color:"#9b7cff" }}>
      {display}
      <span style={{ borderRight:"3px solid #9b7cff", animation:"blink .7s infinite", marginLeft:"2px" }}/>
    </span>
  );
}

/* ── COUNTER ── removed — use SiteStatsRow / StatCounter ── */

export default function About() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";
  const LL = "rgba(20,17,24,.08)";

  useEffect(() => {
    // hero entrance
    document.querySelectorAll(".ah").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity .8s ease ${i * .12}s, transform .8s ease ${i * .12}s`;
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
    });
    // scroll reveals
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0) scale(1)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll(".ar").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(36px) scale(.98)";
      el.style.transition = "opacity .75s ease, transform .75s ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrap section-dark-deep">

      {/* ══ HERO ══ */}
      <section className="page-hero-dark" style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden" }}>
        <LiveBg />
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 80% 60% at 20% 50%, rgba(155,124,255,.1) 0%, transparent 60%)" }}/>
        <div style={{ position:"relative", zIndex:2, width:"min(1400px,90vw)",
          margin:"0 auto", padding:"130px 0 100px" }}>
          <div className="ah" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>ABOUT GOONYA
          </div>
          <h1 className="ah" style={{ margin:"0 0 12px", fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-3px", lineHeight:.92,
            fontSize:"clamp(46px,6.5vw,108px)", color:"white" }}>
            Why Goonya exists
          </h1>
          <h1 className="ah" style={{ margin:"0 0 36px", fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-3px", lineHeight:.92,
            fontSize:"clamp(32px,4.5vw,72px)", color:A }}>
            Small businesses shouldn't need a $5,000/month agency to compete online.
          </h1>
          <p className="ah" style={{ maxWidth:"560px", color:"#666",
            fontSize:"17px", lineHeight:1.75, marginBottom:"36px" }}>
            Goonya helps Australian small businesses get found, get leads and save time —
            with websites, marketing and smart automation in one growth system, not a pile of
            disconnected freelancers and tools.
          </p>
          <div className="ah" style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
            <Link to="/services" style={{ display:"inline-flex", alignItems:"center",
              padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
              fontWeight:700, fontSize:"14px", textDecoration:"none",
              boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>What we do</Link>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
              padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
              borderRadius:"100px", border:"1px solid rgba(255,255,255,.15)" }}>Get in touch</Link>
          </div>
        </div>
      </section>

      <SiteStatsRow
        className="stats-bridge-dark"
        items={[
          { value: 40, suffix: "+", label: "Projects Delivered" },
          { value: 3, suffix: "+", label: "Years Experience" },
          { value: 98, suffix: "%", label: "Client Satisfaction" },
          { value: 120, suffix: "h", label: "Hours Saved / Client" },
        ]}
      />

      {/* ══ PHOTO + ABOUT TEXT ══ */}
      <section className="section-solid-surface page-section">
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
        background:LL, border:`1px solid ${LL}`, borderRadius:"16px", overflow:"hidden",
        boxShadow:"0 24px 80px rgba(20,17,24,.06)" }} className="ab-tg">
        {/* photo */}
        <div className="ar" style={{ position:"relative", minHeight:"480px", overflow:"hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=75"
            alt="Goonya team working with a client"
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
              filter:"brightness(.75) saturate(.85)",
              transition:"transform .6s ease, filter .6s ease" }}
            onMouseEnter={e => { e.target.style.transform="scale(1.03)"; e.target.style.filter="brightness(.85) saturate(.95)"; }}
            onMouseLeave={e => { e.target.style.transform="scale(1)"; e.target.style.filter="brightness(.75) saturate(.85)"; }}
            onError={e => { e.target.parentElement.style.background="#0a0818"; e.target.style.display="none"; }}/>
          {/* colour overlay */}
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(135deg, rgba(155,124,255,.25) 0%, transparent 60%)",
            pointerEvents:"none" }}/>
          {/* badge */}
          <div style={{ position:"absolute", bottom:"28px", left:"28px",
            background:"rgba(7,7,7,.85)", border:`1px solid ${L}`,
            borderRadius:"12px", padding:"14px 20px", backdropFilter:"blur(12px)" }}>
            <div style={{ fontSize:"10px", letterSpacing:"2px", color:"#555", marginBottom:"4px" }}>BASED IN</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"16px",
              fontWeight:700, color:"white" }}>Melbourne, Australia</div>
          </div>
        </div>
        {/* text */}
        <div className="ar" style={{ padding:"70px 60px", background:"#ffffff" }}>
          <div className="eyebrow-light" style={{ marginBottom:"22px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>WHO WE ARE
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(28px,3.5vw,48px)", fontWeight:700, letterSpacing:"-2px",
            color:"#141118", marginBottom:"22px", lineHeight:1.05 }}>
            A small team that<span style={{color:A}}> punches above its weight.</span>
          </h2>
          <p style={{ color:"#5c5868", fontSize:"16px", lineHeight:1.8, marginBottom:"18px" }}>
            We're a tight-knit team of designers, developers and digital strategists
            based in Noble Park, Melbourne. We started Goonya because we saw too many
            good businesses being left behind — not because they weren't good enough,
            but because they didn't have the right digital systems in place.
          </p>
          <p style={{ color:"#5c5868", fontSize:"16px", lineHeight:1.8, marginBottom:"32px" }}>
            We work with tradies, hospitality businesses, healthcare providers,
            retailers and service businesses across Australia — building the websites,
            automation tools and marketing systems that help them grow.
          </p>
          {/* coloured tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
            {["Melbourne based","Australian owned","Fast turnaround","Long-term partner"].map(t => (
              <span key={t} style={{ padding:"6px 14px", borderRadius:"100px",
                background:"rgba(155,124,255,.1)", border:"1px solid rgba(155,124,255,.25)",
                fontSize:"12px", color:A }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* ══ VALUES — colourful cards ══ */}
      <section className="section-surface-alt page-section">
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div className="ar eyebrow-light" style={{ marginBottom:"48px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>WHAT WE STAND FOR
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)",
            gap:"16px" }} className="ab-vg">
            {[
              { title:"Speed over perfection",    desc:"We move fast, test quickly and improve continuously. Done beats perfect every time.",           accent:"#9b7cff", glow:"rgba(155,124,255,.2)" },
              { title:"Built for business owners", desc:"We're not an agency that disappears after launch. We're your long-term digital partner.",       accent:"#4ade80", glow:"rgba(74,222,128,.15)" },
              { title:"Results you can measure",  desc:"Every system we build is tied to a real outcome — more leads, more time, more revenue.",        accent:"#f97316", glow:"rgba(249,115,22,.15)" },
              { title:"No jargon, no bullshit",   desc:"We explain everything in plain language and only recommend what you actually need.",             accent:"#e879f9", glow:"rgba(232,121,249,.15)" },
            ].map(({title,desc,accent,glow},i) => (
              <div key={title} className="ar" style={{ padding:"44px 40px", background:"#ffffff",
                position:"relative", overflow:"hidden", borderRadius:"14px",
                border:"1px solid rgba(20,17,24,.06)",
                boxShadow:"0 12px 40px rgba(20,17,24,.04)",
                transition:"transform .25s ease, box-shadow .25s ease" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(20,17,24,.08)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 12px 40px rgba(20,17,24,.04)"; }}>
                <div style={{ position:"absolute", top:"-30px", right:"-30px",
                  width:"150px", height:"150px", borderRadius:"50%",
                  background:`radial-gradient(circle,${glow},transparent 70%)`,
                  filter:"blur(20px)", pointerEvents:"none",
                  animation:`pulse ${2.2+i*.3}s ease-in-out infinite alternate` }}/>
                {/* coloured top bar */}
                <div style={{ width:"36px", height:"3px", borderRadius:"2px",
                  background:accent, marginBottom:"20px",
                  boxShadow:`0 0 8px ${accent}` }}/>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
                  fontWeight:700, color:"#141118", marginBottom:"10px",
                  letterSpacing:"-.5px" }}>{title}</h3>
                <p style={{ fontSize:"14px", color:"#5c5868", lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE ACTIVITY ══ */}
      <section className="section-surface page-section">
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
        background:LL, border:`1px solid ${LL}`, borderRadius:"16px", overflow:"hidden",
        boxShadow:"0 24px 80px rgba(20,17,24,.06)" }} className="ab-ag">
        {/* left — second photo */}
        <div className="ar" style={{ position:"relative", minHeight:"420px", overflow:"hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=75"
            alt="Digital marketing and analytics"
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
              filter:"brightness(.65) saturate(.8)" }}
            onError={e=>{ e.target.parentElement.style.background="#0a0818"; e.target.style.display="none"; }}/>
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to right, rgba(7,7,7,.8) 0%, transparent 60%)",
            pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"40px", left:"40px", zIndex:2 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(24px,3vw,40px)", fontWeight:700,
              color:"white", letterSpacing:"-1.5px", lineHeight:1.1 }}>
              Results that<br/><span style={{color:A}}>speak.</span>
            </div>
          </div>
        </div>
        {/* right — live feed */}
        <div className="ar" style={{ padding:"56px 52px", background:"#ffffff",
          display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div className="eyebrow-light" style={{ marginBottom:"24px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>LIVE ACTIVITY
          </div>
          {[
            { t:"New website launched",   sub:"Hospitality client · Melbourne",   c:"#4ade80" },
            { t:"Automation running",     sub:"840 tasks handled today",          c:A },
            { t:"Campaign live",          sub:"Instagram · 2,400 new reach",      c:"#f97316" },
            { t:"Admin tasks complete",   sub:"14 / 14 done today",               c:"#e879f9" },
            { t:"New enquiry received",   sub:"Contact form · 2 mins ago",        c:"#38bdf8" },
          ].map(({t,sub,c},i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px",
              padding:"13px 16px", background:"rgba(20,17,24,.03)",
              borderRadius:"10px", marginBottom:"8px",
              border:"1px solid rgba(20,17,24,.06)",
              animation:`slideIn .5s ease ${i*.12+.1}s both` }}>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%",
                background:c, boxShadow:`0 0 8px ${c}`, flexShrink:0,
                animation:`dotPulse ${1.2+i*.2}s ease infinite` }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"13px", color:"#141118", fontWeight:500 }}>{t}</div>
                <div style={{ fontSize:"11px", color:"#8a8499", marginTop:"2px" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      <section className="section-fade-to-dark page-section">
      <div className="ar page-container" style={{
        padding:"100px 0 140px", textAlign:"center" }}>
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
      </section>

      <style>{`
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse    { from{opacity:.3;transform:scale(.85)} to{opacity:1;transform:scale(1.2)} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
        @keyframes dotPulse { 0%,100%{opacity:.5} 50%{opacity:1} }

        @media(max-width:850px){
          .ab-tg  { grid-template-columns:1fr !important; margin:40px auto 0 !important; }
          .ab-vg  { grid-template-columns:1fr !important; }
          .ab-ag  { grid-template-columns:1fr !important; margin:0 auto 80px !important; }
          div[style*="padding:70px 60px"] { padding:40px 28px !important; }
          div[style*="padding:56px 52px"] { padding:36px 28px !important; }
          div[style*="padding:44px 40px"] { padding:36px 24px !important; }
        }
      `}</style>
    </div>
  );
}
