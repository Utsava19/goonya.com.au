import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = typeof value === "string" ? parseFloat(value) : value;
    const isFloat = String(value).includes(".");

    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        setDisplay(isFloat ? val.toFixed(1) : Math.round(val));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(isFloat ? String(value) : Math.round(target));
      };

      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={`site-stat-counter${display !== null ? " is-live" : ""}`}>
      {display !== null ? (
        <>
          <span className="site-stat-num">{display}</span>
          {suffix && <span className="site-stat-suffix">{suffix}</span>}
        </>
      ) : (
        <span className="site-stat-placeholder" aria-hidden="true">&nbsp;</span>
      )}
    </span>
  );
}
