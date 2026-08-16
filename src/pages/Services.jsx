import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SERVICE_SLUGS } from "../data/siteContent";

/* ── AI NODES ANIMATION ── */
function AIAnim() {
  const ref = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;

    const ctx = cv.getContext("2d");
    let W = 0;
    let H = 0;
    let raf;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = Math.max(wrap.clientHeight, 260);
      if (w < 1 || h < 1) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = w;
      H = h;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const nodes = Array.from({ length: 14 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      if (W > 0 && H > 0) {
        ctx.clearRect(0, 0, W, H);
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > 100) n.vx *= -1;
          if (n.y < 0 || n.y > 100) n.vy *= -1;
          n.pulse += 0.04;
        });
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const ax = (nodes[i].x / 100) * W;
            const ay = (nodes[i].y / 100) * H;
            const bx = (nodes[j].x / 100) * W;
            const by = (nodes[j].y / 100) * H;
            const d = Math.hypot(ax - bx, ay - by);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.strokeStyle = `rgba(155,124,255,${(1 - d / 90) * 0.45})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
        nodes.forEach((n) => {
          const x = (n.x / 100) * W;
          const y = (n.y / 100) * H;
          const g = (Math.sin(n.pulse) + 1) / 2;
          ctx.beginPath();
          ctx.arc(x, y, 2 + g * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155,124,255,${0.5 + g * 0.5})`;
          ctx.fill();
        });
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="sv-anim-stage">
      <canvas ref={ref} aria-hidden="true" />
    </div>
  );
}

/* ── WEBSITE BUILDER ANIMATION ── */
function WebAnim() {
  const [step, setStep] = useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>setStep(s=>(s+1)%5),900);
    return ()=>clearInterval(iv);
  },[]);
  return (
    <div style={{padding:"24px",height:"100%",display:"flex",flexDirection:"column",gap:"10px",justifyContent:"center"}}>
      <div style={{background:"#0a0818",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",gap:"5px",padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
          {["#f87171","#fbbf24","#4ade80"].map(c=><span key={c} style={{width:"7px",height:"7px",borderRadius:"50%",background:c}}/>)}
          <div style={{flex:1,height:"12px",background:"rgba(255,255,255,.04)",borderRadius:"3px",marginLeft:"6px"}}/>
        </div>
        <div style={{padding:"10px"}}>
          {[100,65,80,45].map((w,i)=>(
            <div key={i} style={{height:"7px",width:`${w}%`,
              background:`rgba(0,210,190,${i===step?.5:.12})`,
              borderRadius:"3px",marginBottom:"5px",
              transition:"background .4s ease",
              boxShadow:i===step?"0 0 8px rgba(0,210,190,.5)":"none"}}/>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:"5px",alignItems:"flex-end",height:"50px"}}>
        {[55,72,48,90,63].map((h,i)=>(
          <div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",
            height:`${i<=step?h:6}%`,
            background:`rgba(0,210,190,${.2+i*.1})`,
            transition:"height .5s ease",transitionDelay:`${i*.06}s`}}/>
        ))}
      </div>
    </div>
  );
}

/* ── MARKETING METRICS ANIMATION ── */
function MarketingAnim() {
  const [tick, setTick] = useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>setTick(t=>t+1),1400);
    return ()=>clearInterval(iv);
  },[]);
  const metrics = [
    {l:"Reach",   v:tick%2===0?"12.4K":"14.2K", c:"#e879f9"},
    {l:"Clicks",  v:tick%2===0?"840":"1,240",   c:"#f97316"},
    {l:"Leads",   v:tick%2===0?"24":"31",        c:"#4ade80"},
    {l:"Revenue", v:tick%2===0?"$4.2K":"$5.8K", c:"#ff64b4"},
  ];
  return (
    <div style={{padding:"20px",height:"100%",display:"flex",flexDirection:"column",gap:"8px",justifyContent:"center"}}>
      {metrics.map(({l,v,c})=>(
        <div key={l} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"10px 14px",background:"rgba(255,255,255,.03)",borderRadius:"8px",
          border:"1px solid rgba(255,255,255,.05)"}}>
          <span style={{fontSize:"12px",color:"#555"}}>{l}</span>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"15px",
            fontWeight:700,color:c,transition:"all .4s ease"}}>{v}</span>
          <span style={{fontSize:"10px",color:c}}>↑</span>
        </div>
      ))}
    </div>
  );
}

