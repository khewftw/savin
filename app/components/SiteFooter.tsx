import Link from "next/link";
import ContactForm from "./ContactForm";
import { FOOTER_NAV } from "./nav";

export default function SiteFooter() {
  return (
    <footer className="footer" id="contacts">
      <div className="shell">
        <div className="footer-grid" data-reveal data-reveal-stagger>
          <div className="footer-brand">
            <a className="footer-logo" href="#main" aria-label="Savin Cleaning / Главная">
              <img className="footer-logo-mark" src="/LOGO.svg" alt="" />
            </a>
            <div className="footer-legal">
              <p className="footer-entity">ООО «Савин Клининг»</p>
              <p>ИНН 1657777777 · КПП 165701001</p>
              <p>ОГРН 1161697777777</p>
              <p>420111, г. Казань, ул. Кремлёвская, д. 7, оф. 17</p>
            </div>
          </div>

          <div className="footer-col footer-nav-col">
            <p className="footer-label">Разделы</p>
            <nav className="footer-nav" aria-label="Навигация по странице">
              {FOOTER_NAV.map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer-col footer-contact-col">
            <p className="footer-label">Контакты</p>
            <a className="footer-phone" href="tel:+78432177777">+7 (843) 217-77-77</a>
            <a className="footer-phone-cta" href="tel:+78432177777">Позвонить →</a>
            <div className="footer-secondary">
              <a href="mailto:info@SavinCleaning.ru">info@SavinCleaning.ru</a>
              <p>Казань</p>
            </div>
          </div>

          <div className="footer-col footer-col-form">
            <p className="footer-label">Заявка на уборку</p>
            <p className="footer-form-lead">
              Не нужно звонить и уточнять детали — оставьте телефон, мы перезвоним сами, обсудим формат уборки и подберём удобное время.
            </p>
            <ContactForm variant="footer" submitLabel="Перезвоните мне" />
          </div>
        </div>

        <div className="footer-bottom" data-reveal>
          <p>© {new Date().getFullYear()} Savin Cleaning</p>
          <div className="footer-docs">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/consent">Согласие на обработку персональных данных</Link>
            <Link href="/offer">Публичная оферта</Link>
          </div>
          <p className="footer-152">
            Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ.
          </p>
        </div>
      </div>
    </footer>
  );
}
