import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OurWork() {

  useEffect(() => {
    // hero entrance
    const items = document.querySelectorAll(".ow-fi");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .6s ease ${i*.1}s, transform .6s ease ${i*.1}s`;
      setTimeout(() => { el.style.opacity="1"; el.style.transform="translateY(0)"; }, 40);
    });

    // scroll reveal for cards
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".ow-card").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  const projects = [
    {
      tag:"HOSPITALITY",
      name:"EMBER & STONE",
      desc:"Restaurant & bar website concept. Online reservations, menu showcase and event bookings.",
      img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=70",
      color:"#f97316",
      services:["Website Design","Digital Marketing","Social Media"],
    },
    {
      tag:"CONSTRUCTION",
      name:"NORTHLINE",
      desc:"Construction & trade website concept. Project portfolio, quote requests and credibility building.",
      img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=70",
      color:"#fbbf24",
      services:["Website Design","Systems Integration"],
    },
    {
      tag:"WELLNESS",
      name:"MAISON",
      desc:"Beauty & wellness studio concept. Online bookings, service menu and client portal.",
      img:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=70",
      color:"#e879f9",
      services:["Website Design","AI Automation","Social Media"],
    },
    {
      tag:"HEALTHCARE",
      name:"WELLCARE CLINIC",
      desc:"Medical clinic concept. Patient bookings, practitioner profiles and health resources.",
      img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=70",
      color:"#4ade80",
      services:["Website Design","Digital Systems"],
    },
    {
      tag:"RETAIL",
      name:"BLOOM BOUTIQUE",
      desc:"Fashion retail concept. eCommerce store with product showcase and loyalty system.",
      img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=70",
      color:"#f472b6",
      services:["Website Design","Digital Marketing","AI Automation"],
    },
    {
      tag:"FITNESS",
      name:"IRON & FLOW",
      desc:"Gym & studio concept. Class bookings, membership management and trainer profiles.",
      img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=70",
      color:"#38bdf8",
      services:["Website Design","Systems Integration","Social Media"],
    },
  ];

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"55vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 60% 60% at 50% 40%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 80px" }}>
          <div className="ow-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>03 / OUR WORK
          </div>
          <h1 className="ow-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-4px", lineHeight:.92 }}>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)", color:"white" }}>IDEAS BUILT</span>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)", color:"white" }}>TO </span>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", paddingBottom:"6px" }}>STAND OUT.</span>
          </h1>
          <p className="ow-fi" style={{ maxWidth:"500px", marginTop:"32px",
            color:"#666", fontSize:"17px", lineHeight:1.75 }}>
            A selection of concept projects showcasing what we build —
            across hospitality, healthcare, retail, trades and more.
          </p>
        </div>
      </section>

      {/* ── WORK GRID ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        <div className="ow-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
          gap:"1px", background:L, border:`1px solid ${L}` }}>
          {projects.map(({tag,name,desc,img,color,services},i) => (
            <div key={name} className="ow-card" style={{
              position:"relative", overflow:"hidden",
              background:"#08060f", cursor:"pointer",
              opacity:0, transform:"translateY(40px)",
              transition:`opacity .7s ease ${i*.12}s, transform .7s ease ${i*.12}s`,
            }}
              onMouseEnter={e=>{
                e.currentTarget.querySelector(".ow-img").style.transform="scale(1.08)";
                e.currentTarget.querySelector(".ow-img").style.filter="brightness(.5) saturate(.6)";
                e.currentTarget.querySelector(".ow-info").style.transform="translateY(0)";
                e.currentTarget.querySelector(".ow-info").style.opacity="1";
                e.currentTarget.querySelector(".ow-overlay").style.opacity="1";
              }}
              onMouseLeave={e=>{
                e.currentTarget.querySelector(".ow-img").style.transform="scale(1)";
                e.currentTarget.querySelector(".ow-img").style.filter="brightness(.6) saturate(.7)";
                e.currentTarget.querySelector(".ow-info").style.transform="translateY(12px)";
                e.currentTarget.querySelector(".ow-info").style.opacity="0";
                e.currentTarget.querySelector(".ow-overlay").style.opacity="0";
              }}>

              {/* full-height image */}
              <div style={{ height:"320px", overflow:"hidden", position:"relative" }}>
                <img className="ow-img" src={img} alt={name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                    filter:"brightness(.6) saturate(.7)",
                    transition:"transform .6s ease, filter .6s ease" }}
                  onError={e=>{ e.target.parentElement.style.background="#0a0818"; e.target.style.display="none"; }}/>

                {/* colour overlay */}
                <div className="ow-overlay" style={{ position:"absolute", inset:0,
                  opacity:0, transition:"opacity .5s ease",
                  background:`linear-gradient(to top, ${color}40 0%, transparent 60%)` }}/>

                {/* tag badge — always visible */}
                <div style={{ position:"absolute", top:"16px", left:"16px",
                  padding:"4px 12px", borderRadius:"100px",
                  background:`${color}22`, border:`1px solid ${color}44`,
                  fontSize:"10px", letterSpacing:"1.5px", color, fontWeight:600 }}>
                  {tag}
                </div>

                {/* info slides up from bottom on hover */}
                <div className="ow-info" style={{
                  position:"absolute", bottom:0, left:0, right:0,
                  padding:"24px 24px 28px",
                  background:"linear-gradient(to top, rgba(5,4,16,.98) 0%, rgba(5,4,16,.8) 70%, transparent 100%)",
                  transform:"translateY(12px)", opacity:0,
                  transition:"transform .45s ease, opacity .45s ease",
                }}>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"20px",
                    fontWeight:700, letterSpacing:"-1px", color:"white", marginBottom:"6px" }}>{name}</h3>
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,.55)", lineHeight:1.5,
                    marginBottom:"12px" }}>{desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                    {services.map(s=>(
                      <span key={s} style={{ padding:"2px 9px", borderRadius:"100px",
                        background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)",
                        fontSize:"10px", color:"rgba(255,255,255,.6)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* static info below image — always shown */}
              <div style={{ padding:"20px 24px 24px" }}>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"18px",
                  fontWeight:700, letterSpacing:"-0.5px", color:"white", marginBottom:"6px" }}>{name}</h3>
                <p style={{ fontSize:"12px", color:"#555", lineHeight:1.55 }}>{desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIAL ── */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`,
        padding:"80px 0", marginBottom:"100px" }}>
        <div style={{ width:"min(900px,90vw)", margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:"60px", color:A, lineHeight:1, marginBottom:"24px" }}>"</div>
          <blockquote style={{ fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(20px,2.5vw,32px)", fontWeight:600, letterSpacing:"-1px",
            color:"white", lineHeight:1.3, margin:"0 0 28px",
            fontStyle:"normal" }}>
            A completely different way of presenting a modern business online.
          </blockquote>
          <span style={{ fontSize:"13px", color:"#555", letterSpacing:"1px" }}>— Concept Client</span>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"80px 0 140px",
        textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700, letterSpacing:"-4px",
          lineHeight:.9, color:"white", margin:"0 0 48px" }}>
          Want us to build<br/><span style={{color:A}}>yours next?</span>
        </h2>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
          padding:"18px 44px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Start a project
        </Link>
      </div>

      <style>{`
        /* mobile: 1 col, info overlay hidden, static info shown */
        @media(max-width:850px){
          .ow-grid { grid-template-columns:1fr !important; }
          .ow-info { display:none !important; }
          .ow-grid > div > div:first-child { height:260px !important; }
          h1 span { font-size:clamp(46px,12vw,70px) !important; letter-spacing:-2px !important; }
        }

        /* desktop: hide static info, show on-image overlay instead */
        @media(min-width:851px){
          .ow-card > div:last-child { display:none; }
        }

        /* card focus state for accessibility */
        .ow-card:focus-within .ow-info {
          transform:translateY(0) !important;
          opacity:1 !important;
        }
      `}</style>
    </div>
  );
}
