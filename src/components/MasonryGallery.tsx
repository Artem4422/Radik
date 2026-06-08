import { useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import { Lightbox } from "./Lightbox";

type MasonryGalleryProps = {
  columns: GalleryImage[][];
  eagerCount?: number;
  enableLightbox?: boolean;
};

export function MasonryGallery({
  columns,
  eagerCount = 9,
  enableLightbox = true,
}: MasonryGalleryProps) {
  const flat = columns.flat();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  let globalIndex = 0;

  return (
    <>
      <div className="masonry-collage animate-in">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="masonry-column">
            {column.map((img) => {
              const idx = globalIndex++;
              const eager = idx < eagerCount;
              return (
                <div
                  key={img.src}
                  className="grid-item"
                  onClick={() => enableLightbox && setLightboxIndex(idx)}
                  onKeyDown={(e) => e.key === "Enter" && enableLightbox && setLightboxIndex(idx)}
                  role={enableLightbox ? "button" : undefined}
                  tabIndex={enableLightbox ? 0 : -1}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={eager ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={idx === 0 ? "high" : undefined}
                    sizes="(max-width: 768px) 33vw, 22vw"
                    onError={(event) => {
                      event.currentTarget.classList.add("is-broken");
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {enableLightbox && lightboxIndex !== null && (
        <Lightbox
          images={flat}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  );
}
