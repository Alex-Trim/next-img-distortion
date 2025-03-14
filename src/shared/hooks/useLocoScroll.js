"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const LocomotiveScroll = dynamic(
  () => import("locomotive-scroll").then((mod) => mod.default),
  { ssr: false }
);

// Загружаем стили только на клиенте
if (typeof window !== "undefined") {
  require("locomotive-scroll/dist/locomotive-scroll.css");
}

export default function useLocoScroll(start) {
  useEffect(() => {
    if (!start || typeof window === "undefined") return;

    let locoScroll;
    let gsap;
    let ScrollTrigger;

    const init = async () => {
      // Импортируем GSAP и ScrollTrigger внутри useEffect
      gsap = (await import("gsap")).gsap;
      ScrollTrigger = await import("gsap/ScrollTrigger");

      // Регистрируем плагин
      gsap.registerPlugin(ScrollTrigger);

      const scrollEl = document.querySelector("#main-container");
      if (!scrollEl) {
        console.error("Element #main-container not found");
        return;
      }

      // Инициализация скролла
      locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
      });

      // Подписка на событие скролла
      locoScroll.on("scroll", (args) => {
        ScrollTrigger.update();
      });

      // Прокси для совместимости
      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, { duration: 0 })
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      // Обновление при ресайзе
      ScrollTrigger.addEventListener("refresh", () => locoScroll?.update());
      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (locoScroll) {
        ScrollTrigger.removeEventListener("refresh", () =>
          locoScroll?.update()
        );
        locoScroll.destroy();
        console.log("Destroyed");
      }
    };
  }, [start]);
}
