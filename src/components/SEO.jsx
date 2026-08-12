import { useEffect, useMemo } from "react";
import { CASE_STUDIES } from "../data/caseStudies";
import { PAGE_SEO, SITE } from "../data/siteMeta";

const DEFAULT_SEO = {
  title: "Goonya | Digital Growth for Small Business",
  description:
    "Goonya helps Australian small businesses grow through websites, marketing and AI automation.",
};

function buildSeoMap() {
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

const SEO_DATA = buildSeoMap();

function resolveSeo(path) {
  return SEO_DATA[path] || DEFAULT_SEO;
}

function canonicalUrl(path) {
  return `${SITE.url}${path === "/" ? "" : path}`;
}

export default function SEO({ path }) {
  const data = useMemo(() => resolveSeo(path), [path]);
  const url = useMemo(() => canonicalUrl(path), [path]);

  useEffect(() => {
    document.title = data.title;

    const setMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setProperty = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("description", data.description);
    setMeta("twitter:title", data.title);
    setMeta("twitter:description", data.description);
    setMeta("twitter:image", `${SITE.url}/logo.png`);

    setProperty("og:title", data.title);
    setProperty("og:description", data.description);
    setProperty("og:url", url);
    setProperty("og:type", "website");
    setProperty("og:site_name", SITE.name);
    setProperty("og:image", `${SITE.url}/logo.png`);
    setProperty("og:locale", "en_AU");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [data.title, data.description, url]);

  return null;
}
