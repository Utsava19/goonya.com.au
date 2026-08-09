import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

  useEffect(() => {
    // Simple CSS-based fade in — no GSAP, no crashes
    const items = document.querySelectorAll(".fade-in");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });

    // Simple marquee
    const track = document.querySelector(".marquee-track");
    if (track) {
      let x = 0;
      const w = track.scrollWidth / 2;
      const move = () => {
        x -= 0.5;
        if (Math.abs(x) >= w) x = 0;
        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(move);
      };
      move();
    }
  }, []);

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* HERO */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 80% 60% at 60% 40%, rgba(155,124,255,.1) 0%, transparent 70%)",
        position:"relative",
      }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 100px",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }}>

          {/* LEFT */}
          <div>
            <div className="fade-in" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"6px 16px", border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
              background:"rgba(155,124,255,.07)", fontSize:"11px", letterSpacing:"2.5px",
              color:A, marginBottom:"32px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:A, boxShadow:`0 0 10px ${A}` }}/>
              DIGITAL SYSTEMS FOR MODERN BUSINESS
            </div>

            <h1 className="fade-in" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
              fontWeight:700, letterSpacing:"-4px", lineHeight:.92 }}>
              <span style={{ display:"block", fontSize:"clamp(72px,7.5vw,112px)", color:"white" }}>YOUR BUSINESS.</span>
              <span style={{ display:"block", fontSize:"clamp(72px,7.5vw,112px)",
                background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text", paddingBottom:"6px" }}>BUT SMARTER.</span>
              <span style={{ display:"block", fontSize:"clamp(72px,7.5vw,112px)", color:"white" }}>AUTOMATED.</span>
            </h1>

            <p className="fade-in" style={{ maxWidth:"440px", marginTop:"32px",
              color:"#666", fontSize:"17px", lineHeight:1.75 }}>
              Goonya builds websites, automation and digital systems that help
              ambitious businesses attract customers, save time and grow fast.
            </p>

            <div className="fade-in" style={{ display:"flex", alignItems:"center",
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

          {/* RIGHT — simple visual */}
          <div className="fade-in" style={{ position:"relative", height:"480px",
            display:"flex", alignItems:"center", justifyContent:"center" }}>

            {/* glow orb */}
            <div style={{ position:"absolute", width:"360px", height:"360px", borderRadius:"50%",
              background:`radial-gradient(circle, rgba(155,124,255,.3), transparent 70%)`,
              filter:"blur(50px)" }}/>

            {/* rings */}
            <div style={{ position:"absolute", width:"300px", height:"300px", borderRadius:"50%",
              border:`1px solid rgba(155,124,255,.3)`, animation:"spin1 12s linear infinite" }}/>
            <div style={{ position:"absolute", width:"220px", height:"220px", borderRadius:"50%",
              border:"1px dashed rgba(155,124,255,.2)", animation:"spin2 8s linear infinite" }}/>

            {/* centre */}
            <div style={{ position:"relative", zIndex:2, textAlign:"center",
              background:"rgba(10,8,22,.9)", border:`1px solid rgba(155,124,255,.4)`,
              borderRadius:"20px", padding:"28px 36px",
              boxShadow:"0 0 40px rgba(155,124,255,.2)" }}>
              <div style={{ fontSize:"11px", letterSpacing:"3px", color:A, marginBottom:"12px" }}>SYSTEMS LIVE</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"48px",
                fontWeight:700, letterSpacing:"-2px", color:"white", lineHeight:1 }}>12</div>
              <div style={{ fontSize:"12px", color:"#4ade80", marginTop:"8px" }}>● All running</div>
            </div>

            {/* stat cards */}
            <div style={{ position:"absolute", bottom:"40px", left:"-20px",
              background:"rgba(10,8,22,.9)", border:`1px solid ${L}`,
              borderRadius:"14px", padding:"16px 20px", backdropFilter:"blur(12px)" }}>
              <div style={{ fontSize:"10px", letterSpacing:"2px", color:"#555", marginBottom:"8px" }}>CLIENT GROWTH</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"28px",
                fontWeight:700, color:"white", letterSpacing:"-1px" }}>+125%</div>
              <div style={{ fontSize:"11px", color:"#4ade80", marginTop:"4px" }}>↑ Average per client</div>
            </div>

            <div style={{ position:"absolute", top:"40px", right:"-20px",
              background:"rgba(10,8,22,.9)", border:`1px solid ${L}`,
              borderRadius:"14px", padding:"16px 20px", backdropFilter:"blur(12px)" }}>
              <div style={{ fontSize:"10px", letterSpacing:"2px", color:"#555", marginBottom:"8px" }}>TASKS / DAY</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"28px",
                fontWeight:700, color:"white", letterSpacing:"-1px" }}>840</div>
              <div style={{ fontSize:"11px", color:A, marginTop:"4px" }}>● Automated</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, padding:"13px 0" }}>
        <div className="marquee-track" style={{ display:"flex", width:"max-content", willChange:"transform" }}>
          {[...Array(3)].map((_,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"28px", paddingRight:"28px" }}>
              {["AI AUTOMATION","WEBSITES","DIGITAL SYSTEMS","MARKETING","GOONYA.COM.AU","BUILD WHAT'S NEXT"].map(w => (
                <span key={w} style={{ display:"inline-flex", alignItems:"center", gap:"28px" }}>
                  <b style={{ fontSize:"11px", letterSpacing:"2px", fontWeight:500, color:"#2a2a2a" }}>{w}</b>
                  <em style={{ fontStyle:"normal", color:A, fontSize:"9px" }}>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${L}` }}>
        {[
          {v:"40+",  l:"Projects Delivered"},
          {v:"0.8s", l:"Avg Response Time"},
          {v:"98%",  l:"Client Satisfaction"},
          {v:"120h", l:"Hours Saved / Client"},
        ].map(({v,l},i) => (
          <div key={l} className="fade-in" style={{ padding:"64px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(44px,4vw,72px)",
              fontWeight:700, letterSpacing:"-3px", color:"white" }}>{v}</div>
            <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{l}</p>
          </div>
        ))}
      </div>

      {/* STATEMENT */}
      <div style={{ padding:"130px 0" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"26px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>01 / THE GOONYA IDEA
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(42px,5.5vw,86px)", fontWeight:700, letterSpacing:"-3.5px",
            lineHeight:.96, color:"white", maxWidth:"860px", marginBottom:"28px" }}>
            Your business has<span style={{color:A}}> enough to think about.</span>
          </h2>
          <p style={{ color:"#444", fontSize:"18px", lineHeight:1.75, maxWidth:"500px" }}>
            Your technology shouldn't be one of them. We connect the digital pieces
            behind your business so everything works together.
          </p>
        </div>
      </div>

      {/* SERVICES */}
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
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px",
          background:L, border:`1px solid ${L}` }}>
          {[
            {n:"01",t:"AI Automation",       d:"Eliminate repetitive tasks. Intelligent systems handle the work so your team focuses on what matters.",       glow:"rgba(155,124,255,.3)"},
            {n:"02",t:"Website Design",      d:"High-performance websites built to convert. Fast, modern, optimised to grow your business from day one.",      glow:"rgba(0,210,190,.25)"},
            {n:"03",t:"Digital Marketing",   d:"Get discovered by the right people. Data-driven campaigns that grow revenue, not just impressions.",           glow:"rgba(255,100,180,.2)"},
            {n:"04",t:"Systems Integration", d:"Connect your tools and automate your workflows — make your entire business run as one efficient machine.",     glow:"rgba(100,180,255,.2)"},
          ].map(({n,t,d,glow}) => (
            <Link to="/services" key={n} style={{ display:"block", padding:"56px 52px",
              background:"#08060f", textDecoration:"none", position:"relative", overflow:"hidden",
              minHeight:"260px" }}
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

      {/* PROCESS */}
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
            <div key={n} style={{ padding:"44px 36px", background:"#070707" }}>
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

      {/* TESTIMONIALS */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`,
        padding:"80px 0", marginBottom:"130px" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
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
              {q:'"Best investment we\'ve made. The tools save us 20+ hours a week, every week."',                  n:"Lisa T.",  r:"Marketing Director"},
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

      {/* CTA */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 160px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(52px,7.5vw,120px)", fontWeight:700, letterSpacing:"-5px",
          lineHeight:.88, color:"white", margin:"0 0 56px" }}>
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
        @keyframes spin1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @media(max-width:850px){
          section > div { grid-template-columns:1fr !important; padding:80px 0 !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns:repeat(2,1fr) !important; }
          div[style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; }
          div[style*="repeat(2,1fr)"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
