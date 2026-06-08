import { useEffect } from "react";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const image = images[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onChange, onClose]);

  if (!image) return null;

  return (
    <div className="lightbox is-open" role="dialog" aria-modal>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Закрыть">
        &times;
      </button>
      <button
        type="button"
        className="lightbox-prev"
        onClick={() => onChange((index - 1 + images.length) % images.length)}
        aria-label="Предыдущее"
      >
        &#10094;
      </button>
      <button
        type="button"
        className="lightbox-next"
        onClick={() => onChange((index + 1) % images.length)}
        aria-label="Следующее"
      >
        &#10095;
      </button>
      <div className="lightbox-content">
        <img src={image.src} alt={image.alt} />
        <p className="lightbox-caption">{image.alt}</p>
      </div>
    </div>
  );
}
