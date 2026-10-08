"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Check, Menu, Share2, X } from "lucide-react";
import { RAINBOW_NAME, RAINBOW_PATH } from "@/lib/rainbow-event";
import styles from "./rainbow.module.css";

const links = [
  { href: "#rainbow-about", label: "遊行主題" },
  { href: "#rainbow-voices", label: "我們的聲音" },
  { href: "#rainbow-info", label: "活動資訊" },
] as const;

export function RainbowNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const release = useRef<(() => void) | null>(null);
  const animation = useRef<gsap.core.Animation | null>(null);
  const closing = useRef(false);
  const destination = useRef<string | undefined>(undefined);

  const finishClose = useCallback((href?: string, restoreFocus = true) => {
    animation.current?.kill();
    animation.current = null;
    const menu = dialog.current;
    if (menu) {
      menu.inert = false;
      menu.close();
      delete menu.dataset.menuState;
      gsap.set([menu, ...menu.querySelectorAll("[data-rainbow-menu-reveal]")], { clearProps: "transform,opacity" });
    }
    release.current?.();
    release.current = null;
    closing.current = false;
    destination.current = undefined;
    setOpen(false);
    if (href) {
      const target = document.getElementById(href.slice(1));
      target?.focus({ preventScroll: true });
      window.location.assign(href);
    } else if (restoreFocus) toggle.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const menu = dialog.current;
    const desktop = window.matchMedia("(min-width: 901px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onDesktop = () => {
      if (!desktop.matches || !menu?.open) return;
      finishClose(destination.current, false);
    };
    const onReducedMotion = () => {
      if (reducedMotion.matches) animation.current?.progress(1);
    };
    desktop.addEventListener("change", onDesktop);
    reducedMotion.addEventListener("change", onReducedMotion);
    return () => {
      desktop.removeEventListener("change", onDesktop);
      reducedMotion.removeEventListener("change", onReducedMotion);
      animation.current?.kill();
      menu?.close();
      release.current?.();
    };
  }, [finishClose]);

  function closeMenu(href?: string) {
    const menu = dialog.current;
    if (!menu?.open || closing.current) return;
    closing.current = true;
    destination.current = href;
    animation.current?.kill();
    // Keep the modal and scroll lock until the departing drawer is off screen.
    menu.inert = true;
    menu.dataset.menuState = "closing";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose(href);
      return;
    }
    animation.current = gsap.to(menu, {
      xPercent: 100, duration: 0.28, ease: "power2.inOut",
      onComplete: () => finishClose(href),
    });
  }

  function openMenu() {
    const menu = dialog.current;
    if (!menu || menu.open) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    const rootOverflow = root.style.overflow;
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" });
    root.style.overflow = "hidden";
    release.current = () => {
      Object.assign(body.style, previous);
      root.style.overflow = rootOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
    animation.current?.kill();
    closing.current = false;
    destination.current = undefined;
    menu.inert = false;
    const items = menu.querySelectorAll("[data-rainbow-menu-reveal]");
    gsap.set([menu, ...items], { clearProps: "transform,opacity" });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    menu.dataset.menuState = reducedMotion ? "open" : "opening";
    menu.showModal();
    menu.scrollTop = 0;
    setOpen(true);
    if (!reducedMotion) {
      animation.current = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => { animation.current = null; menu.dataset.menuState = "open"; },
      })
        .fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.44, clearProps: "transform" })
        .fromTo(items, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, stagger: 0.065, clearProps: "transform,opacity" }, 0.12);
    }
  }

  return (
    <>
      <nav className={styles.desktopNav} aria-label="遊行活動導覽">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        <a className={styles.navAction} href="#rainbow-info">一起走上街頭 <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
      <button ref={toggle} className={styles.menuToggle} type="button" aria-label="開啟導覽選單" aria-expanded={open} aria-controls="rainbow-menu" aria-haspopup="dialog" onClick={openMenu}>
        <Menu size={25} aria-hidden="true" />
      </button>
      <dialog ref={dialog} id="rainbow-menu" className={styles.mobileMenu} aria-label="遊行活動導覽選單"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          if (closing.current) { event.preventDefault(); return; }
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}>
        <div className={styles.mobileMenuTop} data-rainbow-menu-reveal>
          <span>RAINBOW 2026</span>
          <button type="button" aria-label="關閉導覽選單" onClick={() => closeMenu()}><X size={26} aria-hidden="true" /></button>
        </div>
        <nav aria-label="手機遊行活動導覽" className={styles.mobileLinks}>
          {links.map((link, index) => <a key={link.href} href={link.href} data-rainbow-menu-reveal onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); closeMenu(link.href); }}><span>0{index + 1}</span>{link.label}<ArrowUpRight aria-hidden="true" /></a>)}
        </nav>
        <div className={styles.mobileMenuBottom} data-rainbow-menu-reveal><p>讓每一種愛，自由綻放。</p><span>2026.10.31</span></div>
      </dialog>
    </>
  );
}

export function ShareRainbow() {
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState("");
  const [busy, setBusy] = useState(false);

  async function share() {
    if (busy) return;
    setBusy(true);
    setStatus("");
    setFallback("");
    const url = new URL(RAINBOW_PATH, window.location.origin).href;
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: RAINBOW_NAME, text: "10 月 31 日，聲做伙聽，路做伙行。", url });
          setStatus("已完成分享");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }
      try { await navigator.clipboard.writeText(url); setStatus("活動連結已複製"); }
      catch { setFallback(url); setStatus("請選取並複製活動連結"); }
    } finally { setBusy(false); }
  }

  return <div className={styles.shareGroup}>
    <button type="button" className={styles.outlineButton} onClick={share} disabled={busy}>分享給朋友 {status === "活動連結已複製" ? <Check size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}</button>
    <p className={styles.shareStatus} role="status">{status}</p>
    {fallback ? <input className={styles.shareUrl} aria-label="可複製的活動連結" readOnly value={fallback} onFocus={(event) => event.target.select()} /> : null}
  </div>;
}
