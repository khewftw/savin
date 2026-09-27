export const PAGE_NAV = [
  { href: "#private-housekeeping", label: "Уход" },
  { href: "#services", label: "Сервис" },
  { href: "#business-care", label: "Для бизнеса" },
  { href: "#news", label: "Новости" },
] as const;

export const MOBILE_NAV = [
  ...PAGE_NAV,
  { href: "#quality", label: "Контроль качества" },
] as const;

export const FOOTER_NAV = [
  ...PAGE_NAV,
  { href: "#book", label: "Бронь" },
] as const;
