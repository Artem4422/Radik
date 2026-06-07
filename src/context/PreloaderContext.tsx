import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const VISITED_KEY = "visited_juggler";

export const SPLASH_DURATION_MS = 4500;
export const FADE_DURATION_MS = 1500;

type PreloaderContextValue = {
  showSplash: boolean;
  isLoading: boolean;
  revealDelay: number;
  initForRoute: (pathname: string) => void;
  finishSplash: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

function shouldPlaySplash(): boolean {
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const isReload = nav?.type === "reload";
  const hasVisited = sessionStorage.getItem(VISITED_KEY);
  return !hasVisited || isReload;
}

function getInitialSplashState() {
  const onAbout = window.location.pathname === "/";
  const play = onAbout && shouldPlaySplash();
  if (play) {
    sessionStorage.setItem(VISITED_KEY, "1");
  }
  return {
    showSplash: play,
    isLoading: play,
    revealDelay: play ? 4700 : 500,
  };
}

const initial = getInitialSplashState();

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(initial.showSplash);
  const [isLoading, setIsLoading] = useState(initial.isLoading);
  const [revealDelay, setRevealDelay] = useState(initial.revealDelay);

  const initForRoute = useCallback((pathname: string) => {
    if (pathname !== "/") {
      setShowSplash(false);
      setIsLoading(false);
      setRevealDelay(500);
    }
  }, []);

  const finishSplash = useCallback(() => {
    setIsLoading(false);
    window.setTimeout(() => setShowSplash(false), FADE_DURATION_MS);
  }, []);

  const value = useMemo(
    () => ({
      showSplash,
      isLoading,
      revealDelay,
      initForRoute,
      finishSplash,
    }),
    [showSplash, isLoading, revealDelay, initForRoute, finishSplash],
  );

  return (
    <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) throw new Error("usePreloader must be used within PreloaderProvider");
  return ctx;
}
