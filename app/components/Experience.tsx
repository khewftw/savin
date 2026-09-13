"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealNodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(revealNodes, { opacity: 1, y: 0, clearProps: "transform" });
    } else {
      revealNodes.forEach((node) => {
        const stagger = node.hasAttribute("data-reveal-stagger");
        const kids = stagger ? [...node.children] as HTMLElement[] : [];

        if (kids.length > 1) {
          gsap.set(node, { opacity: 1 });
          gsap.set(kids, { opacity: 0, y: 28 });
          gsap.to(kids, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          });
        } else {
          gsap.fromTo(
            node,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
            },
          );
        }
      });
    }

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>;
}
