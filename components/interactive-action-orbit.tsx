"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ActionIndex } from "@/components/action-experience";
import { actionItems } from "@/components/action-list";
import { cn } from "@/lib/utils";

import type { ActionOrbitController } from "./action-orbit-scene";

type InteractiveActionOrbitProps = {
  activeIndex?: ActionIndex;
  className?: string;
  onActiveIndexChange?(index: ActionIndex): void;
};

export function InteractiveActionOrbit({
  activeIndex: controlledActiveIndex,
  className,
  onActiveIndexChange,
}: InteractiveActionOrbitProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<ActionOrbitController | null>(null);
  const unavailableRef = useRef(false);
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] =
    useState<ActionIndex>(0);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const activeIndex = controlledActiveIndex ?? uncontrolledActiveIndex;

  const selectAction = useCallback(
    (index: ActionIndex) => {
      if (controlledActiveIndex === undefined) {
        setUncontrolledActiveIndex(index);
      }
      onActiveIndexChange?.(index);
    },
    [controlledActiveIndex, onActiveIndexChange],
  );
  const selectActionRef = useRef(selectAction);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    selectActionRef.current = selectAction;
  }, [selectAction]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    controllerRef.current?.setActive(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const largeEnough = window.matchMedia("(min-width: 768px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inRange = false;

    const updateEnabled = () => {
      setEnabled(
        inRange &&
          largeEnough.matches &&
          !reducedMotion.matches &&
          !connection?.saveData &&
          !unavailableRef.current,
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inRange = entry.isIntersecting;
        updateEnabled();
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(root);
    reducedMotion.addEventListener("change", updateEnabled);
    largeEnough.addEventListener("change", updateEnabled);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updateEnabled);
      largeEnough.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!enabled || !canvas || !root) {
      setReady(false);
      return;
    }

    let cancelled = false;
    let controller: ActionOrbitController | null = null;
    let inView = true;

    const updateVisibility = () => {
      controller?.setVisible(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.01 },
    );
    const fallback = () => {
      if (cancelled) return;
      unavailableRef.current = true;
      setReady(false);
      setEnabled(false);
    };

    observer.observe(root);
    document.addEventListener("visibilitychange", updateVisibility);

    import("./action-orbit-scene")
      .then(({ createActionOrbitScene }) => {
        if (cancelled) return;

        controller = createActionOrbitScene(canvas, {
          activeIndex: activeIndexRef.current,
          onSelect: (index) => selectActionRef.current(index),
          onUnavailable: fallback,
        });
        controllerRef.current = controller;
        updateVisibility();
        setReady(true);
      })
      .catch(fallback);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      controller?.dispose();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [enabled]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate aspect-[4/3] overflow-hidden bg-[var(--paper-soft)]",
        className,
      )}
      data-action-orbit={ready ? "ready" : "fallback"}
    >
      <div
        className={cn(
          "absolute inset-0 grid grid-cols-3 transition-opacity duration-300 motion-reduce:transition-none",
          ready ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      >
        {actionItems.map((action, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={action.title}
              className={cn(
                "flex min-w-0 flex-col justify-between border-r border-[var(--line)] p-5 last:border-r-0 sm:p-7",
                isActive && "bg-[var(--ink)] text-white",
              )}
            >
              <span
                className={cn(
                  "display-font text-[clamp(3rem,7vw,6.5rem)] leading-none text-[var(--orange)]",
                  isActive && "text-white",
                )}
              >
                0{index + 1}
              </span>
              <span className="display-font text-lg font-black leading-tight sm:text-2xl">
                {action.title}
              </span>
            </div>
          );
        })}
      </div>

      {enabled ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 block size-full touch-pan-y touch-pinch-zoom opacity-0 transition-opacity duration-300 motion-reduce:transition-none",
            ready && "opacity-100",
          )}
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
