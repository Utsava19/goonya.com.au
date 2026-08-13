import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { runServerGrowthAudit } from "./api/lib/growthAudit.mjs";
import { META_DESCRIPTION, SOCIAL, SITE, localBusinessJsonLd, primaryNavListHtml } from "./src/data/siteMeta.js";

function growthAuditApiPlugin() {
  return {
    name: "growth-audit-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/growth-audit" && !req.url?.startsWith("/api/growth-audit?")) {
          return next();
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          return res.end();
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ error: "Method not allowed" }));
        }

        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body || "{}");
            const { business, website, suburb, industry } = parsed;

            if (!business?.trim() || !suburb?.trim() || !industry?.trim()) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Business name, suburb and industry are required." }));
            }

            const result = await runServerGrowthAudit({
              business: business.trim(),
              website: (website || "").trim(),
              suburb: suburb.trim(),
              industry: industry.trim(),
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error("growth-audit dev error:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Audit failed. Please try again." }));
          }
        });
      });
    },
  };
}

function seoAnalyticsPlugin() {
  return {
    name: "seo-analytics-inject",
    transformIndexHtml(html) {
      const gtmId = process.env.VITE_GTM_ID;
      const gaId = process.env.VITE_GA_MEASUREMENT_ID;
      let analyticsInjection = "";

      if (gtmId) {
        analyticsInjection = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>`;
      } else if (gaId) {
        analyticsInjection = `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false});</script>`;
      }

      const jsonLd = JSON.stringify(localBusinessJsonLd(), null, 2);
      const socialHtml = `<a href="${SOCIAL.facebook}">Facebook</a> · <a href="${SOCIAL.instagram}">Instagram</a> · <a href="${SITE.mapsUrl}">Google Maps</a>`;

      return html
        .replace("<!-- GTM_INJECT -->", analyticsInjection)
        .replaceAll("<!-- META_DESCRIPTION -->", META_DESCRIPTION)
        .replace("<!-- LOCAL_BUSINESS_JSON -->", jsonLd)
        .replace("<!-- SOCIAL_LINKS_HTML -->", socialHtml)
        .replace("<!-- PRIMARY_NAV_HTML -->", primaryNavListHtml());
    },
  };
}

export default defineConfig({
  plugins: [react(), growthAuditApiPlugin(), seoAnalyticsPlugin()],
});
