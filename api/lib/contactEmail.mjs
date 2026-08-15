const SITE = {
  name: "Goonya",
  url: "https://goonya.com.au",
  email: "info@goonya.com.au",
  phone: "0434 785 800",
  phoneTel: "+61434785800",
  address: "75 Bowmore Rd, Noble Park VIC 3174",
  slogan: "GO on ya — digital growth for small business",
  logoUrl: "https://goonya.com.au/brand/goonya-email-logo.png",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return "there";
  return trimmed.split(/\s+/)[0];
}

export function buildContactThankYouHtml({ name, serviceLabel, business, message }) {
  const safeName = escapeHtml(firstName(name));
  const safeService = escapeHtml(serviceLabel || "General enquiry");
  const safeBusiness = escapeHtml(business || "Not provided");
  const safeMessage = escapeHtml(message || "No message provided");

  return `<!DOCTYPE html>
<html lang="en-AU">
<head><meta charset="UTF-8" /><title>Thank you for contacting Goonya</title></head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;">
    <tr>
      <td style="padding:24px 28px;background:#0c0a14;border-radius:8px 8px 0 0;">
        <div style="font-size:28px;font-weight:800;color:#9b7cff;letter-spacing:-1px;">GO on ya</div>
        <div style="font-size:12px;color:#c4b5fd;margin-top:4px;">Goonya — digital growth for small business</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px;">
        <h1 style="margin:0 0 12px;font-size:22px;color:#111;">Hi ${safeName}, thank you for contacting us</h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#444;">
          We received your enquiry and will get back to you within <strong>24 business hours</strong>.
        </p>
        <div style="background:#f8f6fc;border:1px solid #e8e4f0;border-radius:8px;padding:16px 18px;margin-bottom:20px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#7c5ce0;text-transform:uppercase;letter-spacing:1px;">Your submission</p>
          <p style="margin:0 0 6px;font-size:14px;line-height:1.6;"><strong>Service:</strong> ${safeService}</p>
          <p style="margin:0 0 6px;font-size:14px;line-height:1.6;"><strong>Business:</strong> ${safeBusiness}</p>
          <p style="margin:0;font-size:14px;line-height:1.6;"><strong>Message:</strong> ${safeMessage}</p>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#444;">Questions before we reply? Contact us anytime:</p>
        <p style="margin:0;font-size:14px;line-height:1.8;">
          <a href="mailto:${SITE.email}" style="color:#7c5ce0;">${SITE.email}</a><br />
          <a href="tel:${SITE.phoneTel}" style="color:#222;text-decoration:none;">${SITE.phone}</a><br />
          <a href="${SITE.url}" style="color:#222;text-decoration:none;">goonya.com.au</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactNotificationHtml(form) {
  const rows = [
    ["Name", form.name],
    ["Email", form.email],
    ["Business", form.business || "Not provided"],
    ["Service", form.serviceLabel || "Not specified"],
    ["Message", form.message || "No message"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #ece8f4;font-size:12px;color:#8a8499;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #ece8f4;font-size:14px;color:#1a1625;vertical-align:top;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en-AU">
<head><meta charset="UTF-8" /><title>New enquiry</title></head>
<body style="margin:0;padding:24px;background:#f0edf5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e4f0;">
    <tr>
      <td style="background:#0c0a14;padding:20px 24px;">
        <img src="${SITE.logoUrl}" alt="${SITE.name}" width="150" style="display:block;width:150px;height:auto;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <h1 style="margin:0 0 8px;font-size:22px;color:#0c0a14;">New website enquiry</h1>
        <p style="margin:0 0 18px;font-size:14px;color:#5c5868;">Submitted via goonya.com.au/contact</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${tableRows}</table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildContactThankYouText({ name, serviceLabel, business, message }) {
  const greeting = firstName(name);
  return `Hi ${greeting},

Thank you for contacting Goonya — we received your enquiry.

We'll review your details and get back to you within 24 business hours.

Your submission:
Service: ${serviceLabel || "Not specified"}
Business: ${business || "Not provided"}
Message: ${message || "No message provided"}

Need to reach us sooner?
Email: ${SITE.email}
Phone: ${SITE.phone}
Website: ${SITE.url}

${SITE.slogan}

— Goonya`;
}

function parseResendError(message) {
  try {
    const parsed = JSON.parse(message);
    if (parsed.message?.includes("domain is not verified")) {
      return "Email domain is not verified in Resend yet. Add the DNS records Resend provided, then wait for Verified status.";
    }
    return parsed.message || message;
  } catch {
    return message;
  }
}

async function sendViaResend({ to, subject, html, replyTo, text, bcc, tag }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email service is not configured.");
  }

  const from = process.env.RESEND_FROM || `Goonya <${SITE.email}>`;
  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: replyTo || SITE.email,
    tags: [{ name: "category", value: tag || "contact" }],
  };

  if (text) payload.text = text;
  if (bcc) payload.bcc = Array.isArray(bcc) ? bcc : [bcc];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(parseResendError(detail));
    error.status = response.status;
    throw error;
  }

  return response.json().catch(() => ({}));
}

async function sendViaFormSubmitAjax(form) {
  const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      business: form.business || "Not provided",
      service: form.serviceLabel || "Not specified",
      message: form.message || "No message",
      _subject: `New enquiry from ${form.name} — goonya.com.au`,
      _template: "table",
      _replyto: form.email,
    }),
  });

  if (!response.ok) {
    throw new Error("Enquiry notification could not be sent.");
  }

  const result = await response.json().catch(() => ({}));
  if (result.success === false || result.success === "false") {
    throw new Error(result.message || "Enquiry notification could not be sent.");
  }
}

async function sendAutoresponseViaFormSubmit(form) {
  const body = new URLSearchParams({
    name: form.name,
    email: form.email,
    message: form.message || "Enquiry submitted",
    _subject: `Thank you for contacting Goonya`,
    _autoresponse: buildContactThankYouText(form),
    _template: "box",
    _captcha: "false",
  });

  const response = await fetch(`https://formsubmit.co/${encodeURIComponent(SITE.email)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Thank-you email could not be sent.");
  }
}

