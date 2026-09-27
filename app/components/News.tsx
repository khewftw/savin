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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = () => {
      const cols = window.matchMedia("(max-width: 900px)").matches ? 1 : 3;
      items.forEach((item, index) => {
        const step = reduce ? 0 : (cols === 1 ? index : index % cols);
        item.style.transitionDelay = `${step * 120}ms`;
        item.classList.add("is-in");
      });
    };

    if (reduce) {
      show();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      show();
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(grid);
    return () => observer.disconnect();
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
        <div className="news-grid" ref={gridRef}>
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
              <a className="news-item-link" href="#news">Читать подробнее →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
