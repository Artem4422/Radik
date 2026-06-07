export type PartnerPdf = {
  id: string;
  label: string;
  pdfUrl: string;
  imagesDir: string;
  totalPages: number;
};

export const partnerPdfs: PartnerPdf[] = [
  {
    id: "grand",
    label: "ГРАНД ШОУ НОВЫЙ ГОД",
    pdfUrl: "/uploads/pdf/Гранд ШОУ.pdf",
    imagesDir: "/uploads/pdf-images/Гранд ШОУ",
    totalPages: 7,
  },
  {
    id: "rider",
    label: "РАЙДЕР JUGGLER",
    pdfUrl: "/uploads/pdf/raider.pdf",
    imagesDir: "/uploads/pdf-images/raider",
    totalPages: 5,
  },
  {
    id: "show2025",
    label: "ШОУ МАЛЫХ И БОЛЬШИХ ФОРМ",
    pdfUrl: "/uploads/pdf/Juggler Show 2025.pdf",
    imagesDir: "/uploads/pdf-images/Juggler Show 2025",
    totalPages: 6,
  },
  {
    id: "all-forms",
    label: "ШОУ ВСЕХ ФОРМ",
    pdfUrl: "/uploads/pdf/Шоу Juggler - все формы.pdf",
    imagesDir: "/uploads/pdf-images/Шоу Juggler - все формы",
    totalPages: 7,
  },
];
