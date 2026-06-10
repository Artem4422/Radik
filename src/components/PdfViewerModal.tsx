import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { PartnerPdf } from "@/data/partners";



type PdfViewerModalProps = {

  doc: PartnerPdf | null;

  onClose: () => void;

};



export function PdfViewerModal({ doc, onClose }: PdfViewerModalProps) {

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);



  const totalPages = doc?.totalPages ?? 1;



  const goPrev = useCallback(() => {

    setPage((current) => {

      if (current <= 1) return current;

      setLoading(true);

      setError(false);

      return current - 1;

    });

  }, []);



  const goNext = useCallback(() => {

    setPage((current) => {

      if (!doc || current >= doc.totalPages) return current;

      setLoading(true);

      setError(false);

      return current + 1;

    });

  }, [doc]);



  useEffect(() => {

    if (!doc) return;

    setPage(1);

    setLoading(true);

    setError(false);

  }, [doc]);



  useEffect(() => {

    if (!doc) return;



    const preload = (num: number) => {

      if (num < 1 || num > doc.totalPages) return;

      const img = new Image();

      img.src = `${doc.imagesDir}/${num}.webp`;

    };



    preload(page + 1);

    preload(page - 1);

  }, [doc, page]);



  useEffect(() => {

    if (!doc) return;



    const onKey = (e: KeyboardEvent) => {

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft") goPrev();

      if (e.key === "ArrowRight") goNext();

    };



    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {

      document.body.style.overflow = "";

      window.removeEventListener("keydown", onKey);

    };

  }, [doc, onClose, goPrev, goNext]);



  if (!doc) return null;



  const imageSrc = `${doc.imagesDir}/${page}.webp`;



  return createPortal(

    <div className="pdf-modal active" role="dialog" aria-modal aria-label={doc.label}>

      <div className="pdf-modal-overlay" onClick={onClose} aria-hidden />

      <div className="pdf-modal-container">

        <div className="pdf-modal-header">

          <span className="pdf-modal-title">{doc.label}</span>

          <div className="pdf-modal-actions">

            <a href={doc.pdfUrl} download className="pdf-action-btn pdf-download">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>

                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                <polyline points="7 10 12 15 17 10" />

                <line x1="12" y1="15" x2="12" y2="3" />

              </svg>

              Скачать

            </a>

            <button type="button" className="pdf-action-btn pdf-close" onClick={onClose} aria-label="Закрыть">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>

                <line x1="18" y1="6" x2="6" y2="18" />

                <line x1="6" y1="6" x2="18" y2="18" />

              </svg>

            </button>

          </div>

        </div>



        <div className="pdf-modal-body">

          {loading && !error && (

            <div className="pdf-loading">

              <div className="pdf-spinner" />

              <p>Загрузка документа...</p>

            </div>

          )}



          {error && (

            <div className="pdf-error">

              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" aria-hidden>

                <circle cx="12" cy="12" r="10" />

                <line x1="12" y1="8" x2="12" y2="12" />

                <line x1="12" y1="16" x2="12.01" y2="16" />

              </svg>

              <p>

                Не удалось загрузить PDF.

                <br />

                Вы можете{" "}

                <a href={doc.pdfUrl} download>

                  скачать его напрямую

                </a>

                .

              </p>

            </div>

          )}



          {!error && (

            <div className="pdf-canvas-container" style={{ display: loading ? "none" : "block" }}>

              <img

                key={imageSrc}

                src={imageSrc}

                alt={`${doc.label} — страница ${page}`}

                onLoad={() => setLoading(false)}

                onError={() => {

                  setLoading(false);

                  setError(true);

                }}

              />

            </div>

          )}

        </div>



        {totalPages > 1 && !error && (

          <div className="pdf-modal-footer">

            <button

              type="button"

              className="pdf-nav-btn"

              onClick={goPrev}

              disabled={page <= 1}

              aria-label="Предыдущая страница"

            >

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>

                <polyline points="15 18 9 12 15 6" />

              </svg>

            </button>

            <span className="pdf-page-info">

              {page} / {totalPages}

            </span>

            <button

              type="button"

              className="pdf-nav-btn"

              onClick={goNext}

              disabled={page >= totalPages}

              aria-label="Следующая страница"

            >

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>

                <polyline points="9 18 15 12 9 6" />

              </svg>

            </button>

          </div>

        )}

      </div>

    </div>,

    document.body,

  );

}

