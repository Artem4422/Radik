import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SPLASH_DURATION_MS, usePreloader } from "@/context/PreloaderContext";

export function Preloader() {
  const location = useLocation();
  const { showSplash, initForRoute, finishSplash } = usePreloader();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    initForRoute(location.pathname);
  }, [location.pathname, initForRoute]);

  useEffect(() => {
    if (!showSplash) {
      setFadeOut(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setFadeOut(true);
      finishSplash();
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [showSplash, finishSplash]);

  if (!showSplash && !fadeOut) return null;

  return (
    <div id="preloader" className={fadeOut ? "fade-out" : undefined}>
      <div className="preloader-logo">
        <img src="/icon/logo-new.svg" alt="JUGGLER Logo" fetchPriority="high" />
      </div>
    </div>
  );
}
