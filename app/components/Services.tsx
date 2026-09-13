"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { openBooking } from "../lib/booking";

const TARIFFS = [
  {
    id: "maintain",
    category: "Регулярный ритм",
    title: "Поддерживающая уборка",
    duration: "от 3 часов",
    text: "Чтобы чистота не была событием. Приходим в ваш график и оставляем квартиру в том виде, в каком вы хотите её застать.",
    src: "/images/savin-housekeeping.webp",
  },
  {
    id: "general",
    category: "Глубокая работа с деталями",
    title: "Генеральная уборка",
    duration: "от 6 часов",
    text: "Проходим то, что обычно остаётся за кадром: сложные зоны, скрытые поверхности, ощущение «как в первый день».",
    src: "/images/standard-care.webp",
  },
  {
    id: "renovation",
    category: "Дом снова становится домом",
    title: "После ремонта",
    duration: "от 8 часов",
    text: "Пыль, следы отделки, запах работ. Убираем процесс, чтобы можно было жить, а не обживать стройку.",
    src: "/images/standard-stone.webp",
  },
  {
    id: "special",
    category: "Окна, техника, текстиль",
    title: "Особый запрос",
    duration: "по запросу",
    text: "Задача, которая не вписывается в визит. Формулируете одно — забираем целиком.",
    src: "/images/care-kitchen.webp",
  },
] as const;

const CATALOG = [
  { title: "Химчистка дивана", price: "от 8 000 ₽" },
  { title: "Химчистка кресел", price: "от 4 500 ₽" },
  { title: "Химчистка матраса", price: "от 6 000 ₽" },
  { title: "Химчистка ковра", price: "от 5 000 ₽" },
  { title: "Химчистка штор", price: "от 4 000 ₽" },
  { title: "Химчистка одежды", price: "от 1 500 ₽" },
  { title: "Глажка и уход за текстилем", price: "от 2 000 ₽" },
  { title: "Смена постельного белья", price: "от 1 500 ₽" },
  { title: "Уборка после вечеринки", price: "от 12 000 ₽" },
  { title: "Уборка после гостей", price: "от 8 000 ₽" },
  { title: "Экспресс перед приёмом", price: "от 7 000 ₽" },
  { title: "Подготовка к возвращению", price: "от 9 000 ₽" },
  { title: "Мытьё панорамных окон", price: "от 5 000 ₽" },
  { title: "Балкон и лоджия", price: "от 3 500 ₽" },
  { title: "Уход за кухней", price: "от 4 500 ₽" },
  { title: "Чистка духового шкафа", price: "от 2 500 ₽" },
  { title: "Чистка холодильника", price: "от 2 500 ₽" },
  { title: "Встроенная техника", price: "от 3 000 ₽" },
  { title: "Ванная и санузел", price: "от 3 500 ₽" },
  { title: "Душевая и сантехника", price: "от 3 000 ₽" },
  { title: "Уход за гардеробом", price: "от 4 000 ₽" },
  { title: "Детская комната", price: "от 3 500 ₽" },
  { title: "Кабинет резидента", price: "от 4 000 ₽" },
  { title: "Уборка после ремонта", price: "от 18 000 ₽" },
  { title: "Удаление строительной пыли", price: "от 10 000 ₽" },
  { title: "Люстры и светильники", price: "от 2 500 ₽" },
  { title: "Зеркала и стекло", price: "от 1 500 ₽" },
  { title: "Камень и травертин", price: "от 6 000 ₽" },
  { title: "Паркет и дерево", price: "от 5 000 ₽" },
  { title: "Сезонная разборка шкафов", price: "от 4 000 ₽" },
] as const;

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function buildDays() {
  const start = startOfToday();
  return Array.from({ length: 31 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function monthLabel(date: Date) {
  return date
    .toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
    .replace(/^\d+\s/, "");
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatBookingDate(date: Date) {
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}


function TariffRow({
  tariff,
  days,
}: {
  tariff: (typeof TARIFFS)[number];
  days: Date[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedDate = days.find((day) => dayKey(day) === selected) ?? null;
  const months = useMemo(() => {
    const groups: { label: string; days: Date[] }[] = [];
    days.forEach((day) => {
      const label = monthLabel(day);
      const last = groups.at(-1);
      if (last?.label === label) last.days.push(day);
      else groups.push({ label, days: [day] });
    });
    return groups;
  }, [days]);

  return (
    <article className="services-tariff">
      <p className="services-tariff-category">{tariff.category}</p>
      <div className="services-tariff-main">
        <h3>{tariff.title}</h3>
        <p>{tariff.text}</p>
        <div className="services-dates">
          {months.map((month) => (
            <div key={month.label} className="services-dates-month">
              <span className="services-dates-label">{month.label}</span>
              <div className="services-dates-pills">
                {month.days.map((day) => {
                  const key = dayKey(day);
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`services-date${selected === key ? " is-active" : ""}`}
                      onClick={() => setSelected((current) => (current === key ? null : key))}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <figure className="services-card services-tariff-media">
          <Image src={tariff.src} alt="" fill sizes="252px" />
        </figure>
      </div>
      <div className="services-tariff-aside">
        <span className="services-tariff-duration">{tariff.duration}</span>
        <button
          type="button"
          className="services-book"
          disabled={!selectedDate}
          onClick={() => selectedDate && openBooking({
            title: tariff.title,
            meta: `Дата: ${formatBookingDate(selectedDate)} · ${tariff.duration}`,
            image: tariff.src,
          })}
        >
          Забронировать
        </button>
      </div>
    </article>
  );
}

function ServiceCatalog() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`services-catalog${expanded ? " is-expanded" : ""}`} data-reveal>
        {CATALOG.map((item) => (
          <div key={item.title} className="services-line">
            <span className="services-line-title">{item.title}</span>
            <span className="services-line-price">{item.price}</span>
            <button
              type="button"
              className="services-line-book"
              onClick={() => openBooking({ title: item.title, meta: item.price })}
            >
              Забронировать
            </button>
          </div>
        ))}
      </div>
      <div className="services-more">
        <button type="button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Свернуть" : "Показать ещё"}
        </button>
      </div>
    </>
  );
}

export default function Services() {
  const days = useMemo(() => buildDays(), []);

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="services-head" data-reveal>
          <h2 id="services-title">
            Всё необходимое
            <br />
            для идеального порядка
          </h2>
        </div>

        <div className="services-tariffs" data-reveal data-reveal-stagger>
          {TARIFFS.map((tariff) => (
            <TariffRow key={tariff.id} tariff={tariff} days={days} />
          ))}
        </div>

        <div className="services-catalog-head" data-reveal>
          <h3>Что мы берём на себя</h3>
        </div>
        <ServiceCatalog />
      </div>
    </section>
  );
}
