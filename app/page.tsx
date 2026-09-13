import Image from "next/image";
import BookButton from "./components/BookButton";
import BookingModal from "./components/BookingModal";
import Cta from "./components/Cta";
import Experience from "./components/Experience";
import HeroNow from "./components/HeroNow";
import Keeping from "./components/Keeping";
import News from "./components/News";
import Scenario from "./components/Scenario";
import Services from "./components/Services";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <SiteHeader />
      <Experience />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image className="hero-image" src="/images/savin-hero.webp" alt="Светлый интерьер частной резиденции с натуральным камнем и тёмным деревом" fill sizes="100vw" priority />
          <div className="hero-shade" />
          <div className="hero-content">
            <h1 id="hero-title">Savin<br />Cleaning</h1>
            <div className="hero-aside">
              <HeroNow />
              <BookButton className="hero-book" title="Уборка" meta="Заявка с главной">
                забронировать уборку
              </BookButton>
            </div>
          </div>
        </section>

        <Keeping />
        <Services />
        <Scenario />
        <News />
        <Cta />
      </main>
      <SiteFooter />
      <BookingModal />
    </>
  );
}
