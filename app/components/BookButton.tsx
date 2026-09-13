"use client";

import { openBooking, type BookingPayload } from "../lib/booking";

export default function BookButton({
  className,
  children,
  title,
  meta,
  image,
}: BookingPayload & {
  className: string;
  children: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openBooking({ title, meta, image })}>
      {children}
    </button>
  );
}
