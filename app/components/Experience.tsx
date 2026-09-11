"use client";

import { useEffect, useRef } from "react";

export default function Experience() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5%" });
    revealNodes.forEach((node, index) => {
      node.style.setProperty("--delay", `${Math.min(index % 5, 4) * 70}ms`);
      observer.observe(node);
    });

    const cursor = cursorRef.current;
    const parallaxNodes = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!cursor || event.pointerType === "touch") return;
      cursor.style.setProperty("--x", `${event.clientX}px`);
      cursor.style.setProperty("--y", `${event.clientY}px`);
      cursor.classList.add("is-active");
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-view", Boolean(target));
      const label = cursor.querySelector("span");
      if (label) label.textContent = target?.dataset.cursor ?? "";
    };

    const onPointerLeave = () => cursor?.classList.remove("is-active");
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>(".site-header");
        header?.classList.toggle("is-scrolled", window.scrollY > 80);
        revealNodes.forEach((node) => {
          if (node.getBoundingClientRect().top < window.innerHeight * 1.08) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        });
        parallaxNodes.forEach((node) => {
          const rect = node.getBoundingClientRect();
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          node.style.setProperty("--parallax", `${(progress - 0.5) * 28}px`);
        });
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>;
}
