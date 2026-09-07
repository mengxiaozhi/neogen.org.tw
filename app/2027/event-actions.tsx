"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Menu, Share2, X } from "lucide-react";

import styles from "./event.module.css";

const links = [
  { href: "#event-about", label: "活動理念" },
  { href: "#event-info", label: "活動資訊" },
  { href: "#event-discussion", label: "議題實驗室" },
  { href: "#event-faq", label: "常見問題" },
] as const;

export function EventNavigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className={styles.navigation}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="event-navigation"
        aria-label={open ? "關閉導覽選單" : "開啟導覽選單"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
      </button>
      <nav id="event-navigation" className={styles.navLinks} data-open={open} aria-label="活動導覽">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
      </nav>
      <a className={styles.headerAction} href="#event-info" onClick={() => setOpen(false)}>
        查看活動資訊 <ArrowUpRight size={17} aria-hidden="true" />
      </a>
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
