const SITE = {
  name: "Goonya",
  url: "https://goonya.com.au",
  email: "info@goonya.com.au",
  phone: "0434 785 800",
  phoneTel: "+61434785800",
  address: "75 Bowmore Rd, Noble Park VIC 3174",
  slogan: "GO on ya — digital growth for small business",
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

export function buildContactThankYouHtml({ name }) {
  const safeName = escapeHtml(firstName(name));

  return `<!DOCTYPE html>
<html lang="en-AU">
<head><meta charset="UTF-8" /><title>We received your enquiry</title></head>
<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222;background:#ffffff;">
  <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#7c5ce0;letter-spacing:0.5px;">GO on ya</p>
  <p style="margin:0 0 12px;">Hi ${safeName},</p>
  <p style="margin:0 0 12px;">Thank you for contacting Goonya.</p>
  <p style="margin:0 0 12px;">We received your enquiry and will be in touch within 24 business hours.</p>
  <p style="margin:0 0 20px;">If you need anything sooner, reply to this email or call us on ${SITE.phone}.</p>
  <p style="margin:0;color:#555;">
    Goonya<br />
    <a href="mailto:${SITE.email}" style="color:#555;">${SITE.email}</a><br />
    <a href="${SITE.url}" style="color:#555;">goonya.com.au</a>
  </p>
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
        <td style="padding:10px 12px;border-bottom:1px solid #ece8f4;font-size:12px;color:#666;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #ece8f4;font-size:14px;color:#111;vertical-align:top;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en-AU">
<head><meta charset="UTF-8" /><title>New enquiry</title></head>
<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;">
    <tr>
      <td style="padding:20px 24px;border-bottom:1px solid #eee;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#7c5ce0;letter-spacing:0.5px;">GO on ya</p>
        <p style="margin:0;font-size:14px;color:#666;">New contact form enquiry</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${tableRows}</table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildContactThankYouText({ name }) {
  const greeting = firstName(name);
  return `Hi ${greeting},

Thank you for contacting Goonya.

We received your enquiry and will be in touch within 24 business hours.

If you need anything sooner, reply to this email or call us on ${SITE.phone}.

Goonya
${SITE.email}
${SITE.url.replace("https://", "")}`;
}

function buildContactNotificationText(form) {
  return [
    "New contact form enquiry",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Business: ${form.business || "Not provided"}`,
    `Service: ${form.serviceLabel || "Not specified"}`,
    `Message: ${form.message || "No message"}`,
  ].join("\n");
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

async function sendViaResend({ to, subject, html, replyTo, text, tag }) {
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
    text,
    reply_to: replyTo || SITE.email,
    tags: [{ name: "category", value: tag || "contact" }],
  };

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
    message: "Enquiry received",
    _subject: "We received your enquiry — Goonya",
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
  const notificationText = buildContactNotificationText(payload);
  const thankYouHtml = buildContactThankYouHtml(payload);
  const thankYouText = buildContactThankYouText(payload);

  let notificationSent = false;
  let thankYouSent = false;
  let provider = "formsubmit";

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend({
        to: SITE.email,
        subject: `New enquiry from ${payload.name}`,
        html: notificationHtml,
        text: notificationText,
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

  if (payload.email.toLowerCase() !== SITE.email.toLowerCase()) {
    if (process.env.RESEND_API_KEY) {
      try {
        await sendViaResend({
          to: payload.email,
          subject: "We received your enquiry — Goonya",
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
  }

  return {
    ok: true,
    notificationSent,
    thankYouSent,
    autoresponse: thankYouSent,
    branded: false,
    provider,
  };
}
