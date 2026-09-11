import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="shell legal-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" /><span className="brand-name">Savin House<br />Клининг</span>
        </Link>
        <Link className="legal-back" href="/">Вернуться на главную ↗</Link>
      </div>
      <article className="shell legal-content">
        <p className="eyebrow">Конфиденциальность / Savin House</p>
        <h1>Политика<br />конфиденциальности</h1>
        <div className="legal-copy">
          <p>Данные, указанные в форме обращения, используются только для связи с вами и организации обслуживания. Мы не передаём персональную информацию третьим лицам, кроме случаев, предусмотренных законодательством Российской Федерации.</p>
          <p>Отправляя форму, вы даёте согласие на обработку имени, номера телефона и информации, которую указали в комментарии. Согласие действует до достижения цели обработки или его отзыва.</p>
          <p>Чтобы уточнить порядок обработки данных или отозвать согласие, направьте обращение службе сервиса через форму на <Link href="/#contact">главной странице</Link>.</p>
        </div>
      </article>
    </main>
  );
}
