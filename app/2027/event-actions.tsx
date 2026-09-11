"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, Menu, Share2, X } from "lucide-react";

import { EventBrand } from "./event-brand";
import { EventSymbol } from "./event-symbol";
import styles from "./event.module.css";

const links = [
  { href: "/2027", label: "活動理念" },
  { href: "/2027/program", label: "活動資訊" },
  { href: "/2027#event-discussion", label: "議題實驗室" },
  { href: "/2027#event-faq", label: "常見問題" },
] as const;

export function EventNavigation({ registrationEnabled = false, currentPage = "home" }: { registrationEnabled?: boolean; currentPage?: "home" | "program" }) {
  const router = useRouter();
  const currentPath = currentPage === "home" ? "/2027" : "/2027/program";
  const navigationLinks = links.map((link) => ({
    ...link,
    href: currentPage === "home" ? link.href.replace("/2027#", "#") : link.href,
    current: link.href === currentPath,
  }));
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Animation | null>(null);
  const releaseRef = useRef<(() => void) | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      animationRef.current?.kill();
      dialog?.close();
      releaseRef.current?.();
    };
  }, []);

  function finishClose(href?: string) {
    animationRef.current?.kill();
    dialogRef.current?.close();
    releaseRef.current?.();
    releaseRef.current = null;
    closingRef.current = false;
    setOpen(false);

    if (href?.startsWith("#")) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        const tabIndex = target.getAttribute("tabindex");
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (tabIndex === null) target.removeAttribute("tabindex");
        else target.setAttribute("tabindex", tabIndex);
      }
      window.location.assign(href);
    } else if (href) {
      toggleRef.current?.focus({ preventScroll: true });
      router.push(href);
      if (href === currentPath) window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }

  function closeMenu(href?: string) {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;
    closingRef.current = true;
    animationRef.current?.kill();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose(href);
      return;
    }
    animationRef.current = gsap.to(dialog, {
      yPercent: -100, duration: 0.32, ease: "power2.in",
      onComplete: () => finishClose(href),
    });
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    const rootOverflow = root.style.overflow;
    const desktop = window.matchMedia("(min-width: 761px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onDesktop = () => { if (desktop.matches) finishClose(); };
    const onReducedMotion = () => { if (reducedMotion.matches) animationRef.current?.progress(1); };

    // A fixed body also prevents background scrolling in mobile Safari.
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" });
    root.style.setProperty("overflow", "hidden");
    desktop.addEventListener("change", onDesktop);
    reducedMotion.addEventListener("change", onReducedMotion);
    releaseRef.current = () => {
      Object.assign(body.style, previous);
      root.style.setProperty("overflow", rootOverflow);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      desktop.removeEventListener("change", onDesktop);
      reducedMotion.removeEventListener("change", onReducedMotion);
    };

    dialog.showModal();
    dialog.scrollTop = 0;
    closeRef.current?.focus({ preventScroll: true });
    setOpen(true);
    const items = dialog.querySelectorAll("[data-menu-reveal]");
    animationRef.current?.kill();
    gsap.set([dialog, ...items], { clearProps: "transform,opacity" });

    if (!reducedMotion.matches) {
      animationRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(dialog, { yPercent: -100 }, { yPercent: 0, duration: 0.55, clearProps: "transform" })
        .fromTo(items, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.065, clearProps: "transform,opacity" }, 0.2);
    }
  }

  return (
    <div className={styles.navigation}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="event-mobile-navigation"
        aria-haspopup="dialog"
        aria-label="開啟導覽選單"
        onClick={openMenu}
      >
        <Menu size={23} aria-hidden="true" />
      </button>
      <nav id="event-navigation" className={styles.navLinks} aria-label="活動導覽">
        {navigationLinks.map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.current ? "page" : undefined}>{link.label}</Link>
        ))}
      </nav>
      <Link className={styles.headerAction} href={registrationEnabled ? (currentPage === "home" ? "#event-registration" : "/2027#event-registration") : "/2027/program"}>
        {registrationEnabled ? "填寫報名資料" : "查看活動資訊"} <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
      <dialog
        ref={dialogRef}
        id="event-mobile-navigation"
        className={styles.mobileMenu}
        aria-label="活動導覽選單"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClickCapture={(event) => {
          const href = (event.target as Element).closest("a")?.getAttribute("href");
          if (href && (href.startsWith("#") || href === "/2027" || navigationLinks.some((link) => link.href === href)) && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            closeMenu(href);
          }
        }}
      >
        <div className={styles.mobileMenuHeader}>
          <EventBrand home={currentPage === "home"} />
          <button ref={closeRef} type="button" className={styles.mobileMenuClose} aria-label="關閉導覽選單" onClick={() => closeMenu()}>
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.mobileMenuBody}>
          <p className={styles.mobileMenuEyebrow} data-menu-reveal><span aria-hidden="true" /> 青春發聲中 <span>YOUTH ON AIR</span></p>
          <nav className={styles.mobileMenuLinks} aria-label="手機活動導覽">
            {navigationLinks.map((link, index) => (
              <a key={link.href} href={link.href} aria-current={link.current ? "page" : undefined} data-menu-reveal>
                <span className={styles.mobileMenuNumber} aria-hidden="true">0{index + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.mobileMenuFooter} data-menu-reveal>
          <div><p>讓青春，走進公共現場。</p><span>2027.01.25 — 01.27</span></div>
          <EventSymbol variant="invitation" className={styles.mobileMenuSymbol} />
        </div>
      </dialog>
    </div>
  );
}

export function ShareEvent() {
  const [status, setStatus] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function share() {
    if (busy) return;
    setBusy(true);
    setStatus("");
    setFallbackUrl("");
    const url = new URL("/2027", window.location.origin).href;

    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: "2027 青年參議院 — 立法院會議", text: "2027 年 1 月 25 日至 27 日，讓青春，走進公共現場。", url });
          setStatus("已完成分享");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus("活動連結已複製");
      } catch {
        setFallbackUrl(url);
        setStatus("請選取並複製下方活動連結");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.shareGroup}>
      <button type="button" className={styles.shareButton} onClick={share} disabled={busy}>
        分享給朋友 {status === "活動連結已複製" ? <Check size={19} aria-hidden="true" /> : <Share2 size={19} aria-hidden="true" />}
      </button>
      <p className={styles.shareStatus} role="status">{status}</p>
      {fallbackUrl ? (
        <input
          className={styles.shareUrl}
          aria-label="可複製的活動連結"
          value={fallbackUrl}
          readOnly
          onFocus={(event) => event.target.select()}
        />
      ) : null}
    </div>
  );
}
