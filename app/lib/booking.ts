export const BOOKING_EVENT = "savin-booking-open";
export const DEFAULT_BOOKING_IMAGE = "/images/booking-popup.png";

export type BookingPayload = {
  title: string;
  meta?: string;
  image?: string;
};

export function openBooking(payload: BookingPayload) {
  window.dispatchEvent(new CustomEvent<BookingPayload>(BOOKING_EVENT, { detail: payload }));
}
