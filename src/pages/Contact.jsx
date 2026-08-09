import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", business:"", service:"", message:"" });

  useEffect(() => {
    const items = document.querySelectorAll(".ct-fi");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .6s ease ${i*.08}s, transform .6s ease ${i*.08}s`;
      setTimeout(() => { el.style.opacity="1"; el.style.transform="translateY(0)"; }, 40);
    });
  }, []);

  const handle = e => setForm(f => ({...f, [e.target.name]: e.target.value}));

  const submit = e => {
    e.preventDefault();
    // in production connect to your backend/email service
    setSent(true);
  };

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  const inputStyle = {
    width:"100%", padding:"16px 20px",
    background:"#0a0818", border:`1px solid rgba(255,255,255,.1)`,
    borderRadius:"8px", color:"white", fontSize:"15px",
    outline:"none", fontFamily:"'DM Sans',sans-serif",
    transition:"border-color .2s ease",
  };

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"50vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 60% 60% at 50% 40%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 70px" }}>
          <div className="ct-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>04 / CONTACT
          </div>
          <h1 className="ct-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-4px", lineHeight:.92 }}>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)", color:"white" }}>HAVE AN IDEA?</span>
            <span style={{ display:"block", fontSize:"clamp(62px,7vw,112px)",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", paddingBottom:"6px" }}>LET'S BUILD IT.</span>
          </h1>
          <p className="ct-fi" style={{ maxWidth:"480px", marginTop:"32px",
            color:"#666", fontSize:"17px", lineHeight:1.75 }}>
            Tell us a little about your business and what you're trying to achieve.
            We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px",
        display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"1px",
        background:L, border:`1px solid ${L}` }}>

        {/* FORM */}
        <div className="ct-fi" style={{ padding:"60px 56px", background:"#08060f" }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <div style={{ fontSize:"48px", marginBottom:"24px" }}>✅</div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"32px",
                fontWeight:700, letterSpacing:"-1.5px", color:"white", marginBottom:"12px" }}>
                Message sent!
              </h2>
              <p style={{ color:"#555", fontSize:"16px", lineHeight:1.7 }}>
                Thanks for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                <div>
                  <label style={{ fontSize:"11px", letterSpacing:"1.5px", color:"#555",
                    display:"block", marginBottom:"8px" }}>YOUR NAME</label>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="Jane Smith" required style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=A}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
                </div>
                <div>
                  <label style={{ fontSize:"11px", letterSpacing:"1.5px", color:"#555",
                    display:"block", marginBottom:"8px" }}>EMAIL ADDRESS</label>
                  <input name="email" type="email" value={form.email} onChange={handle}
                    placeholder="jane@business.com" required style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=A}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
                </div>
              </div>
              <div>
                <label style={{ fontSize:"11px", letterSpacing:"1.5px", color:"#555",
                  display:"block", marginBottom:"8px" }}>BUSINESS NAME</label>
                <input name="business" value={form.business} onChange={handle}
                  placeholder="Your Business Pty Ltd" style={inputStyle}
                  onFocus={e=>e.target.style.borderColor=A}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
              </div>
              <div>
                <label style={{ fontSize:"11px", letterSpacing:"1.5px", color:"#555",
                  display:"block", marginBottom:"8px" }}>WHAT DO YOU NEED?</label>
                <select name="service" value={form.service} onChange={handle} style={{
                  ...inputStyle, cursor:"pointer",
                  appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239b7cff' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center",
                }}>
                  <option value="" style={{background:"#0a0818"}}>Select a service...</option>
                  <option value="ai" style={{background:"#0a0818"}}>AI Automation</option>
                  <option value="website" style={{background:"#0a0818"}}>Website Design</option>
                  <option value="marketing" style={{background:"#0a0818"}}>Digital Marketing</option>
                  <option value="social" style={{background:"#0a0818"}}>Social Media</option>
                  <option value="systems" style={{background:"#0a0818"}}>Digital Systems</option>
                  <option value="admin" style={{background:"#0a0818"}}>Admin & Operations</option>
                  <option value="all" style={{background:"#0a0818"}}>Not sure — let's chat</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:"11px", letterSpacing:"1.5px", color:"#555",
                  display:"block", marginBottom:"8px" }}>TELL US ABOUT YOUR PROJECT</label>
                <textarea name="message" value={form.message} onChange={handle}
                  placeholder="What are you trying to achieve? What's not working right now?"
                  rows={5} style={{...inputStyle, resize:"vertical"}}
                  onFocus={e=>e.target.style.borderColor=A}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
              </div>
              <button type="submit" style={{ alignSelf:"flex-start", marginTop:"8px",
                padding:"16px 36px", background:"white", color:"black", borderRadius:"100px",
                fontWeight:700, fontSize:"15px", cursor:"pointer", border:"none",
                fontFamily:"'DM Sans',sans-serif",
                boxShadow:"0 0 40px rgba(155,124,255,.3)",
                transition:"transform .2s ease, box-shadow .2s ease" }}
                onMouseEnter={e=>{ e.target.style.transform="translateY(-2px)"; e.target.style.boxShadow="0 8px 40px rgba(155,124,255,.5)"; }}
                onMouseLeave={e=>{ e.target.style.transform="translateY(0)"; e.target.style.boxShadow="0 0 40px rgba(155,124,255,.3)"; }}>
                Send enquiry ↗
              </button>
            </form>
          )}
        </div>

        {/* INFO */}
        <div className="ct-fi" style={{ padding:"60px 48px", background:"#050410",
          display:"flex", flexDirection:"column", gap:"40px" }}>
          <div>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
              marginBottom:"18px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>WHAT HAPPENS NEXT
            </div>
            {[
              { n:"01", t:"We review your enquiry", d:"Within 24 hours we'll read through your project details." },
              { n:"02", t:"Discovery call",          d:"We book a free 30-min call to understand your goals." },
              { n:"03", t:"Proposal & plan",         d:"We send a clear proposal — no vague retainers." },
              { n:"04", t:"We get to work",          d:"Once approved, we move fast." },
            ].map(({n,t,d}) => (
              <div key={n} style={{ display:"flex", gap:"16px", marginBottom:"24px" }}>
                <span style={{ fontSize:"11px", color:A, letterSpacing:"1px",
                  fontFamily:"'Space Grotesk',sans-serif", flexShrink:0, paddingTop:"2px" }}>{n}</span>
                <div>
                  <div style={{ fontSize:"14px", color:"white", fontWeight:600,
                    marginBottom:"4px" }}>{t}</div>
                  <div style={{ fontSize:"13px", color:"#555", lineHeight:1.55 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding:"24px", background:"rgba(155,124,255,.06)",
            border:`1px solid rgba(155,124,255,.2)`, borderRadius:"12px" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2px", color:A,
              marginBottom:"10px" }}>BASED IN AUSTRALIA</div>
            <div style={{ fontSize:"14px", color:"white", marginBottom:"6px" }}>goonya.com.au</div>
            <div style={{ fontSize:"13px", color:"#555" }}>We work with businesses Australia-wide.</div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:850px){
          div[style*="1.4fr 1fr"]{grid-template-columns:1fr !important;}
          div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
}
