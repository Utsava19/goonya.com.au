import { SITE } from "../data/siteMeta";

export const GOONYA_EMAIL = SITE.email;

const SERVICE_LABELS = {
  ai: "AI Automation",
  website: "Website Design",
  seo: "SEO & Local Search",
  content: "Content Creation",
  marketing: "Digital Marketing",
  social: "Social Media",
  systems: "Digital Systems",
  admin: "Admin & Operations",
  all: "Not sure — let's chat",
};

export function getServiceLabel(service) {
  return SERVICE_LABELS[service] || service || "Not specified";
}

export async function sendContactEnquiry(form) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      business: form.business,
      service: form.service,
      serviceLabel: getServiceLabel(form.service),
      message: form.message,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Email could not be sent.");
  }

  return data;
}

export async function sendFormEmail({ subject, fields, autoresponse, replyTo }) {
  const payload = {
    _subject: subject,
    _template: "table",
    ...fields,
  };

  if (autoresponse) payload._autoresponse = autoresponse;
  if (replyTo) payload._replyto = replyTo;

  const response = await fetch(`https://formsubmit.co/ajax/${GOONYA_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Email could not be sent.");
  }
}

export function formatGrowthReportEmail(form, result) {
  const lines = [
    `Business: ${form.business}`,
    `Website: ${form.website}`,
    `Suburb: ${form.suburb}`,
    `Industry: ${form.industry}`,
    "",
    `Growth score: ${result.score}/100`,
    `Summary: ${result.score >= 75 ? "Strong foundation" : result.score >= 58 ? "Decent start with gaps" : result.score >= 42 ? "Below average" : "Critical gaps"}`,
    result.finalUrl ? `Scanned URL: ${result.finalUrl}` : "",
    result.pageSpeedSeo != null ? `Google mobile SEO: ${result.pageSpeedSeo}/100` : "",
    "",
    "Top problems:",
    ...(result.problems?.length
      ? result.problems.map((p) => `- ${p.area}: ${p.text}`)
      : ["- None flagged"]),
    "",
    "Full audit:",
    ...result.findings.map(
      (f) => `[${f.level.toUpperCase()}] ${f.area}: ${f.text}`
    ),
  ].filter(Boolean);

  return lines.join("\n");
}
