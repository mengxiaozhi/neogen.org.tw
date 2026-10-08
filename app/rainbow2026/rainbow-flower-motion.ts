"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

export function useRainbowFlowerMotion(rootRef: RefObject<HTMLDivElement | null>) {
  const replayRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ribbons = root.querySelectorAll("[data-rainbow-ribbon][data-stage='ribbons']");
      const petals = root.querySelectorAll("[data-rainbow-petal]");
      const spokes = root.querySelectorAll("[data-rainbow-spoke]");
      const nib = root.querySelectorAll("[data-rainbow-nib], [data-rainbow-stem]");
      const dot = root.querySelectorAll("[data-rainbow-dot]");
      const strokes = [...root.querySelectorAll<SVGGeometryElement>("[data-rainbow-spoke] path, [data-rainbow-spoke] line")];
      let inView = false;
      let started = false;
      let completed = false;
      // A restored position or deep link should arrive with an assembled graphic.
      const skipEntrance = window.scrollY > 80 || (!!location.hash && location.hash !== "#rainbow-top");

      const setPhase = (phase: string) => { root.dataset.animationPhase = phase; };
      root.dataset.animationState = "waiting";
      setPhase("ribbons");
      const timeline = gsap.timeline({
        paused: true,
        onStart: () => {
          started = true;
          completed = false;
          root.dataset.animationState = "playing";
        },
        onComplete: () => {
          completed = true;
          root.dataset.animationState = "complete";
          setPhase("complete");
        },
      });
      replayRef.current = () => {
        started = true;
        completed = false;
        root.dataset.animationState = "playing";
        setPhase("ribbons");
        timeline.restart();
        if (!inView || document.hidden) {
          timeline.pause();
          root.dataset.animationState = "paused";
        }
      };

      timeline.call(() => setPhase("ribbons"), [], 0)
        .fromTo(ribbons, { opacity: 0, x: -58, y: 58 }, {
          opacity: 1, x: 0, y: 0, duration: 0.68, stagger: 0.065, ease: "power2.out",
        }, 0)
        .call(() => setPhase("petals"), [], 0.9)
        .fromTo(petals, { opacity: 0, scale: 0.25, rotation: -8, svgOrigin: "630 955" }, {
          opacity: 1, scale: 1, rotation: 0, duration: 0.75, stagger: 0.13, ease: "back.out(1.15)",
        }, 0.9)
        .call(() => setPhase("nib"), [], 2.08)
        .fromTo(nib, { opacity: 0, x: -20, y: 24 }, {
          opacity: 1, x: 0, y: 0, duration: 0.62, ease: "power2.out",
        }, 2.08)
        .fromTo(spokes, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.08 }, 2.18);

      strokes.forEach((stroke, index) => {
        const length = stroke.getTotalLength() + 1;
        timeline.fromTo(stroke, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut",
        }, 2.18 + index * 0.09);
      });
      timeline.fromTo(dot, { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, {
        opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)",
      }, 2.98);

      if (skipEntrance) {
        timeline.progress(1).pause();
        completed = true;
      }

      function updateVisibility() {
        if (!inView || document.hidden) {
          if (started && !completed) {
            timeline.pause();
            root!.dataset.animationState = "paused";
          }
          return;
        }
        root!.dataset.replay = "true";
        if (!completed) {
          root!.dataset.animationState = "playing";
          timeline.play();
        }
      }

      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.12;
        updateVisibility();
      }, { threshold: 0.12 });
      observer.observe(root);
      document.addEventListener("visibilitychange", updateVisibility);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", updateVisibility);
        replayRef.current = null;
        timeline.kill();
        delete root.dataset.replay;
      };
    }, root);

    media.add("(prefers-reduced-motion: reduce)", () => {
      root.dataset.animationState = "static";
      root.dataset.animationPhase = "complete";
      delete root.dataset.replay;
    }, root);

    return () => {
      media.revert();
      replayRef.current = null;
      root.dataset.animationState = "static";
      root.dataset.animationPhase = "complete";
    };
  }, [rootRef]);

  return () => {
    replayRef.current?.();
  };
}
