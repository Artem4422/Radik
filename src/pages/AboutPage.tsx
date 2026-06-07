import { PageLayout } from "@/components/PageLayout";
import { VideoBackground } from "@/components/VideoBackground";
import { TranslatedHtml } from "@/i18n/LanguageContext";

export function AboutPage() {
  return (
    <PageLayout pageId="index" centerMain>
      <VideoBackground src="/uploads/videos/0404.mp4" waitForSplash />
      <div className="page-overlay" aria-hidden />
      <div className="content-container">
        <div className="hero-text">
          <TranslatedHtml translationKey="text_index" className="prose animate-in" />
        </div>
      </div>
    </PageLayout>
  );
}
