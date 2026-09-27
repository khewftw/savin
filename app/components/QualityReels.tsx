"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ContactForm from "./ContactForm";

const REELS = [
  { index: "01", title: "Подготовка пространства", src: "/videos/reels/reel-01.mp4", poster: "/images/reels/reels%201.png" },
  { index: "02", title: "Деликатные поверхности", src: "/videos/reels/reel-02.mp4", poster: "/images/reels/reels%202.png" },
  { index: "03", title: "Работа команды", src: "/videos/reels/reel-03.mp4", poster: "/images/reels/reels%203.png" },
  { index: "04", title: "Финальная проверка", src: "/videos/reels/reel-04.mp4", poster: "/images/reels/reels%204.png" },
  { index: "05", title: "Пространство готово", src: "/videos/reels/reel-05.mp4", poster: "/images/reels/reels%205.png" },
] as const;

function ReelPreview({
  reel,
  suspended,
  onOpen,
}: {
  reel: (typeof REELS)[number];
  suspended: boolean;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video || failed) return;
    const markFailed = () => setFailed(true);
    const source = video.querySelector("source");
    video.addEventListener("error", markFailed);
    source?.addEventListener("error", markFailed);
    const timer = window.setTimeout(() => {
      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setFailed(true);
    }, 250);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || suspended) video.pause();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || !videoRef.current || videoRef.current.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }, { threshold: [0, 0.55] });
    if (!reduce && !suspended) observer.observe(card);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      video.removeEventListener("error", markFailed);
      source?.removeEventListener("error", markFailed);
    };
  }, [failed, suspended]);

  return (
    <article ref={cardRef} className="quality-card">
      <div className="quality-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={reel.poster} alt="" />
        {failed ? null : (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={reel.poster}
            onError={() => setFailed(true)}
          >
            <source src={reel.src} type="video/mp4" onError={() => setFailed(true)} />
          </video>
        )}
      </div>
      <button type="button" className="quality-card-hit" aria-label={`${reel.index}. ${reel.title}`} onClick={onOpen}>
        <span className="quality-play" aria-hidden="true">
          <svg viewBox="0 0 16 18" width="34" height="38" aria-hidden="true">
            <path d="M1.2 1.1v15.8L14.8 9z" fill="#fff" />
          </svg>
        </span>
      </button>
    </article>
  );
}

function ReelMedia({ reel }: { reel: (typeof REELS)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const markFailed = () => setFailed(true);
    const source = video.querySelector("source");
    video.addEventListener("error", markFailed);
    source?.addEventListener("error", markFailed);
    const timer = window.setTimeout(() => {
      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setFailed(true);
    }, 250);
    return () => {
      window.clearTimeout(timer);
      video.removeEventListener("error", markFailed);
      source?.removeEventListener("error", markFailed);
    };
  }, []);

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="reel-fallback-photo" src={reel.poster} alt="" />
    );
  }

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay
      controls
      preload="metadata"
      poster={reel.poster}
      onError={() => setFailed(true)}
    >
      <source src={reel.src} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}

function ReelViewer({
  active,
  onClose,
  onStep,
}: {
  active: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const reel = REELS[active];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    document.body.classList.add("reel-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("reel-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return createPortal(
    <div className="reel" role="presentation" onClick={onClose}>
      <div
        className="reel-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="reel-close" type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <div
          className="reel-stage"
          onTouchStart={(event) => {
            touchX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current === null) return;
            const nextX = event.changedTouches[0]?.clientX ?? touchX.current;
            const delta = nextX - touchX.current;
            touchX.current = null;
            if (delta > 48) onStep(-1);
            if (delta < -48) onStep(1);
          }}
        >
          <ReelMedia key={reel.src} reel={reel} />
          <button className="reel-nav reel-nav-prev" type="button" aria-label="Предыдущий ролик" onClick={() => onStep(-1)}>
            ←
          </button>
          <button className="reel-nav reel-nav-next" type="button" aria-label="Следующий ролик" onClick={() => onStep(1)}>
            →
          </button>
        </div>
        <div className="reel-panel">
          <p className="reel-kicker">{reel.index} · {reel.title}</p>
          <h2 id="reel-title">Понравился результат?</h2>
          <p className="reel-lead">
            Оставьте номер телефона — подберём удобный день и подходящий формат уборки.
          </p>
          <ContactForm
            key={reel.index}
            variant="reel"
            service="Уборка"
            meta={`Quality Reel ${reel.index} · ${reel.title}`}
            submitLabel="Забронировать"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function QualityReels() {
  const [active, setActive] = useState<number | null>(null);
  const step = useCallback((delta: number) => {
    setActive((current) => {
      if (current === null) return current;
      return (current + delta + REELS.length) % REELS.length;
    });
  }, []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="quality" id="quality" aria-labelledby="quality-title">
      <div className="shell">
        <div className="quality-head" data-reveal data-reveal-stagger>
          <div>
            <p className="eyebrow">Quality Control</p>
            <h2 id="quality-title">
              Порядок, который
              <br />
              можно увидеть
            </h2>
          </div>
          <div className="quality-aside">
            <p className="quality-lead">
              Каждая уборка проходит контроль качества. Мы фиксируем процесс и результат работы, чтобы стандарт Savin Cleaning соблюдался не на словах, а в каждой детали.
            </p>
            <p className="quality-note">
              Посмотрите, как работает команда: от подготовки пространства до финальной проверки перед вашим возвращением.
            </p>
          </div>
        </div>

        <div className="quality-strip" data-reveal>
          {REELS.map((reel, index) => (
            <ReelPreview
              key={reel.index}
              reel={reel}
              suspended={active !== null}
              onOpen={() => setActive(index)}
            />
          ))}
        </div>
      </div>
      {active !== null ? <ReelViewer active={active} onClose={close} onStep={step} /> : null}
    </section>
  );
}
