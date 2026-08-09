function Contact() {
  return (
    <div className="simple-page contact-page">

      <span className="section-label">
        04 / CONTACT
      </span>

      <h1>
        HAVE AN IDEA?
        <br />
        <span>LET'S BUILD IT.</span>
      </h1>

      <p>
        Tell us a little about your business
        and what you're trying to achieve.
      </p>

      <form className="contact-form">

        <input
          type="text"
          placeholder="Your name"
        />

        <input
          type="email"
          placeholder="Email address"
        />

        <input
          type="text"
          placeholder="Business name"
        />

        <textarea
          placeholder="Tell us about your project..."
          rows="6"
        />

        <button type="submit">
          Send enquiry ↗
        </button>

      </form>

    </div>
  );
}

export default Contact;