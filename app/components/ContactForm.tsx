"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact-inquiries";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const normalized = digits.startsWith("7") ? digits : `7${digits}`;
  const parts = normalized.slice(1);
  let result = "+7";
  if (parts.length) result += ` (${parts.slice(0, 3)}`;
  if (parts.length >= 3) result += ")";
  if (parts.length > 3) result += ` ${parts.slice(3, 6)}`;
  if (parts.length > 6) result += `–${parts.slice(6, 8)}`;
  if (parts.length > 8) result += `–${parts.slice(8, 10)}`;
  return result;
}

export default function ContactForm() {
  const [phone, setPhone] = useState("+7");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const rawPhone = phone.replace(/\D/g, "");

    if (name.length < 2) {
      setStatus("error");
      setMessage("Укажите имя, чтобы мы знали, как к вам обратиться.");
      return;
    }
    if (rawPhone.length !== 11) {
      setStatus("error");
      setMessage("Проверьте номер телефона — нужно указать 10 цифр после +7.");
      return;
    }

    const apartment = String(formData.get("apartment") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();
    const combinedComment = [
      apartment ? `Квартира / апартамент: ${apartment}` : "",
      comment,
    ].filter(Boolean).join("\n\n");

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment: combinedComment || null }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(data?.message || "Не удалось отправить обращение.");
      setStatus("success");
      setMessage("Обращение принято. Сервис свяжется с вами в ближайшее время.");
      form.reset();
      setPhone("+7");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Связь временно недоступна. Попробуйте ещё раз.");
    }
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label><span>Имя *</span><input name="name" type="text" autoComplete="name" required /></label>
        <label>
          <span>Телефон *</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} required />
        </label>
      </div>
      <label><span>Квартира / апартамент</span><input name="apartment" type="text" autoComplete="off" /></label>
      <label><span>Комментарий</span><textarea name="comment" rows={2} /></label>
      <div className="form-action">
        <button type="submit" disabled={status === "loading"}>
          <span>{status === "loading" ? "Отправляем" : "Отправить обращение"}</span>
          <span aria-hidden="true" className="arrow">↗</span>
        </button>
        <p className={`form-status ${status}`} aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
