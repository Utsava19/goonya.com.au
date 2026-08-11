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
    const normalised = website.includes("://") ? website : `https://${website}`;
    if (!WEBSITE_PATTERN.test(normalised)) {
      errors.website = "Enter a valid website URL (e.g. yourbusiness.com.au).";
    }
  }

  return errors;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function calculateGrowthScore(form) {
  const business = form.business.trim();
  const website = form.website.trim();
  const suburb = form.suburb.trim();
  const industry = form.industry.trim().toLowerCase();

  let score = 38;

  if (business.length >= 4) score += 6;
  if (business.length >= 10) score += 4;

  if (suburb.length >= 3) score += 8;

  if (!website) {
    score -= 14;
  } else {
    const normalised = website.includes("://") ? website : `https://${website}`;
    if (WEBSITE_PATTERN.test(normalised)) {
      score += 12;
      if (/\.com\.au|\.au/i.test(normalised)) score += 4;
      if (normalised.startsWith("https://")) score += 3;
    } else {
      score -= 10;
    }
  }

  const industryModifiers = {
    restaurant: -4,
    café: -4,
    trades: -2,
    construction: -2,
    beauty: -1,
    wellness: -1,
    healthcare: -3,
    retail: -2,
    professional: -1,
    fitness: -2,
    ndis: -5,
    other: 0,
  };

  for (const [key, modifier] of Object.entries(industryModifiers)) {
    if (industry.includes(key)) {
      score += modifier;
      break;
    }
  }

  const variation = hashString(`${business}|${suburb}|${industry}`) % 15;
  score += variation;

  return Math.min(88, Math.max(24, Math.round(score)));
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