async function sendViaFormSubmit(form) {
  await sendViaFormSubmitAjax(form);
  try {
    await sendAutoresponseViaFormSubmit(form);
  } catch (err) {
    console.error("FormSubmit autoresponse failed:", err.message);
  }
}

export async function handleContactSubmission(form) {
  const payload = {
    name: String(form.name || "").trim(),
    email: String(form.email || "").trim(),
    business: String(form.business || "").trim(),
    serviceLabel: String(form.serviceLabel || form.service || "Not specified").trim(),
    message: String(form.message || "").trim(),
  };

  if (!payload.name || !payload.email) {
    throw new Error("Name and email are required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error("Please enter a valid email address.");
  }

  const notificationHtml = buildContactNotificationHtml(payload);
  const thankYouHtml = buildContactThankYouHtml(payload);
  const thankYouText = buildContactThankYouText(payload);

  let notificationSent = false;
  let thankYouSent = false;
  let provider = "formsubmit";

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend({
        to: SITE.email,
        subject: `New enquiry from ${payload.name} — goonya.com.au`,
        html: notificationHtml,
        text: [
          `New enquiry from ${payload.name}`,
          `Email: ${payload.email}`,
          `Business: ${payload.business || "Not provided"}`,
          `Service: ${payload.serviceLabel}`,
          `Message: ${payload.message || "No message"}`,
        ].join("\n"),
        replyTo: payload.email,
        tag: "contact-notification",
      });
      notificationSent = true;
      provider = "resend";
    } catch (err) {
      console.error("Resend notification failed:", err.message);
    }
  }

  if (!notificationSent) {
    await sendViaFormSubmitAjax(payload);
    notificationSent = true;
    provider = "formsubmit";
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend({
        to: payload.email,
        subject: "Thank you for contacting Goonya — we'll be in touch shortly",
        html: thankYouHtml,
        text: thankYouText,
        replyTo: SITE.email,
        tag: "contact-thank-you",
      });
      thankYouSent = true;
    } catch (err) {
      console.error("Resend thank-you failed:", err.message);
    }
  }

  if (!thankYouSent) {
    try {
      await sendAutoresponseViaFormSubmit(payload);
      thankYouSent = true;
    } catch (err) {
      console.error("FormSubmit thank-you failed:", err.message);
    }
  }

  if (process.env.RESEND_API_KEY && thankYouSent) {
    try {
      await sendViaResend({
        to: SITE.email,
        subject: `Copy: confirmation sent to ${payload.email}`,
        html: `<p style="font-family:Arial,sans-serif;font-size:14px;color:#444;">This is the confirmation email sent to <strong>${escapeHtml(payload.email)}</strong> after they submitted the contact form:</p>${thankYouHtml}`,
        text: `Confirmation sent to ${payload.email}:\n\n${thankYouText}`,
        tag: "contact-thank-you-copy",
      });
    } catch (err) {
      console.error("Resend thank-you copy failed:", err.message);
    }
  }

  return {
    ok: true,
    notificationSent,
    thankYouSent,
    autoresponse: thankYouSent,
    branded: provider === "resend" && thankYouSent,
    provider,
  };
}
