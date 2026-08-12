export default function Terms() {
  const A = "#9b7cff";

  return (
    <div className="page-wrap section-dark-deep">
      <section className="page-hero-dark" style={{ padding: "120px 0 60px" }}>
        <div className="page-container">
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)",
            color: "white", letterSpacing: "-2px", marginBottom: "16px" }}>
            Terms & Conditions
          </h1>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Last updated: August 2026 · Goonya (Australia)
          </p>
        </div>
      </section>

      <section className="section-fade-to-surface page-section">
        <div className="page-container" style={{ maxWidth: 800, paddingBottom: 80 }}>
          <div style={{ color: "#5c5868", fontSize: "15px", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "20px" }}>
              These Terms govern use of the Goonya website (goonya.com.au) and our digital marketing,
              website and automation services. By using this site or engaging our services, you agree
              to these Terms.
            </p>

            <h2 style={{ color: "#141118", fontSize: "18px", margin: "32px 0 12px" }}>Services</h2>
            <p style={{ marginBottom: "16px" }}>
              Service scope, deliverables, timelines and fees are defined in your proposal, package
              selection or signed agreement. We will perform services with reasonable skill and care.
            </p>

            <h2 style={{ color: "#141118", fontSize: "18px", margin: "32px 0 12px" }}>Payments</h2>
            <p style={{ marginBottom: "16px" }}>
              Fees are due as stated in your agreement. Late payments may result in paused work.
              Third-party costs (e.g. ad spend, software subscriptions) are separate unless included.
            </p>

            <h2 style={{ color: "#141118", fontSize: "18px", margin: "32px 0 12px" }}>Client responsibilities</h2>
            <p style={{ marginBottom: "16px" }}>
              You agree to provide accurate information, timely approvals and access required for
              us to deliver services. You retain ownership of your business content; you grant us
              licence to use it for agreed deliverables.
            </p>

            <h2 style={{ color: "#141118", fontSize: "18px", margin: "32px 0 12px" }}>Limitation of liability</h2>
            <p style={{ marginBottom: "16px" }}>
              To the extent permitted by Australian law, our liability is limited to the fees paid
              for the relevant service period. We are not liable for indirect or consequential loss.
              Nothing excludes rights that cannot be excluded under the Competition and Consumer Act.
            </p>

            <h2 style={{ color: "#141118", fontSize: "18px", margin: "32px 0 12px" }}>Governing law</h2>
            <p style={{ marginBottom: "16px" }}>
              These Terms are governed by the laws of Victoria, Australia. Disputes will be handled
              in Victorian courts where applicable.
            </p>

            <p>
              Questions: <a href="mailto:info@goonya.com.au" style={{ color: A }}>info@goonya.com.au</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
