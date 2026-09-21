"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const animatedSelector = [
  "[data-gsap-header]",
  "[data-gsap-hero]",
  "[data-gsap-hero-line]",
  "[data-gsap-hero-media]",
  "[data-gsap-hero-symbol]",
  "[data-gsap-mark]",
  "[data-gsap-reveal]",
  "[data-gsap-symbol]",
  "[data-gsap-stagger-item]",
  "[data-gsap-card-icon]",
  "[data-gsap-symbol-spin]",
  "[data-gsap-pointer]",
  "[data-gsap-glyph]",
].join(",");

export function SiteMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById("top");

    if (!root) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
          finePointer: "(pointer: fine)",
        },
        (motionContext) => {
          const { animate, desktop, finePointer } = motionContext.conditions as {
            animate: boolean;
            desktop: boolean;
            finePointer: boolean;
          };
          const wrapper = root.querySelector<HTMLElement>("#smooth-wrapper");
          const content = root.querySelector<HTMLElement>("#smooth-content");
          const html = document.documentElement;
          const body = document.body;
          const previousHtmlScrollBehavior = html.style.scrollBehavior;
          const previousBodyScrollBehavior = body.style.scrollBehavior;
          const saveData =
            (
              navigator as Navigator & {
                connection?: { saveData?: boolean };
              }
            ).connection?.saveData === true;
          let smoother: ScrollSmoother | undefined;
          const removePointerInteractions: Array<() => void> = [];
          const removeAnchorInteractions: Array<() => void> = [];

          if (!animate) {
            gsap.set(root.querySelectorAll(animatedSelector), {
              clearProps: "all",
            });
            return;
          }

          if (desktop && finePointer && !saveData && wrapper && content) {
            html.classList.add("has-scroll-smoother");
            root.dataset.scrollDamping = "active";

            smoother = ScrollSmoother.create({
              wrapper,
              content,
              smooth: 0.72,
              smoothTouch: 0,
              effects: false,
              normalizeScroll: false,
            });

            let focusTimer: number | undefined;
            let initialHashFrame: number | undefined;
            let initialHashTimer: number | undefined;

            const resolveHashTarget = (hash: string) => {
              if (hash === "#top") return root;

              try {
                return document.getElementById(decodeURIComponent(hash.slice(1)));
              } catch {
                return null;
              }
            };
            const scrollToHash = (
              hash: string,
              smooth: boolean,
              moveFocus = false,
            ) => {
              const target = resolveHashTarget(hash);

              if (!target || !smoother) return;

              const scrollMarginTop = Number.parseFloat(
                window.getComputedStyle(target).scrollMarginTop,
              );
              const targetY = Math.max(
                0,
                smoother.offset(target, "top top") -
                  (Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0),
              );

              smoother.scrollTo(targetY, smooth);

              if (moveFocus && target.hasAttribute("tabindex")) {
                window.clearTimeout(focusTimer);
                focusTimer = window.setTimeout(
                  () => target.focus({ preventScroll: true }),
                  smooth ? 780 : 0,
                );
              }
            };
            const onAnchorClick = (event: MouseEvent) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              const origin = event.target;
              const anchor =
                origin instanceof Element
                  ? origin.closest<HTMLAnchorElement>('a[href^="#"]')
                  : null;
              const hash = anchor?.getAttribute("href");

              if (!anchor || !hash || !root.contains(anchor)) return;
              if (!resolveHashTarget(hash)) return;

              event.preventDefault();

              if (window.location.hash === hash) {
                window.history.replaceState(null, "", hash);
              } else {
                window.history.pushState(null, "", hash);
              }

              scrollToHash(hash, true, true);
            };
            const onPopState = () => {
              if (window.location.hash) {
                scrollToHash(window.location.hash, true);
              } else {
                smoother?.scrollTo(0, true);
              }
            };

            root.addEventListener("click", onAnchorClick);
            window.addEventListener("popstate", onPopState);

            if (window.location.hash) {
              initialHashFrame = window.requestAnimationFrame(() => {
                scrollToHash(window.location.hash, false);
              });
              initialHashTimer = window.setTimeout(() => {
                ScrollTrigger.refresh();
                scrollToHash(window.location.hash, false);
              }, 240);
            }

            removeAnchorInteractions.push(() => {
              root.removeEventListener("click", onAnchorClick);
              window.removeEventListener("popstate", onPopState);
              window.clearTimeout(focusTimer);
              window.clearTimeout(initialHashTimer);

              if (initialHashFrame !== undefined) {
                window.cancelAnimationFrame(initialHashFrame);
              }
            });
          }

          const nearPageTop =
            window.scrollY < 80 &&
            (!window.location.hash || window.location.hash === "#top");

          if (nearPageTop) {
            const timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
            });
            const header = root.querySelector("[data-gsap-header]");
            const marks = root.querySelectorAll("[data-gsap-mark]");
            const heroSymbol = root.querySelector("[data-gsap-hero-symbol]");
            const heroItems = root.querySelectorAll("[data-gsap-hero]");
            const heroLine = root.querySelector("[data-gsap-hero-line]");
            const heroMedia = root.querySelector("[data-gsap-hero-media]");

            if (header) {
              timeline.from(header, {
                y: -18,
                opacity: 0,
                duration: 0.45,
                clearProps: "transform,opacity",
              });
            }

            if (marks.length > 0) {
              timeline.from(
                marks,
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
              );
            }

            if (heroSymbol) {
              timeline.from(
                heroSymbol,
                {
                  scale: 0.55,
                  rotation: -18,
                  opacity: 0,
                  duration: 0.72,
                  ease: "back.out(1.8)",
                  clearProps: "transform,opacity",
                },
                0.1,
              );
            }

            if (heroItems.length > 0) {
              timeline.from(
                heroItems,
                {
                  y: 32,
                  opacity: 0,
                  stagger: 0.1,
                  duration: 0.68,
                  clearProps: "transform,opacity",
                },
                0.12,
              );
            }

            if (heroLine) {
              timeline.from(
                heroLine,
                {
                  scaleX: 0,
                  transformOrigin: "left center",
                  duration: 0.7,
                  clearProps: "transform",
                },
                0.28,
              );
            }

            if (heroMedia) {
              timeline.from(
                heroMedia,
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
            .querySelectorAll<HTMLElement>("[data-gsap-symbol]")
            .forEach((symbol) => {
              gsap.from(symbol, {
                scale: 0.62,
                rotation: -14,
                opacity: 0,
                duration: 0.7,
                ease: "back.out(1.7)",
                immediateRender: false,
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: symbol,
                  start: "top 90%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              });
            });

          root
            .querySelectorAll<HTMLElement>("[data-gsap-stagger]")
            .forEach((group) => {
              const items = group.querySelectorAll("[data-gsap-stagger-item]");

              if (items.length > 0) {
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
              }

              const icons = group.querySelectorAll("[data-gsap-card-icon]");

              if (icons.length > 0) {
                gsap.from(icons, {
                  scale: 0.55,
                  rotation: -12,
                  opacity: 0,
                  stagger: 0.11,
                  duration: 0.62,
                  ease: "back.out(1.8)",
                  immediateRender: false,
                  clearProps: "transform,opacity",
                  scrollTrigger: {
                    trigger: group,
                    start: "top 86%",
                    once: true,
                    invalidateOnRefresh: true,
                  },
                });
              }
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

          const closingSymbol = root.querySelector("[data-gsap-symbol-spin]");

          if (closingSymbol && closingSection) {
            gsap.to(closingSymbol, {
              yPercent: -10,
              rotation: 35,
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

          if (desktop && finePointer) {
            root
              .querySelectorAll<HTMLElement>("[data-gsap-pointer-zone]")
              .forEach((zone) => {
                const pointerTarget =
                  zone.querySelector<HTMLElement>("[data-gsap-pointer]");

                if (!pointerTarget) return;

                const moveX = gsap.quickTo(pointerTarget, "x", {
                  duration: 0.55,
                  ease: "power3.out",
                });
                const moveY = gsap.quickTo(pointerTarget, "y", {
                  duration: 0.55,
                  ease: "power3.out",
                });
                const onPointerMove = (event: PointerEvent) => {
                  const bounds = zone.getBoundingClientRect();
                  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

                  moveX(x * 18);
                  moveY(y * 18);
                };
                const onPointerLeave = () => {
                  moveX(0);
                  moveY(0);
                };

                zone.addEventListener("pointermove", onPointerMove);
                zone.addEventListener("pointerleave", onPointerLeave);
                removePointerInteractions.push(() => {
                  zone.removeEventListener("pointermove", onPointerMove);
                  zone.removeEventListener("pointerleave", onPointerLeave);
                  gsap.set(pointerTarget, { clearProps: "x,y" });
                });
              });
          }

          if (!smoother) {
            ScrollTrigger.refresh();
          }

          return () => {
            removePointerInteractions.forEach((remove) => remove());
            removeAnchorInteractions.forEach((remove) => remove());
            smoother?.kill();
            html.classList.remove("has-scroll-smoother");
            html.style.scrollBehavior = previousHtmlScrollBehavior;
            body.style.scrollBehavior = previousBodyScrollBehavior;
            delete root.dataset.scrollDamping;
          };
        },
        root,
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
