import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";
import { PreloaderProvider } from "./context/PreloaderContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PreloaderProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </PreloaderProvider>
    </BrowserRouter>
  </StrictMode>,
);
