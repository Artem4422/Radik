import { useEffect } from "react";

export function useReveal(delay = 500, stagger = 200) {
  useEffect(() => {
    document.querySelectorAll(".animate-in").forEach((el) => el.classList.remove("reveal"));

    const timer = window.setTimeout(() => {
      document.querySelectorAll(".animate-in:not(.reveal)").forEach((el, index) => {
        window.setTimeout(() => el.classList.add("reveal"), index * stagger);
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [delay, stagger]);
}
