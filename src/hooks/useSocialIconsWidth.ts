import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export function useSocialIconsWidth() {
  const { lang } = useLanguage();

  useEffect(() => {
    const sync = () => {
      const socialContainers = document.querySelectorAll<HTMLElement>(".contact-social-icons");
      if (!socialContainers.length) {
        document.documentElement.style.removeProperty("--social-icons-width");
        return;
      }

      const isMobile = window.innerWidth <= 768;
      const footerRights = document.querySelector<HTMLElement>(".footer-rights");
      const navMenu = document.querySelector<HTMLElement>(".nav-menu ul");

      let width = 0;

      if (isMobile && footerRights) {
        width = Math.ceil(footerRights.getBoundingClientRect().width);
      } else if (!isMobile && navMenu) {
        width = Math.ceil(navMenu.getBoundingClientRect().width);
      }

      if (width > 0) {
        document.documentElement.style.setProperty("--social-icons-width", `${width}px`);
      } else {
        document.documentElement.style.removeProperty("--social-icons-width");
      }
    };

    sync();
    const raf = requestAnimationFrame(sync);
    const timer = window.setTimeout(sync, 120);

    window.addEventListener("resize", sync);
    document.fonts?.ready.then(sync);

    const observer = new ResizeObserver(sync);
    const footerRights = document.querySelector(".footer-rights");
    const navMenu = document.querySelector(".nav-menu ul");
    if (footerRights) observer.observe(footerRights);
    if (navMenu) observer.observe(navMenu);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("resize", sync);
      observer.disconnect();
      document.documentElement.style.removeProperty("--social-icons-width");
    };
  }, [lang]);
}
