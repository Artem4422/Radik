import { Route, Routes } from "react-router-dom";
import { AboutPage } from "@/pages/AboutPage";
import { ShowPage } from "@/pages/ShowPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { VideoPage } from "@/pages/VideoPage";
import { ContactPage } from "@/pages/ContactPage";
import { PartnersPage } from "@/pages/PartnersPage";
import { EventPage } from "@/pages/EventPage";
import { PosterPage } from "@/pages/PosterPage";
import { TicketPage } from "@/pages/TicketPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
      <Route path="/show" element={<ShowPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/video" element={<VideoPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/poster" element={<PosterPage />} />
      <Route path="/ticket" element={<TicketPage />} />
    </Routes>
  );
}
