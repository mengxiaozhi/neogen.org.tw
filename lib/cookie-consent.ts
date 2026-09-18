export const CONSENT_KEY = "neogen:cookie-consent:v1";
export const CONSENT_DAYS = 180;
export const CONSENT_DURATION = CONSENT_DAYS * 24 * 60 * 60 * 1000;
export const GA_ID = "G-WZXRHNVVYV";
export type Consent = { version: 1; analytics: boolean; savedAt: number };
let memoryChoice: string | undefined;

export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  try {
    const data = JSON.parse(raw ?? "null");
    return data?.version === 1 && typeof data.analytics === "boolean" && Number.isFinite(data.savedAt)
      && data.savedAt <= now && now - data.savedAt < CONSENT_DURATION ? data : null;
  } catch { return null; }
}

export function consentSnapshot(): string {
  let raw = memoryChoice ?? null;
  if (memoryChoice === undefined) {
    try { raw = localStorage.getItem(CONSENT_KEY); } catch { /* Default to no consent. */ }
  }
  return parseConsent(raw) ? raw! : "";
}

export function saveConsent(analytics: boolean): boolean {
  const raw = JSON.stringify({ version: 1, analytics, savedAt: Date.now() });
  let persistent = true;
  try { localStorage.setItem(CONSENT_KEY, raw); memoryChoice = undefined; }
  catch { memoryChoice = raw; persistent = false; }
  window.dispatchEvent(new Event("neogen-consent"));
  return persistent;
}

export function subscribeConsent(listener: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const check = () => {
    const consent = parseConsent(consentSnapshot());
    if (!consent?.analytics) {
      const wasLoaded = stopAnalytics();
      // Unloading the document also removes GA history/event handlers after withdrawal.
      if (wasLoaded) { window.location.reload(); return; }
    }
    listener();
    clearTimeout(timer);
    if (consent) timer = setTimeout(check, Math.min(CONSENT_DURATION - (Date.now() - consent.savedAt) + 1, 86400000));
  };
  const storage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { memoryChoice = undefined; check(); }
  };
  window.addEventListener("storage", storage);
  window.addEventListener("neogen-consent", check);
  window.addEventListener("focus", check);
  document.addEventListener("visibilitychange", check);
  check();
  return () => {
    clearTimeout(timer);
    window.removeEventListener("storage", storage);
    window.removeEventListener("neogen-consent", check);
    window.removeEventListener("focus", check);
    document.removeEventListener("visibilitychange", check);
  };
}

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
let analyticsStarted = false;

export function startAnalytics() {
  if (analyticsStarted || !parseConsent(consentSnapshot())?.analytics) return;
  const target = window as AnalyticsWindow;
  analyticsStarted = true;
  Reflect.set(target, `ga-disable-${GA_ID}`, false);
  target.dataLayer = target.dataLayer || [];
  // Google's gtag queue uses Arguments objects, not a rest-parameter array.
  // eslint-disable-next-line prefer-rest-params
  target.gtag = function () { target.dataLayer!.push(arguments); };
  // Basic consent mode: these commands and the Google script exist only after opt-in.
  target.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  target.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  target.gtag("js", new Date());
  target.gtag("config", GA_ID, {
    cookie_expires: CONSENT_DURATION / 1000,
    cookie_update: false,
    cookie_path: "/",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.id = "neogen-consented-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function stopAnalytics(): boolean {
  Reflect.set(window, `ga-disable-${GA_ID}`, true);
  // Delete only GA cookies, leaving the preference and discussion identity untouched.
  const names = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0]).filter(name => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name));
  const host = window.location.hostname;
  const domains = ["", ...host.split(".").map((_, i, parts) => parts.slice(i).join("."))];
  const paths = ["/", ...window.location.pathname.split("/").map((_, i, parts) => parts.slice(0, i + 1).join("/")).filter(Boolean)];
  for (const name of names) for (const domain of domains) for (const path of paths) {
    document.cookie = `${name}=; Max-Age=0; Path=${path}${domain ? `; Domain=${domain}` : ""}; SameSite=Lax`;
  }
  return analyticsStarted;
}
