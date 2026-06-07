import { PageLayout } from "@/components/PageLayout";
import { FooterStack } from "@/components/Footer";
import { MasonryGallery } from "@/components/MasonryGallery";
import { TranslatedHtml } from "@/i18n/LanguageContext";
import { galleryColumns } from "@/data/gallery";

export function GalleryPage() {
  const mobileVideoSrc = "/uploads/gallery-bg.mp4";

  return (
    <PageLayout
      pageId="gallery"
      footerSlot={
        <footer className="site-footer gallery-footer">
          <MasonryGallery columns={galleryColumns} />
          <FooterStack />
        </footer>
      }
    >
      <div className="page-bg page-bg--photo" style={{ backgroundColor: "#000" }} aria-hidden />
      <div className="page-overlay" style={{ background: "rgba(0, 0, 0, 0.6)" }} aria-hidden />
      <div className="content-container">
        <div className="gallery-intro animate-in">
          <video
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            className="mobile-video-bg"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden
          >
            <source src={mobileVideoSrc} type="video/mp4" />
          </video>
          <TranslatedHtml translationKey="text_gallery" className="prose" />
        </div>
      </div>
    </PageLayout>
  );
}
