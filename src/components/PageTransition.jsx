import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

function PageTransition({ children }) {
  const ref = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = ref.current;
    const ov = overlayRef.current;
    if (!el || !ov) return;

    // slide-in from bottom with overlay wipe
    const tl = gsap.timeline();
    tl.set(ov, { scaleY:1, transformOrigin:"top" })
      .set(el, { opacity:0, y:30 })
      .to(ov, { scaleY:0, duration:.5, ease:"power3.inOut", transformOrigin:"top" })
      .to(el, { opacity:1, y:0, duration:.5, ease:"power3.out", clearProps:"all" }, "-=.2");

    return () => tl.kill();
  }, [location.pathname]);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      {/* overlay wipe */}
      <div ref={overlayRef} style={{
        position:"fixed", inset:0, zIndex:9000,
        background:"#9b7cff",
        transformOrigin:"top",
        pointerEvents:"none",
      }}/>
      {children}
    </div>
  );
}

export default PageTransition;
