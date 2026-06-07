import { useState } from "react";

import { PageLayout } from "@/components/PageLayout";

import { SocialIcons } from "@/components/SocialIcons";

import { PdfViewerModal } from "@/components/PdfViewerModal";

import { partnerPdfs, type PartnerPdf } from "@/data/partners";

import { useLanguage } from "@/i18n/LanguageContext";



export function PartnersPage() {

  const { t } = useLanguage();

  const [pdf, setPdf] = useState<PartnerPdf | null>(null);



  return (

    <PageLayout pageId="partners" mainClassName="partners-main">

      <div className="page-bg page-bg--photo" style={{ backgroundColor: "#000" }} aria-hidden />

      <div className="page-overlay" aria-hidden />

      <div className="partners-content animate-in">

        <div className="partners-header">

          <h1 className="partners-title">{t("nav_partners")}</h1>

        </div>



        <div className="partners-list-wrapper">

          <div className="partners-list">

            {partnerPdfs.map((item) => (

              <div key={item.id} className="partner-item">

                <button type="button" className="btn-primary partner-btn" onClick={() => setPdf(item)}>

                  {t("partner_view")}

                </button>

                <span className="partner-desc">{item.label}</span>

              </div>

            ))}

          </div>

        </div>



        <div className="partners-social">

          <SocialIcons spread />

        </div>

      </div>

      <PdfViewerModal doc={pdf} onClose={() => setPdf(null)} />

    </PageLayout>

  );

}