/* ── SYSTEMS FLOW ANIMATION ── */
function SystemsAnim() {
  const [active, setActive] = useState(0);
  const tools = ["CRM","EMAIL","CALENDAR","INVOICE","REPORT"];
  useEffect(()=>{
    const iv=setInterval(()=>setActive(a=>(a+1)%tools.length),700);
    return ()=>clearInterval(iv);
  },[]);
  const C = "#64b4ff";
  return (
    <div style={{padding:"16px",height:"100%",display:"flex",flexDirection:"column",
      gap:"8px",justifyContent:"center",alignItems:"center"}}>
      <div style={{width:"44px",height:"44px",borderRadius:"50%",
        background:"rgba(100,180,255,.15)",border:`1px solid ${C}50`,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:"10px",color:C,fontWeight:700,marginBottom:"8px",
        boxShadow:`0 0 16px rgba(100,180,255,.2)`}}>HUB</div>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",justifyContent:"center",maxWidth:"180px"}}>
        {tools.map((t,i)=>(
          <div key={t} style={{padding:"5px 11px",borderRadius:"100px",
            background:i===active?"rgba(100,180,255,.18)":"rgba(255,255,255,.04)",
            border:`1px solid ${i===active?C+"80":"rgba(255,255,255,.06)"}`,
            fontSize:"10px",color:i===active?C:"#444",
            transition:"all .35s ease",
            boxShadow:i===active?`0 0 10px rgba(100,180,255,.2)`:"none"}}>{t}</div>
        ))}
      </div>
    </div>
  );
}

/* ── SOCIAL ANIMATION ── */
function SocialAnim() {
  const [n, setN] = useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>setN(v=>v+Math.floor(Math.random()*8)+2),1000);
    return ()=>clearInterval(iv);
  },[]);
  return (
    <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:"7px",justifyContent:"center",height:"100%"}}>
      {[
        {p:"Instagram",v:`${2400+n}`,label:"reach",c:"#e1306c"},
        {p:"TikTok",   v:`${n*3}`,  label:"views", c:"#69c9d0"},
        {p:"Facebook", v:`${12+Math.floor(n/6)}`,label:"leads",c:"#1877f2"},
      ].map(({p,v,label,c})=>(
        <div key={p} style={{display:"flex",alignItems:"center",gap:"10px",
          padding:"9px 13px",background:"rgba(255,255,255,.03)",borderRadius:"8px",
          border:"1px solid rgba(255,255,255,.05)"}}>
          <span style={{width:"8px",height:"8px",borderRadius:"50%",
            background:c,boxShadow:`0 0 6px ${c}`,flexShrink:0}}/>
          <span style={{fontSize:"12px",color:"#555",flex:1}}>{p}</span>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"13px",
            color:c,fontWeight:700}}>{v}</span>
          <span style={{fontSize:"10px",color:"#444"}}>{label}</span>
        </div>
      ))}
    </div>
  );
}

const SEO_SEARCH_QUERIES = ["plumber noble park", "cafe near me", "dentist cheltenham"];
const CONTENT_REEL_TYPES = [
  { platform: "Instagram", color: "#e1306c", label: "Reel · 0:15" },
  { platform: "TikTok", color: "#69c9d0", label: "Trend edit · 0:22" },
  { platform: "Facebook", color: "#1877f2", label: "Promo clip · 0:30" },
  { platform: "Animation", color: "#9b7cff", label: "Brand explainer" },
];

