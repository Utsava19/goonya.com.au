import fs from "fs";
import path from "path";
import { CASE_STUDIES } from "../src/data/caseStudies.js";
import { LOCAL_SEO_PAGES } from "../src/data/localSeoPages.js";
import { PAGE_SEO, SITE } from "../src/data/siteMeta.js";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function canonicalForPath(routePath) {
  return routePath === "/" ? `${SITE.url}/` : `${SITE.url}${routePath}`;
}

function buildLocalSeoCrawlable(routePath, page, description) {
  const canonical = canonicalForPath(routePath);
  const serviceItems = page.services
    .map(({ title, body }) => `<li><strong>${escapeHtml(title)}</strong> — ${escapeHtml(body)}</li>`)
    .join("\n          ");
  const searchItems = page.searches.map((term) => `<li>${escapeHtml(term)}</li>`).join("\n          ");

  return `<div class="seo-crawlable">
      <h1>${escapeHtml(page.h1)} — ${escapeHtml(page.h1Accent)}</h1>
      <p>${escapeHtml(page.intro)}</p>
      <p>${escapeHtml(description)}</p>
      <h2>Services for ${escapeHtml(page.eyebrow.replace(/ · /g, ", "))}</h2>
      <ul>
          ${serviceItems}
      </ul>
      <h2>Areas we serve</h2>
      <p>${escapeHtml(page.towns.join(" · "))}</p>
      <h2>People search for</h2>
      <ul>
          ${searchItems}
      </ul>
      <p>
        Contact Goonya for a free strategy call. Call
        <a href="tel:${SITE.phoneTel}">${escapeHtml(SITE.phone)}</a> or email
        <a href="mailto:${SITE.email}">${escapeHtml(SITE.email)}</a>.
        <a href="${canonical}">View this page on goonya.com.au</a>.
      </p>
    </div>`;
}

function buildRouteSeo() {
  const caseStudySeo = Object.fromEntries(
    CASE_STUDIES.map((study) => [
      `/our-work/${study.slug}`,
      {
        title: `${study.client} Case Study | Goonya`,
        description: study.summary,
      },
    ])
  );

  return { ...PAGE_SEO, ...caseStudySeo };
}

function applyRouteSeo(html, routePath, seo) {
  const canonical = canonicalForPath(routePath);
  const title = escapeAttr(seo.title);
  const description = escapeAttr(seo.description);
  const localPage = LOCAL_SEO_PAGES[routePath];
  const heading = localPage
    ? escapeHtml(`${localPage.h1} — ${localPage.h1Accent}`)
    : escapeAttr(seo.title.replace(/\s*\|\s*Goonya\s*$/, ""));

  let next = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    );

  if (localPage) {
    next = next.replace(
      /<div class="seo-crawlable">[\s\S]*?<\/div>\s*(?=<div id="root">)/,
      `${buildLocalSeoCrawlable(routePath, localPage, seo.description)}\n    `
    );
  } else {
    next = next
      .replace(
        /<div class="seo-crawlable">\s*<h1>[\s\S]*?<\/h1>/,
        `<div class="seo-crawlable">\n      <h1>${heading}</h1>`
      )
      .replace(
        /<div class="seo-crawlable">[\s\S]*?<p>\s*([\s\S]*?)<\/p>/,
        (match, firstParagraph) => match.replace(firstParagraph, description)
      );
  }

  return next;
}

