"use client";

import { useEffect, useState } from "react";
import { PAGE_NAV } from "./nav";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      <a className={`masthead-logo masthead-logo-fixed${scrolled ? " is-blend" : ""}`} href="#main" aria-label="Savin Cleaning / Главная">
        <img className="masthead-logo-mark" src="/LOGO.svg" alt="" />
      </a>
      <header className={`masthead${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
        <div className="masthead-bar">
          <span className="masthead-logo-slot" aria-hidden="true" />
          <nav className="masthead-nav" aria-label="Основная навигация">
            {PAGE_NAV.map((item) => (
              <a key={item.href} className="masthead-pill" href={item.href}>
                {item.label}
              </a>
            ))}
            <button
              className="masthead-pill masthead-icon masthead-burger"
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </nav>
        </div>

        <div className="masthead-menu" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
          <div className="masthead-menu-inner" onClick={(event) => event.stopPropagation()}>
            <p className="masthead-menu-kicker">Savin Cleaning</p>
            <nav aria-label="Меню">
              {PAGE_NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
