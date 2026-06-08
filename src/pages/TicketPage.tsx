import { PageLayout } from "@/components/PageLayout";
import { FooterStack } from "@/components/Footer";
import { SocialIcons } from "@/components/SocialIcons";

function TicketFooter() {
  return (
    <footer className="site-footer">
      <FooterStack showMeta showDesc={false} />
    </footer>
  );
}

export function TicketPage() {
  return (
    <PageLayout pageId="ticket" centerMain mainClassName="ticket-main" footerSlot={<TicketFooter />}>
      <div className="content-container ticket-container animate-in">
        <div className="ticket-message">
          <h1 className="ticket-title">ПРОДАЖА</h1>
          <p className="ticket-subtitle">ЕЩЕ НЕ ОТКРЫТА</p>
        </div>

        <SocialIcons spread />
      </div>
    </PageLayout>
  );
}
