"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const animatedSelector = [
  "[data-gsap-header]",
  "[data-gsap-hero]",
  "[data-gsap-hero-line]",
  "[data-gsap-hero-media]",
  "[data-gsap-mark]",
  "[data-gsap-reveal]",
  "[data-gsap-stagger-item]",
  "[data-gsap-glyph]",
].join(",");

export function SiteMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById("top");

    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
        },
        (motionContext) => {
          const { animate, desktop } = motionContext.conditions as {
            animate: boolean;
            desktop: boolean;
          };

          if (!animate) {
            gsap.set(root.querySelectorAll(animatedSelector), {
              clearProps: "all",
            });
            return;
          }

          const nearPageTop =
            window.scrollY < 80 &&
            (!window.location.hash || window.location.hash === "#top");

          if (nearPageTop) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from("[data-gsap-header]", {
                y: -18,
                opacity: 0,
                duration: 0.45,
                clearProps: "transform,opacity",
              })
              .from(
                "[data-gsap-mark]",
                {
                  scale: 0,
                  rotation: -45,
                  opacity: 0,
                  stagger: 0.08,
                  duration: 0.45,
                  ease: "back.out(2)",
                  clearProps: "transform,opacity",
                },
                0.08,
              )
              .from(
                "[data-gsap-hero]",
                {
                  y: 32,
                  opacity: 0,
                  stagger: 0.1,
                  duration: 0.68,
                  clearProps: "transform,opacity",
                },
                0.12,
              )
              .from(
                "[data-gsap-hero-line]",
                {
                  scaleX: 0,
                  transformOrigin: "left center",
                  duration: 0.7,
                  clearProps: "transform",
                },
                0.28,
              )
              .from(
                "[data-gsap-hero-media]",
                {
                  x: desktop ? 42 : 0,
                  y: desktop ? 0 : 22,
                  scale: 0.985,
                  opacity: 0,
                  duration: 0.85,
                  clearProps: "transform,opacity",
                },
                0.22,
              );
          }

          root
            .querySelectorAll<HTMLElement>("[data-gsap-reveal]")
            .forEach((element) => {
              const direction = element.dataset.gsapDirection;

              gsap.from(element, {
                x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
                y: direction ? 0 : 30,
                opacity: 0,
                duration: 0.76,
                ease: "power2.out",
                immediateRender: false,
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              });
            });

          root
            .querySelectorAll<HTMLElement>("[data-gsap-stagger]")
            .forEach((group) => {
              const items = group.querySelectorAll("[data-gsap-stagger-item]");

              gsap.from(items, {
                y: 28,
                opacity: 0,
                stagger: 0.11,
                duration: 0.65,
                ease: "power2.out",
                immediateRender: false,
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: group,
                  start: "top 86%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              });
            });

          const glyph = root.querySelector("[data-gsap-glyph]");
          const closingSection = root.querySelector("[data-gsap-closing]");

          if (glyph && closingSection) {
            gsap.to(glyph, {
              yPercent: -9,
              ease: "none",
              scrollTrigger: {
                trigger: closingSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });
          }

          ScrollTrigger.refresh();
        },
        root,
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
