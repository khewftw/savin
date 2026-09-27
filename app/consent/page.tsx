import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных — Savin Cleaning",
  description: "Страница согласия на обработку персональных данных Savin Cleaning. Итоговый текст ожидает утверждения.",
};

export default function ConsentPage() {
  return (
    <main className="legal-page">
      <div className="shell legal-header">
        <Link className="masthead-logo" href="/">
          <img className="masthead-logo-mark" src="/LOGO.svg" alt="Savin Cleaning" />
        </Link>
        <Link className="legal-back" href="/">Вернуться на главную ↗</Link>
      </div>
      <article className="shell legal-content">
        <p className="eyebrow">Документы / Savin Cleaning</p>
        <h1 className="legal-title-long">
          Согласие
          <br />
          на обработку персональных данных
        </h1>
        <div className="legal-copy">
          <p>
            Здесь будет размещён текст согласия на обработку персональных данных для форм заявки на сайте Savin Cleaning. Итоговая редакция на этой странице не опубликована: её нужно утвердить до запуска форм.
          </p>
          <p className="legal-todo">TODO — утвердить у юриста</p>
          <p>TODO: оператор персональных данных и способ связи для вопросов по обработке.</p>
          <p>TODO: перечень данных, которые человек указывает в формах заявки.</p>
          <p>TODO: цели обработки и действия с этими данными.</p>
          <p>TODO: срок обработки, хранения и порядок отзыва согласия.</p>
          <p>TODO: права субъекта персональных данных и способ их реализовать.</p>
          <p>
            Политика конфиденциальности опубликована отдельно на странице{" "}
            <Link href="/privacy">«Политика конфиденциальности»</Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
