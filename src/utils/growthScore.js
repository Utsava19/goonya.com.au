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
  }

  if (website) {
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

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

async function probeWebsite(url) {
  const normalised = normaliseUrl(url);
  const findings = [];
  let points = 0;
  const maxPts = 35;

  if (!normalised) {
    findings.push({
      area: "Website",
      level: "bad",
      text: "No website provided — customers can't verify or contact you easily online.",
    });
    return { points: 0, maxPts, findings, scanned: false };
  }

  if (!normalised.startsWith("https://")) {
    findings.push({
      area: "Security",
      level: "warn",
      text: "Site not using HTTPS — hurts trust and search rankings.",
    });
    points -= 6;
  } else {
    points += 5;
  }

  if (/wixsite\.com|squarespace\.com|weebly\.com|wordpress\.com|godaddysites\.com/i.test(normalised)) {
    findings.push({
      area: "Platform",
      level: "warn",
      text: "Generic builder subdomain detected — harder to rank and look established.",
    });
    points -= 5;
  } else {
    points += 3;
  }

  if (/\.com\.au|\.au(\/|$)/i.test(normalised)) {
    points += 4;
    findings.push({
      area: "Local",
      level: "good",
      text: "Australian domain detected — good signal for local search.",
    });
  }

  let scanned = false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    const response = await fetch(normalised, {
      signal: controller.signal,
      mode: "cors",
      headers: { Accept: "text/html" },
    });
    clearTimeout(timeout);

    if (response.ok) {
      scanned = true;
      points += 8;
      findings.push({
        area: "Website",
        level: "good",
        text: "Website is live and responding.",
      });

      const html = await response.text();
      const lower = html.toLowerCase();

      if (/<meta[^>]+viewport/i.test(html)) {
        points += 5;
        findings.push({ area: "Mobile", level: "good", text: "Mobile viewport detected." });
      } else {
        points -= 8;
        findings.push({
          area: "Mobile",
          level: "bad",
          text: "No mobile viewport — likely poor mobile experience.",
        });
      }

      if (lower.length < 4000) {
        points -= 4;
        findings.push({
          area: "Content",
          level: "warn",
          text: "Thin homepage content — weak for SEO and trust.",
        });
      } else {
        points += 3;
      }

      if (/contact|enquir|book|call|phone|email|get in touch/i.test(lower)) {
        points += 5;
        findings.push({
          area: "Conversion",
          level: "good",
          text: "Contact or booking signals found on the page.",
        });
      } else {
        points -= 6;
        findings.push({
          area: "Conversion",
          level: "bad",
          text: "Weak contact/booking signals — visitors may not know how to enquire.",
        });
      }

      if (/google-analytics|gtag|googletagmanager|facebook\.net\/tr/i.test(lower)) {
        points += 3;
        findings.push({ area: "Tracking", level: "good", text: "Analytics or pixel tracking detected." });
      } else {
        findings.push({
          area: "Tracking",
          level: "warn",
          text: "No obvious analytics — hard to measure what's working.",
        });
        points -= 3;
      }

      if (/<title[^>]*>([^<]{3,})<\/title>/i.test(html)) {
        points += 2;
      } else {
        findings.push({ area: "SEO", level: "warn", text: "Missing or weak page title." });
        points -= 3;
      }
    } else {
      findings.push({
        area: "Website",
        level: "warn",
        text: `Site returned status ${response.status} — may be broken or restricted.`,
      });
      points -= 5;
    }
  } catch {
    findings.push({
      area: "Website",
      level: "warn",
      text: "Couldn't fully scan your site (blocked or unreachable) — scored from URL signals only.",
    });
    points += 2;
  }

  return {
    points: clamp(points, 0, maxPts),
    maxPts,
    findings,
    scanned,
  };
}

function scoreLocalPresence(suburb, industry) {
  const findings = [];
  let points = 0;
  const maxPts = 20;

  if (suburb.length >= 3) {
    points += 8;
    findings.push({
      area: "Local",
      level: "good",
      text: `Suburb provided (${suburb}) — local SEO can be targeted.`,
    });
  }

  const competitive = ["restaurant", "café", "cafe", "trades", "construction", "beauty", "retail"];
  const ind = industry.toLowerCase();
  if (competitive.some((k) => ind.includes(k))) {
    points += 4;
    findings.push({
      area: "Market",
      level: "warn",
      text: "Competitive industry online — visibility and conversion matter more.",
    });
  } else {
    points += 6;
  }

  points += 4;
  findings.push({
    area: "Google",
    level: "warn",
    text: "Google Business Profile strength estimated — confirm listing is complete and active.",
  });

  return { points: clamp(points, 0, maxPts), maxPts, findings };
}

function scoreMarketingReadiness(hasWebsite, websiteScanned) {
  const findings = [];
  let points = 0;
  const maxPts = 15;

  if (!hasWebsite) {
    findings.push({
      area: "Social",
      level: "bad",
      text: "Without a website, social and ads have nowhere strong to send traffic.",
    });
    return { points: 2, maxPts, findings };
  }

  if (websiteScanned) {
    points += 8;
    findings.push({
      area: "Marketing",
      level: "good",
      text: "Website reachable — ads and social can drive traffic somewhere solid.",
    });
  } else {
    points += 4;
    findings.push({
      area: "Marketing",
      level: "warn",
      text: "Marketing score estimated — website couldn't be fully verified.",
    });
  }

  points += 4;
  return { points: clamp(points, 0, maxPts), maxPts, findings };
}

export async function runGrowthAudit(form) {
  const business = form.business.trim();
  const website = form.website.trim();
  const suburb = form.suburb.trim();
  const industry = form.industry.trim();

  const websiteAudit = await probeWebsite(website);
  const localAudit = scoreLocalPresence(suburb, industry);
  const marketingAudit = scoreMarketingReadiness(Boolean(website), websiteAudit.scanned);

  const totalPts =
    websiteAudit.points + localAudit.points + marketingAudit.points;
  const totalMax =
    websiteAudit.maxPts + localAudit.maxPts + marketingAudit.maxPts;
  const score = Math.round((totalPts / totalMax) * 100);

  const findings = [
    ...websiteAudit.findings,
    ...localAudit.findings,
    ...marketingAudit.findings,
  ];

  const breakdown = [
    {
      label: "Website",
      score: Math.round((websiteAudit.points / websiteAudit.maxPts) * 100),
    },
    {
      label: "Local presence",
      score: Math.round((localAudit.points / localAudit.maxPts) * 100),
    },
    {
      label: "Marketing readiness",
      score: Math.round((marketingAudit.points / marketingAudit.maxPts) * 100),
    },
  ];

  return {
    score: clamp(score, 18, 94),
    business,
    findings,
    breakdown,
    scanned: websiteAudit.scanned,
  };
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
