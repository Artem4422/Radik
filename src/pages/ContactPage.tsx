import { PageLayout } from "@/components/PageLayout";
import { FooterStack } from "@/components/Footer";
import { SocialIcons } from "@/components/SocialIcons";

function ContactFooter() {
  return (
    <footer className="site-footer contact-footer">
      <FooterStack showMeta />
    </footer>
  );
}

export function ContactPage() {
  return (
    <PageLayout pageId="contact" centerMain footerSlot={<ContactFooter />}>
      <div className="page-bg page-bg--photo" style={{ backgroundColor: "var(--bg-color)" }} aria-hidden />
      <div className="page-overlay" style={{ background: "rgba(0, 0, 0, 0.8)" }} aria-hidden />
      <div className="content-container animate-in">
        <div className="contact-logos">
          <img
            src="/icon/logo-new.svg"
            alt="JUGGLER SHOW"
            className="contact-logo-text"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="contact-info-new">
          <div className="contact-row-nowrap">
            <a href="mailto:info@jugglershow.com" className="contact-link">
              info@jugglershow.com
            </a>
            <span className="contact-sep" aria-hidden />
            <a href="tel:+79624430502" className="contact-link">
              +7 962 443 05 02
            </a>
          </div>
          <SocialIcons />
        </div>
      </div>
    </PageLayout>
  );
}
