import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered]   = useState(null);
  const location = useLocation();
  const menuRef  = useRef(null);

  const links = [
    { name:"Home",     path:"/" },
    { name:"About",    path:"/about" },
    { name:"Services", path:"/services" },
    { name:"Packages", path:"/packages#plans" },
    { name:"Our Work", path:"/our-work" },
    { name:"Contact",  path:"/contact" },
  ];

  const A      = "#9b7cff";
  const active = (p) => location.pathname === p.split("#")[0];

  // scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close on route change
  useEffect(() => { setOpen(false); }, [location]);

  // stagger mobile links on open
  useEffect(() => {
    if (!menuRef.current) return;
    const items = menuRef.current.querySelectorAll(".mob-link");
    if (open) {
      items.forEach((el, i) => {
        el.style.opacity    = "0";
        el.style.transform  = "translateY(24px)";
        el.style.transition = `opacity .5s ease ${i * .07}s, transform .5s ease ${i * .07}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
        }));
      });
    }
  }, [open]);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, width:"100%",
        height: scrolled ? "68px" : "80px",
        zIndex:9999,
        background: scrolled ? "rgba(5,4,16,.95)" : "rgba(7,7,7,.7)",
        borderBottom:`1px solid ${scrolled ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.04)"}`,
        backdropFilter:"blur(24px)",
        WebkitBackdropFilter:"blur(24px)",
        transition:"height .3s ease, background .3s ease, border-color .3s ease",
      }}>
        <div className="page-container" style={{
          height:"100%",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>

        {/* BRAND */}
        <Link to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center" }}
          onMouseEnter={e=>e.currentTarget.style.opacity=".8"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <img
            src="/logo.png"
            alt="Goonya"
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
            style={{
              height:"44px",
              width:"auto",
              display:"block",
              animation:"logoLoad .8s ease both",
            }}
          />
          {/* fallback text if image fails */}
          <span style={{ display:"none", alignItems:"center", gap:"3px",
            fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
            fontWeight:700, letterSpacing:"-1px", color:"white" }}>
            GOONYA
            <span style={{ width:"6px", height:"6px", borderRadius:"50%",
              background:"#9b7cff", boxShadow:"0 0 8px #9b7cff",
              marginBottom:"10px", flexShrink:0 }}/>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:"48px" }}>
          {links.map(l => {
            const isActive  = active(l.path);
            const isHovered = hovered === l.path;
            return (
              <Link key={l.path} to={l.path}
                onMouseEnter={() => setHovered(l.path)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration:"none", fontSize:"13px", fontWeight:500,
                  letterSpacing:".3px",
                  color: isActive ? "white" : isHovered ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
                  position:"relative", padding:"6px 0",
                  transition:"color .2s ease",
                  display:"inline-block",
                }}>
                {l.name}

                {/* sliding underline */}
                <span style={{
                  position:"absolute", bottom:"-2px", left:0,
                  height:"1.5px", borderRadius:"1px",
                  background: isActive ? A : "rgba(255,255,255,.5)",
                  boxShadow: isActive ? `0 0 6px ${A}` : "none",
                  width: isActive || isHovered ? "100%" : "0%",
                  transition:"width .25s ease, background .2s ease, box-shadow .2s ease",
                }}/>

                {/* active dot above */}
                {isActive && (
                  <span style={{
                    position:"absolute", top:"-14px", left:"50%",
                    transform:"translateX(-50%)",
                    width:"4px", height:"4px", borderRadius:"50%",
                    background:A, boxShadow:`0 0 6px ${A}`,
                    animation:"navdot 2s ease-in-out infinite",
                  }}/>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA + BURGER */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          <Link to="/contact" className="nav-cta" style={{
            display:"inline-flex", alignItems:"center",
            padding:"10px 22px",
            background:"rgba(155,124,255,.12)",
            border:"1px solid rgba(155,124,255,.3)",
            borderRadius:"100px", fontSize:"13px", fontWeight:500,
            color:"white", textDecoration:"none",
            transition:"background .25s, border-color .25s, transform .2s",
          }}
            onMouseEnter={e=>{
              e.currentTarget.style.background="rgba(155,124,255,.25)";
              e.currentTarget.style.borderColor="rgba(155,124,255,.6)";
              e.currentTarget.style.transform="translateY(-1px)";
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.background="rgba(155,124,255,.12)";
              e.currentTarget.style.borderColor="rgba(155,124,255,.3)";
              e.currentTarget.style.transform="none";
            }}>
            Start a project
          </Link>

          {/* BURGER */}
          <button onClick={() => setOpen(o => !o)} className="burger" style={{
            display:"none", flexDirection:"column", justifyContent:"center",
            gap:"5px", background:"none", border:"none",
            cursor:"pointer", padding:"6px", width:"36px", height:"36px",
          }}>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white",
              transition:"transform .35s cubic-bezier(.4,0,.2,1), opacity .3s",
              transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }}/>
            <span style={{ display:"block", width:"16px", height:"1.5px", background:"white",
              transition:"opacity .3s, width .3s", opacity: open ? 0 : 1 }}/>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white",
              transition:"transform .35s cubic-bezier(.4,0,.2,1)",
              transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }}/>
          </button>
        </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div ref={menuRef} style={{
        position:"fixed", inset:0, zIndex:9998,
        background:"rgba(5,4,14,.97)",
        backdropFilter:"blur(28px)",
        WebkitBackdropFilter:"blur(28px)",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition:"opacity .3s ease",
      }}>
        {/* background glow */}
        <div style={{ position:"absolute", top:"30%", left:"50%",
          transform:"translate(-50%,-50%)",
          width:"60vw", height:"60vw", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(155,124,255,.08), transparent 70%)`,
          filter:"blur(40px)", pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:1,
          display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>

          {/* logo in mobile menu */}
          <img src="/logo.png" alt="Goonya" style={{
            height:"32px", width:"auto", display:"block",
             
            marginBottom:"8px",
          }}/>

          {links.map((l, i) => (
            <Link key={l.path} to={l.path} onClick={() => setOpen(false)}
              className="mob-link"
              style={{
                textDecoration:"none",
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(38px,10vw,62px)",
                fontWeight:700, letterSpacing:"-2.5px",
                lineHeight:1.1,
                color: active(l.path) ? "white" : "rgba(255,255,255,.22)",
                transition:"color .2s ease, letter-spacing .2s ease",
                position:"relative", display:"inline-block",
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.color="white";
                e.currentTarget.style.letterSpacing="-2px";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.color=active(l.path)?"white":"rgba(255,255,255,.22)";
                e.currentTarget.style.letterSpacing="-2.5px";
              }}>
              {/* active accent */}
              {active(l.path) && (
                <span style={{ position:"absolute", left:"-18px", top:"50%",
                  transform:"translateY(-50%)",
                  width:"8px", height:"8px", borderRadius:"50%",
                  background:A, boxShadow:`0 0 10px ${A}` }}/>
              )}
              {l.name}
            </Link>
          ))}

          <Link to="/contact" onClick={() => setOpen(false)} className="mob-link" style={{
            marginTop:"32px", fontSize:"14px", letterSpacing:"1px",
            color:A, textDecoration:"none",
            padding:"13px 32px",
            border:`1px solid rgba(155,124,255,.3)`,
            borderRadius:"100px",
            background:"rgba(155,124,255,.08)",
            transition:"background .2s, border-color .2s",
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(155,124,255,.18)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="rgba(155,124,255,.08)"; }}>
            Start a project
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes navdot {
          0%,100% { box-shadow: 0 0 6px #9b7cff; }
          50%      { box-shadow: 0 0 14px #9b7cff, 0 0 24px rgba(155,124,255,.4); }
        }
        @keyframes logoLoad {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @media(max-width:850px){
          .desk-nav { display:none !important; }
          .nav-cta  { display:none !important; }
          .burger   { display:flex !important; }
        }
      `}</style>
    </>
  );
}
