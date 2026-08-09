import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const location   = useLocation();

  useEffect(() => {
    const ov = overlayRef.current;
    if (!ov) return;

    // Only animate the overlay — NEVER touch content opacity
    gsap.fromTo(ov,
      { scaleY:1, transformOrigin:"top center" },
      { scaleY:0, duration:.5, ease:"power3.inOut", transformOrigin:"top center",
        onComplete: () => { ov.style.display = "none"; }
      }
    );
    ov.style.display = "block";

    return () => gsap.killTweensOf(ov);
  }, [location.pathname]);

  return (
    <>
      <div ref={overlayRef} style={{
        position:"fixed", inset:0, zIndex:8999,
        background:"linear-gradient(135deg, #9b7cff, #6b4cff)",
        display:"none", pointerEvents:"none",
      }}/>
      {/* content never touched by GSAP */}
      {children}
    </>
  );
}
