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
      icon:"⚡", title:"AI Automation",
      color:"rgba(155,124,255,.35)",
      short:"Make repetitive work disappear.",
      desc:"We build intelligent automation systems that handle your repetitive tasks — customer follow-ups, data entry, scheduling, reporting and more. Your team focuses on what matters. The system handles the rest. No expensive software. No complicated setups. Just results.",
      features:["Lead follow-up automation","Email & CRM workflows","Appointment scheduling","Invoice & billing automation","Custom chatbots","Reporting dashboards"],
      img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=70",
    },
    {
      icon:"🌐", title:"Website Design",
      color:"rgba(0,210,190,.28)",
      short:"Turn attention into customers.",
      desc:"We design and build high-performance websites that don't just look great — they convert. Every page is built around your customer's journey, from first click to enquiry. Fast, mobile-first and designed to rank on Google from day one.",
      features:["Custom design & development","Mobile-first responsive","SEO foundation built in","Fast load speeds","CMS for easy updates","Landing pages & funnels"],
      img:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=70",
    },
    {
      icon:"📈", title:"Digital Marketing",
      color:"rgba(255,100,180,.25)",
      short:"Get discovered. Get chosen.",
      desc:"From Facebook and Instagram to TikTok and Google — we run data-driven campaigns that reach the right people at the right time. We handle the content, the targeting, the budget and the reporting. You just watch the leads come in.",
      features:["Facebook & Instagram ads","TikTok content & ads","Google Ads management","Social media management","Animated video creation","Monthly reporting & optimisation"],
      img:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=70",
    },
    {
      icon:"🔗", title:"Digital Systems",
      color:"rgba(100,180,255,.25)",
      short:"Connect everything. Run smarter.",
      desc:"We connect your tools, apps and workflows into one intelligent system. CRM, invoicing, bookings, communications — all talking to each other so nothing falls through the cracks. Less manual work. More consistency. Better results.",
      features:["CRM setup & integration","Zapier & Make automations","Booking system setup","Payment & invoicing systems","Team workflow systems","Custom integrations"],
      img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=70",
    },
    {
      icon:"📱", title:"Social Media",
      color:"rgba(233,79,249,.25)",
      short:"Grow your audience daily.",
      desc:"Daily content creation, scheduling and community management across all platforms. We create the posts, write the captions, film and edit the videos — everything your brand needs to stay active, relevant and growing without you lifting a finger.",
      features:["Daily content creation","Instagram & Facebook management","TikTok strategy & posting","Story & reel creation","Community engagement","Monthly analytics report"],
      img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=70",
    },
    {
      icon:"📋", title:"Admin & Operations",
      color:"rgba(74,222,128,.2)",
      short:"Take the tedious work off your plate.",
      desc:"Email management, data entry, scheduling, research, document preparation and more. We handle the back-end operations that eat your time every day, so you can focus on the things that actually grow your business.",
      features:["Email & inbox management","Data entry & cleanup","Scheduling & calendars","Document preparation","Research & sourcing","Process documentation"],
      img:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=70",
    },
  ];

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* HERO */}
      <section style={{ minHeight:"55vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 60% 70% at 50% 40%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 80px" }}>
          <div className="sv-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>SERVICES
          </div>
          <h1 className="sv-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-4px", lineHeight:.92, maxWidth:"900px" }}>
            <span style={{ display:"block", fontSize:"clamp(52px,7vw,112px)", color:"white" }}>WE BUILD THE</span>
            <span style={{ display:"block", fontSize:"clamp(52px,7vw,112px)",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", paddingBottom:"6px" }}>DIGITAL ENGINE.</span>
          </h1>
          <p className="sv-fi" style={{ maxWidth:"520px", marginTop:"28px",
            color:"#666", fontSize:"17px", lineHeight:1.75 }}>
            Six services. One goal — make your business run faster,
            smarter and more profitably.
          </p>
        </div>
      </section>

      {/* SERVICE LIST — alternating */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px" }}>
        {services.map(({icon,title,color,short,desc,features,img},i) => (
          <div key={title} className="sv-fi sv-row" style={{
            display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:"1px", background:L, border:`1px solid ${L}`, marginBottom:"1px",
          }}>
            {/* text */}
            <div style={{ padding:"60px 56px", background:"#08060f",
              order: i%2===0 ? 1 : 2 }}>
              <span style={{ fontSize:"32px", display:"block", marginBottom:"20px" }}>{icon}</span>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(26px,3vw,44px)", fontWeight:700,
                letterSpacing:"-2px", color:"white", marginBottom:"10px" }}>{title}</h2>
              <p style={{ fontSize:"13px", color:A, marginBottom:"18px",
                letterSpacing:"1px" }}>{short}</p>
              <p style={{ color:"#555", fontSize:"15px", lineHeight:1.8,
                marginBottom:"28px", maxWidth:"420px" }}>{desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
                gap:"10px", marginBottom:"32px" }}>
                {features.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <span style={{ width:"5px", height:"5px", borderRadius:"50%",
                      background:A, flexShrink:0 }}/>
                    <span style={{ fontSize:"13px", color:"#666" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
                padding:"13px 26px", background:"rgba(155,124,255,.1)",
                border:`1px solid rgba(155,124,255,.3)`, borderRadius:"100px",
                fontSize:"13px", fontWeight:500, color:"white", textDecoration:"none" }}>
                Get started
              </Link>
            </div>

            {/* image */}
            <div style={{ position:"relative", overflow:"hidden", minHeight:"360px",
              order: i%2===0 ? 2 : 1, background:"#050410" }}>
              <img src={img} alt={title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                  filter:"brightness(.55) saturate(.8)",
                  transition:"transform .6s ease, filter .6s ease" }}
                onMouseEnter={e=>{ e.target.style.transform="scale(1.04)"; e.target.style.filter="brightness(.72) saturate(.9)"; }}
                onMouseLeave={e=>{ e.target.style.transform="scale(1)"; e.target.style.filter="brightness(.55) saturate(.8)"; }}
                onError={e=>{ e.target.style.display="none"; }}/>
              <div style={{ position:"absolute", inset:0,
                background:`radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
                mixBlendMode:"screen", pointerEvents:"none" }}/>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"100px 0 140px",
        textAlign:"center", borderTop:`1px solid ${L}` }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(40px,6vw,90px)", fontWeight:700, letterSpacing:"-4px",
          lineHeight:.9, color:"white", margin:"0 0 40px" }}>
          Not sure where<br/><span style={{color:A}}>to start?</span>
        </h2>
        <p style={{ color:"#555", fontSize:"17px", marginBottom:"36px" }}>
          Tell us about your business and we'll recommend the right starting point.
        </p>
        <Link to="/contact" style={{ display:"inline-flex", alignItems:"center",
          padding:"18px 44px", background:"white", color:"black", borderRadius:"100px",
          fontWeight:700, fontSize:"16px", textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)" }}>
          Talk to us
        </Link>
      </div>

      <style>{`
        @media(max-width:850px){
          .sv-row { grid-template-columns:1fr !important; }
          .sv-row > div[style*="order: 2"],
          .sv-row > div[style*="order:2"] { order:2 !important; }
          .sv-row > div[style*="order: 1"],
          .sv-row > div[style*="order:1"] { order:1 !important; }
          .sv-row > div[style*="min-height:360px"] { min-height:220px !important; order:1 !important; }
          .sv-row > div[style*="padding:60px"] { order:2 !important; padding:36px 24px !important; }
          div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
}
