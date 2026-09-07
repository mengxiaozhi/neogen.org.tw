"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./event.module.css";

export function EventMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById("event-top");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const select = (name: string) => root.querySelectorAll(`.${name}`);
      // Preserve anchor navigation and restored scroll positions on entry.
      if (window.scrollY < 80 && (!location.hash || location.hash === "#event-top")) {
        gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .from(select(styles.eyebrow), { y: 16, opacity: 0, duration: 0.5 })
          .from(select(styles.year), { y: 32, rotation: -3, opacity: 0, duration: 0.75 }, 0.08)
          .from(root.querySelectorAll(`.${styles.titleWords} > span`), { y: 28, opacity: 0, stagger: 0.12, duration: 0.65 }, 0.2)
          .from(select(styles.subtitle), { x: -18, opacity: 0, duration: 0.6 }, 0.45)
          .from([...select(styles.heroDescription), ...select(styles.heroActions)], { y: 14, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.6)
          .from(select(styles.voiceWaves), { scaleY: 0.2, transformOrigin: "bottom", duration: 0.6, ease: "back.out(3)" }, 0.8);
      }

      const revealSelectors = [styles.sectionLabel, styles.aboutIntro, styles.belief, styles.infoCopy, styles.closingInner];
      root.querySelectorAll(revealSelectors.map((name) => `.${name}`).join(",")).forEach((element) => {
        gsap.from(element, {
          y: 28, opacity: 0.35, duration: 0.75, ease: "power2.out",
          immediateRender: false, clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      gsap.to(select(styles.ribbonStar), {
        rotation: 100, ease: "none",
        scrollTrigger: { trigger: select(styles.ribbon)[0], start: "top bottom", end: "bottom top", scrub: 0.7 },
      });
    }, root);
    return () => motion.revert();
  }, []);

  return null;
}