/* ── SEO ANIMATION ── */
function SeoAnim() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const q = SEO_SEARCH_QUERIES[qi];
    if (typed < q.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setQi((i) => (i + 1) % SEO_SEARCH_QUERIES.length);
    }, 1600);
    return () => clearTimeout(t);
  }, [qi, typed]);

  useEffect(() => {
    const iv = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(iv);
  }, []);

  const query = SEO_SEARCH_QUERIES[qi].slice(0, typed);

  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
      <div style={{
        padding: "12px 16px", borderRadius: "100px",
        background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
        fontSize: "13px", color: "#aaa", minHeight: "42px",
      }}>
        {query}
        <span style={{ opacity: typed % 2 === 0 ? 1 : 0, color: "#9b7cff" }}>|</span>
      </div>
      {[
        { rank: 1, name: "Your business", meta: "★★★★★ · Maps · Book online", hot: true },
        { rank: 2, name: "Competitor site", meta: "★★★ · Outdated listing", hot: false },
        { rank: 3, name: "Another result", meta: "★★★★ · Slow mobile site", hot: false },
      ].map(({ rank, name, meta, hot }) => (
        <div key={rank} style={{
          display: "flex", gap: "12px", padding: "12px 14px", borderRadius: "10px",
          background: hot && pulse ? "rgba(155,124,255,.14)" : "rgba(255,255,255,.03)",
          border: hot ? "1px solid rgba(155,124,255,.35)" : "1px solid rgba(255,255,255,.05)",
          transition: "background .4s ease, box-shadow .4s ease",
          boxShadow: hot && pulse ? "0 0 24px rgba(155,124,255,.12)" : "none",
        }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: hot ? "#9b7cff" : "#555", minWidth: 18 }}>
            {rank}
          </span>
          <div>
            <div style={{ fontSize: "13px", color: hot ? "#fff" : "#888", fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: 2 }}>{meta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── CONTENT CREATION ANIMATION ── */
function ContentCreationAnim() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive((a) => (a + 1) % CONTENT_REEL_TYPES.length), 1400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    setProgress(0);
    const iv = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 4)), 50);
    return () => clearInterval(iv);
  }, [active]);

  const current = CONTENT_REEL_TYPES[active];

  return (
    <div style={{ padding: "18px", height: "100%", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
      <div style={{
        position: "relative", borderRadius: "14px", overflow: "hidden",
        aspectRatio: "9/14", maxHeight: "220px", margin: "0 auto", width: "min(100%, 140px)",
        border: `1px solid ${current.color}55`, boxShadow: `0 0 24px ${current.color}22`,
        background: "linear-gradient(160deg, rgba(255,255,255,.08), rgba(0,0,0,.4))",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 40%, ${current.color}33 100%)`,
        }} />
        <div style={{ position: "absolute", top: 10, left: 10, fontSize: "9px", letterSpacing: "1px", color: current.color }}>
          {current.platform.toUpperCase()}
        </div>
        <div style={{
          position: "absolute", bottom: 12, left: 10, right: 10,
          fontSize: "10px", color: "#fff", fontWeight: 600,
        }}>
          {current.label}
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, height: 3,
          width: `${progress}%`, background: current.color,
          transition: "width .05s linear",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {CONTENT_REEL_TYPES.map(({ platform, color }, i) => (
          <span key={platform} style={{
            width: i === active ? 18 : 7, height: 7, borderRadius: 4,
            background: i === active ? color : "rgba(255,255,255,.15)",
            transition: "all .3s ease",
          }} />
        ))}
      </div>
      <div style={{ fontSize: "11px", color: "#666", textAlign: "center", letterSpacing: "1px" }}>
        RENDERING BRAND CONTENT…
      </div>
    </div>
  );
}

/* ── ADMIN ANIMATION ── */
function AdminAnim() {
  const tasks = ["Email replied","Report filed","Meeting booked","Data updated","Invoice sent"];
  const [done, setDone] = useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>setDone(d=>d<tasks.length?d+1:0),800);
    return ()=>clearInterval(iv);
  },[]);
  return (
    <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:"6px",justifyContent:"center",height:"100%"}}>
      {tasks.map((t,i)=>(
        <div key={t} style={{display:"flex",alignItems:"center",gap:"10px",
          padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:"8px",
          border:"1px solid rgba(255,255,255,.05)",
          opacity:i<done?1:.3,transition:"opacity .5s ease"}}>
          <span style={{fontSize:"12px",color:i<done?"#4ade80":"#333",transition:"color .3s"}}>{i<done?"✓":"○"}</span>
          <span style={{fontSize:"12px",color:i<done?"#888":"#444",
            textDecoration:i<done?"line-through":"none",transition:"all .3s"}}>{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════ SERVICES PAGE ════════ */
export default function Services() {
  const A = "#9b7cff";
  const L = "rgba(255,255,255,.08)";

  useEffect(() => {
    document.querySelectorAll(".sv-fi").forEach((el,i)=>{
      el.style.opacity="0";
      el.style.transform="translateY(20px)";
      el.style.transition=`opacity .6s ease ${i*.08}s, transform .6s ease ${i*.08}s`;
      setTimeout(()=>{ el.style.opacity="1"; el.style.transform="translateY(0)"; },40);
    });
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.opacity="1";
          e.target.style.transform="translateY(0)";
          obs.unobserve(e.target);
        }
      });
    },{threshold:.08});
    document.querySelectorAll(".sv-rv").forEach(el=>{
      el.style.opacity="0";
      el.style.transform="translateY(32px)";
      el.style.transition="opacity .7s ease, transform .7s ease";
      obs.observe(el);
    });
    return ()=>obs.disconnect();
  }, []);

  const services = [
    {
      title:"AI Automation", slug: SERVICE_SLUGS["AI Automation"], short:"Make repetitive work disappear.",
      accent:"#9b7cff", color:"rgba(155,124,255,.2)",
      desc:"We build intelligent automation systems that handle your repetitive tasks — customer follow-ups, data entry, scheduling, reporting and more. Your team focuses on what matters. The system handles the rest.",
      features:["Lead follow-up automation","Email & CRM workflows","Appointment scheduling","Invoice & billing automation","Custom chatbots","Reporting dashboards"],
      Anim: AIAnim,
    },
    {
      title:"Website Design", slug: SERVICE_SLUGS["Website Design"], short:"Turn attention into customers.",
      accent:"#00d2be", color:"rgba(0,210,190,.2)",
      desc:"We design and build high-performance websites that don't just look great — they convert. Every page is built around your customer's journey, from first click to enquiry. Fast, mobile-first and built to rank.",
      features:["Custom design & development","Mobile-first responsive","SEO foundation built in","Fast load speeds","CMS for easy updates","Landing pages & funnels"],
      Anim: WebAnim,
    },
    {
      title:"SEO & Local Search", slug: SERVICE_SLUGS["SEO & Local Search"], short:"Show up when locals search.",
      accent:"#fbbf24", color:"rgba(251,191,36,.18)",
      desc:"We optimise your Google Business Profile, local keywords, on-page SEO and schema so you rank when people search for your services nearby. Not generic SEO slides — real fixes that bring calls, directions and quote requests.",
      features:["Google Business Profile setup","Local suburb & service SEO","On-page titles & meta tags","Schema & structured data","Google Maps visibility","Monthly ranking reports"],
      Anim: SeoAnim,
    },
    {
      title:"Content Creation", slug: SERVICE_SLUGS["Content Creation"], short:"Content that stops the scroll.",
      accent:"#f97316", color:"rgba(249,115,22,.18)",
      desc:"Facebook posts, Instagram Reels, TikTok edits, Stories and animated promo videos — all planned, filmed or designed, edited and delivered ready to publish. We match your brand, not a template.",
      features:["Instagram Reels & Stories","Facebook posts & ad creatives","TikTok short-form video","Animated promo videos","Brand graphics & captions","Monthly content batches"],
      Anim: ContentCreationAnim,
    },
    {
      title:"Digital Marketing", slug: SERVICE_SLUGS["Digital Marketing"], short:"Get discovered. Get chosen.",
      accent:"#ff64b4", color:"rgba(255,100,180,.2)",
      desc:"From Facebook and Instagram to TikTok and Google — we run data-driven campaigns that reach the right people at the right time. We handle the content, targeting, budget and reporting. You watch the leads come in.",
      features:["Facebook & Instagram ads","TikTok content & ads","Google Ads management","Social media management","Animated video creation","Monthly reporting"],
      Anim: MarketingAnim,
    },
    {
      title:"Digital Systems", slug: SERVICE_SLUGS["Digital Systems"], short:"Connect everything. Run smarter.",
      accent:"#64b4ff", color:"rgba(100,180,255,.2)",
      desc:"We connect your tools, apps and workflows into one intelligent system. CRM, invoicing, bookings, communications — all talking to each other so nothing falls through the cracks.",
      features:["CRM setup & integration","Zapier & Make automations","Booking system setup","Payment & invoicing systems","Team workflow systems","Custom integrations"],
      Anim: SystemsAnim,
    },
    {
      title:"Social Media", slug: SERVICE_SLUGS["Social Media"], short:"Grow your audience daily.",
      accent:"#e879f9", color:"rgba(232,121,249,.2)",
      desc:"Daily content creation, scheduling and community management across all platforms. We create the posts, write the captions, film and edit videos — everything your brand needs to stay active and growing.",
      features:["Daily content creation","Instagram & Facebook management","TikTok strategy & posting","Story & reel creation","Community engagement","Monthly analytics report"],
      Anim: SocialAnim,
    },
    {
      title:"Admin & Operations", slug: SERVICE_SLUGS["Admin & Operations"], short:"Take the tedious work off your plate.",
      accent:"#4ade80", color:"rgba(74,222,128,.15)",
      desc:"Email management, data entry, scheduling, research, document preparation and more. We handle the back-end operations that eat your time every day, so you can focus on growing your business.",
      features:["Email & inbox management","Data entry & cleanup","Scheduling & calendars","Document preparation","Research & sourcing","Process documentation"],
      Anim: AdminAnim,
    },
  ];

  return (
    <div className="page-wrap section-dark-deep">

      {/* HERO */}
      <section className="page-hero-dark" style={{minHeight:"55vh",display:"flex",alignItems:"center"}}>
        <div className="page-container" style={{padding:"130px 0 80px"}}>
          <div className="sv-fi" style={{fontSize:"11px",letterSpacing:"2.5px",color:"#3a3a3a",
            marginBottom:"28px",display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{width:"20px",height:"1px",background:A}}/>SERVICES
          </div>
          <h1 className="sv-fi" style={{margin:0,fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:700,letterSpacing:"-4px",lineHeight:.92}}>
            <span style={{display:"block",fontSize:"clamp(52px,7vw,112px)",color:"white"}}>WE BUILD THE</span>
            <span style={{display:"block",fontSize:"clamp(52px,7vw,112px)",paddingBottom:"6px",
              background:`linear-gradient(90deg,${A},#e0b0ff 55%,${A})`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              DIGITAL ENGINE.</span>
          </h1>
          <p className="sv-fi" style={{maxWidth:"520px",marginTop:"28px",color:"#666",fontSize:"17px",lineHeight:1.75}}>
            Websites, SEO, content, ads and automation — one team helping your business
            get found, get chosen and grow without the big agency bill.
          </p>
        </div>
      </section>

      {/* OVERVIEW — plain English */}
      <section className="section-solid-surface page-section">
      <div className="page-container" style={{ paddingBottom: "64px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div className="eyebrow-light" style={{ marginBottom: "14px" }}>
            AT A GLANCE
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3.5vw,44px)",
            fontWeight: 700, letterSpacing: "-2px", color: "#141118", margin: 0 }}>
            What we do — <span style={{ color: A }}>in plain English</span>
          </h2>
        </div>
        <div className="sv-overview-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px",
        }}>
          {[
            { title: "AI Automation", slug: "ai-automation", accent: "#9b7cff",
              plain: "Repetitive tasks handled automatically — follow-ups, scheduling, reporting.",
              forWho: "Businesses drowning in admin" },
            { title: "Website Design", slug: "website-design", accent: "#00d2be",
              plain: "Fast, mobile-first sites built to turn visitors into enquiries.",
              forWho: "Businesses with outdated or broken sites" },
            { title: "SEO & Local Search", slug: "seo-local", accent: "#fbbf24",
              plain: "Google Business, local SEO and rankings so nearby customers find you first.",
              forWho: "Businesses invisible on Google Maps" },
            { title: "Content Creation", slug: "content-creation", accent: "#f97316",
              plain: "Reels, posts, animated video and brand graphics for every platform.",
              forWho: "Businesses with nothing worth posting" },
            { title: "Digital Marketing", slug: "digital-marketing", accent: "#ff64b4",
              plain: "Google, Meta and TikTok campaigns that bring in real leads.",
              forWho: "Businesses invisible online" },
            { title: "Digital Systems", slug: "digital-systems", accent: "#64b4ff",
              plain: "CRM, bookings, invoicing and tools connected into one system.",
              forWho: "Businesses juggling too many apps" },
            { title: "Social Media", slug: "social-media", accent: "#e879f9",
              plain: "Consistent posts, reels and content so you stay visible daily.",
              forWho: "Businesses with dead social accounts" },
            { title: "Admin & Operations", slug: "admin-operations", accent: "#4ade80",
              plain: "Inbox, data entry, scheduling and back-office work off your plate.",
              forWho: "Owners doing everything themselves" },
          ].map(({ title, slug, accent, plain, forWho }) => (
            <Link key={slug} to={`/services#${slug}`} style={{
              padding: "28px 24px", background: "#ffffff",
              border: "1px solid rgba(20,17,24,.08)", borderRadius: "14px",
              textDecoration: "none", transition: "border-color .2s, transform .2s, box-shadow .2s",
              boxShadow: "0 12px 40px rgba(20,17,24,.04)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}55`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(20,17,24,.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(20,17,24,.08)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(20,17,24,.04)"; }}
            >
              <div style={{ width: "28px", height: "3px", background: accent, borderRadius: "2px", marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#141118", fontSize: "18px",
                margin: "0 0 10px" }}>{title}</h3>
              <p style={{ color: "#5c5868", fontSize: "14px", lineHeight: 1.65, margin: "0 0 14px" }}>{plain}</p>
              <div style={{ fontSize: "12px", color: accent }}>Best for: {forWho}</div>
              <div style={{ fontSize: "12px", color: "#8a8499", marginTop: "16px" }}>Learn more →</div>
            </Link>
          ))}
        </div>
      </div>
      </section>

      {/* MOBILE ANIMATED PILLS — visible on mobile only */}
      <div className="sv-pills section-surface-alt" style={{
        display:"none",
        overflowX:"auto", WebkitOverflowScrolling:"touch",
        padding:"16px 20px 20px",
        gap:"10px",
        borderBottom:"1px solid rgba(20,17,24,.08)",
        scrollbarWidth:"none",
      }}>
        {[
          {l:"AI Automation", c:"#9b7cff", slug:"ai-automation"},
          {l:"Websites",      c:"#00d2be", slug:"website-design"},
          {l:"SEO",           c:"#fbbf24", slug:"seo-local"},
          {l:"Content",       c:"#f97316", slug:"content-creation"},
          {l:"Marketing",     c:"#ff64b4", slug:"digital-marketing"},
          {l:"Systems",       c:"#64b4ff", slug:"digital-systems"},
          {l:"Social Media",  c:"#e879f9", slug:"social-media"},
          {l:"Admin",         c:"#4ade80", slug:"admin-operations"},
        ].map(({l,c,slug},i)=>(
          <Link key={l} to={`/services#${slug}`} style={{
            padding:"8px 16px", borderRadius:"100px", flexShrink:0,
            background:`${c}18`, border:`1px solid ${c}40`,
            fontSize:"12px", color:c, fontWeight:500,
            animation:`pillIn .4s ease ${i*.08}s both`,
            textDecoration:"none",
          }}>{l}</Link>
        ))}
      </div>

      {/* SERVICES */}
      <section className="section-dark page-section">
      <div className="page-container" style={{margin:"0 auto 130px"}}>
        {services.map(({title,slug,short,color,accent,desc,features,Anim},i)=>(
          <div key={title} id={slug} className="sv-rv sv-card" style={{
            display:"grid",gridTemplateColumns:"1fr 1fr",
            gap:"1px",background:L,border:`1px solid ${L}`,marginBottom:"1px",
            scrollMarginTop:"100px",
          }}>

            {/* text */}
            <div style={{padding:"56px 52px",background:"#08060f",
              order:i%2===0?1:2}} className="sv-text">
              <div style={{width:"32px",height:"3px",borderRadius:"2px",
                background:accent,marginBottom:"20px",boxShadow:`0 0 8px ${accent}`}}/>
              <h2 style={{fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(26px,3vw,42px)",fontWeight:700,letterSpacing:"-2px",
                color:"white",marginBottom:"10px"}}>{title}</h2>
              <p style={{fontSize:"13px",color:accent,marginBottom:"18px",letterSpacing:"1px"}}>{short}</p>
              <p style={{color:"#555",fontSize:"15px",lineHeight:1.8,marginBottom:"28px",maxWidth:"420px"}}>{desc}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"32px"}}>
                {features.map(f=>(
                  <div key={f} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <span style={{width:"5px",height:"5px",borderRadius:"50%",
                      background:accent,flexShrink:0}}/>
                    <span style={{fontSize:"13px",color:"#666"}}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{display:"inline-flex",alignItems:"center",
                padding:"13px 26px",
                background:"rgba(255,255,255,.05)",
                border:`1px solid rgba(255,255,255,.12)`,borderRadius:"100px",
                fontSize:"13px",fontWeight:500,color:"white",textDecoration:"none",
                transition:"background .2s"}}>
                Get started
              </Link>
            </div>

            {/* live animation panel */}
            <div style={{background:"#050410",position:"relative",overflow:"hidden",
              minHeight:"360px",order:i%2===0?2:1,
              display:"flex",flexDirection:"column"}} className="sv-anim">
              {/* coloured glow */}
              <div style={{position:"absolute",inset:0,
                background:`radial-gradient(circle at 50% 40%, ${color}, transparent 70%)`,
                pointerEvents:"none",zIndex:0}}/>
              {/* title badge — TOP not bottom, won't overlap animation */}
              <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,.05)",
                display:"flex",alignItems:"center",gap:"8px",
                position:"relative",zIndex:2,flexShrink:0}}>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",
                  background:accent,boxShadow:`0 0 6px ${accent}`}}/>
                <span style={{fontSize:"11px",color:"#555",letterSpacing:"1.5px"}}>{title.toUpperCase()}</span>
              </div>
              {/* animation content */}
              <div className="sv-anim-stage-wrap">
                <Anim/>
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>

      {/* CTA */}
      <section className="section-dark-deep page-section">
      <div className="page-container" style={{padding:"100px 0 140px",
        textAlign:"center",borderTop:`1px solid ${L}`}}>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(40px,6vw,90px)",fontWeight:700,letterSpacing:"-4px",
          lineHeight:.9,color:"white",margin:"0 0 40px"}}>
          Not sure where<br/><span style={{color:A}}>to start?</span>
        </h2>
        <p style={{color:"#555",fontSize:"17px",marginBottom:"36px"}}>
          Tell us about your business and we'll recommend the right starting point.
        </p>
        <Link to="/contact" style={{display:"inline-flex",alignItems:"center",
          padding:"18px 44px",background:"white",color:"black",borderRadius:"100px",
          fontWeight:700,fontSize:"16px",textDecoration:"none",
          boxShadow:"0 0 60px rgba(155,124,255,.35)"}}>
          Talk to us
        </Link>
      </div>
      </section>

      <style>{`
        @keyframes pillIn {
          from { opacity:0; transform:translateY(10px) scale(.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        .sv-anim-stage-wrap {
          position: relative;
          z-index: 1;
          flex: 1;
          min-height: 260px;
        }
        .sv-anim-stage {
          position: absolute;
          inset: 0;
          min-height: 260px;
        }
        .sv-anim-stage canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* show pills on mobile */
        @media(max-width:850px){
          .sv-overview-grid { grid-template-columns:1fr !important; }
          .sv-pills { display:flex !important; }
          .sv-pills::-webkit-scrollbar { display:none; }
        }

        /* mobile service cards */
        @media(max-width:850px){
          .sv-card { grid-template-columns:1fr !important; }
          .sv-anim {
            order:1 !important;
            min-height:260px !important;
          }
          .sv-text {
            order:2 !important;
            padding:32px 20px !important;
          }
          .sv-text > div[style*="1fr 1fr"] {
            grid-template-columns:1fr !important;
          }
        }

        /* scroll reveal */
        .sv-rv {
          transition: opacity .7s ease, transform .7s ease;
        }

        @media(min-width:851px){
          .sv-card:hover .sv-anim {
            filter: brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}
