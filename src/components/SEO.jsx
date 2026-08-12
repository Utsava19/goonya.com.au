import { useEffect } from "react";

const BASE_URL = "https://goonya.com.au";

const SEO_DATA = {
  "/": {
    title: "Goonya | Websites, Marketing & AI Automation",
    description:
      "Goonya helps Australian small businesses grow with professional websites, digital marketing, social media, local SEO and AI automation.",
  },

  "/about": {
    title: "About Goonya | Digital Growth for Small Business",
    description:
      "Learn about Goonya and how we help Australian small businesses build a stronger online presence through websites, marketing and automation.",
  },

  "/services": {
    title: "Digital Marketing & Business Services | Goonya",
    description:
      "Explore Goonya's website design, digital marketing, social media, local SEO and AI automation services for Australian small businesses.",
  },

  "/packages": {
    title: "Goonya Packages | Websites & Digital Marketing",
    description:
      "Explore Goonya's digital marketing, social media and website packages designed for Australian small businesses.",
  },

  "/our-work": {
    title: "Our Work | Goonya",
    description:
      "Explore websites, marketing projects and digital solutions created by Goonya for Australian small businesses.",
  },

  "/contact": {
    title: "Contact Goonya | Let's Grow Your Business",
    description:
      "Ready to improve your business online? Contact Goonya for websites, marketing, social media and AI automation solutions.",
  },

  "/privacy": {
    title: "Privacy Policy | Goonya",
    description:
      "Read the Goonya privacy policy.",
  },

  "/terms": {
    title: "Terms & Conditions | Goonya",
    description:
      "Read the Goonya terms and conditions.",
  },
};

export default function SEO({ path }) {
  const data =
    SEO_DATA[path] || {
      title: "Goonya | Digital Growth for Small Business",
      description:
        "Goonya helps Australian small businesses grow through websites, marketing and AI automation.",
    };

  const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;

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
      let element = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("description", data.description);

    setProperty("og:title", data.title);
    setProperty("og:description", data.description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:type", "website");
    setProperty("og:site_name", "Goonya");

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [data.title, data.description, canonicalUrl]);

  return null;
}
