"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

function endOfWeek(from: Date) {
  const date = new Date(from);
  date.setHours(23, 59, 59, 999);
  const day = date.getDay();
  const diff = (7 - day) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

function useWeeklyCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const deadline = endOfWeek(now);
      setRemaining(Math.max(0, deadline.getTime() - now.getTime()));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (remaining === null) return null;
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function Cta() {
  const countdown = useWeeklyCountdown();

  return (
    <section className="cta" id="book" aria-labelledby="cta-title">
      <div className="cta-panel">
        <div className="cta-visual">
          <Image src="/images/atmosphere-evening.webp" alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />
          <div className="cta-visual-shade" aria-hidden="true" />
          <div className="cta-visual-copy" data-reveal data-reveal-stagger>
            <div>
              <span className="cta-badge">-50%</span>
              <p className="eyebrow cta-eyebrow">Ограниченное предложение</p>
              <h2 id="cta-title">Попробуйте Savin Cleaning со скидкой 50%</h2>
              <p className="cta-lead">
                Специальная цена на первую уборку действует до конца этой недели — предложение обновляется каждый понедельник, так что тянуть смысла нет.
              </p>
            </div>
            <div className="cta-countdown" aria-label="До конца акции">
              <div>
                <strong>{countdown ? pad(countdown.days) : "––"}</strong>
                <span>Дней</span>
              </div>
              <em>:</em>
              <div>
                <strong>{countdown ? pad(countdown.hours) : "––"}</strong>
                <span>Часов</span>
              </div>
              <em>:</em>
              <div>
                <strong>{countdown ? pad(countdown.minutes) : "––"}</strong>
                <span>Минут</span>
              </div>
              <em>:</em>
              <div>
                <strong>{countdown ? pad(countdown.seconds) : "––"}</strong>
                <span>Секунд</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-form-panel" data-reveal>
          <p className="cta-form-kicker">Активировать скидку</p>
          <h3>Оставьте заявку до окончания акции</h3>
          <p className="cta-form-lead">
            Укажем удобное время и оформим уборку по спеццене — 50% от стандартного прайса.
          </p>
          <ContactForm
            variant="booking"
            service="Уборка со скидкой 50%"
            meta="Акция -50% на первую уборку · действует до конца недели"
            submitLabel="Активировать скидку -50%"
          />
        </div>
      </div>
    </section>
  );
}
