import { SITE } from "../data/siteMeta";

export default function Privacy() {
  return (
    <div className="page-wrap section-dark-deep">
      <section className="page-hero-dark" style={{ padding: "120px 0 60px" }}>
        <div className="page-container">
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)",
            color: "white", letterSpacing: "-2px", marginBottom: "16px" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Last updated: August 2026 · Goonya (Australia)
          </p>
        </div>
      </section>

      <section className="section-solid-surface page-section">
        <div className="page-container" style={{ maxWidth: 800, paddingBottom: 80 }}>
          <div className="content-panel legal-document" style={{ color: "#5c5868", fontSize: "15px", lineHeight: 1.8 }}>
            <p>
              Goonya ("we", "us") respects your privacy and is committed to protecting personal
              information in accordance with the Australian Privacy Act 1988 and the Australian
              Privacy Principles (APPs).
            </p>

            <h2>Information we collect</h2>
            <p>
              We may collect your name, business name, email, phone number, website URL, suburb,
              industry and other details you provide through our website forms, growth check tool,
              contact page or when you engage our services.
            </p>

            <h2>How we use information</h2>
            <p>
              We use your information to respond to enquiries, provide services, improve our
              website, send relevant communications (where permitted) and meet legal obligations.
              We do not sell your personal information.
            </p>

            <h2>Storage & security</h2>
            <p>
              Data is stored securely and accessed only by authorised personnel. While we take
              reasonable steps to protect information, no online transmission is completely secure.
            </p>

            <h2>Your rights</h2>
            <p>
              You may request access to or correction of your personal information by contacting us
              at <a href="mailto:info@goonya.com.au">info@goonya.com.au</a>.
              If you believe we have breached the APPs, you may contact the Office of the Australian
              Information Commissioner (OAIC).
            </p>

            <h2>Contact</h2>
            <p style={{ marginBottom: 0 }}>
              Goonya · {SITE.address.street}, {SITE.address.suburb} {SITE.address.state} {SITE.address.postcode} ·
              <a href="mailto:info@goonya.com.au"> info@goonya.com.au</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
