"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const ITEMS = [
  {
    date: "11 сентября",
    datetime: "2026-09-11",
    title: ["Первый визит в сентябре —", "поддерживающая уборка", "на особых условиях"],
    src: "/images/savin-housekeeping.webp",
    alt: "Светлый интерьер резиденции после поддерживающей уборки",
  },
  {
    date: "8 сентября",
    datetime: "2026-09-08",
    title: ["Как мы готовим квартиру", "к возвращению после августа"],
    src: "/images/atmosphere-evening.webp",
    alt: "Вечерняя гостиная, подготовленная к возвращению",
  },
  {
    date: "2 сентября",
    datetime: "2026-09-02",
    title: ["Осенний уход за панорамным", "остеклением и деликатным камнем"],
    src: "/images/care-window.webp",
    alt: "Панорамное остекление частной резиденции",
  },
  {
    date: "28 августа",
    datetime: "2026-08-28",
    title: ["Генеральная уборка перед", "началом осеннего сезона"],
    src: "/images/standard-care.webp",
    alt: "Точная работа с поверхностями натурального камня",
  },
  {
    date: "21 августа",
    datetime: "2026-08-21",
    title: ["Бережный уход за кухней", "и встроенной техникой"],
    src: "/images/care-kitchen.webp",
    alt: "Безупречно подготовленная кухня частной резиденции",
  },
  {
    date: "14 августа",
    datetime: "2026-08-14",
    title: ["Как мы работаем с натуральным", "камнем, деревом и текстилем"],
    src: "/images/savin-materials.webp",
    alt: "Травертин, дерево и текстиль в частном интерьере",
  },
] as const;

export default function News() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = [...grid.querySelectorAll<HTMLElement>(".news-item")];
    const weights = [1, 0.5, 0];
    const amplitude = 168;
    let frame = 0;

    const align = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        items.forEach((item) => {
          const shot = item.querySelector<HTMLElement>(".news-shot");
          if (!shot) return;
          shot.style.setProperty("--news-gap", "80px");
          shot.style.removeProperty("transform");
        });
        return;
      }

      const vh = window.innerHeight;
      const mid = vh * 0.5;
      const mobile = window.innerWidth <= 900;

      if (mobile) {
        items.forEach((item) => {
          const shot = item.querySelector<HTMLElement>(".news-shot");
          const title = item.querySelector<HTMLElement>("h3");
          if (!shot || !title) return;
          const t = Math.max(0, Math.min(1, (title.getBoundingClientRect().top - mid) / (vh * 0.55)));
          shot.style.setProperty("--news-gap", `${36 + t * 12}px`);
          shot.style.transform = `translate3d(0, ${t * 16}px, 0)`;
        });
        return;
      }

      for (let i = 0; i < items.length; i += 3) {
        const row = items.slice(i, i + 3);
        const rowY = row.reduce((sum, item) => {
          const title = item.querySelector<HTMLElement>("h3");
          return sum + (title?.getBoundingClientRect().top ?? 0);
        }, 0) / row.length;
        const t = Math.max(0, Math.min(1, (rowY - mid) / (vh * 0.55)));
        const gap = 80 + t * 20;
        row.forEach((item, col) => {
          const shot = item.querySelector<HTMLElement>(".news-shot");
          if (!shot) return;
          shot.style.setProperty("--news-gap", `${gap}px`);
          shot.style.transform = `translate3d(0, ${t * amplitude * weights[col]}px, 0)`;
        });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(align);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    align();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="news" id="news" aria-labelledby="news-title">
      <div className="shell">
        <div className="news-head" data-reveal data-reveal-stagger>
          <h2 id="news-title">
            Свежие
            <br />
            новости
          </h2>
          <p className="news-lead">
            Акции сервиса и короткие заметки о том, как мы сохраняем порядок в частных интерьерах — от сезонного ухода до работы с деликатными материалами.
          </p>
        </div>
        <div className="news-grid" ref={gridRef} data-reveal>
          {ITEMS.map((item) => (
            <article key={item.datetime} className="news-item">
              <time dateTime={item.datetime}>{item.date}</time>
              <h3 className="news-item-title">
                {item.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <figure className="news-shot">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
