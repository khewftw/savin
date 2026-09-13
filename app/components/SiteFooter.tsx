import Link from "next/link";
import ContactForm from "./ContactForm";
import { FOOTER_NAV } from "./nav";

export default function SiteFooter() {
  return (
    <footer className="footer" id="contacts">
      <div className="shell">
        <div className="footer-grid" data-reveal data-reveal-stagger>
          <a className="footer-logo" href="#main" aria-label="Savin Cleaning / Главная">
            <img className="footer-logo-mark" src="/LOGO.svg" alt="" />
          </a>

          <div className="footer-col">
            <p className="footer-label">Меню</p>
            <nav className="footer-nav" aria-label="Навигация по странице">
              {FOOTER_NAV.map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <p className="footer-label">Контакты</p>
            <div className="footer-contact">
              <a href="tel:+78432177777">+7 (843) 217-77-77</a>
              <a href="mailto:info@SavinCleaning.ru">info@SavinCleaning.ru</a>
              <p>Казань</p>
            </div>
            <div className="footer-legal">
              <p className="footer-entity">ООО «Савин Клининг»</p>
              <p>ИНН 1657777777 · КПП 165701001</p>
              <p>ОГРН 1161697777777</p>
              <p>420111, г. Казань, ул. Кремлёвская, д. 7, оф. 17</p>
            </div>
          </div>

          <div className="footer-col footer-col-form">
            <p className="footer-label">Заявка</p>
            <ContactForm />
          </div>
        </div>

        <div className="footer-bottom" data-reveal>
          <p>© {new Date().getFullYear()} Savin Cleaning</p>
          <div className="footer-docs">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/privacy">Согласие на обработку персональных данных</Link>
          </div>
          <p className="footer-152">
            Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ.
          </p>
        </div>
      </div>
    </footer>
  );
}
