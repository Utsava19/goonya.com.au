import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_OFFSET = 96;

function scrollToHash(hash, behavior = "smooth") {
  const id = hash.replace("#", "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior });
  return true;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let cancelled = false;
      let attempts = 0;

      const tryScroll = () => {
        if (cancelled) return;
        const found = scrollToHash(hash, attempts === 0 ? "smooth" : "instant");
        attempts += 1;
        if (!found && attempts < 3) {
          setTimeout(tryScroll, 250);
        }
      };

      tryScroll();
      return () => {
        cancelled = true;
      };
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
