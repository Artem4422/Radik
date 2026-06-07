import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getBrowserLang,
  translations,
  type Lang,
  type PageId,
  type TranslationKey,
} from "./translations";

type LanguageContextValue = {
  lang: Lang;
  t: (key: TranslationKey) => string;
  setPageTitle: (pageId: PageId) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang] = useState<Lang>(getBrowserLang);
  const [pageId, setPageId] = useState<PageId>("index");

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] ?? key,
    [lang],
  );

  const setPageTitle = useCallback((id: PageId) => {
    setPageId(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    const titleKey = `doc_title_${pageId}` as TranslationKey;
    const title = translations[lang][titleKey];
    if (title) document.title = title;
  }, [lang, pageId]);

  const value = useMemo(
    () => ({ lang, t, setPageTitle }),
    [lang, t, setPageTitle],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function TranslatedHtml({
  translationKey,
  className,
}: {
  translationKey: TranslationKey;
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: t(translationKey) }}
    />
  );
}
