export type GalleryImage = {
  src: string;
  alt: string;
};

const alts: Record<number, string> = {
  1: "разные настроения",
  2: "предсказание",
  3: "искаженная реальность",
  4: "добрый волшебник",
  5: "вот так отдыхаем",
  6: "человек дождя",
  7: "выбор зрителя",
  8: "волшебная палочка",
  9: "хруст в спине",
  10: "мечта скупца",
  11: "цитаты",
  12: "баланс на пике",
  13: "исчезновение",
  14: "мобильные приложения",
  15: "тест на внимательность",
  16: "смотри в камеру",
  17: "классика жанра",
  18: "баланс",
  19: "левитация",
  20: "не играйте с нами",
  21: "фортуна",
  22: "медитация",
  23: "прямое попадание",
  24: "ловкач",
  25: "руки быстрее глаз",
  26: "большой черный ящик",
  27: "самый быстрый трюк",
  28: "человек дождя",
  29: "выбор зрителя",
  30: "все дело в динамите",
  31: "грустный взгляд на яркую работу",
  32: "проект «иллюзионисты»",
  33: "престиж",
  34: "три части руки",
  35: "два волшебника",
};

/** Распределение как в старом gallery.html: 9 + 14 + 12 */
const columnSizes = [9, 14, 12];

export function buildGalleryColumns(): GalleryImage[][] {
  const images: GalleryImage[] = Array.from({ length: 35 }, (_, i) => {
    const n = i + 1;
    return {
      src: `/uploads/img-webp/${n}.webp`,
      alt: alts[n] ?? `Фото ${n}`,
    };
  });

  const columns: GalleryImage[][] = [[], [], []];
  let offset = 0;
  columnSizes.forEach((size, col) => {
    columns[col] = images.slice(offset, offset + size);
    offset += size;
  });
  return columns;
}

export const galleryColumns = buildGalleryColumns();
export const allGalleryImages = galleryColumns.flat();
