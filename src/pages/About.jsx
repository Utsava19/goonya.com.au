import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // fade in
    const items = document.querySelectorAll(".ab-fi");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .6s ease ${i*.1}s, transform .6s ease ${i*.1}s`;
      setTimeout(() => { el.style.opacity="1"; el.style.transform="translateY(0)"; }, 40);
    });
  }, []);

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden",
        background:"radial-gradient(ellipse 70% 60% at 30% 50%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>

        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 100px",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>

          {/* LEFT */}
          <div>
            <div className="ab-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
              marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>01 / ABOUT GOONYA
            </div>
            <h1 className="ab-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
              fontWeight:700, letterSpacing:"-4px", lineHeight:.92 }}>
              <span style={{ display:"block", fontSize:"clamp(62px,7vw,108px)", color:"white" }}>WE BELIEVE</span>
              <span style={{ display:"block", fontSize:"clamp(62px,7vw,108px)", color:"white" }}>BUSINESS SHOULD</span>
              <span style={{ display:"block", fontSize:"clamp(62px,7vw,108px)",
                background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text", paddingBottom:"6px" }}>MOVE FASTER.</span>
            </h1>
            <p className="ab-fi" style={{ maxWidth:"460px", marginTop:"32px",
              color:"#666", fontSize:"17px", lineHeight:1.75 }}>
              Goonya helps businesses use technology, automation and digital
              experiences to work smarter — and compete like companies twice their size.
            </p>
            <div className="ab-fi" style={{ display:"flex", gap:"14px", marginTop:"40px", flexWrap:"wrap" }}>
              <Link to="/services" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"14px", textDecoration:"none",
                boxShadow:"0 0 40px rgba(155,124,255,.3)" }}>
                What we do <span>↗</span>
              </Link>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"15px 30px", color:"white", fontSize:"14px", textDecoration:"none",
                borderRadius:"100px", border:"1px solid rgba(255,255,255,.15)" }}>
                Get in touch <span>↓</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — values */}
          <div className="ab-fi" style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
            {[
              { n:"01", title:"Speed over perfection", desc:"We move fast, test quickly and improve continuously. Done beats perfect every time." },
              { n:"02", title:"Built for business owners", desc:"We're not an agency that disappears after launch. We're your digital partner long-term." },
              { n:"03", title:"Results you can measure", desc:"Every system we build is tied to a real outcome — more leads, more time, more revenue." },
              { n:"04", title:"No jargon, no bullshit", desc:"We explain everything in plain language and only recommend what you actually need." },
            ].map(({n,title,desc}) => (
              <div key={n} style={{ padding:"28px 32px", background:"#08060f",
                border:`1px solid ${L}`, borderBottom:"none" }}
                onMouseEnter={e=>e.currentTarget.style.background="#0d0b18"}
                onMouseLeave={e=>e.currentTarget.style.background="#08060f"}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"20px" }}>
                  <span style={{ fontSize:"11px", color:A, letterSpacing:"1.5px",
                    fontFamily:"'Space Grotesk',sans-serif", flexShrink:0, paddingTop:"3px" }}>{n}</span>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"16px",
                      fontWeight:600, color:"white", marginBottom:"6px" }}>{title}</div>
                    <div style={{ fontSize:"14px", color:"#555", lineHeight:1.6 }}>{desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ border:`1px solid ${L}` }}/>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${L}` }}>
        {[
          {v:"40+",  l:"Projects Delivered"},
          {v:"3+",   l:"Years Experience"},
          {v:"98%",  l:"Client Satisfaction"},
          {v:"120h", l:"Avg Hours Saved"},
        ].map(({v,l},i) => (
          <div key={l} style={{ padding:"60px 40px", borderRight:i<3?`1px solid ${L}`:"none" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(44px,4vw,68px)", fontWeight:700, letterSpacing:"-3px", color:"white" }}>{v}</div>
            <p style={{ marginTop:"8px", fontSize:"12px", letterSpacing:"1px", color:"#3a3a3a" }}>{l}</p>
          </div>
        ))}
      </div>

      {/* ── WHO WE ARE ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
        background:L, border:`1px solid ${L}`, margin:"80px auto 130px" }}>
        <div style={{ padding:"70px 60px", background:"#08060f" }}>
          <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"22px",
            display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>WHO WE ARE
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(30px,3.5vw,52px)", fontWeight:700, letterSpacing:"-2.5px",
            color:"white", marginBottom:"22px", lineHeight:1.05 }}>
            A small team that<span style={{color:A}}> punches above its weight.</span>
          </h2>
          <p style={{ color:"#555", fontSize:"16px", lineHeight:1.8, marginBottom:"20px" }}>
            We're a tight-knit team of designers, developers and strategists
            based in Australia. We work with ambitious businesses that want
            to grow — not just maintain.
          </p>
          <p style={{ color:"#444", fontSize:"16px", lineHeight:1.8 }}>
            We don't take on every client. We take on the right ones —
            businesses serious about using technology as a competitive advantage.
          </p>
        </div>
        <div style={{ background:"#050410", padding:"70px 60px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"300px", height:"300px",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(155,124,255,.12),transparent 70%)",
            filter:"blur(40px)" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a", marginBottom:"22px",
              display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>WHAT DRIVES US
            </div>
            {[
              { icon:"🚀", text:"Making small businesses competitive with enterprise-level systems." },
              { icon:"🤝", text:"Building real relationships, not just client-vendor transactions." },
              { icon:"⚡", text:"Delivering fast — because speed is a competitive advantage." },
              { icon:"📊", text:"Obsessing over outcomes, not outputs." },
            ].map(({icon,text},i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"14px",
                marginBottom:"24px" }}>
                <span style={{ fontSize:"20px", flexShrink:0 }}>{icon}</span>
                <span style={{ fontSize:"15px", color:"#666", lineHeight:1.65 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"100px 0 140px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700, letterSpacing:"-4px",
          lineHeight:.9, color:"white", margin:"0 0 48px" }}>
          Ready to move<br/><span style={{color:A}}>faster?</span>
        </h2>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
          padding:"18px 44px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Start a project <span>↗</span>
        </Link>
      </div>

      <style>{`
        @media(max-width:850px){
          div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr) !important;}
          h1 span{font-size:clamp(48px,12vw,72px) !important;}
        }
      `}</style>
    </div>
  );
}
