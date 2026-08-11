export default function Terms() {
  const A = "#9b7cff";

  return (
    <div style={{ background: "#070707", minHeight: "80vh" }}>
      <div style={{ width: "min(800px, 90vw)", margin: "0 auto", padding: "120px 0 80px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)",
          color: "white", letterSpacing: "-2px", marginBottom: "24px" }}>
          Terms & Conditions
        </h1>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "40px" }}>
          Last updated: August 2026 · Goonya (Australia)
        </p>

        <div style={{ color: "#888", fontSize: "15px", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "20px" }}>
            These Terms govern use of the Goonya website (goonya.com.au) and our digital marketing,
            website and automation services. By using this site or engaging our services, you agree
            to these Terms.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Services</h2>
          <p style={{ marginBottom: "16px" }}>
            Service scope, deliverables, timelines and fees are defined in your proposal, package
            selection or signed agreement. We will perform services with reasonable skill and care.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Payments</h2>
          <p style={{ marginBottom: "16px" }}>
            Fees are due as stated in your agreement. Late payments may result in paused work.
            Third-party costs (e.g. ad spend, software subscriptions) are separate unless included.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Client responsibilities</h2>
          <p style={{ marginBottom: "16px" }}>
            You agree to provide accurate information, timely approvals and access required for
            us to deliver services. You retain ownership of your business content; you grant us
            licence to use it for agreed deliverables.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Limitation of liability</h2>
          <p style={{ marginBottom: "16px" }}>
            To the extent permitted by Australian law, our liability is limited to the fees paid
            for the relevant service period. We are not liable for indirect or consequential loss.
            Nothing excludes rights that cannot be excluded under the Competition and Consumer Act.
          </p>

          <h2 style={{ color: "white", fontSize: "18px", margin: "32px 0 12px" }}>Governing law</h2>
          <p style={{ marginBottom: "16px" }}>
            These Terms are governed by the laws of Victoria, Australia. Disputes will be handled
            in Victorian courts where applicable.
          </p>

          <p>
            Questions: <a href="mailto:info@goonya.com.au" style={{ color: A }}>info@goonya.com.au</a>
          </p>
        </div>
      </div>
    </div>
  );
}
