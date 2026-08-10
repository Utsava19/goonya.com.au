import { Link } from "react-router-dom";

export default function Footer() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.07)";

  const socials = [
    { name:"Facebook",  href:"https://facebook.com",  icon:(
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )},
    { name:"Instagram", href:"https://instagram.com", icon:(
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )},
    { name:"LinkedIn",  href:"https://linkedin.com",  icon:(
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )},
  ];

  return (
    <footer style={{ background:"#050505", borderTop:`1px solid ${L}`, padding:"70px 5vw 32px" }}>

      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr",
        gap:"48px", marginBottom:"60px" }} className="footer-grid">

        {/* brand */}
        <div>
          <img
            src="/logo.png"
            alt="Goonya"
            style={{
              height:"40px", width:"auto", display:"block", marginBottom:"14px",
              
              
            }}
          />
          <p style={{ color:"#444", fontSize:"14px", lineHeight:1.7,
            maxWidth:"260px", marginBottom:"24px" }}>
            Digital systems for businesses ready to move differently.
          </p>
          {/* socials */}
          <div style={{ display:"flex", gap:"10px" }}>
            {socials.map(({name,href,icon}) => (
              <a key={name} href={href} target="_blank" rel="noreferrer"
                title={name} style={{
                  width:"36px", height:"36px", borderRadius:"50%",
                  border:`1px solid rgba(255,255,255,.1)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#555", textDecoration:"none",
                  transition:"color .2s, border-color .2s, background .2s",
                }}
                onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.borderColor="rgba(255,255,255,.3)"; e.currentTarget.style.background="rgba(255,255,255,.06)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.color="#555"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.background="transparent"; }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* explore */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"18px" }}>EXPLORE</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {[
              {name:"Home",     path:"/"},
              {name:"About",    path:"/about"},
              {name:"Services", path:"/services"},
              {name:"Our Work", path:"/our-work"},
              {name:"Contact",  path:"/contact"},
            ].map(l => (
              <Link key={l.path} to={l.path} style={{
                fontSize:"14px", color:"#555", textDecoration:"none",
                transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color="white"}
                onMouseLeave={e=>e.target.style.color="#555"}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* services */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"18px" }}>SERVICES</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {["AI Automation","Website Design","Digital Marketing","Social Media","Digital Systems","Admin & Operations"].map(s => (
              <Link key={s} to="/services" style={{
                fontSize:"14px", color:"#555", textDecoration:"none",
                transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color="white"}
                onMouseLeave={e=>e.target.style.color="#555"}>
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* contact */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"18px" }}>CONTACT</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <a href="mailto:info@goonya.com.au" style={{ fontSize:"14px", color:"#555",
              textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color="white"}
              onMouseLeave={e=>e.target.style.color="#555"}>
              info@goonya.com.au
            </a>
            <a href="tel:0434785800" style={{ fontSize:"14px", color:"#555",
              textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color="white"}
              onMouseLeave={e=>e.target.style.color="#555"}>
              0434 785 800
            </a>
            <a href="tel:0452542981" style={{ fontSize:"14px", color:"#555",
              textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color="white"}
              onMouseLeave={e=>e.target.style.color="#555"}>
              0452 542 981
            </a>
            <div style={{ fontSize:"13px", color:"#3a3a3a", lineHeight:1.5 }}>
              75 Bowmore Rd<br/>Noble Park VIC 3174
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div style={{ paddingTop:"24px", borderTop:`1px solid ${L}`,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:"12px" }}>
        <span style={{ fontSize:"12px", color:"#3a3a3a", letterSpacing:"1px" }}>
          © 2026 GOONYA
        </span>
        <span style={{ fontSize:"12px", color:"#3a3a3a", letterSpacing:"1px" }}>
          BUILDING WHAT'S NEXT.
        </span>
      </div>

      <style>{`
        @media(max-width:850px){
          .footer-grid{grid-template-columns:1fr 1fr !important; gap:32px !important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </footer>
  );
}
