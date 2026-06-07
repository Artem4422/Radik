import { useEffect } from "react";

export function useHeaderHeight() {
  useEffect(() => {
    const sync = () => {
      const header = document.querySelector(".site-header");
      if (!header) return;
      const h = Math.ceil(header.getBoundingClientRect().height);
      const isMobile = window.innerWidth <= 768;
      if (h > 0 && ((isMobile && h <= 80) || (!isMobile && h <= 120))) {
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }
    };

    sync();
    window.addEventListener("resize", sync);
    if (document.fonts?.ready) {
      document.fonts.ready.then(sync);
    }
    return () => window.removeEventListener("resize", sync);
  }, []);
}
