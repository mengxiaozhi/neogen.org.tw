"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { consentSnapshot, parseConsent, saveConsent, startAnalytics, subscribeConsent } from "@/lib/cookie-consent";
import styles from "./cookie-consent.module.css";

const serverSnapshot = () => null;

export function CookieConsent() {
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, serverSnapshot);
  const consent = parseConsent(raw);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const settings = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const analytics = consent?.analytics === true;

  useEffect(() => { if (analytics) startAnalytics(); }, [analytics]);
  useEffect(() => { if (open) heading.current?.focus(); }, [open]);

  function choose(allow: boolean) {
    const persisted = saveConsent(allow);
    setOpen(false);
    setNotice(persisted ? (allow ? "已允許分析 Cookie。" : "已拒絕分析 Cookie。") : "瀏覽器未允許儲存偏好，此選擇只在本次頁面有效。");
    requestAnimationFrame(() => settings.current?.focus({ preventScroll: true }));
  }

  return (
    <>
      <button ref={settings} className={styles.settings} type="button" onClick={() => setOpen(true)} aria-expanded={raw !== null && (!consent || open)} aria-controls="cookie-preferences">
        <SlidersHorizontal size={15} aria-hidden="true" />Cookie 設定
      </button>
      <span className={styles.status} role="status">{notice}</span>
      {raw !== null && (!consent || open) && (
        <section id="cookie-preferences" className={styles.banner} aria-labelledby="cookie-heading">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>YOUR PRIVACY, YOUR CHOICE</p>
            <h2 id="cookie-heading" ref={heading} tabIndex={-1}>讓我們知道，你的 Cookie 偏好。</h2>
            <p>經你同意後，我們才會使用 Google Analytics 分析瀏覽情形，改善網站內容。拒絕不影響瀏覽；你可以隨時從「Cookie 設定」撤回同意。</p>
            <details className={styles.details}>
              <summary>查看使用項目與保存期限</summary>
              <p><strong>必要功能：</strong>在此瀏覽器記住你的同意或拒絕選擇，保存 180 天，不用於分析。</p>
              <p><strong>分析用途（自願）：</strong>Google Analytics 使用 _ga 等 Cookie，處理瀏覽頁面、互動、裝置與概略地區等資訊。本網站將分析 Cookie 保存期限設為最長 180 天，停用廣告個人化。資料可能由 Google 在境外處理。</p>
              <p>目前選擇：{consent ? (consent.analytics ? "允許分析 Cookie" : "僅使用必要功能") : "尚未選擇，分析功能未啟用"}。撤回時會移除本網站可存取的 GA Cookie 並重新整理頁面。</p>
            </details>
            <Link className={styles.policy} href="/privacy">Cookie 與隱私說明</Link>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose(false)}>僅使用必要 Cookie</button>
            <button type="button" onClick={() => choose(true)}>接受分析 Cookie</button>
            {consent && <button type="button" className={styles.close} onClick={() => { setOpen(false); settings.current?.focus(); }}>保留目前設定並關閉</button>}
          </div>
        </section>
      )}
    </>
  );
}
