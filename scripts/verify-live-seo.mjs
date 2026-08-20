/**
 * Live SEO + redirect audit for www.goonya.com.au
 * Run: npm run seo:verify
 */
import { CASE_STUDIES } from "../src/data/caseStudies.js";
import { PAGE_SEO, SITE } from "../src/data/siteMeta.js";

const WWW = SITE.url.replace(/\/$/, "");
const APEX = WWW.replace("://www.", "://");

const PATHS = [
  ...Object.keys(PAGE_SEO),
  ...CASE_STUDIES.map((s) => `/our-work/${s.slug}`),
];

function canonicalForPath(path) {
  return path === "/" ? `${WWW}/` : `${WWW}${path}`;
}

async function trace(url) {
  let current = url;
  const hops = [];

  for (let i = 0; i < 8; i++) {
    const res = await fetch(current, { redirect: "manual" });
    const location = res.headers.get("location");
    hops.push({ status: res.status, url: current, location });

    if (!location || res.status < 300 || res.status >= 400) {
      const isHtml = (res.headers.get("content-type") || "").includes("html");
      const html = res.status === 200 && isHtml ? await res.text() : "";
      return {
        hops,
        finalUrl: current,
        html,
        status: res.status,
      };
    }

    current = location.startsWith("http") ? location : new URL(location, current).href;
  }

  return { hops, finalUrl: current, html: "", status: 0, error: "REDIRECT_CHAIN_TOO_LONG" };
}

function extractMeta(html) {
  return {
    canonical: html.match(/rel="canonical" href="([^"]+)"/)?.[1],
    robots: html.match(/name="robots" content="([^"]+)"/)?.[1],
    title: html.match(/<title>([^<]*)</)?.[1],
    hasApexUrl: /https:\/\/goonya\.com\.au(?:\/|"|')/.test(html),
  };
}

const issues = [];

console.log(`Auditing ${WWW} (apex ${APEX})\n`);

for (const path of PATHS) {
  const url = canonicalForPath(path);
  const result = await trace(url);

  if (result.error) {
    issues.push(`${path}: ${result.error}`);
    continue;
  }

  if (result.hops.length !== 1 || result.hops[0].status !== 200) {
    issues.push(
      `${path}: expected direct 200, got ${result.hops.map((h) => h.status).join(" → ")}`
    );
  }

  const meta = extractMeta(result.html);
  if (meta.canonical !== url) {
    issues.push(`${path}: canonical is ${meta.canonical}, expected ${url}`);
  }
  if (meta.robots && meta.robots !== "index, follow") {
    issues.push(`${path}: robots is "${meta.robots}"`);
  }
  if (meta.hasApexUrl) {
    issues.push(`${path}: HTML contains apex https://goonya.com.au URL`);
  }

  console.log(`✓ ${path}`);
}

const apexChecks = [
  `${APEX}/`,
  `${APEX}/about`,
  `${APEX}/digital-marketing-melbourne`,
  `${APEX}/digital-marketing-melbourne/`,
  `${APEX}/sitemap.xml`,
  `${APEX}/robots.txt`,
];

console.log("\nApex → www redirects");
for (const url of apexChecks) {
  const result = await trace(url);
  const expected = url
    .replace(APEX, WWW)
    .replace(/\/$/, "")
    .replace(`${WWW}`, WWW) || `${WWW}/`;
  const normalizedExpected =
    url.endsWith("/") && url !== `${APEX}/`
      ? url.replace(APEX, WWW).replace(/\/$/, "")
      : url.replace(APEX, WWW);
  const final = result.finalUrl;
  const ok =
    !result.error &&
    result.hops.length <= 2 &&
    result.hops.every((h) => h.status === 308 || h.status === 200) &&
    (final === normalizedExpected ||
      final === normalizedExpected + "/" ||
      final.replace(/\/$/, "") === normalizedExpected.replace(/\/$/, ""));

  if (!ok) {
    issues.push(`Apex redirect failed: ${url} → ${final} (${result.hops.map((h) => h.status).join("→")})`);
    console.log(`✗ ${url} → ${final}`);
  } else {
    console.log(`✓ ${url} → ${final}`);
  }
}

console.log("\nTrailing slash (www)");
for (const path of ["/about/", "/digital-marketing-melbourne/", "/seo-noble-park/"]) {
  const url = `${WWW}${path}`;
  const expected = `${WWW}${path.replace(/\/$/, "")}`;
  const result = await trace(url);
  const ok =
    result.hops.length === 2 &&
    result.hops[0].status === 308 &&
    result.finalUrl === expected;

  if (!ok) {
    issues.push(`Trailing slash failed: ${url} → ${result.finalUrl}`);
    console.log(`✗ ${path}`);
  } else {
    console.log(`✓ ${path}`);
  }
}

console.log("\nSitemap & robots");
const sitemapRes = await fetch(`${WWW}/sitemap.xml`);
const sitemapText = await sitemapRes.text();
if (sitemapRes.status !== 200) {
  issues.push(`Sitemap status ${sitemapRes.status}`);
}
const locs = [...sitemapText.matchAll(/<loc>([^<]+)</g)].map((m) => m[1]);
if (locs.length !== PATHS.length) {
  issues.push(`Sitemap has ${locs.length} URLs, expected ${PATHS.length}`);
}

for (const loc of locs) {
  if (!loc.startsWith(WWW)) {
    issues.push(`Sitemap loc not www: ${loc}`);
  }
  const result = await trace(loc);
  if (result.hops.length !== 1 || result.hops[0].status !== 200) {
    issues.push(`Sitemap URL not direct 200: ${loc}`);
  }
  const meta = extractMeta(result.html);
  if (meta.canonical && meta.canonical !== loc) {
    issues.push(`Sitemap canonical mismatch: ${loc} vs ${meta.canonical}`);
  }
}

const robotsText = await (await fetch(`${WWW}/robots.txt`)).text();
if (!robotsText.includes(`${WWW}/sitemap.xml`)) {
  issues.push("robots.txt missing www sitemap URL");
}

console.log(`✓ sitemap.xml (${locs.length} URLs)`);
console.log(`✓ robots.txt`);

console.log(`\n${issues.length ? `FAILED — ${issues.length} issue(s)` : "PASSED — all checks OK"}`);
if (issues.length) {
  for (const issue of issues) {
    console.error(`  ✗ ${issue}`);
  }
  process.exit(1);
}
