import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name:"Home",     path:"/" },
    { name:"About",    path:"/about" },
    { name:"Services", path:"/services" },
    { name:"Our Work", path:"/our-work" },
    { name:"Contact",  path:"/contact" },
  ];

  const A = "#9b7cff";
  const active = (p) => location.pathname === p;

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, width:"100%", height:"80px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 5vw", zIndex:9999,
        background:"rgba(7,7,7,.88)",
        borderBottom:"1px solid rgba(255,255,255,.07)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
      }}>
        {/* BRAND */}
        <Link to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"3px" }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
            fontWeight:700, letterSpacing:"-1px", color:"white" }}>GOONYA</span>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:A,
            boxShadow:`0 0 8px ${A}`, marginBottom:"10px", flexShrink:0 }}/>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:"36px" }}>
          {links.map(l => (
            <Link key={l.path} to={l.path} style={{
              textDecoration:"none", fontSize:"13px", fontWeight:500,
              color: active(l.path) ? "white" : "rgba(255,255,255,.45)",
              position:"relative", padding:"4px 0",
              transition:"color .2s ease",
            }}>
              {l.name}
              {active(l.path) && (
                <span style={{ position:"absolute", bottom:"-4px", left:0, width:"100%",
                  height:"1px", background:A, boxShadow:`0 0 6px ${A}` }}/>
              )}
            </Link>
          ))}
        </div>

        {/* CTA + BURGER */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          <Link to="/contact" className="nav-cta" style={{
            display:"inline-flex", alignItems:"center",
            padding:"10px 22px",
            background:"rgba(155,124,255,.12)",
            border:"1px solid rgba(155,124,255,.35)",
            borderRadius:"100px", fontSize:"13px", fontWeight:500,
            color:"white", textDecoration:"none",
            transition:"background .2s ease",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(155,124,255,.22)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(155,124,255,.12)"}
          >
            Start a project
          </Link>

          <button onClick={() => setOpen(!open)} className="burger" style={{
            display:"none", flexDirection:"column", gap:"5px",
            background:"none", border:"none", cursor:"pointer", padding:"6px",
          }}>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white",
              transition:"transform .3s, opacity .3s",
              transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }}/>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white",
              transition:"opacity .3s", opacity: open ? 0 : 1 }}/>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white",
              transition:"transform .3s",
              transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }}/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div style={{
        position:"fixed", inset:0, zIndex:9998,
        background:"rgba(5,4,16,.97)", backdropFilter:"blur(24px)",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition:"opacity .35s ease",
      }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
          {links.map((l) => (
            <Link key={l.path} to={l.path} onClick={() => setOpen(false)} style={{
              textDecoration:"none",
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(36px,9vw,58px)",
              fontWeight:700, letterSpacing:"-2px",
              color: active(l.path) ? "white" : "rgba(255,255,255,.3)",
              transition:"color .2s ease",
              lineHeight:1.15,
            }}
              onMouseEnter={e=>e.currentTarget.style.color="white"}
              onMouseLeave={e=>e.currentTarget.style.color=active(l.path)?"white":"rgba(255,255,255,.3)"}
            >
              {l.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} style={{
            marginTop:"28px", fontSize:"14px",
            color:A, textDecoration:"none", letterSpacing:"1px",
            padding:"12px 28px", border:`1px solid rgba(155,124,255,.3)`,
            borderRadius:"100px", background:"rgba(155,124,255,.08)",
          }}>
            Start a project
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:850px){
          .desk-nav { display:none !important; }
          .nav-cta  { display:none !important; }
          .burger   { display:flex !important; }
        }
      `}</style>
    </>
  );
}
