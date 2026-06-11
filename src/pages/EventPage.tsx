import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { SocialIcons } from "@/components/SocialIcons";
import { FooterStack } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const events = [
  { city: "Новороссийск", date: "23.07.26", long: true },
  { city: "Анапа", date: "16.08.26" },
  { city: "Ростов-на-Дону", date: "10.26", long: true },
  { city: "Краснодар", date: "11.26" },
  { city: "Астрахань", date: "11.26" },
  { city: "Сочи", date: "01.27" },
  { city: "Москва", date: "09.2027" },
];

function EventFooter() {
  return (
    <footer className="site-footer">
      <FooterStack showMeta />
    </footer>
  );
}

export function EventPage() {
  const { t } = useLanguage();

  return (
    <PageLayout pageId="event" centerMain footerSlot={<EventFooter />}>
      <div className="content-container event-container animate-in">
        <div className="event-poster-wrapper">
          <img
            className="event-poster-img"
            src="/uploads/img-webp/afisha.png"
            alt="Афиша"
            loading="eager"
          />
        </div>
        <div className="event-actions-row">
          {events.map((ev) => (
            <div key={`${ev.city}-${ev.date}`} className="event-action-item">
              <span className={`event-city${ev.long ? " city-long" : ""}`}>{ev.city}</span>
              <span className="event-date">{ev.date}</span>
              <Link to="/ticket" className="btn-primary">
                {t("btn_buy_ticket")}
              </Link>
            </div>
          ))}
        </div>
        <SocialIcons spread className="event-social" />
      </div>
    </PageLayout>
  );
}
