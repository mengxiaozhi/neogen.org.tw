"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RainbowMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById("rainbow-top");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (window.scrollY < 80 && (!location.hash || location.hash === "#rainbow-top")) {
        gsap.from(root.querySelectorAll("[data-rainbow-intro]"), {
          y: 28, opacity: 0, duration: 0.85, stagger: 0.09,
          ease: "power3.out", clearProps: "transform,opacity",
        });
      }
      root.querySelectorAll("[data-rainbow-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 28, opacity: 0.45, duration: 0.8, ease: "power2.out",
          immediateRender: false, clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      const bands = root.querySelector("[data-rainbow-bands]");
      if (bands) gsap.fromTo(bands, { xPercent: -3 }, {
        xPercent: 3, ease: "none",
        scrollTrigger: { trigger: bands, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, root);
    return () => media.revert();
  }, []);
  return null;
}
