import Image from "next/image";
import BookButton from "./BookButton";

export default function Cta() {
  return (
    <section className="cta" id="book" aria-labelledby="cta-title">
      <div className="cta-photo" aria-hidden="true">
        <Image src="/images/atmosphere-evening.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="cta-copy" data-reveal data-reveal-stagger>
        <h2 id="cta-title">Пора навести порядок в доме и в жизни</h2>
        <BookButton className="cta-book" title="Уборка" meta="Заявка с финального экрана">
          Забронировать уборку
        </BookButton>
      </div>
    </section>
  );
}
