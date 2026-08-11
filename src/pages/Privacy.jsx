export default function Privacy() {
  const A = "#9b7cff";

  return (
    <div style={{ background: "#070707", minHeight: "80vh" }}>
      <div style={{ width: "min(800px, 90vw)", margin: "0 auto", padding: "120px 0 80px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)",
          color: "white", letterSpacing: "-2px", marginBottom: "24px" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "40px" }}>
          Last updated: August 2026 · Goonya (Australia)
        </p>

        <div style={{ color: "#888", fontSize: "15px", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "20px" }}>
            Goonya ("we", "us") respects your privacy and is committed to protecting personal
            information in accordance with the Australian Privacy Act 1988 and the Australian
            Privacy Principles (APPs).
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Information we collect</h2>
          <p style={{ marginBottom: "16px" }}>
            We may collect your name, business name, email, phone number, website URL, suburb,
            industry and other details you provide through our website forms, growth check tool,
            contact page or when you engage our services.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>How we use information</h2>
          <p style={{ marginBottom: "16px" }}>
            We use your information to respond to enquiries, provide services, improve our
            website, send relevant communications (where permitted) and meet legal obligations.
            We do not sell your personal information.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Storage & security</h2>
          <p style={{ marginBottom: "16px" }}>
            Data is stored securely and accessed only by authorised personnel. While we take
            reasonable steps to protect information, no online transmission is completely secure.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Your rights</h2>
          <p style={{ marginBottom: "16px" }}>
            You may request access to or correction of your personal information by contacting us
            at <a href="mailto:info@goonya.com.au" style={{ color: A }}>info@goonya.com.au</a>.
            If you believe we have breached the APPs, you may contact the Office of the Australian
            Information Commissioner (OAIC).
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Contact</h2>
          <p>
            Goonya · 75 Bowmore Rd, Noble Park VIC 3174 ·
            <a href="mailto:info@goonya.com.au" style={{ color: A }}> info@goonya.com.au</a>
          </p>
        </div>
      </div>
    </div>
  );
}
