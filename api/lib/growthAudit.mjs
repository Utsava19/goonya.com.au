const FETCH_TIMEOUT_MS = 12000;
const MAX_HTML_BYTES = 600_000;

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function normaliseUrl(url) {
  const trimmed = (url || "").trim();
  if (!trimmed) return "";
  return trimmed.includes("://") ? trimmed : `https://${trimmed}`;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchOne(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1]?.trim() ?? m[0] : "";
}

function countMatches(html, pattern) {
  return (html.match(pattern) || []).length;
}

function hasAustralianPhone(text) {
  return /(?:\+61|0)[2-478](?:[ -]?[0-9]){8}|(?:\+61|0)4(?:[ -]?[0-9]){8}/.test(text);
}

function textIncludesAny(text, terms) {
  const lower = text.toLowerCase();
  return terms.some((t) => lower.includes(t.toLowerCase()));
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const started = Date.now();

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent":
          "GoonyaGrowthCheck/1.0 (+https://goonya.com.au; business growth audit bot)",
      },
    });

    const elapsed = Date.now() - started;
    const contentType = response.headers.get("content-type") || "";
    let html = "";

    if (contentType.includes("text/html") || contentType.includes("application/xhtml")) {
      const buf = await response.arrayBuffer();
      html = new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(0, MAX_HTML_BYTES));
    }

    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url || url,
      html,
      elapsed,
      scanned: html.length > 200,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchPageSpeedSeo(url) {
  try {
    const apiUrl =
      "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?" +
      new URLSearchParams({
        url,
        strategy: "mobile",
        category: "SEO",
      });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    const seo = data?.lighthouseResult?.categories?.seo?.score;
    const audits = data?.lighthouseResult?.audits || {};
    const issues = [];

    const auditKeys = [
      "document-title",
      "meta-description",
      "viewport",
      "robots-txt",
      "canonical",
      "structured-data",
      "link-text",
      "crawlable-anchors",
    ];

    for (const key of auditKeys) {
      const a = audits[key];
      if (a && a.score !== null && a.score < 1 && a.title) {
        issues.push(a.title);
      }
    }

    return {
      score: typeof seo === "number" ? Math.round(seo * 100) : null,
      issues: issues.slice(0, 4),
    };
  } catch {
    return null;
  }
}

