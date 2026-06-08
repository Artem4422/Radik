import { PageLayout } from "@/components/PageLayout";
import { FooterStack } from "@/components/Footer";
import { MasonryGallery } from "@/components/MasonryGallery";
import { SocialIcons } from "@/components/SocialIcons";
import { posterColumns } from "@/data/poster";

function PosterFooter() {
  return (
    <footer className="site-footer">
      <FooterStack showMeta />
    </footer>
  );
}

export function PosterPage() {
  return (
    <PageLayout pageId="poster" footerSlot={<PosterFooter />}>
      <div className="content-container animate-in">
        <MasonryGallery columns={posterColumns} eagerCount={9} enableLightbox={false} />
        <div className="poster-social">
          <SocialIcons spread />
        </div>
      </div>
    </PageLayout>
  );
}
