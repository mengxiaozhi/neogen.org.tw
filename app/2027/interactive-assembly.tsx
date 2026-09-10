"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Armchair, Box, Gavel, ImageIcon } from "lucide-react";

import type { AssemblyController } from "./assembly-scene";
import styles from "./assembly.module.css";

export function InteractiveAssembly({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<AssemblyController | null>(null);
  const userChoseMode = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches && !connection?.saveData && !userChoseMode.current) {
        setEnabled(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(root);
    const onMotionChange = () => {
      if (motion.matches) {
        setEnabled(false);
        setReady(false);
      }
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!enabled || !canvas || !root) return;
    let cancelled = false;
    let controller: AssemblyController | null = null;
    let inView = true;
    const updateVisibility = () => controller?.setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.01 });
    observer.observe(root);
    document.addEventListener("visibilitychange", updateVisibility);

    const fallback = () => {
      if (cancelled) return;
      userChoseMode.current = true;
      setReady(false);
      setEnabled(false);
      setMessage("互動場景暫時無法開啟，先欣賞活動插畫吧。");
    };

    // Keep Three.js out of the initial page bundle and off reduced-motion/data-saving visits.
    import("./assembly-scene").then(({ createAssemblyScene }) => {
      if (cancelled) return;
      controller = createAssemblyScene(canvas, {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        onMessage: setMessage,
        onUnavailable: fallback,
      });
      controllerRef.current = controller;
      updateVisibility();
      setReady(true);
    }).catch(fallback);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      controller?.dispose();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [enabled]);

  function toggleMode() {
    userChoseMode.current = true;
    setReady(false);
    setMessage("");
    setEnabled((value) => !value);
  }

  return (
    <div ref={rootRef} className={styles.assembly} data-ready={ready} data-mode={enabled ? "interactive" : "illustration"}>
      <div className={styles.illustration} aria-hidden={ready || undefined}>{children}</div>
      {enabled ? (
        <div className={styles.scene}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="青年議事小劇場：議事建築、七張彩色椅子與議事槌。可使用下方按鈕互動。"
            role="img"
          />
        </div>
      ) : null}
      <button className={styles.modeSwitch} type="button" onClick={toggleMode} aria-pressed={enabled}>
        {enabled ? <ImageIcon size={15} aria-hidden="true" /> : <Box size={15} aria-hidden="true" />}
        {enabled ? "切回插畫" : "開啟 3D 互動"}
      </button>
      {ready ? (
        <>
          <div className={styles.sceneHeading}>
            <span className={styles.sceneLabel}><span aria-hidden="true">✳</span> 青年議事小劇場</span>
            <p>每個聲音，都有一個位置。</p>
          </div>
          <div className={styles.controls} role="group" aria-label="議事小劇場互動">
            <p className={styles.gestureHint}><span className={styles.desktopHint}>拖曳轉動視角</span><span className={styles.touchHint}>左右滑動轉動視角</span><span aria-hidden="true"> · </span>點椅子換個色彩</p>
            <div className={styles.buttons}>
              <button className={styles.gavelButton} type="button" onClick={() => controllerRef.current?.strike()}>
                <Gavel size={18} aria-hidden="true" />敲一下議事槌
              </button>
              <button type="button" onClick={() => controllerRef.current?.nextSeat()}>
                <Armchair size={18} aria-hidden="true" />換個座位
              </button>
            </div>
          </div>
        </>
      ) : null}
      <p className={styles.status} role="status">{message || (enabled && !ready ? "正在準備小劇場…" : "")}</p>
    </div>
  );
}
