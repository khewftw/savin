"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const STEPS = [
  {
    index: "01",
    kicker: "Вы выбираете формат",
    title: ["Уборка под ваш ритм,", "а не наоборот"],
    teaser: "В Savin Cleaning нет универсального сценария для всех.",
    paragraphs: [
      "Вы выбираете тот уровень заботы о доме, который нужен именно сейчас: регулярное поддержание порядка, глубокая генеральная уборка или индивидуальный набор задач.",
      "Мы учитываем площадь квартиры, особенности интерьера, материалы, привычный ритм жизни и ваши пожелания. Никаких лишних услуг — только то, что действительно необходимо вашему дому.",
    ],
    stats: [
      { value: "3 формата сервиса", text: "Поддерживающий, генеральный и индивидуальный." },
      { value: "1 персональный сценарий", text: "Собираем уборку именно под вашу квартиру." },
      { value: "0 лишнего", text: "Без навязанных услуг и стандартных пакетов." },
    ],
    cta: "Выбрать свой формат",
    src: "/images/scenario-01.png",
    alt: "Специалист сервиса в кухне-гостиной частной резиденции",
  },
  {
    index: "02",
    kicker: "Определяете детали",
    title: ["Мы заранее знаем,", "что для вас важно"],
    teaser: "Хороший сервис начинается ещё до уборки.",
    paragraphs: [
      "Вы сообщаете нам удобную дату и время, обозначаете приоритетные зоны и оставляете дополнительные пожелания — дальше мы самостоятельно собираем понятный сценарий работы.",
      "Нужно уделить особое внимание кухне? Не трогать рабочий кабинет? Использовать деликатный уход для натурального камня? Подготовить квартиру к вашему возвращению? Всё это становится частью задачи ещё до приезда специалиста.",
    ],
    stats: [
      { value: "5 ключевых параметров", text: "Дата, время, зоны, дополнительные задачи и ваши пожелания." },
      { value: "1 понятная задача", text: "Команда получает всю информацию заранее." },
      { value: "Без повторных объяснений", text: "Ваши пожелания уже учтены в сценарии уборки." },
    ],
    cta: "Настроить уборку под себя",
    src: "/images/scenario-02.png",
    alt: "Подготовка деталей сервиса: пожелания, цветы и порядок на столе",
  },
  {
    index: "03",
    kicker: "Мы создаём порядок",
    title: ["Вам не нужно", "контролировать процесс"],
    teaser: "Самая важная часть премиального сервиса — возможность о нём не думать.",
    paragraphs: [
      "Специалист приезжает в согласованное время и работает по заранее подготовленному сценарию. Мы бережно относимся к интерьеру, мебели, текстилю и деликатным поверхностям, внимательно проходим каждую согласованную зону и оставляем пространство полностью готовым к вашему возвращению.",
    ],
    finale: "Ваша задача заканчивается в момент оформления заявки. Наша — только тогда, когда дома снова безупречно.",
    stats: [
      { value: "1 стандарт качества", text: "Единый подход к каждой уборке." },
      { value: "100% внимания", text: "К квартире, интерьеру и вашим пожеланиям." },
      { value: "0 необходимости контролировать", text: "Вы возвращаетесь уже в готовый дом." },
    ],
    cta: "Доверить нам свой дом",
    src: "/images/scenario-03.png",
    alt: "Готовая спальня резиденции после уборки",
  },
] as const;

export default function Scenario() {
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bento = bentoRef.current;
    if (!bento) return;
    const cards = [...bento.querySelectorAll<HTMLElement>(".scenario-card")];
    const rises = [160, 280, 400];
    let frame = 0;

    const align = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth <= 900;

      if (reduce) {
        cards.forEach((card) => {
          card.style.removeProperty("transform");
          card.style.removeProperty("--copy-shift");
          card.style.removeProperty("--copy-show");
          card.style.removeProperty("--veil");
        });
        return;
      }

      if (!mobile) {
        const rect = bento.getBoundingClientRect();
        const mid = window.innerHeight * 0.5;
        const t = Math.max(0, Math.min(1, (rect.top - mid) / (window.innerHeight * 0.7)));
        cards.forEach((card, index) => {
          card.style.removeProperty("--copy-shift");
          card.style.removeProperty("--copy-show");
          card.style.removeProperty("--veil");
          card.style.transform = `translate3d(0, ${t * rises[index]}px, 0)`;
        });
        return;
      }

      const vh = window.innerHeight;
      cards.forEach((card) => {
        card.style.removeProperty("transform");
        const rect = card.getBoundingClientRect();
        const enter = Math.max(0, Math.min(1, (vh * 0.88 - rect.top) / (vh * 0.42)));
        const drift = ((vh - rect.top) / (vh + rect.height) - 0.5) * 28;
        card.style.setProperty("--copy-show", `${enter}`);
        card.style.setProperty("--copy-shift", `${(1 - enter) * 56 + drift}px`);
        card.style.setProperty("--veil", `${enter * 0.42}`);
      });
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
    <section className="scenario" id="scenario" aria-labelledby="scenario-title">
      <div className="shell">
        <div className="scenario-head" data-reveal data-reveal-stagger>
          <h2 id="scenario-title">
            Уборка, которая
            <br />
            подстраивается под вас
          </h2>
          <p className="scenario-lead">
            В каждом доме свои привычки, интерьер и требования к порядку. Поэтому сервис Savin Cleaning можно настроить под себя. Выберите нужные зоны, добавьте дополнительные услуги, укажите удобное время — всё остальное мы возьмём на себя.
          </p>
        </div>

        <div className="scenario-bento" ref={bentoRef} data-reveal>
          {STEPS.map((step) => (
            <article key={step.index} className="scenario-card">
              <Image src={step.src} alt={step.alt} fill sizes="(max-width: 900px) 100vw, 34vw" />
              <div className="scenario-card-fill" aria-hidden="true" />
              <div className="scenario-card-copy">
                <span className="scenario-card-index">{step.index} — {step.kicker}</span>
                <h3>
                  {step.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p className="scenario-card-teaser">{step.teaser}</p>
                <div className="scenario-card-reveal scenario-card-body">
                  <div>
                    {step.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {"finale" in step && <p className="scenario-card-finale">{step.finale}</p>}
                  </div>
                </div>
                <div className="scenario-card-reveal scenario-card-stats">
                  <ul>
                    {step.stats.map((stat) => (
                      <li key={stat.value}>
                        <strong>{stat.value}</strong>
                        <span>{stat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="scenario-card-reveal scenario-card-cta">
                  <a href="#services">{step.cta} →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
