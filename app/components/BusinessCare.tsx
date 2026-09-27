"use client";

import Image from "next/image";
import { useState } from "react";
import { openBooking } from "../lib/booking";

const B2B_META = "B2B · Savin Business Care";

const CATALOG = [
  { title: "Уборка офиса, до 100 м²", price: "от 6 000 ₽" },
  { title: "Уборка офиса, 100–300 м²", price: "от 12 000 ₽" },
  { title: "Уборка офиса, от 300 м²", price: "по расчёту" },
  { title: "Абонемент на ежедневное обслуживание", price: "по договору" },
  { title: "Генеральная уборка перед открытием", price: "от 25 000 ₽" },
  { title: "Уборка после ремонта помещения", price: "от 20 000 ₽" },
  { title: "Мытьё панорамных витрин", price: "от 8 000 ₽" },
  { title: "Химчистка мебели переговорной", price: "от 6 000 ₽" },
  { title: "Уборка кухни и линии раздачи", price: "от 10 000 ₽" },
  { title: "Дезинфекция и санобработка", price: "от 7 000 ₽" },
  { title: "Уборка санузлов и душевых", price: "от 4 000 ₽" },
  { title: "Уборка паркинга и входной группы", price: "от 9 000 ₽" },
  { title: "Уборка после мероприятия", price: "от 15 000 ₽" },
  { title: "Вынос и сортировка мусора", price: "от 3 000 ₽" },
  { title: "Уход за ковровыми покрытиями", price: "от 5 000 ₽" },
  { title: "Полировка полов и камня", price: "от 8 000 ₽" },
  { title: "Уборка складских помещений", price: "от 10 000 ₽" },
  { title: "Экспресс-выезд в течение дня", price: "от 9 000 ₽" },
] as const;

const FORMATS = [
  {
    id: "office",
    category: "Ритм рабочего дня",
    title: "Офисы и рабочие пространства",
    text: "Поддерживаем чистоту в переговорных, опен-спейсах и зонах отдыха — так, чтобы команда не замечала уборку, а просто работала в порядке.",
    tag: "От 1 визита в день",
    src: "/images/b2b-office.jpg",
  },
  {
    id: "boutique",
    category: "Первое впечатление клиента",
    title: "Бутики и коммерческие помещения",
    text: "Деликатный клининг торговых пространств: витрины, примерочные, полы — детали, которые формируют впечатление ещё до кассы.",
    tag: "Под график открытия",
    src: "/images/b2b-boutique.jpg",
  },
  {
    id: "kitchen",
    category: "Без остановки процессов",
    title: "Кухни и сервисные зоны",
    text: "Чистота зон с высокой нагрузкой — от линии раздачи до подсобных помещений, с учётом графика смен и требований к сервисным зонам.",
    tag: "Круглосуточно",
    src: "/images/b2b-kitchen.jpg",
  },
  {
    id: "custom",
    category: "Формат под вашу задачу",
    title: "Индивидуальный формат",
    text: "Здание, паркинг, коворкинг, шоурум — обсудим объект, периодичность и состав работ и соберём формат, которого нет в прайсе.",
    tag: "Индивидуально",
    src: "/images/b2b-custom.jpg",
  },
] as const;

function BusinessTariff({ item }: { item: (typeof FORMATS)[number] }) {
  return (
    <article className="business-tariff">
      <p className="business-tariff-category">{item.category}</p>
      <div className="business-tariff-main">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <figure className="business-card business-tariff-media">
          <Image src={item.src} alt="" fill sizes="252px" />
        </figure>
      </div>
      <div className="business-tariff-aside">
        <span className="business-tariff-duration">{item.tag}</span>
        <button
          type="button"
          className="business-book"
          onClick={() => openBooking({ title: item.title, meta: B2B_META, image: item.src })}
        >
          Обсудить условия
        </button>
      </div>
    </article>
  );
}

function BusinessCatalog() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`business-catalog${expanded ? " is-expanded" : ""}`} data-reveal>
        {CATALOG.map((item) => (
          <div key={item.title} className="business-line">
            <span className="business-line-title">{item.title}</span>
            <span className="business-line-price">{item.price}</span>
            <button
              type="button"
              className="business-line-book"
              onClick={() => openBooking({ title: item.title, meta: `${B2B_META} · ${item.price}` })}
            >
              Обсудить
            </button>
          </div>
        ))}
      </div>
      <div className="business-more">
        <button type="button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Свернуть" : "Показать ещё"}
        </button>
      </div>
    </>
  );
}

export default function BusinessCare() {
  return (
    <section className="business-care" id="business-care" aria-labelledby="business-care-title">
      <div className="shell">
        <div className="business-head" data-reveal data-reveal-stagger>
          <div>
            <p className="eyebrow">Savin Business Care</p>
            <h2 id="business-care-title">
              Порядок, который работает
              <br />
              на ваш бизнес
            </h2>
          </div>
          <p className="business-lead">
            Savin Cleaning заботится не только о частных интерьерах. Мы обслуживаем офисы, торговые пространства, кухни и другие коммерческие помещения Savin House и Savin Premier — деликатно, системно и без вмешательства в рабочий ритм команды.
          </p>
        </div>

        <div className="business-tariffs" data-reveal data-reveal-stagger>
          {FORMATS.map((item) => (
            <BusinessTariff key={item.id} item={item} />
          ))}
        </div>

        <div className="business-catalog-head" data-reveal>
          <h3>Стоимость услуг для бизнеса</h3>
        </div>
        <BusinessCatalog />
      </div>
    </section>
  );
}
