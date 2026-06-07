import { useLanguage } from "@/i18n/LanguageContext";

export function FooterStack({
  showMeta = false,
  showDesc = true,
}: {
  showMeta?: boolean;
  showDesc?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className="footer-text-stack">
      {showDesc && <span className="disclaimer-line">{t("footer_juggler_desc")}</span>}
      {showMeta && <span className="disclaimer-line">{t("footer_meta")}</span>}
      <p className="footer-rights">{t("footer_rights")}</p>
    </div>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={className ?? "site-footer"}>
      <FooterStack />
    </footer>
  );
}
