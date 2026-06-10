import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

function measureFooterRightsWidth(el: HTMLElement) {
  const prevWidth = el.style.width;
  const prevDisplay = el.style.display;
  const prevMaxWidth = el.style.maxWidth;

  el.style.setProperty("width", "auto", "important");
  el.style.setProperty("display", "inline-block", "important");
  el.style.setProperty("max-width", "none", "important");

  const width = Math.ceil(el.getBoundingClientRect().width);

  el.style.width = prevWidth;
  el.style.display = prevDisplay;
  el.style.maxWidth = prevMaxWidth;

  return width;
}

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
        width = measureFooterRightsWidth(footerRights);
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
    const timer2 = window.setTimeout(sync, 400);

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
      window.clearTimeout(timer2);
      window.removeEventListener("resize", sync);
      observer.disconnect();
      document.documentElement.style.removeProperty("--social-icons-width");
    };
  }, [lang]);
}