function analyseHtml(html, { business, suburb, industry, url }) {
  const findings = [];
  let points = 0;
  const lower = html.toLowerCase();
  const text = stripTags(html);
  const textLower = text.toLowerCase();

  const title = matchOne(html, /<title[^>]*>([^<]{1,120})<\/title>/i);
  const metaDesc = matchOne(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
  ) || matchOne(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const hasOg = /<meta[^>]+property=["']og:/i.test(html);
  const hasSchema = /application\/ld\+json/i.test(html);
  const hasLocalSchema = /localbusiness|dentist|restaurant|plumber|beautysalon|healthandbeautybusiness/i.test(html);
  const hasMaps = /google\.[^/]+\/maps|g\.page|maps\.app\.goo\.gl/i.test(html);
  const hasForm = /<form[\s>]/i.test(html);
  const imgCount = countMatches(html, /<img[\s>]/gi);
  const altCount = countMatches(html, /<img[^>]+alt=["'][^"']+["']/gi);
  const hasSitemap = /sitemap/i.test(html) || /sitemap\.xml/i.test(lower);
  const hasRobotsMeta = /<meta[^>]+name=["']robots["']/i.test(html);

  if (title.length >= 10 && title.length <= 65) {
    points += 8;
    findings.push({ area: "SEO", level: "good", text: `Page title looks solid: "${title.slice(0, 55)}${title.length > 55 ? "…" : ""}"` });
  } else if (title) {
    points += 3;
    findings.push({ area: "SEO", level: "warn", text: `Page title exists but could be stronger (${title.length} chars).` });
  } else {
    points -= 6;
    findings.push({ area: "SEO", level: "bad", text: "Missing page title — Google won't know what to rank you for." });
  }

  if (business && title && title.toLowerCase().includes(business.split(" ")[0].toLowerCase())) {
    points += 4;
    findings.push({ area: "SEO", level: "good", text: "Business name appears in the page title." });
  } else if (business) {
    findings.push({ area: "SEO", level: "warn", text: "Business name not clearly in the page title." });
    points -= 3;
  }

  if (metaDesc.length >= 70 && metaDesc.length <= 160) {
    points += 7;
    findings.push({ area: "SEO", level: "good", text: "Meta description is present and a good length for search results." });
  } else if (metaDesc) {
    points += 3;
    findings.push({ area: "SEO", level: "warn", text: "Meta description exists but is too short or too long for Google snippets." });
  } else {
    points -= 5;
    findings.push({ area: "SEO", level: "bad", text: "No meta description — Google will guess your snippet." });
  }

  if (h1s.length === 1) {
    points += 6;
    findings.push({ area: "SEO", level: "good", text: `Clear main heading: "${h1s[0].slice(0, 60)}${h1s[0].length > 60 ? "…" : ""}"` });
  } else if (h1s.length === 0) {
    points -= 6;
    findings.push({ area: "SEO", level: "bad", text: "No H1 heading found — weak page structure for SEO." });
  } else {
    points -= 3;
    findings.push({ area: "SEO", level: "warn", text: `Multiple H1 headings (${h1s.length}) — can confuse search engines.` });
  }

  if (hasViewport) {
    points += 8;
    findings.push({ area: "Mobile", level: "good", text: "Mobile viewport configured — site should work on phones." });
  } else {
    points -= 10;
    findings.push({ area: "Mobile", level: "bad", text: "No mobile viewport — likely broken or zoomed-out on phones." });
  }

  if (text.length >= 800) {
    points += 5;
  } else if (text.length >= 350) {
    points += 2;
    findings.push({ area: "Content", level: "warn", text: "Homepage content is thin — hard to rank or build trust." });
  } else {
    points -= 6;
    findings.push({ area: "Content", level: "bad", text: "Very little readable content on the page." });
  }

  if (/contact|enquir|book(?:ing)?|appointment|get in touch|request a quote|call now/i.test(textLower)) {
    points += 7;
    findings.push({ area: "Conversion", level: "good", text: "Clear contact, booking or quote language found." });
  } else {
    points -= 8;
    findings.push({ area: "Conversion", level: "bad", text: "No obvious way to enquire or book — visitors may leave." });
  }

  if (hasForm) {
    points += 4;
    findings.push({ area: "Conversion", level: "good", text: "Contact or enquiry form detected." });
  }

  if (hasAustralianPhone(text)) {
    points += 5;
    findings.push({ area: "Trust", level: "good", text: "Australian phone number visible on the page." });
  } else {
    points -= 4;
    findings.push({ area: "Trust", level: "warn", text: "No clear Australian phone number found on the page." });
  }

  if (suburb && textLower.includes(suburb.toLowerCase())) {
    points += 6;
    findings.push({ area: "Local SEO", level: "good", text: `"${suburb}" appears on the page — good for local search.` });
  } else if (suburb) {
    points -= 4;
    findings.push({ area: "Local SEO", level: "warn", text: `"${suburb}" not found on the page — missing a key local signal.` });
  }

  if (hasLocalSchema) {
    points += 8;
    findings.push({ area: "Google", level: "good", text: "Local business structured data detected — helps Google understand you." });
  } else if (hasSchema) {
    points += 3;
    findings.push({ area: "Google", level: "warn", text: "Some structured data found, but not clear local business markup." });
  } else {
    points -= 3;
    findings.push({ area: "Google", level: "warn", text: "No local business schema — Google has less context about your business." });
  }

  if (hasMaps) {
    points += 5;
    findings.push({ area: "Google", level: "good", text: "Google Maps link or embed found — supports local discovery." });
  } else {
    findings.push({ area: "Google", level: "warn", text: "No Google Maps link found — harder for customers to verify location." });
    points -= 2;
  }

  if (hasCanonical) points += 2;
  if (hasOg) points += 2;
  if (hasSitemap) {
    points += 3;
    findings.push({ area: "SEO", level: "good", text: "Sitemap reference detected." });
  } else {
    findings.push({ area: "SEO", level: "warn", text: "No sitemap signal detected — indexing may be incomplete." });
    points -= 2;
  }

  if (imgCount > 0) {
    const altRatio = altCount / imgCount;
    if (altRatio >= 0.7) points += 3;
    else if (altRatio >= 0.3) {
      findings.push({ area: "SEO", level: "warn", text: "Many images missing alt text." });
      points -= 2;
    } else {
      findings.push({ area: "SEO", level: "bad", text: "Images largely missing alt text — hurts SEO and accessibility." });
      points -= 4;
    }
  }

  if (/google-analytics|gtag|googletagmanager|gtm\.js/i.test(html)) {
    points += 3;
    findings.push({ area: "Tracking", level: "good", text: "Google Analytics or Tag Manager detected." });
  } else {
    points -= 3;
    findings.push({ area: "Tracking", level: "warn", text: "No analytics detected — you can't measure what's working." });
  }

  if (/facebook\.com|instagram\.com|linkedin\.com|tiktok\.com/i.test(html)) {
    points += 3;
    findings.push({ area: "Social", level: "good", text: "Social profile links found on the site." });
  } else {
    points -= 2;
    findings.push({ area: "Social", level: "warn", text: "No social links detected — missed trust and traffic opportunities." });
  }

  if (/wixsite\.com|squarespace\.com|weebly\.com|wordpress\.com|godaddysites\.com|myshopify\.com\/pages/i.test(url)) {
    points -= 4;
    findings.push({ area: "Platform", level: "warn", text: "Generic builder subdomain — can look less established locally." });
  }

  if (hasRobotsMeta && /noindex/i.test(html)) {
    points -= 15;
    findings.push({ area: "SEO", level: "bad", text: "Page is set to noindex — Google may not show this site in search." });
  }

  const industryTerms = {
    "restaurant / café": ["menu", "book", "table", "coffee", "food"],
    "trades & construction": ["quote", "service", "licensed", "emergency", "plumb", "electric", "build"],
    "beauty & wellness": ["book", "appointment", "treatment", "salon", "beauty"],
    healthcare: ["appointment", "patient", "dental", "clinic", "doctor"],
    retail: ["shop", "store", "product", "buy", "collection"],
  };

  const key = Object.keys(industryTerms).find((k) => industry.toLowerCase().includes(k.split(" ")[0]));
  if (key && textIncludesAny(textLower, industryTerms[key])) {
    points += 4;
    findings.push({ area: "Industry", level: "good", text: `Content matches ${industry} — relevant keywords found.` });
  } else if (industry) {
    findings.push({ area: "Industry", level: "warn", text: `Limited ${industry.toLowerCase()} keywords — may not rank for what you sell.` });
    points -= 2;
  }

  return {
    points: clamp(points, -40, 85),
    maxPts: 85,
    findings,
  };
}

function scoreUrlOnly(url, business) {
  const findings = [];
  let points = 0;

  if (!url) {
    findings.push({
      area: "Website",
      level: "bad",
      text: "No website provided — customers can't verify or contact you easily online.",
    });
    return { points: 0, maxPts: 85, findings, scanned: false };
  }

  if (url.startsWith("https://")) {
    points += 8;
    findings.push({ area: "Security", level: "good", text: "HTTPS detected on your domain." });
  } else {
    points -= 10;
    findings.push({ area: "Security", level: "bad", text: "Site not using HTTPS — hurts trust and rankings." });
  }

  if (/\.com\.au|\.au(\/|$)/i.test(url)) {
    points += 6;
    findings.push({ area: "Local", level: "good", text: "Australian domain — good for local trust." });
  }

  if (/wixsite|squarespace|weebly|wordpress\.com|godaddysites/i.test(url)) {
    points -= 6;
    findings.push({ area: "Platform", level: "warn", text: "Builder subdomain detected from URL." });
  }

  findings.push({
    area: "Website",
    level: "warn",
    text: `Couldn't load ${business || "your site"} for a full scan — showing URL-only checks.`,
  });

  return { points: clamp(points, 0, 25), maxPts: 85, findings, scanned: false };
}

function scoreLocalForm(suburb, industry, htmlAudit, hasWebsite) {
  const findings = [];
  let points = 0;
  const maxPts = 25;

  if (!hasWebsite) {
    findings.push({ area: "Local", level: "bad", text: "Without a website, local SEO and Google traffic have nowhere to land." });
    return { points: 2, maxPts, findings };
  }

  if (suburb) {
    points += 5;
  }

  const competitive = ["restaurant", "café", "cafe", "trades", "construction", "beauty", "retail", "healthcare"];
  if (competitive.some((k) => industry.toLowerCase().includes(k))) {
    findings.push({
      area: "Market",
      level: "warn",
      text: `${industry} is competitive online — weak SEO means competitors win the click.`,
    });
  }

  const localFindings = htmlAudit.findings.filter((f) =>
    ["Local SEO", "Google", "Local"].includes(f.area)
  );
  const localGood = localFindings.filter((f) => f.level === "good").length;
  const localBad = localFindings.filter((f) => f.level === "bad").length;

  points += localGood * 4;
  points -= localBad * 5;

  return { points: clamp(points, 0, maxPts), maxPts, findings };
}

function scoreMarketing(htmlAudit, pageSpeed, hasWebsite) {
  const findings = [];
  let points = 0;
  const maxPts = 20;

  if (!hasWebsite) {
    findings.push({ area: "Marketing", level: "bad", text: "Ads and social need a strong website destination." });
    return { points: 0, maxPts, findings };
  }

  const tracking = htmlAudit.findings.find((f) => f.area === "Tracking");
  const social = htmlAudit.findings.find((f) => f.area === "Social");
  const conversion = htmlAudit.findings.find((f) => f.area === "Conversion");

  if (tracking?.level === "good") points += 5;
  if (social?.level === "good") points += 4;
  if (conversion?.level === "good") points += 6;
  if (conversion?.level === "bad") points -= 6;

  if (pageSpeed?.score != null) {
    if (pageSpeed.score >= 80) points += 5;
    else if (pageSpeed.score >= 50) points += 2;
    else points -= 4;
  }

  return { points: clamp(points, 0, maxPts), maxPts, findings };
}

export async function runServerGrowthAudit({ business, website, suburb, industry }) {
  const url = normaliseUrl(website);
  const hasWebsite = Boolean(url);

  let htmlAudit = scoreUrlOnly(url, business);
  let scanned = false;
  let responseMeta = null;
  let pageSpeed = null;

  if (url) {
    try {
      const fetched = await fetchHtml(url);
      responseMeta = fetched;

      if (fetched.scanned) {
        scanned = true;
        htmlAudit = analyseHtml(fetched.html, { business, suburb, industry, url: fetched.finalUrl });

        if (fetched.elapsed > 3500) {
          htmlAudit.points -= 5;
          htmlAudit.findings.push({
            area: "Speed",
            level: "warn",
            text: `Site loaded slowly (${(fetched.elapsed / 1000).toFixed(1)}s) — hurts mobile conversions.`,
          });
        } else {
          htmlAudit.findings.push({
            area: "Speed",
            level: "good",
            text: `Site responded in ${(fetched.elapsed / 1000).toFixed(1)}s.`,
          });
          htmlAudit.points += 3;
        }

        if (!fetched.ok) {
          htmlAudit.points -= 8;
          htmlAudit.findings.unshift({
            area: "Website",
            level: "bad",
            text: `Website returned HTTP ${fetched.status} — may be broken for visitors.`,
          });
        }
      } else if (fetched.ok) {
        htmlAudit.findings.unshift({
          area: "Website",
          level: "warn",
          text: "Site responded but HTML could not be analysed in detail.",
        });
      }

      pageSpeed = await fetchPageSpeedSeo(fetched.finalUrl || url);
      if (pageSpeed?.score != null) {
        htmlAudit.findings.unshift({
          area: "Google SEO",
          level: pageSpeed.score >= 75 ? "good" : pageSpeed.score >= 50 ? "warn" : "bad",
          text: `Google mobile SEO score: ${pageSpeed.score}/100${pageSpeed.issues.length ? ` — issues include ${pageSpeed.issues[0]}` : ""}.`,
        });
        htmlAudit.points += Math.round((pageSpeed.score - 50) * 0.25);
      }
    } catch (err) {
      htmlAudit = scoreUrlOnly(url, business);
      htmlAudit.findings.unshift({
        area: "Website",
        level: "bad",
        text: `Could not reach your website (${err?.name === "AbortError" ? "timed out" : "unreachable"}).`,
      });
    }
  }

  const localAudit = scoreLocalForm(suburb, industry, htmlAudit, hasWebsite);
  const marketingAudit = scoreMarketing(htmlAudit, pageSpeed, hasWebsite);

  const websiteScore = Math.round((clamp(htmlAudit.points, 0, htmlAudit.maxPts) / htmlAudit.maxPts) * 100);
  const localScore = Math.round((localAudit.points / localAudit.maxPts) * 100);
  const marketingScore = Math.round((marketingAudit.points / marketingAudit.maxPts) * 100);

  const weighted =
    websiteScore * 0.55 + localScore * 0.25 + marketingScore * 0.2;
  const score = clamp(Math.round(weighted), 8, 96);

  const allFindings = [
    ...htmlAudit.findings,
    ...localAudit.findings,
    ...marketingAudit.findings,
  ];

  const problems = allFindings.filter((f) => f.level === "bad");
  const warnings = allFindings.filter((f) => f.level === "warn");
  const strengths = allFindings.filter((f) => f.level === "good");

  return {
    score,
    business: business.trim(),
    scanned,
    finalUrl: responseMeta?.finalUrl || url || null,
    pageSpeedSeo: pageSpeed?.score ?? null,
    breakdown: [
      { label: "Website & SEO", score: websiteScore },
      { label: "Local & Google", score: localScore },
      { label: "Marketing ready", score: marketingScore },
    ],
    findings: [...problems, ...warnings, ...strengths].slice(0, 10),
    problems: problems.slice(0, 5),
    strengths: strengths.slice(0, 3),
  };
}
