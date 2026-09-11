import Image from "next/image";
import ContactForm from "./components/ContactForm";
import Experience from "./components/Experience";

function Picture({ src, alt, label, text, className = "", sizes = "50vw" }: { src: string; alt: string; label: string; text: string; className?: string; sizes?: string }) {
  return (
    <figure className={`editorial-picture ${className}`} data-reveal data-parallax data-cursor="Смотреть">
      <Image src={src} alt={alt} fill sizes={sizes} />
      <figcaption><span>{label}</span><p>{text}</p></figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <header className="site-header shell">
        <a className="brand" href="#main" aria-label="Savin House Cleaning — главная"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">Savin House<br />Клининг</span></a>
        <nav aria-label="Основная навигация"><a href="#standard">Сервис</a><a href="#savin">Savin House</a><a href="#contact">Контакты</a></nav>
        <a className="header-contact" href="#contact">Связаться <span aria-hidden="true">↗</span></a>
      </header>
      <Experience />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title" data-cursor="Смотреть">
          <Image className="hero-image" src="/images/savin-hero.webp" alt="Светлый интерьер частной резиденции с натуральным камнем и тёмным деревом" fill sizes="100vw" priority />
          <div className="hero-shade" />
          <div className="hero-content shell">
            <p className="eyebrow hero-eyebrow">Казань / Savin House<br />Официальный клининговый сервис</p>
            <h1 id="hero-title"><span>Безупречный</span><span>сервис для</span><span className="accent-line">Savin House</span></h1>
            <div className="hero-bottom"><p>Деликатный уход за частными интерьерами и пространствами Savin House.</p><a className="circle-link" href="#standard" aria-label="Узнать о стандарте сервиса"><span>↓</span></a></div>
          </div>
        </section>

        <section className="standards" id="standard">
          <div className="shell">
            <div className="section-index" data-reveal><span>01</span><span>Стандарт Savin</span></div>
            <div className="standards-heading">
              <h2 data-reveal>Чистота как часть<br />архитектуры дома</h2>
              <p className="standards-intro" data-reveal>Уход, который не меняет характер интерьера — только сохраняет его первозданное состояние.</p>
            </div>
            <div className="standards-collage">
              <Picture className="standard-wide" src="/images/standard-care.webp" alt="Деликатный уход за поверхностью из натурального камня" label="Точность / 01" text="Методика следует за материалом" sizes="(max-width: 700px) 100vw, 55vw" />
              <div className="standards-note" data-reveal><span>Индивидуальный уход</span><p>Мы точно подбираем составы для камня, дерева, металла и текстиля. Никаких универсальных решений там, где интерьер требует знания.</p></div>
              <Picture className="standard-tall" src="/images/standard-bedroom.webp" alt="Подготовленная спальня в резиденции Savin House" label="Приватность / 02" text="Личное пространство остаётся личным" sizes="(max-width: 700px) 75vw, 30vw" />
              <Picture className="standard-square" src="/images/standard-stone.webp" alt="Каменная раковина и бронзовая арматура" label="Деликатность / 03" text="Тихая точность в каждой детали" sizes="(max-width: 700px) 62vw, 24vw" />
            </div>
            <div className="principle-line" data-reveal><span>Приватно</span><span>Точно</span><span>Деликатно</span><span>Индивидуально</span></div>
          </div>
        </section>

        <section className="housekeeping" id="housekeeping">
          <div className="shell">
            <div className="section-index light" data-reveal><span>02</span><span>Уход за резиденцией</span></div>
            <div className="house-title-row"><h2 data-reveal>Пространство,<br />которое остаётся<br />безупречным</h2><p data-reveal>Постоянная забота о резиденции — от ежедневного порядка до особых запросов.</p></div>
            <div className="care-gallery">
              <Picture className="care-main" src="/images/savin-housekeeping.webp" alt="Специалист клинингового сервиса в интерьере резиденции" label="Частные резиденции" text="Постоянная забота о частных интерьерах" sizes="(max-width: 700px) 100vw, 57vw" />
              <Picture className="care-portrait" src="/images/care-bedroom.webp" alt="Специалист подготавливает спальню" label="Регулярный уход" text="Пространство готово к вашему возвращению" sizes="(max-width: 700px) 76vw, 28vw" />
              <Picture className="care-window" src="/images/care-window.webp" alt="Деликатная работа с панорамным остеклением" label="Глубокий уход" text="Точность там, где важен каждый штрих" sizes="(max-width: 700px) 100vw, 45vw" />
              <Picture className="care-detail" src="/images/savin-materials.webp" alt="Травертин, дерево и текстиль в интерьере" label="Деликатные материалы" text="Камень, дерево, металл, текстиль" sizes="(max-width: 700px) 58vw, 22vw" />
              <Picture className="care-kitchen" src="/images/care-kitchen.webp" alt="Безупречно подготовленная кухня частной резиденции" label="Особые запросы" text="Индивидуальные сценарии ухода" sizes="(max-width: 700px) 90vw, 33vw" />
            </div>
          </div>
        </section>

        <section className="savin-context" id="savin">
          <div className="shell">
            <div className="section-index" data-reveal><span>03</span><span>В контексте Savin House</span></div>
            <div className="context-title"><h2 data-reveal>Часть экосистемы<br />дома</h2><p data-reveal>Savin House задаёт особый ритм: приватный, спокойный, внимательный к архитектуре и людям. Сервис продолжает этот язык в ежедневной заботе о резиденции.</p></div>
            <div className="context-visuals">
              <Picture className="context-main" src="/images/savin-lobby.webp" alt="Просторный лобби премиального жилого дома" label="Savin House / Интерьер" text="Архитектура, в которой важен каждый материал" sizes="(max-width: 700px) 100vw, 68vw" />
              <Picture className="context-side" src="/images/savin-exterior.webp" alt="Архитектурный фасад жилого дома в вечерней Казани" label="Казань / Вечер" text="Приватная среда в центре города" sizes="(max-width: 700px) 70vw, 26vw" />
              <p className="context-caption" data-reveal>Уход за пространством здесь — не отдельная услуга, а естественное продолжение стандарта дома.</p>
            </div>
          </div>
        </section>

        <section className="atmosphere" id="atmosphere">
          <div className="shell atmosphere-head"><div className="section-index light" data-reveal><span>04</span><span>Атмосфера / Детали</span></div><h2 data-reveal>Детали, которые<br />формируют стандарт</h2></div>
          <div className="atmosphere-strip">
            <Picture className="atmo-a" src="/images/atmosphere-evening.webp" alt="Вечерняя атмосфера частной гостиной" label="01 / Свет" text="Тишина вечернего пространства" sizes="38vw" />
            <Picture className="atmo-b" src="/images/standard-stone.webp" alt="Натуральный камень и бронзовая арматура" label="02 / Поверхности" text="Материалы сохраняют тактильность" sizes="25vw" />
            <Picture className="atmo-c" src="/images/standard-bedroom.webp" alt="Свет и текстиль в подготовленной спальне" label="03 / Текстиль" text="Порядок ощущается, а не демонстрируется" sizes="31vw" />
            <Picture className="atmo-d" src="/images/care-kitchen.webp" alt="Светлая каменная кухня" label="04 / Пространство" text="Безупречное состояние без стерильности" sizes="36vw" />
          </div>
          <div className="atmosphere-marquee" aria-hidden="true"><span>ТИХИЙ СЕРВИС · ЛИЧНОЕ ПРОСТРАНСТВО · СТАНДАРТ SAVIN · </span><span>ТИХИЙ СЕРВИС · ЛИЧНОЕ ПРОСТРАНСТВО · СТАНДАРТ SAVIN · </span></div>
        </section>

        <section className="contact" id="contact">
          <div className="shell">
            <div className="section-index light" data-reveal><span>05</span><span>Обращение в сервис</span></div>
            <div className="contact-grid"><div><h2 data-reveal>Сервис, который<br />работает незаметно</h2><p className="contact-note" data-reveal>Оставьте обращение. Представитель сервиса уточнит детали и предложит удобный формат обслуживания.</p></div><ContactForm /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-intro"><p className="eyebrow">Официальный клининговый сервис<br />Savin House / Казань</p><h2>Безупречное<br />пространство.<br /><span>Каждый день.</span></h2></div>
        <div className="shell footer-top">
          <a className="brand footer-brand" href="#main"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">Savin House<br />Клининг</span></a>
          <div className="footer-contact"><span>Для резидентов</span><a href="#contact">Оставить обращение ↗</a></div>
          <div className="footer-links"><a href="#standard">Стандарт</a><a href="#housekeeping">Уход</a><a href="#savin">Savin House</a><a href="#atmosphere">Атмосфера</a></div>
        </div>
        <div className="shell footer-wordmark" aria-hidden="true"><span>SAVIN</span> <span>CLEANING</span></div>
        <div className="shell footer-bottom"><span>Казань / 55°47′ с. ш.</span><span>© 2026 Savin House Cleaning</span><a href="/privacy">Политика конфиденциальности</a></div>
      </footer>
    </>
  );
}
