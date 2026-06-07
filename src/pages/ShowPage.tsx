import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PhotoBackground } from "@/components/VideoBackground";
import { AppleVideoPlayer } from "@/components/AppleVideoPlayer";
import { TranslatedHtml, useLanguage } from "@/i18n/LanguageContext";

export function ShowPage() {
  const { t } = useLanguage();

  return (
    <PageLayout pageId="show">
      <PhotoBackground src="/uploads/img-webp/show_bg.webp.jpg" />
      <div className="content-container">
        <div className="animate-in">
          <Link to="/event" className="btn-primary">
            {t("btn_buy_ticket")}
          </Link>
        </div>
        <TranslatedHtml translationKey="text_show" className="prose animate-in" />
        <AppleVideoPlayer
          src="/uploads/videos/regular/JG_PROMO_1.mp4"
          poster="/uploads/img-webp/poster_show.webp"
        />
        <div className="animate-in">
          <Link to="/poster" className="btn-glass">
            {t("btn_poster")}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
