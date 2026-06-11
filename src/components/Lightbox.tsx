import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const image = images[index];
  const scrollYRef = useRef(0);

  useEffect(() => {
    const frozenH = window.innerHeight;
    document.documentElement.style.setProperty("--lightbox-height", `${frozenH}px`);
    scrollYRef.current = window.scrollY;
    document.body.classList.add("lightbox-open");
    document.body.style.top = `-${scrollYRef.current}px`;

    const blockScroll = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    };

    document.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.removeProperty("--lightbox-height");
      document.body.classList.remove("lightbox-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
      document.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onChange, onClose]);

  if (!image) return null;

  const showPrev = () => onChange((index - 1 + images.length) % images.length);
  const showNext = () => onChange((index + 1) % images.length);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const width = e.currentTarget.offsetWidth;
    const x = e.nativeEvent.offsetX;
    if (x > width * 0.7) showNext();
    else if (x < width * 0.3) showPrev();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = Number(e.currentTarget.dataset.touchStartX ?? "0");
    const endX = e.changedTouches[0]?.screenX ?? startX;
    const threshold = 50;
    if (endX < startX - threshold) showNext();
    if (endX > startX + threshold) showPrev();
  };

  return createPortal(
    <div
      className="lightbox is-open"
      role="dialog"
      aria-modal
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Закрыть">
        &times;
      </button>
      <button type="button" className="lightbox-prev" onClick={showPrev} aria-label="Предыдущее">
        &#10094;
      </button>
      <button type="button" className="lightbox-next" onClick={showNext} aria-label="Следующее">
        &#10095;
      </button>
      <div
        className="lightbox-content"
        onClick={handleContentClick}
        onTouchStart={(e) => {
          e.currentTarget.dataset.touchStartX = String(e.changedTouches[0]?.screenX ?? 0);
        }}
        onTouchEnd={handleTouchEnd}
      >
        <img src={image.src} alt={image.alt} />
        <p className="lightbox-caption">{image.alt}</p>
      </div>
    </div>,
    document.body,
  );
}
