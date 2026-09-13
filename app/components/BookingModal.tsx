"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { BOOKING_EVENT, DEFAULT_BOOKING_IMAGE, type BookingPayload } from "../lib/booking";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<BookingPayload>({
    title: "Уборка",
    image: DEFAULT_BOOKING_IMAGE,
  });

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<BookingPayload>).detail;
      setBooking({
        title: detail?.title ?? "Уборка",
        meta: detail?.meta,
        image: detail?.image || DEFAULT_BOOKING_IMAGE,
      });
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("booking-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("booking-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="booking" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="booking-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(event) => event.stopPropagation()}
      >
        <figure className="booking-media">
          <Image src={booking.image ?? DEFAULT_BOOKING_IMAGE} alt="" fill sizes="(max-width: 800px) 100vw, 42vw" />
        </figure>
        <div className="booking-form">
          <button className="booking-close" type="button" aria-label="Закрыть" onClick={() => setOpen(false)}>
            ×
          </button>
          <p className="booking-kicker">Заявка</p>
          <h2 id="booking-title">Оставьте заявку — мы соберём визит под ваш дом</h2>
          <p className="booking-service">
            <span>Вы выбираете</span>
            <strong>{booking.title}</strong>
            {booking.meta ? <em>{booking.meta}</em> : null}
          </p>
          <p className="booking-lead">Имя и телефон — остальное уточним при звонке. Обычно перезваниваем в течение часа.</p>
          <ContactForm
            key={`${booking.title}-${booking.meta ?? ""}`}
            service={booking.title}
            meta={booking.meta}
            submitLabel="Оставить заявку"
          />
        </div>
      </div>
    </div>
  );
}
