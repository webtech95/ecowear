import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop – resets scroll position on every route change.
 * Uses Lenis's smooth scroll if available, otherwise falls back to native.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis instance is typically stored on window (we attached it in MainLayout)
    const lenis = window.__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      // Use Lenis for buttery‑smooth scroll to top
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for environments without Lenis
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;