function writeRouteHtml(routePath, html) {
  const outputPath =
    routePath === "/"
      ? indexPath
      : path.join(distDir, routePath.slice(1), "index.html");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

const SITEMAP_META = {
  "/": { priority: "1.0", changefreq: "weekly" },
  "/services": { priority: "0.9", changefreq: "monthly" },
  "/packages": { priority: "0.9", changefreq: "monthly" },
  "/digital-marketing-melbourne": { priority: "0.9", changefreq: "monthly" },
  "/digital-marketing-south-east-melbourne": { priority: "0.9", changefreq: "monthly" },
  "/digital-marketing-grampians": { priority: "0.9", changefreq: "monthly" },
  "/seo-noble-park": { priority: "0.9", changefreq: "monthly" },
  "/about": { priority: "0.8", changefreq: "monthly" },
  "/our-work": { priority: "0.8", changefreq: "monthly" },
  "/contact": { priority: "0.8", changefreq: "monthly" },
  "/faq": { priority: "0.7", changefreq: "monthly" },
  "/privacy": { priority: "0.3", changefreq: "yearly" },
  "/terms": { priority: "0.3", changefreq: "yearly" },
};

const DEFAULT_SITEMAP_META = { priority: "0.7", changefreq: "monthly" };

function sitemapOrder(routePaths) {
  const caseStudyPaths = CASE_STUDIES.map((study) => `/our-work/${study.slug}`);
  const preferred = [
    "/",
    "/about",
    "/services",
    "/packages",
    "/our-work",
    ...caseStudyPaths,
    "/digital-marketing-melbourne",
    "/digital-marketing-south-east-melbourne",
    "/digital-marketing-grampians",
    "/seo-noble-park",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const rank = new Map(preferred.map((routePath, index) => [routePath, index]));
  return [...routePaths].sort(
    (a, b) => (rank.get(a) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b) ?? Number.MAX_SAFE_INTEGER)
  );
}

function generateSitemap(routePaths) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = sitemapOrder(routePaths)
    .map((routePath) => {
      const meta = SITEMAP_META[routePath] || DEFAULT_SITEMAP_META;
      return `  <url>
    <loc>${canonicalForPath(routePath)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function routeHtmlPath(routePath) {
  return routePath === "/"
    ? indexPath
    : path.join(distDir, routePath.slice(1), "index.html");
}

function verifySeoOutput(routePaths) {
  const errors = [];

  for (const routePath of routePaths) {
    const htmlPath = routeHtmlPath(routePath);
    if (!fs.existsSync(htmlPath)) {
      errors.push(`Missing prerendered HTML for ${routePath}`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, "utf8");
    const canonical = canonicalForPath(routePath);

    if (!html.includes(`href="${canonical}"`)) {
      errors.push(`Canonical mismatch for ${routePath} (expected ${canonical})`);
    }

    if (!html.includes('<meta name="robots" content="index, follow"')) {
      errors.push(`Missing index,follow robots tag for ${routePath}`);
    }

    if (/https:\/\/goonya\.com\.au(?:\/|"|')/.test(html)) {
      errors.push(`Apex URL in HTML for ${routePath} (use ${SITE.url})`);
    }

    const localPage = LOCAL_SEO_PAGES[routePath];
    if (localPage && !html.includes(escapeHtml(localPage.h1))) {
      errors.push(`Local SEO body missing for ${routePath}`);
    }
  }

  if (errors.length > 0) {
    console.error("\nSEO verification failed:");
    for (const error of errors) {
      console.error(`  ✗ ${error}`);
    }
    process.exit(1);
  }
}

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf8");
const routes = buildRouteSeo();

for (const [routePath, seo] of Object.entries(routes)) {
  const html = applyRouteSeo(baseHtml, routePath, seo);
  writeRouteHtml(routePath, html);
  console.log(`✓ ${routePath === "/" ? "/" : routePath}`);
}

const routePaths = Object.keys(routes);
verifySeoOutput(routePaths);

const sitemapXml = generateSitemap(routePaths);
const publicSitemapPath = path.join(root, "public", "sitemap.xml");
const distSitemapPath = path.join(distDir, "sitemap.xml");

fs.writeFileSync(publicSitemapPath, sitemapXml);
fs.writeFileSync(distSitemapPath, sitemapXml);
console.log(`✓ sitemap.xml (${routePaths.length} URLs, lastmod ${new Date().toISOString().slice(0, 10)})`);

console.log(`\nPrerendered SEO for ${routePaths.length} routes.`);
