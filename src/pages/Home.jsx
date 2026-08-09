import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Home() {

  useEffect(() => {

    const timeline = gsap.timeline();

    timeline
      .from(".home-kicker", {
        opacity: 0,
        y: 30,
        duration: 0.7,
      })
      .from(".hero-line", {
        opacity: 0,
        y: 100,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
      }, "-=.4")
      .from(".hero-description", {
        opacity: 0,
        y: 30,
        duration: .7,
      }, "-=.5")
      .from(".hero-actions", {
        opacity: 0,
        y: 20,
        duration: .6,
      }, "-=.4")
      .from(".hero-visual", {
        opacity: 0,
        scale: .8,
        duration: 1.2,
        ease: "power3.out",
      }, "-=.8");

    gsap.to(".hero-orb", {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-card", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      stagger: .5,
      ease: "sine.inOut",
    });

  }, []);

  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <div className="home-kicker">
            <span />
            DIGITAL SYSTEMS FOR MODERN BUSINESS
          </div>

          <h1 className="hero-title">

            <div className="hero-line">
              YOUR BUSINESS.
            </div>

            <div className="hero-line hero-gradient">
              BUT SMARTER.
            </div>

            <div className="hero-line">
              AUTOMATED.
            </div>

          </h1>

          <p className="hero-description">
            Goonya builds websites, AI automation and
            digital systems that help ambitious businesses
            attract customers, save time and grow.
          </p>

          <div className="hero-actions">

            <Link to="/services" className="primary-button">
              Explore what we do
              <span>↗</span>
            </Link>

            <Link to="/our-work" className="secondary-button">
              See our work
              <span>↓</span>
            </Link>

          </div>

        </div>

        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-orb" />

          <div className="hero-core">

            <div className="core-ring ring-one" />
            <div className="core-ring ring-two" />

            <div className="core-center">
              <span>✦</span>
              <small>GOONYA</small>
              <strong>AI</strong>
            </div>

          </div>

          <div className="floating-card card-one">
            <span className="status-dot" />
            New enquiry
            <strong>+1</strong>
          </div>

          <div className="floating-card card-two">
            <span className="status-dot green" />
            AI response
            <strong>0.8s</strong>
          </div>

          <div className="floating-card card-three">
            <span className="status-dot purple" />
            Customer converted
            <strong>$420</strong>
          </div>

        </div>

      </section>

      {/* STATEMENT */}

      <section className="statement-section">

        <span className="section-label">
          01 / THE GOONYA IDEA
        </span>

        <h2>
          Your business has
          <span> enough to think about.</span>
        </h2>

        <p>
          Your technology shouldn't be one of them.
          We connect the digital pieces behind your
          business so everything works together.
        </p>

      </section>

      {/* VIDEO */}

      <section className="home-video">

        <div className="video-container">

          <video
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>

          <div className="video-overlay" />

          <div className="video-copy">

            <span>THE DIGITAL MACHINE</span>

            <h2>
              BUILD ONCE.
              <br />
              <em>RUN SMARTER.</em>
            </h2>

          </div>

        </div>

      </section>

      {/* SERVICES PREVIEW */}

      <section className="home-services">

        <div className="section-header">

          <span className="section-label">
            02 / WHAT WE DO
          </span>

          <h2>
            We build the
            <span> machine behind your business.</span>
          </h2>

        </div>

        <div className="service-preview-grid">

          <Link to="/services" className="preview-card">

            <span>01</span>

            <div>
              <strong>AI AUTOMATION</strong>
              <p>
                Make repetitive work disappear.
              </p>
            </div>

            <b>↗</b>

          </Link>

          <Link to="/services" className="preview-card">

            <span>02</span>

            <div>
              <strong>WEBSITES</strong>
              <p>
                Turn attention into customers.
              </p>
            </div>

            <b>↗</b>

          </Link>

          <Link to="/services" className="preview-card">

            <span>03</span>

            <div>
              <strong>MARKETING</strong>
              <p>
                Get discovered. Get chosen.
              </p>
            </div>

            <b>↗</b>

          </Link>

        </div>

      </section>

      {/* CTA */}

      <section className="home-cta">

        <span className="section-label">
          03 / READY?
        </span>

        <h2>
          Let's build something
          <span> people remember.</span>
        </h2>

        <Link to="/contact" className="primary-button">
          Start a project
          <span>↗</span>
        </Link>

      </section>

    </div>
  );
}

export default Home;