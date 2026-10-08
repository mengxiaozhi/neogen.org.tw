"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

import type { RainbowSceneController } from "./rainbow-scene";
import { useRainbowFlowerMotion } from "./rainbow-flower-motion";
import styles from "./rainbow-artwork.module.css";

export function RainbowArtwork({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const replay = useRainbowFlowerMotion(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let controller: RainbowSceneController | null = null;
    let inView = false;
    let loading = false;
    let unavailable = false;
    let disposed = false;
    let generation = 0;

    function stopScene() {
      generation += 1;
      controller?.dispose();
      controller = null;
      setReady(false);
    }

    function fallback() {
      if (disposed) return;
      unavailable = true;
      stopScene();
    }

    async function loadScene() {
      if (disposed || loading || unavailable || controller || !inView || document.hidden || !motion.matches) return;
      loading = true;
      const currentGeneration = generation;

      try {
        // Three.js is requested only for a visible illustration with motion enabled.
        const { createRainbowScene } = await import("./rainbow-scene");
        if (disposed || generation !== currentGeneration || !inView || document.hidden || !motion.matches) return;
        controller = createRainbowScene(canvas!, root!, { onUnavailable: fallback });
        controller.setVisible(true);
        setReady(true);
      } catch {
        if (!disposed && generation === currentGeneration) fallback();
      } finally {
        loading = false;
        // A preference can change while the deferred module is loading.
        if (!disposed && generation !== currentGeneration && motion.matches) void loadScene();
      }
    }

    function updateVisibility() {
      controller?.setVisible(inView && !document.hidden && motion.matches);
      void loadScene();
    }

    function onMotionChange() {
      if (!motion.matches) stopScene();
      else updateVisibility();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.01 });

    observer.observe(root);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      disposed = true;
      generation += 1;
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", updateVisibility);
      controller?.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.artwork} data-rainbow-artwork data-ready={ready} data-animation-state="static" data-animation-phase="complete">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.illustration}>{children}</div>
      <button className={styles.replay} type="button" onClick={replay} aria-label="重新播放彩虹綻放動畫"><RotateCcw size={15} aria-hidden="true" />重播動畫</button>
    </div>
  );
}
