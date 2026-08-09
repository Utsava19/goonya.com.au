import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeStyles.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {

  useEffect(() => {

    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(".home-kicker",      { opacity: 0, y: 30, duration: 0.7 })
      .from(".hero-line",        { opacity: 0, y: 100, stagger: 0.13, duration: 1.1, ease: "power4.out" }, "-=0.4")
      .from(".hero-description", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
      .from(".hero-actions",     { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-photo-wrap",  { opacity: 0, scale: 0.92, x: 40, duration: 1.2, ease: "power3.out" }, "-=0.9");

    gsap.to(".photo-shimmer", { x: "110%", duration: 1.6, ease: "power2.inOut", delay: 1.2 });

    gsap.to(".floating-card", { y: -16, duration: 2.8, repeat: -1, yoyo: true, stagger: 0.6, ease: "sine.inOut" });

    gsap.to(".hero-orb", { y: -40, x: 25, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    gsap.to(".marquee-track", { xPercent: -50, duration: 22, repeat: -1, ease: "none" });

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, y: 55, duration: 0.9, ease: "power3.out",
      });
    });

    gsap.utils.toArray(".stagger-parent").forEach((parent) => {
      gsap.from(parent.querySelectorAll(".stagger-child"), {
        scrollTrigger: { trigger: parent, start: "top 85%" },
        opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power3.out",
      });
    });

    gsap.utils.toArray(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = el.dataset.target.includes(".");
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = isFloat
                ? this.targets()[0].val.toFixed(1)
                : Math.round(this.targets()[0].val);
            },
          });
        },
      });
    });

    document.querySelectorAll(".primary-button, .secondary-button").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - rect.left - rect.width/2) * 0.28, y: (e.clientY - rect.top - rect.height/2) * 0.28, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" }));
    });

    document.querySelectorAll(".preview-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        gsap.to(card, { rotateY: ((e.clientX - rect.left)/rect.width - 0.5) * 10, rotateX: -((e.clientY - rect.top)/rect.height - 0.5) * 8, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.4)" }));
    });

    gsap.to(".home-video video", {
      scrollTrigger: { trigger: ".home-video", start: "top bottom", end: "bottom top", scrub: true },
      y: 80, ease: "none",
    });

    gsap.to(".hero-photo", {
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      y: 60, ease: "none",
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <div className="home-kicker">
            <span />
            DIGITAL SYSTEMS FOR MODERN BUSINESS
          </div>
          <h1 className="hero-title">
            <div className="hero-line">YOUR BUSINESS.</div>
            <div className="hero-line hero-gradient">BUT SMARTER.</div>
            <div className="hero-line">AUTOMATED.</div>
          </h1>
          <p className="hero-description">
            Goonya builds websites, AI automation and digital systems
            that help ambitious businesses attract customers, save time and grow.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="primary-button">Explore what we do <span>↗</span></Link>
            <Link to="/our-work" className="secondary-button">See our work <span>↓</span></Link>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-orb" />
          <div className="hero-photo-frame">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="Team working on digital systems"
            />
            <div className="photo-shimmer" />
            <div className="photo-gradient" />
          </div>
          <div className="floating-card card-one"><span className="status-dot" />New enquiry<strong>+1</strong></div>
          <div className="floating-card card-two"><span className="status-dot green" />AI response<strong>0.8s</strong></div>
          <div className="floating-card card-three"><span className="status-dot purple" />Customer converted<strong>$420</strong></div>
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-inner">
              <b>AI AUTOMATION</b><em>✦</em><b>WEBSITES</b><em>✦</em>
              <b>DIGITAL SYSTEMS</b><em>✦</em><b>MARKETING</b><em>✦</em>
              <b>GOONYA.COM.AU</b><em>✦</em><b>BUILD WHAT'S NEXT</b><em>✦</em>
            </span>
          ))}
        </div>
      </div>

      <section className="home-stats stagger-parent">
        {[
          { label: "Projects Delivered", value: "40", suffix: "+" },
          { label: "Avg Response Time",  value: "0.8", suffix: "s" },
          { label: "Client Satisfaction", value: "98", suffix: "%" },
          { label: "Hours Saved / Client", value: "120", suffix: "h" },
        ].map(({ label, value, suffix }) => (
          <div className="stat-item stagger-child" key={label}>
            <div className="stat-value">
              <span className="stat-number" data-target={value}>0</span>
              <sup>{suffix}</sup>
            </div>
            <p>{label}</p>
          </div>
        ))}
      </section>

      <section className="statement-section">
        <span className="section-label reveal">01 / THE GOONYA IDEA</span>
        <h2 className="reveal">Your business has<span> enough to think about.</span></h2>
        <p className="reveal">Your technology shouldn't be one of them. We connect the digital pieces behind your business so everything works together.</p>
      </section>

      <section className="home-video reveal">
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
          <div className="video-copy">
            <span>THE DIGITAL MACHINE</span>
            <h2>BUILD ONCE.<br /><em>RUN SMARTER.</em></h2>
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="section-header reveal">
          <span className="section-label">02 / WHAT WE DO</span>
          <h2>We build the <span>machine behind your business.</span></h2>
        </div>
        <div className="service-preview-grid stagger-parent">
          {[
            { n: "01", title: "AI AUTOMATION", desc: "Make repetitive work disappear." },
            { n: "02", title: "WEBSITES",      desc: "Turn attention into customers." },
            { n: "03", title: "MARKETING",     desc: "Get discovered. Get chosen." },
          ].map(({ n, title, desc }) => (
            <Link to="/services" className="preview-card stagger-child" key={n}>
              <span>{n}</span>
              <div><strong>{title}</strong><p>{desc}</p></div>
              <b>↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-process">
        <div className="section-header reveal">
          <span className="section-label">03 / HOW IT WORKS</span>
          <h2>Simple process. <span>Serious results.</span></h2>
        </div>
        <div className="process-steps stagger-parent">
          {[
            { n: "01", title: "Discovery", desc: "We learn your business, your bottlenecks, your goals." },
            { n: "02", title: "Strategy",  desc: "We map the digital system your business actually needs." },
            { n: "03", title: "Build",     desc: "We execute fast without cutting corners." },
            { n: "04", title: "Launch",    desc: "We go live and track what's working." },
          ].map(({ n, title, desc }) => (
            <div className="process-step stagger-child" key={n}>
              <div className="step-number">{n}</div>
              <div className="step-line" />
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <span className="section-label reveal">04 / READY?</span>
        <h2 className="reveal">Let's build something <span>people remember.</span></h2>
        <div className="reveal">
          <Link to="/contact" className="primary-button cta-big">Start a project <span>↗</span></Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
