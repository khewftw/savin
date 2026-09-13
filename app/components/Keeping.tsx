import Image from "next/image";

const ROWS = [
  [
    { src: "/images/savin-housekeeping.webp", alt: "Поддерживающий уход в светлом интерьере резиденции", title: ["Поддерживающая уборка", "премиального уровня"] },
    { src: "/images/standard-care.webp", alt: "Точная работа с поверхностями натурального камня", title: ["Генеральная уборка", "с вниманием к деталям"] },
    { src: "/images/savin-materials.webp", alt: "Травертин, дерево и текстиль в частном интерьере", title: ["Бережный уход", "за деликатными поверхностями"] },
    { src: "/images/standard-bedroom.webp", alt: "Подготовленная спальня к возвращению резидента", title: ["Подготовка квартиры", "к вашему возвращению"] },
    { src: "/images/care-kitchen.webp", alt: "Безупречно подготовленная кухня частной резиденции", title: ["Уход за кухней", "и встроенной техникой"] },
  ],
  [
    { src: "/images/standard-stone.webp", alt: "Каменная раковина и бронзовая арматура", title: ["Аккуратная уборка", "ванных и private-zone"] },
    { src: "/images/atmosphere-evening.webp", alt: "Вечерняя гостиная с текстилем и декором", title: ["Уход за текстилем", "мебелью и декором"] },
    { src: "/images/savin-lobby.webp", alt: "Спокойный лобби премиального жилого дома", title: ["Сервис по", "индивидуальному графику"] },
    { src: "/images/care-window.webp", alt: "Деликатная работа с панорамным остеклением", title: ["Конфиденциальность", "и деликатный подход"] },
    { src: "/images/care-bedroom.webp", alt: "Личное пространство, подготовленное к вечеру", title: ["Персональные решения", "для вашего дома"] },
  ],
] as const;

function KeepingSet({
  items,
  hidden = false,
}: {
  items: (typeof ROWS)[number];
  hidden?: boolean;
}) {
  return (
    <ul className="keeping-set" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={`${hidden ? "clone" : "item"}-${item.title[0]}`} className="keeping-card">
          <figure className="keeping-card-media">
            <Image src={item.src} alt={hidden ? "" : item.alt} fill sizes="160px" />
          </figure>
          <p className="keeping-card-title">
            <span>{item.title[0]}</span>
            <span>{item.title[1]}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function KeepingLane({
  items,
  reverse = false,
}: {
  items: (typeof ROWS)[number];
  reverse?: boolean;
}) {
  return (
    <div className="keeping-viewport">
      <div className={`keeping-lane${reverse ? " is-reverse" : ""}`}>
        <KeepingSet items={items} />
        <KeepingSet items={items} hidden />
      </div>
    </div>
  );
}

export default function Keeping() {
  return (
    <section className="keeping" id="private-housekeeping" aria-labelledby="keeping-title">
      <div className="keeping-head" data-reveal data-reveal-stagger>
        <h2 id="keeping-title">
          Дом, в который
          <br />
          приятно возвращаться
        </h2>
        <p className="keeping-lead">
          Создаём безупречный порядок в пространстве, где важна каждая деталь. Деликатный уход, высокий стандарт сервиса и комфорт, к которому хочется возвращаться каждый день.
        </p>
      </div>
      <div className="keeping-track" data-reveal>
        <KeepingLane items={ROWS[0]} />
        <KeepingLane items={ROWS[1]} reverse />
      </div>
    </section>
  );
}
