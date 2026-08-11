import { INDUSTRIES } from "../data/siteContent";

const BUSINESS_PATTERN = /^[a-zA-Z0-9 '&.,()\-]{2,80}$/;
const SUBURB_PATTERN = /^[a-zA-Z \-']{2,60}$/;
const WEBSITE_PATTERN =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i;

export function validateGrowthForm(form) {
  const errors = {};
  const business = form.business.trim();
  const website = form.website.trim();
  const suburb = form.suburb.trim();
  const industry = form.industry.trim();

  if (!business) {
    errors.business = "Enter your business name.";
  } else if (!BUSINESS_PATTERN.test(business)) {
    errors.business = "Use letters, numbers and basic punctuation only.";
  }

  if (!suburb) {
    errors.suburb = "Enter your suburb.";
  } else if (!SUBURB_PATTERN.test(suburb)) {
    errors.suburb = "Enter a valid Australian suburb.";
  }

  if (!industry) {
    errors.industry = "Select your industry.";
  } else if (!INDUSTRIES.includes(industry)) {
    errors.industry = "Select a valid industry.";
  }

  if (!website) {
    errors.website = "Enter your website so we can scan it live.";
  } else {
    const normalised = normaliseUrl(website);
    if (!WEBSITE_PATTERN.test(normalised)) {
      errors.website = "Enter a valid website URL (e.g. yourbusiness.com.au).";
    }
  }

  return errors;
}

function normaliseUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.includes("://") ? trimmed : `https://${trimmed}`;
}

export async function runGrowthAudit(form) {
  const payload = {
    business: form.business.trim(),
    website: form.website.trim(),
    suburb: form.suburb.trim(),
    industry: form.industry.trim(),
  };

  const response = await fetch("/api/growth-audit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Could not complete the growth check.");
  }

  return response.json();
}

export function scoreLabel(score) {
  if (score >= 75) return "Strong foundation — room to accelerate growth.";
  if (score >= 58) return "Decent start — key gaps are costing you customers.";
  if (score >= 42) return "Below average — competitors are likely ahead online.";
  return "Critical gaps — you're likely losing enquiries every week.";
}

export function scoreHeadline(score) {
  if (score >= 75) return "You're on track — let's scale what's working.";
  if (score >= 58) return "There's room to GO ON YA.";
  if (score >= 42) return "Your online presence needs attention.";
  return "You're leaving customers on the table.";
}
