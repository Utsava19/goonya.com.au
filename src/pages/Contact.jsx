import { useEffect, useState } from "react";

const ENQUIRY_EMAIL = "admin@goonya.com.au";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business || "Not provided",
          service: form.service || "Not specified",
          message: form.message || "No message",
          _subject: `New enquiry from ${form.name} — goonya.com.au`,
          _template: "table",
        }),
      });

      if (!res.ok) throw new Error("Send failed");
      setSent(true);
    } catch {
      setError("Something went wrong sending your message. Please email us directly.");
    } finally {
      setSending(false);
    }
  };

  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  const input = {
    width:"100%", padding:"16px 18px",
    background:"#0a0818", border:"1px solid rgba(255,255,255,.1)",
    borderRadius:"8px", color:"white", fontSize:"15px",
    outline:"none", fontFamily:"'DM Sans',sans-serif",
    transition:"border-color .2s ease",
    boxSizing:"border-box",
  };

  const socials = [
    { name:"Facebook",  href:"https://facebook.com",  icon:(
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )},
    { name:"Instagram", href:"https://instagram.com", icon:(
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )},
    { name:"LinkedIn",  href:"https://linkedin.com",  icon:(
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )},
  ];

  return (
    <div style={{ background:"#070707", overflowX:"hidden" }}>

      {/* HERO */}
      <section style={{ minHeight:"50vh", display:"flex", alignItems:"center",
        background:"radial-gradient(ellipse 60% 60% at 50% 40%, rgba(155,124,255,.1) 0%, transparent 70%)" }}>
        <div style={{ width:"min(1400px,90vw)", margin:"0 auto", padding:"130px 0 70px" }}>
          <div className="ct-fi" style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
            marginBottom:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"20px", height:"1px", background:A }}/>CONTACT
          </div>
          <h1 className="ct-fi" style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700, letterSpacing:"-4px", lineHeight:.92 }}>
            <span style={{ display:"block", fontSize:"clamp(52px,7vw,112px)", color:"white" }}>HAVE AN IDEA?</span>
            <span style={{ display:"block", fontSize:"clamp(52px,7vw,112px)",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", paddingBottom:"6px" }}>LET'S BUILD IT.</span>
          </h1>
          <p className="ct-fi" style={{ maxWidth:"480px", marginTop:"28px",
            color:"#666", fontSize:"17px", lineHeight:1.75 }}>
            Tell us about your business and what you're trying to achieve.
            We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <div style={{ width:"min(1400px,90vw)", margin:"0 auto 130px",
        display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"1px",
        background:L, border:`1px solid ${L}` }} className="ct-grid">

        {/* FORM */}
        <div className="ct-fi" style={{ padding:"60px 56px", background:"#08060f" }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:"52px", marginBottom:"24px" }}>✅</div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"32px",
                fontWeight:700, letterSpacing:"-1.5px", color:"white", marginBottom:"14px" }}>
                Message sent!
              </h2>
              <p style={{ color:"#555", fontSize:"16px", lineHeight:1.7 }}>
                Thanks for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}
                className="form-2col">
                <div>
                  <label style={{ display:"block", fontSize:"11px", letterSpacing:"1.5px",
                    color:"#555", marginBottom:"8px" }}>YOUR NAME</label>
                  <input name="name" value={form.name} onChange={handle}
                    required style={input}
                    onFocus={e=>e.target.style.borderColor=A}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", letterSpacing:"1.5px",
                    color:"#555", marginBottom:"8px" }}>EMAIL ADDRESS</label>
                  <input name="email" type="email" value={form.email} onChange={handle}
                    required style={input}
                    onFocus={e=>e.target.style.borderColor=A}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
                </div>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", letterSpacing:"1.5px",
                  color:"#555", marginBottom:"8px" }}>BUSINESS NAME</label>
                <input name="business" value={form.business} onChange={handle}
                  style={input}
                  onFocus={e=>e.target.style.borderColor=A}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", letterSpacing:"1.5px",
                  color:"#555", marginBottom:"8px" }}>WHAT DO YOU NEED?</label>
                <select name="service" value={form.service} onChange={handle} style={{
                  ...input, cursor:"pointer", appearance:"none",
                  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239b7cff' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center",
                }}>
                  <option value="" style={{background:"#0a0818"}}>Select a service...</option>
                  <option value="ai"        style={{background:"#0a0818"}}>AI Automation</option>
                  <option value="website"   style={{background:"#0a0818"}}>Website Design</option>
                  <option value="marketing" style={{background:"#0a0818"}}>Digital Marketing</option>
                  <option value="social"    style={{background:"#0a0818"}}>Social Media</option>
                  <option value="systems"   style={{background:"#0a0818"}}>Digital Systems</option>
                  <option value="admin"     style={{background:"#0a0818"}}>Admin & Operations</option>
                  <option value="all"       style={{background:"#0a0818"}}>Not sure — let's chat</option>
                </select>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", letterSpacing:"1.5px",
                  color:"#555", marginBottom:"8px" }}>YOUR MESSAGE</label>
                <textarea name="message" value={form.message} onChange={handle}
                  rows={5} style={{...input, resize:"vertical"}}
                  onFocus={e=>e.target.style.borderColor=A}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
              </div>
              <button type="submit" disabled={sending} style={{
                alignSelf:"flex-start", marginTop:"8px",
                padding:"16px 36px", background:"white", color:"black",
                borderRadius:"100px", fontWeight:700, fontSize:"15px",
                cursor: sending ? "wait" : "pointer", border:"none",
                fontFamily:"'DM Sans',sans-serif",
                boxShadow:"0 0 40px rgba(155,124,255,.3)",
                transition:"transform .2s, box-shadow .2s",
                opacity: sending ? 0.7 : 1 }}
                onMouseEnter={e=>{ if (!sending) { e.target.style.transform="translateY(-2px)"; e.target.style.boxShadow="0 8px 40px rgba(155,124,255,.5)"; }}}
                onMouseLeave={e=>{ e.target.style.transform="none"; e.target.style.boxShadow="0 0 40px rgba(155,124,255,.3)"; }}>
                {sending ? "Sending..." : "Send enquiry"}
              </button>
              {error && (
                <p style={{ color:"#ff6b6b", fontSize:"14px", marginTop:"8px" }}>
                  {error}{" "}
                  <a href={`mailto:${ENQUIRY_EMAIL}`} style={{ color: A }}>{ENQUIRY_EMAIL}</a>
                </p>
              )}
            </form>
          )}
        </div>

        {/* INFO */}
        <div className="ct-fi" style={{ padding:"60px 48px", background:"#050410",
          display:"flex", flexDirection:"column", gap:"36px" }}>

          {/* what happens next */}
          <div>
            <div style={{ fontSize:"11px", letterSpacing:"2.5px", color:"#3a3a3a",
              marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:A }}/>WHAT HAPPENS NEXT
            </div>
            {[
              { t:"We review your enquiry",  d:"Within 24 hours we'll read through your details." },
              { t:"Discovery call",           d:"We book a free 30-min call to understand your goals." },
              { t:"Proposal & plan",          d:"We send a clear proposal with no vague retainers." },
              { t:"We get to work",           d:"Once approved, we move fast." },
            ].map(({t,d},i) => (
              <div key={i} style={{ display:"flex", gap:"14px", marginBottom:"20px" }}>
                <span style={{ width:"22px", height:"22px", borderRadius:"50%",
                  background:"rgba(155,124,255,.12)", border:"1px solid rgba(155,124,255,.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"10px", color:A, flexShrink:0, fontWeight:700 }}>{i+1}</span>
                <div>
                  <div style={{ fontSize:"14px", color:"white", fontWeight:600, marginBottom:"3px" }}>{t}</div>
                  <div style={{ fontSize:"13px", color:"#555", lineHeight:1.55 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* contact details */}
          <div style={{ padding:"24px", background:"rgba(155,124,255,.06)",
            border:`1px solid rgba(155,124,255,.2)`, borderRadius:"12px" }}>
            <div style={{ fontSize:"11px", letterSpacing:"2px", color:A, marginBottom:"16px" }}>
              GET IN TOUCH
            </div>
            {[
              { label:"Email",   val:ENQUIRY_EMAIL, href:`mailto:${ENQUIRY_EMAIL}` },
              { label:"Phone",   val:"0434 785 800",                      href:"tel:0434785800" },
              { label:"Phone",   val:"0452 542 981",                      href:"tel:0452542981" },
              { label:"Address", val:"75 Bowmore Rd, Noble Park VIC 3174", href:null },
            ].map(({label,val,href},i) => (
              <div key={i} style={{ marginBottom:"12px" }}>
                <div style={{ fontSize:"10px", color:"#3a3a3a", letterSpacing:"1px", marginBottom:"2px" }}>{label}</div>
                {href ? (
                  <a href={href} style={{ fontSize:"14px", color:"white", textDecoration:"none",
                    transition:"color .2s" }}
                    onMouseEnter={e=>e.target.style.color=A}
                    onMouseLeave={e=>e.target.style.color="white"}>
                    {val}
                  </a>
                ) : (
                  <div style={{ fontSize:"13px", color:"#666" }}>{val}</div>
                )}
              </div>
            ))}
          </div>

          {/* socials */}
          <div>
            <div style={{ fontSize:"11px", letterSpacing:"2px", color:"#3a3a3a", marginBottom:"14px" }}>
              FOLLOW US
            </div>
            <div style={{ display:"flex", gap:"12px" }}>
              {[
                { name:"Facebook",  href:"https://facebook.com" },
                { name:"Instagram", href:"https://instagram.com" },
                { name:"LinkedIn",  href:"https://linkedin.com" },
              ].map(({name,href}) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" style={{
                  padding:"10px 18px", borderRadius:"100px",
                  border:`1px solid rgba(255,255,255,.1)`,
                  fontSize:"12px", color:"#666", textDecoration:"none",
                  transition:"color .2s, border-color .2s",
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.borderColor="rgba(255,255,255,.3)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color="#666"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; }}
                >{name}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:850px){
          .ct-grid { grid-template-columns:1fr !important; }
          .form-2col { grid-template-columns:1fr !important; }
          div[style*="1.4fr 1fr"] { grid-template-columns:1fr !important; }
          h1 span { font-size:clamp(44px,12vw,70px) !important; letter-spacing:-2px !important; }
          div[style*="padding:60px 56px"] { padding:36px 24px !important; }
          div[style*="padding:60px 48px"] { padding:36px 24px !important; }
        }
      `}</style>
    </div>
  );
}
