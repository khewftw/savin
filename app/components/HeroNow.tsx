"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export default function HeroNow() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="hero-now">
      <span>сейчас {time || "––:––"},</span>
      <span>время идеального порядка</span>
    </p>
  );
}
