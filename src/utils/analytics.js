const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let loaded = false;

export function initAnalytics() {
  if (!GA_ID || loaded || typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    loaded = true;
    return;
  }
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
