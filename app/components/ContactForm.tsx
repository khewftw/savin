"use client";

import Link from "next/link";
import { FormEvent, useId, useRef, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export type ContactFormVariant = "booking" | "footer" | "reel";

const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact-inquiries";

const DEFAULT_LABEL: Record<ContactFormVariant, string> = {
  booking: "Забронировать",
  footer: "Перезвоните мне",
  reel: "Забронировать",
};

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

function ConsentLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} onClick={(event) => event.stopPropagation()}>
      {children}
    </Link>
  );
}

export default function ContactForm({
  variant = "footer",
  service,
  meta,
  date,
  duration,
  price,
  submitLabel,
  onSuccess,
}: {
  variant?: ContactFormVariant;
  service?: string;
  meta?: string;
  date?: string;
  duration?: string;
  price?: string;
  submitLabel?: string;
  onSuccess?: () => void;
}) {
  const baseId = useId();
  const personalRef = useRef<HTMLInputElement>(null);
  const offerRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("+7");
  const [consentPersonal, setConsentPersonal] = useState(false);
  const [consentOffer, setConsentOffer] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const showName = variant !== "reel";
  const label = submitLabel ?? DEFAULT_LABEL[variant];
  const errorId = `${baseId}-consent-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const rawPhone = phone.replace(/\D/g, "");
    const consentMissing = !consentPersonal || !consentOffer;
    setConsentError(consentMissing);

    if (showName && name.length < 2) {
      setStatus("error");
      setMessage("Укажите имя, чтобы мы знали, как к вам обратиться.");
      return;
    }
    if (rawPhone.length !== 11) {
      setStatus("error");
      setMessage("Проверьте номер телефона — нужно указать 10 цифр после +7.");
      return;
    }
    if (consentMissing) {
      setStatus("error");
      setMessage("");
      (consentPersonal ? offerRef : personalRef).current?.focus();
      return;
    }

    const combinedComment = [
      service ? `Услуга: ${service}` : "",
      meta,
      date ? `Дата: ${date}` : "",
      duration ? `Длительность: ${duration}` : "",
      price ? `Стоимость: ${price}` : "",
    ].filter(Boolean).join("\n");

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: showName ? name : null,
          phone,
          comment: combinedComment || null,
          consentPersonal: true,
          consentOffer: true,
        }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(data?.message || "Не удалось отправить обращение.");
      setStatus("success");
      setMessage(variant === "footer" ? "Заявка принята. Мы свяжемся с вами." : "");
      form.reset();
      setPhone("+7");
      setConsentPersonal(false);
      setConsentOffer(false);
      setConsentError(false);
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Связь временно недоступна. Попробуйте ещё раз.");
    }
  }

  if (status === "success" && variant !== "footer") {
    return (
      <div className="form-success" role="status">
        <p className="form-success-title">
          Спасибо.
          <br />
          Заявка принята.
        </p>
        <p className="form-success-text">
          {variant === "reel"
            ? "Мы свяжемся с вами, чтобы подтвердить удобный день."
            : "Мы свяжемся с вами, чтобы подтвердить детали уборки."}
        </p>
      </div>
    );
  }

  return (
    <form className={`request-form request-form-${variant}`} onSubmit={handleSubmit} noValidate>
      {showName ? (
        <div className="form-row">
          <label>
            <span>Имя *</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Телефон *</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              required
            />
          </label>
        </div>
      ) : (
        <label>
          <span>Телефон *</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            required
          />
        </label>
      )}

      <label className={`form-consent${consentError && !consentPersonal ? " is-invalid" : ""}`}>
        <input
          ref={personalRef}
          id={`${baseId}-personal`}
          name="consentPersonal"
          type="checkbox"
          checked={consentPersonal}
          onChange={(event) => {
            const next = event.target.checked;
            setConsentPersonal(next);
            if (next && consentOffer) setConsentError(false);
          }}
          required
          aria-invalid={consentError && !consentPersonal}
          aria-describedby={consentError ? errorId : undefined}
        />
        <span>
          Я даю{" "}
          <ConsentLink href="/consent">согласие на обработку персональных данных</ConsentLink>
        </span>
      </label>

      <label className={`form-consent${consentError && !consentOffer ? " is-invalid" : ""}`}>
        <input
          ref={offerRef}
          id={`${baseId}-offer`}
          name="consentOffer"
          type="checkbox"
          checked={consentOffer}
          onChange={(event) => {
            const next = event.target.checked;
            setConsentOffer(next);
            if (next && consentPersonal) setConsentError(false);
          }}
          required
          aria-invalid={consentError && !consentOffer}
          aria-describedby={consentError ? errorId : undefined}
        />
        <span>
          Я принимаю условия{" "}
          <ConsentLink href="/offer">публичной оферты</ConsentLink>
        </span>
      </label>

      {consentError ? (
        <p id={errorId} className="form-consent-error" role="alert">
          Отметьте оба согласия, чтобы отправить заявку.
        </p>
      ) : null}

      <div className="form-action">
        <button className="footer-send" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Отправляем" : label}
        </button>
        <p className={`form-status ${status}`} aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
