import { PageLayout } from "@/components/PageLayout";
import { VideoBackground } from "@/components/VideoBackground";
import { AppleVideoPlayer } from "@/components/AppleVideoPlayer";
import { TranslatedHtml } from "@/i18n/LanguageContext";

const videos = [
  {
    src: "/uploads/videos/regular/JG_PROMO_1.mp4",
    poster: "/uploads/img-webp/poster2.png",
  },
  {
    src: "/uploads/videos/regular/promo-juggler-2019.mp4",
    poster: "/uploads/img-webp/poster1.png",
  },
  {
    src: "/uploads/videos/regular/0323.mp4",
    poster: "/uploads/img-webp/poster3.jpg",
  },
];

export function VideoPage() {
  return (
    <PageLayout pageId="video">
      <VideoBackground src="/uploads/videos/background/402.mp4" />
      <div className="page-overlay" aria-hidden />
      <div className="content-container">
        <TranslatedHtml translationKey="text_video" className="prose animate-in" />
        <div className="video-grid animate-in">
          {videos.map((v) => (
            <AppleVideoPlayer key={v.src} src={v.src} poster={v.poster} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
