import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePreloader } from "@/context/PreloaderContext";
import type { PageId } from "@/i18n/translations";

type PageLayoutProps = {
  pageId: PageId;
  className?: string;
  mainClassName?: string;
  footerClassName?: string;
  centerMain?: boolean;
  children: ReactNode;
  footerSlot?: ReactNode;
};

export function PageLayout({
  pageId,
  className = "",
  mainClassName = "",
  footerClassName,
  centerMain = false,
  children,
  footerSlot,
}: PageLayoutProps) {
  const { setPageTitle } = useLanguage();
  const { isLoading, revealDelay } = usePreloader();
  useHeaderHeight();
  useReveal(pageId === "index" ? revealDelay : 100);

  const pageModifier = pageId === "index" ? "about" : pageId;
  const bodyClass = `page-${pageModifier}`;

  useEffect(() => {
    setPageTitle(pageId);
    document.body.className = isLoading ? `${bodyClass} loading-active` : bodyClass;
    return () => {
      document.body.className = "";
    };
  }, [pageId, setPageTitle, bodyClass, isLoading]);

  const pageClasses = [
    "page",
    `page--${pageModifier}`,
    centerMain ? "page--center-main" : "page--stack-main",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={pageClasses}>
      <Preloader />
      <Header />
      <main className={`page__main ${mainClassName}`.trim()}>{children}</main>
      {footerSlot ?? <Footer className={footerClassName} />}
    </div>
  );
}
