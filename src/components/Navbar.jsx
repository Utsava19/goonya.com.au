import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const links = [
    { name: "Home",     path: "/" },
    { name: "About",    path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Our Work", path: "/our-work" },
    { name: "Contact",  path: "/contact" },
  ];

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // animate mobile menu open/close
  useEffect(() => {
    const items = menuRef.current?.querySelectorAll(".mob-link");
    if (menuOpen) {
      gsap.fromTo(".mobile-menu", { opacity:0 }, { opacity:1, duration:.3, ease:"power2.out" });
      gsap.fromTo(items, { opacity:0, y:30 }, { opacity:1, y:0, stagger:.06, duration:.4, ease:"power3.out", delay:.1, clearProps:"all" });
    } else {
      gsap.to(".mobile-menu", { opacity:0, duration:.2 });
    }
  }, [menuOpen]);

  // nav link hover magnetic
  useEffect(() => {
    const links = navRef.current?.querySelectorAll(".nav-link-item");
    links?.forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(el, { y:-2, duration:.2, ease:"power2.out" }));
      el.addEventListener("mouseleave", () => gsap.to(el, { y:0, duration:.3, ease:"elastic.out(1,.5)" }));
    });
  }, []);

  const A = "#9b7cff";
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav ref={navRef} style={{
        position: "fixed", zIndex: 9999,
        top: 0, left: 0, width: "100%", height: "80px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5vw",
        background: scrolled ? "rgba(7,7,7,.92)" : "rgba(7,7,7,.6)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.04)"}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        transition: "background .4s ease, border-color .4s ease",
      }}>

        {/* BRAND */}
        <Link to="/" style={{ textDecoration:"none" }}>
          <div style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"20px", fontWeight:700, letterSpacing:"-1px",
            color:"white", display:"flex", alignItems:"center", gap:"2px",
          }}>
            GOONYA
            <span style={{
              display:"inline-block", width:"6px", height:"6px",
              borderRadius:"50%", background:A,
              boxShadow:`0 0 8px ${A}`, marginLeft:"3px", marginBottom:"10px",
            }}/>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div style={{ display:"flex", alignItems:"center", gap:"36px" }}>
          {links.map(link => (
            <Link key={link.path} to={link.path} className="nav-link-item" style={{
              textDecoration:"none",
              fontSize:"13px", fontWeight:500, letterSpacing:".3px",
              color: isActive(link.path) ? "white" : "rgba(255,255,255,.45)",
              position:"relative", padding:"4px 0",
              display:"inline-block",
              transition:"color .25s ease",
            }}>
              {link.name}
              {/* active underline */}
              {isActive(link.path) && (
                <span style={{
                  position:"absolute", bottom:"-4px", left:0,
                  width:"100%", height:"1px",
                  background:A,
                  boxShadow:`0 0 6px ${A}`,
                }}/>
              )}
            </Link>
          ))}
        </div>

        {/* CTA + BURGER */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          <Link to="/contact" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"10px 20px",
            background: "rgba(155,124,255,.12)",
            border: `1px solid rgba(155,124,255,.35)`,
            borderRadius:"100px",
            fontSize:"13px", fontWeight:500, color:"white",
            textDecoration:"none",
            transition:"background .25s ease, border-color .25s ease",
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(155,124,255,.22)"; e.currentTarget.style.borderColor="rgba(155,124,255,.6)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="rgba(155,124,255,.12)"; e.currentTarget.style.borderColor="rgba(155,124,255,.35)"; }}
          >
            Start a project <span>↗</span>
          </Link>

          {/* hamburger — mobile only */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display:"none", flexDirection:"column", gap:"5px",
            background:"none", border:"none", cursor:"pointer", padding:"4px",
          }} className="burger-btn" aria-label="Menu">
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white", transition:"transform .3s ease, opacity .3s ease", transform: menuOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }}/>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white", transition:"opacity .3s ease", opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ display:"block", width:"22px", height:"1.5px", background:"white", transition:"transform .3s ease", transform: menuOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }}/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className="mobile-menu" ref={menuRef} style={{
        position:"fixed", inset:0, zIndex:9998,
        background:"rgba(7,7,7,.97)", backdropFilter:"blur(20px)",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:"8px",
        opacity:0, pointerEvents: menuOpen ? "all" : "none",
      }}>
        <div style={{ marginBottom:"24px", fontSize:"10px", letterSpacing:"3px", color:"#333" }}>NAVIGATION</div>
        {links.map((link, i) => (
          <Link key={link.path} to={link.path} className="mob-link" style={{
            textDecoration:"none",
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(36px,8vw,60px)",
            fontWeight:700, letterSpacing:"-2px",
            color: isActive(link.path) ? "white" : "rgba(255,255,255,.35)",
            display:"flex", alignItems:"center", gap:"16px",
            transition:"color .2s ease",
          }}>
            <span style={{ fontSize:"11px", letterSpacing:"1px", color:A, fontFamily:"'DM Sans',sans-serif", fontWeight:400 }}>0{i+1}</span>
            {link.name}
          </Link>
        ))}
        <Link to="/contact" className="mob-link" style={{
          marginTop:"32px", fontSize:"14px", letterSpacing:"1px",
          color:A, textDecoration:"none", fontFamily:"'DM Sans',sans-serif",
        }}>
          Start a project ↗
        </Link>
      </div>

      <style>{`
        @media(max-width:850px){
          .burger-btn { display:flex !important; }
          nav > div:nth-child(2) { display:none !important; }
          nav > div:nth-child(3) > a:first-child { display:none !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
