import fs from "fs";
import path from "path";
import { CASE_STUDIES } from "../src/data/caseStudies.js";
import { PAGE_SEO, SITE } from "../src/data/siteMeta.js";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function canonicalForPath(routePath) {
  return routePath === "/" ? `${SITE.url}/` : `${SITE.url}${routePath}`;
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
  const heading = escapeAttr(seo.title.replace(/\s*\|\s*Goonya\s*$/, ""));

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
    )
    .replace(
      /<div class="seo-crawlable">\s*<h1>[\s\S]*?<\/h1>/,
      `<div class="seo-crawlable">\n      <h1>${heading}</h1>`
    )
    .replace(
      /<div class="seo-crawlable">[\s\S]*?<p>\s*([\s\S]*?)<\/p>/,
      (match, firstParagraph) =>
        match.replace(firstParagraph, description)
    );

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

console.log(`\nPrerendered SEO for ${Object.keys(routes).length} routes.`);
