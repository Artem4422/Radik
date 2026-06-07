import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const navItems = [
  { to: "/", key: "nav_about" as const },
  { to: "/show", key: "nav_show" as const },
  { to: "/gallery", key: "nav_gallery" as const },
  { to: "/video", key: "nav_video" as const },
  { to: "/partners", key: "nav_partners" as const },
  { to: "/contact", key: "nav_contact" as const },
];

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className={`burger-btn${open ? " is-open" : ""}`}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
        <nav className={`nav-menu${open ? " is-open" : ""}`} id="nav-menu">
          <ul>
            {navItems.map(({ to, key }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                  onClick={close}
                >
                  {t(key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div
        className={`nav-overlay${open ? " is-visible" : ""}`}
        onClick={close}
        aria-hidden
      />
    </>
  );
}
