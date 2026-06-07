import { PageLayout } from "@/components/PageLayout";
import { FooterStack } from "@/components/Footer";
import { SocialIcons } from "@/components/SocialIcons";

const TICKET_WIDGET_SRC = "";

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

        {TICKET_WIDGET_SRC ? (
          <iframe
            title="Ticket widget"
            className="ticket-widget-frame"
            src={TICKET_WIDGET_SRC}
            loading="lazy"
          />
        ) : (
          <div className="ticket-widget-placeholder" role="status" aria-live="polite">
            Виджет продажи билетов появится здесь.
          </div>
        )}

        <SocialIcons spread />
      </div>
    </PageLayout>
  );
}
