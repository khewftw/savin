export const PAGE_NAV = [
  { href: "#private-housekeeping", label: "Уход" },
  { href: "#services", label: "Сервис" },
  { href: "#scenario", label: "Сценарий" },
  { href: "#news", label: "Новости" },
] as const;

export const FOOTER_NAV = [
  ...PAGE_NAV,
  { href: "#book", label: "Бронь" },
] as const;
