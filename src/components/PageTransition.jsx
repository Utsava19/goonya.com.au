import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const location   = useLocation();

  useEffect(() => {
    const ov = overlayRef.current;
    const ct = contentRef.current;
    if (!ov || !ct) return;

    // wipe in from top, then reveal content
    const tl = gsap.timeline();
    tl.set(ov, { scaleY:1, transformOrigin:"top center", display:"block" })
      .set(ct, { opacity:0, y:20 })
      .to(ov, { scaleY:0, duration:.55, ease:"power3.inOut", transformOrigin:"top center" })
      .to(ct, { opacity:1, y:0, duration:.5, ease:"power2.out", clearProps:"all" }, "-=.25")
      .set(ov, { display:"none" }); // hide overlay after animation done

    return () => tl.kill();
  }, [location.pathname]);

  return (
    <>
      {/* overlay — hidden after animation, pointer-events none always */}
      <div ref={overlayRef} style={{
        position:"fixed", inset:0, zIndex:8999,
        background:"linear-gradient(135deg, #9b7cff, #6b4cff)",
        display:"none",
        pointerEvents:"none",
      }}/>
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
