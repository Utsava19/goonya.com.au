import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Services() {

  useEffect(() => {
    const items = document.querySelectorAll(".sv-fi");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .6s ease ${i*.08}s, transform .6s ease ${i*.08}s`;
      setTimeout(() => { el.style.opacity="1"; el.style.transform="translateY(0)"; }, 40);
    });
  }, []);

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  const services = [
    {
      n:"01", icon:"⚡", title:"AI Automation",
      color:"rgba(155,124,255,.35)",
      short:"Make repetitive work disappear.",
      desc:"We build intelligent automation systems that handle your repetitive tasks — customer follow-ups, data entry, scheduling, reporting and more. Your team focuses on what matters. The system handles the rest.",
      features:["Lead follow-up automation","Email & CRM workflows","Appointment scheduling","Invoice & billing automation","Custom chatbots","Reporting dashboards"],
      img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=70",
    },
    {
      n:"02", icon:"🌐", title:"Website Design",
      color:"rgba(0,210,190,.28)",
      short:"Turn attention into customers.",
      desc:"We design and build high-performance websites that don't just look great — they convert. Fast, mobile-first and built around your customers' journey from first click to enquiry.",
      features:["Custom design & development","Mobile-first responsive","SEO foundation built in","Fast load speeds","CMS for easy updates","Landing pages & funnels"],
      img:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=70",
    },
    {
      n:"03", icon:"📈", title:"Digital Marketing",
      color:"rgba(255,100,180,.25)",
      short:"Get discovered. Get chosen.",
      desc:"From Facebook and Instagram to TikTok and Google — we run data-driven campaigns that reach the right people at the right time. Plus content creation, animated videos and social media management.",
      features:["Facebook & Instagram ads","TikTok content & ads","Google Ads management","Social media management","Animated video creation","Monthly reporting & optimisation"],
      img:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=70",
    },
    {
      n:"04", icon:"🔗", title:"Digital Systems",
      color:"rgba(100,180,255,.25)",
      short:"Connect everything. Run smarter.",
      desc:"We connect your tools, apps and workflows into one intelligent system. CRM, invoicing, bookings, communications — all talking to each other so nothing falls through the cracks.",
      features:["CRM setup & integration","Zapier & Make automations","Booking system setup","Payment & invoicing systems","Team workflow systems","Custom integrations"],
      img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=70",
    },
    {
      n:"05", icon:"📱", title:"Social Media",
      color:"rgba(233,79,249,.25)",
      short:"Grow your audience daily.",
      desc:"Daily content creation, scheduling and community management across all platforms. We handle everything so your brand stays active, relevant and growing without you lifting a finger.",
      features:["Daily content creation","Instagram & Facebook management","TikTok strategy & posting","Story & reel creation","Community engagement","Monthly analytics report"],
      img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=70",
    },
    {
      n:"06", icon:"📋", title:"Admin & Operations",
      color:"rgba(74,222,128,.2)",
      short:"Take the tedious work off your plate.",
      desc:"Email management, data entry, scheduling, research, document preparation and more. We handle the back-end operations that eat your time so you can focus on growing your business.",
      features:["Email & inbox management","Data entry & cleanup","Scheduling & calendars","Document preparation","Research & sourcing","Process documentation"],
      img:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=70",
    },
  ];

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"60vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 60% 70% at 50% 40%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 80px" }}>
          <div className="sv-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>02 / SERVICES
          </div>
          <h1 className="sv-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-4px", lineHeight:.92, maxWidth:"900px" }}>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)", color:"white" }}>WE BUILD THE</span>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", paddingBottom:"6px" }}>DIGITAL ENGINE.</span>
          </h1>
          <p className="sv-fi" style={{ maxWidth:"520px", marginTop:"32px",
            color:"#666", fontSize:"17px", lineHeight:1.75 }}>
            Six core services. One goal — make your business run faster,
            smarter and more profitably than the competition.
          </p>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        {services.map(({n,icon,title,color,short,desc,features,img},i) => (
          <div key={n} className="sv-fi" style={{
            display:"grid", gridTemplateColumns: i%2===0 ? "1fr 1fr" : "1fr 1fr",
            gap:"1px", background:L, border:`1px solid ${L}`,
            marginBottom:"1px",
          }}>
            {/* text side */}
            <div style={{ padding:"60px 56px", background:"#08060f",
              order: i%2===0 ? 1 : 2 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
                <span style={{ fontSize:"11px", color:A, letterSpacing:"2px",
                  fontFamily:"'Space Grotesk',sans-serif" }}>{n}</span>
                <span style={{ fontSize:"24px" }}>{icon}</span>
              </div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(28px,3vw,46px)", fontWeight:700,
                letterSpacing:"-2px", color:"white", marginBottom:"14px" }}>{title}</h2>
              <p style={{ fontSize:"13px", color:A, marginBottom:"20px",
                letterSpacing:"1px" }}>{short}</p>
              <p style={{ color:"#555", fontSize:"15px", lineHeight:1.75,
                marginBottom:"32px", maxWidth:"420px" }}>{desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"36px" }}>
                {features.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <span style={{ width:"5px", height:"5px", borderRadius:"50%",
                      background:A, flexShrink:0 }}/>
                    <span style={{ fontSize:"13px", color:"#666" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"13px 26px", background:"rgba(155,124,255,.1)",
                border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
                fontSize:"13px", fontWeight:500, color:"white", textDecoration:"none" }}>
                Get started <span>↗</span>
              </Link>
            </div>

            {/* image side */}
            <div style={{ position:"relative", overflow:"hidden", minHeight:"400px",
              order: i%2===0 ? 2 : 1, background:"#050410" }}>
              <img src={img} alt={title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                  filter:"brightness(.6) saturate(.8)",
                  transition:"transform .6s ease, filter .6s ease" }}
                onMouseEnter={e=>{ e.target.style.transform="scale(1.04)"; e.target.style.filter="brightness(.75) saturate(.9)"; }}
                onMouseLeave={e=>{ e.target.style.transform="scale(1)"; e.target.style.filter="brightness(.6) saturate(.8)"; }}
                onError={e=>{ e.target.style.display="none"; }}/>
              <div style={{ position:"absolute", inset:0,
                background:`radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
                mixBlendMode:"screen", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", bottom:"28px", left:"28px",
                padding:"8px 16px", background:"rgba(10,8,22,.85)",
                border:"1px solid rgba(255,255,255,.08)", borderRadius:"100px" }}>
                <span style={{ fontSize:"12px", color:"white", letterSpacing:"1px" }}>{title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"100px 0 140px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(42px,6vw,96px)", fontWeight:700, letterSpacing:"-4px",
          lineHeight:.9, color:"white", margin:"0 0 48px" }}>
          Not sure where<br/><span style={{color:A}}>to start?</span>
        </h2>
        <p style={{ color:"#555", fontSize:"17px", marginBottom:"40px" }}>
          Tell us about your business and we'll recommend the right starting point.
        </p>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"12px",
          padding:"18px 44px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Talk to us <span>↗</span>
        </Link>
      </div>

      <style>{`
        @media(max-width:850px){
          div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr) !important;}
        }
      `}</style>
    </div>
  );
}
