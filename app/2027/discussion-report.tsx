"use client";

import Link from "next/link";
import { youthDiscussion } from "@/lib/pocket-polis";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import type { PolisReport, PolisSynthesis, ReportStatement, StatementStats } from "@/lib/polis-report-types";
import { ReportMap, groupColor } from "./report-map";
import styles from "./report.module.css";

async function read<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(`/api/2027/discussion${path}`, { cache: "no-store", signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "暫時無法載入資料。");
  return data;
}
const date = (value: number) => new Date(value).toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });

function Citations({ ids, words }: { ids: number[]; words: Map<number, string> }) {
  return <div className={styles.citations}>{[...new Set(ids)].map((id) => <details key={id}><summary>觀點 #{id}</summary><p>{words.get(id) ?? "此觀點目前已不在公開清單，無法顯示原文。"}</p></details>)}</div>;
}

function VoteBar({ stats }: { stats?: StatementStats }) {
  if (!stats?.seen) return <p className={styles.note}>尚無回應</p>;
  return <div className={styles.voteSummary}><div className={styles.bar} aria-hidden="true"><span style={{ width: `${stats.agrees / stats.seen * 100}%` }} /><span style={{ width: `${stats.disagrees / stats.seen * 100}%` }} /><span style={{ width: `${stats.passes / stats.seen * 100}%` }} /></div><p>同意 {stats.agrees} · 不同意 {stats.disagrees} · 略過 {stats.passes}</p></div>;
}

export default function DiscussionReport() {
  const initialAnchor = useRef("");
  const [report, setReport] = useState<PolisReport | null>(null);
  const [statements, setStatements] = useState<ReportStatement[]>([]);
  const [synthesis, setSynthesis] = useState<PolisSynthesis | null>(null);
  const [reportError, setReportError] = useState("");
  const [aiError, setAiError] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
  const [pollStopped, setPollStopped] = useState(false);
  const [revision, setRevision] = useState(0);
  const [aiRevision, setAiRevision] = useState(0);
  const [query, setQuery] = useState("");
  const [themeId, setThemeId] = useState<string | null>(null);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    initialAnchor.current = window.location.hash;
    // Late report data changes section positions. Restore a bookmarked section
    // once, but let any deliberate user navigation or scrolling take precedence.
    const cancel = () => { initialAnchor.current = ""; };
    const events = ["wheel", "touchstart", "pointerdown", "keydown", "hashchange"] as const;
    events.forEach((event) => window.addEventListener(event, cancel, { passive: true }));
    return () => events.forEach((event) => window.removeEventListener(event, cancel));
  }, []);

  useEffect(() => {
    if (loading || aiLoading) return;
    const hash = initialAnchor.current;
    initialAnchor.current = "";
    if (["#report-map", "#report-consensus", "#report-ai", "#report-statements"].includes(hash)) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [loading, aiLoading]);

  useEffect(() => {
    const controller = new AbortController();
    // Reuse an existing identity without creating a participant merely for reading.
    let participantId = "";
    try {
      const stored = localStorage.getItem(`neogen:polis:v1:${youthDiscussion.id}`) ?? "";
      if (/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(stored)) participantId = stored;
    } catch { /* Public reports also work when browser storage is unavailable. */ }
    Promise.all([
      read<PolisReport>(`/results${participantId ? `?pid=${encodeURIComponent(participantId)}` : ""}`, controller.signal),
      read<{ statements: ReportStatement[] }>("/statements-public", controller.signal),
    ]).then(([data, words]) => { if (controller.signal.aborted) return; setReport(data); setStatements(words.statements); setReportError(""); })
      .catch(() => { if (!controller.signal.aborted) setReportError("報告暫時無法載入，請重新整理；你的回應不會因此遺失。"); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [revision]);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    let inFlight = false;
    let waiting = false;
    const schedule = (delay: number) => {
      if (attempts >= 8) { setPollStopped(true); return; }
      if (!document.hidden) timer = setTimeout(check, Math.max(5000, Math.min(delay, 30000)));
    };
    async function check() {
      if (controller.signal.aborted || inFlight || document.hidden) { waiting = true; return; }
      inFlight = true; attempts++;
      try {
        const data = await read<PolisSynthesis>("/synthesis", controller.signal);
        if (controller.signal.aborted) return;
        // Refresh public evidence alongside every ready summary. Missing/withdrawn IDs stay hidden.
        if (data.status === "ready") {
          const words = await read<{ statements: ReportStatement[] }>("/statements-public", controller.signal);
          if (controller.signal.aborted) return;
          setStatements(words.statements);
        }
        setSynthesis(data); setAiError(""); setAiLoading(false);
        waiting = data.status === "pending" || (data.status === "ready" && !!data.refreshPending);
        if (waiting) schedule(data.status === "pending" ? data.retryAfterMs ?? 10000 : 15000);
      } catch {
        if (!controller.signal.aborted) { setAiError("綜整暫時無法載入，其他報告資料仍可閱讀。"); setAiLoading(false); waiting = false; }
      } finally { inFlight = false; }
    }
    function visibility() {
      if (document.hidden) { clearTimeout(timer); } else if (waiting && attempts < 8) { void check(); }
    }
    document.addEventListener("visibilitychange", visibility);
    void check();
    return () => { controller.abort(); clearTimeout(timer); document.removeEventListener("visibilitychange", visibility); };
  }, [aiRevision]);

  const words = useMemo(() => new Map(statements.map((s) => [s.sid, s.text])), [statements]);
  const stats = useMemo(() => new Map(report?.result.statementStats.map((s) => [s.sid, s]) ?? []), [report]);
  const ready = synthesis?.status === "ready" ? synthesis : null;
  const themes = ready?.themes ?? [];
  const theme = themes.find((t) => t.id === themeId);
  const selectedIds = theme ? new Set(theme.statementIds?.length ? theme.statementIds : [...theme.primaryStatementIds, ...theme.secondaryStatementIds]) : null;
  const filtered = statements.filter((s) => (!selectedIds || selectedIds.has(s.sid)) && s.text.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const source = ready?.generationMode === "deterministic" || ready?.model === "deterministic" ? "統計摘要" : "AI 綜整";

  function refresh() { setLoading(true); setReportError(""); setRevision((n) => n + 1); }
  function refreshAI() { setAiLoading(true); setAiError(""); setPollStopped(false); setAiRevision((n) => n + 1); }

  return <section id="event-report" className={styles.report} aria-labelledby="full-report-heading">
    <header className={styles.header}><div><p className={styles.eyebrow}>青年議題實驗室 / 對話觀測站</p><h1 id="full-report-heading">看見差異，也看見共同點。</h1><p>完整意見地圖與 AI 綜整</p></div><Link className={styles.backLink} href="/2027#event-discussion"><ArrowLeft size={18} aria-hidden="true" />返回討論</Link></header>
    <nav className={styles.nav} aria-label="完整報告導覽"><a href="#report-map">意見地圖</a><a href="#report-consensus">共同點</a><a href="#report-ai">AI 綜整</a><a href="#report-statements">全部觀點</a></nav>
    <div className={styles.meta}><span>{report ? `統計更新：${date(report.result.computedAt)}（臺北時間）` : "正在讀取討論…"}</span><button onClick={refresh} disabled={loading}><RefreshCw size={14} aria-hidden="true" />{loading ? "更新中…" : "更新統計"}</button></div>
    {reportError && <p className={styles.error} role="alert">{reportError}</p>}
    {!report && <>
      <section id="report-map" className={styles.block}><h2>01 / 完整意見地圖</h2><p className={styles.note}>{loading ? "正在載入意見地圖…" : "地圖暫時無法載入，請按「更新統計」重試。"}</p></section>
      <section id="report-consensus" className={styles.block}><h2>02 / 跨群共同點與橋接觀點</h2><p className={styles.note}>{loading ? "正在載入共同點…" : "共同點暫時無法載入，請按「更新統計」重試。"}</p></section>
    </>}
    {report && <>
      <div className={styles.stats}><span><b>{report.result.nParticipantsTotal}</b>位參與者</span><span><b>{report.result.nVotes}</b>次回應</span><span><b>{report.result.nStatements}</b>則觀點</span><span><b>{report.result.k}</b>個回應群組</span></div>
      <section id="report-map" className={styles.block}><div className={styles.blockTitle}><h2>01 / 完整意見地圖</h2><span>{report.result.nParticipantsClustered} 位已達分群門檻</span></div><ReportMap report={report} />
        <p className={styles.note}>至少 4 位參與者各回應 {report.result.inclusionThreshold} 則觀點後才嘗試分群。群組來自回應模式，不代表人的固定身分，也不是具代表性的民意調查。</p>
        <div className={styles.cards}>{report.result.groups.map((g) => <article key={g.id} className={styles.card} style={{ borderTopColor: groupColor(g.id) }}><h3>{g.label} 群 <small>{g.size} 人</small></h3>{g.statsRedacted ? <p className={styles.note}>為保護小群組隱私，不顯示代表觀點與逐則統計。</p> : <>{g.representative.length === 0 && <p className={styles.note}>目前尚無可公開的代表觀點。</p>}{g.representative.map((r) => <div key={`${r.sid}-${r.direction}`} className={styles.representative}><span className={styles.tag}>{r.direction === "agree" ? "偏向同意" : "偏向不同意"}</span><p>{words.get(r.sid) ?? "此觀點目前無法公開顯示。"}</p>{r.nSeen > 0 && <small>此方向 {r.nSuccess} / {r.nSeen} 次回應</small>}</div>)}</>}</article>)}</div>
      </section>
      <section id="report-consensus" className={styles.block}><h2>02 / 跨群共同點與橋接觀點</h2><div className={styles.cards}>{(["agree", "disagree"] as const).map((direction) => <article className={styles.card} key={direction}><h3>{direction === "agree" ? "不同群組，共同同意" : "不同群組，共同不同意"}</h3>{report.result.k < 2 || !report.result.consensus[direction].length ? <p className={styles.note}>目前資料尚不足以呈現這類跨群共識。</p> : report.result.consensus[direction].map((c) => <div key={c.sid} className={styles.representative}><p>{words.get(c.sid) ?? "此觀點已不在公開清單。"}</p><Citations ids={[c.sid]} words={words} /></div>)}</article>)}</div>
        <details className={styles.details}><summary>哪些觀點可能連結不同立場？</summary><p className={styles.note}>橋接排序估計哪些觀點較不受主要分歧影響；分數越高，越可能被不同立場接受，並非正式結論。</p>{report.result.bridging?.statements.length ? report.result.bridging.statements.map((s) => <div className={styles.representative} key={s.sid}><p>{words.get(s.sid) ?? "此觀點目前無法公開顯示。"}</p><small>橋接分數 {s.score.toFixed(2)} · {s.seen} 次回應</small></div>) : <p>目前尚無可呈現的橋接觀點。</p>}</details>
      </section>
    </>}
    <section id="report-ai" className={styles.block}><div className={styles.blockTitle}><h2>03 / AI 審議綜整</h2><button onClick={refreshAI} disabled={aiLoading}><RefreshCw size={14} aria-hidden="true" />{aiLoading ? "查詢中…" : "更新綜整"}</button></div>
      <p className={styles.note}>開啟報告會查詢既有綜整，必要時由服務排入生成工作。以下內容依公開回應整理，請對照引用觀點閱讀，不代表協會立場。</p>
      {aiError && <p role="alert" className={styles.error}>{aiError}</p>}
      <div role="status" aria-live="polite" className={styles.aiStatus}>
        {aiLoading && !synthesis ? "正在查詢綜整狀態…" : synthesis?.status === "insufficient" ? `還需要更多回應：目前 ${synthesis.counts.clustered} 位達到分群門檻，需至少 4 位形成 2 個以上群組，且有至少 3 則公開觀點，才能整理多元觀點。` : synthesis?.status === "unavailable" ? "綜整暫時不可用，可能受到服務狀態或額度限制，請稍後再試。" : synthesis?.status === "pending" ? "綜整正在處理中，完成後會在這裡顯示。" : ready ? `${source} · ${date(ready.generatedAt)}（臺北時間）${ready.refreshPending ? " · 更新中，以下為上一版" : ready.isStale ? " · 此版本尚未涵蓋最新回應" : ""}` : ""}
        {pollStopped && <p>本次自動查詢已暫停；稍後可按「更新綜整」查看最新狀態。</p>}
      </div>
      {ready && <>
        <article className={`${styles.card} ${styles.overview}`}><span className={styles.tag}><Sparkles size={14} aria-hidden="true" />{source}</span><h3>這場對話，正在談什麼？</h3><p>{ready.overview.summary}</p><p className={styles.note}>{ready.overview.participantContext}</p><Citations ids={ready.overview.citedStatementIds} words={words} /><p className={styles.note}>本次依據：{ready.provenance.participantCount} 位參與者、{ready.provenance.statementCount} 則觀點、{ready.provenance.voteCount} 次回應。{source === "統計摘要" ? "這是依統計規則產生的摘要，並非 AI 生成。" : `模型：${ready.model}`}</p></article>
        {ready.themes.length > 0 && <div className={styles.cards}>{ready.themes.map((t) => <article className={styles.card} key={t.id}><h3>{t.title}</h3><p>{t.description}</p><button className={styles.textButton} onClick={() => { setThemeId(t.id); setLimit(12); document.getElementById("report-statements")?.scrollIntoView({ behavior: "auto" }); }}>查看這個主題的觀點</button></article>)}</div>}
        <div className={styles.cards}><article className={styles.card}><h3>共同點</h3><p>{ready.commonGround.summary}</p>{ready.commonGround.keyPoints.map((point, i) => <div key={i} className={styles.representative}><span className={styles.tag}>{point.direction === "disagree" ? "共同不同意" : "共同同意"}</span><h4>{point.title}</h4><p>{point.description}</p><Citations ids={point.citedStatementIds} words={words} /></div>)}</article><article className={styles.card}><h3>不同群組，如何看待議題？</h3>{!ready.groupPortraits.length && <p className={styles.note}>尚無符合隱私條件的群組敘述。</p>}{ready.groupPortraits.map((g) => <div key={g.groupId} className={styles.representative}><h4>{g.groupLabel} 群 · {g.title}</h4><p>{g.summary}</p>{g.keyStances.map((stance, i) => <p key={i} className={styles.note}>{stance.stance === "agree" ? "同意" : "不同意"}：{stance.summary}</p>)}<Citations ids={[...g.citedStatementIds, ...g.keyStances.map((s) => s.sid)]} words={words} /></div>)}</article></div>
        <h3 className={styles.subheading}>從分歧，走向下一個提問。</h3>{!ready.tensions.length && <p className={styles.note}>目前尚無足夠證據描述群組之間的分歧。</p>}<div className={styles.cards}>{ready.tensions.map((t, i) => <article key={i} className={styles.card}><h3>{t.topic}</h3><p><b>{t.groupALabel} 群：</b>{t.groupAPerspective}</p><p><b>{t.groupBLabel} 群：</b>{t.groupBPerspective}</p><p>{t.tensions}</p>{t.bridgingQuestion && <blockquote>{t.bridgingQuestion}</blockquote>}<Citations ids={t.citedStatementIds} words={words} /></article>)}</div>
      </>}
    </section>
    <section id="report-statements" className={styles.block}><h2>04 / 全部觀點與回應</h2><label className={styles.search}>搜尋觀點<input value={query} onChange={(e) => { setQuery(e.target.value); setLimit(12); }} placeholder="輸入你關心的關鍵字" type="search" /></label><div className={styles.themeFilters} aria-label="主題篩選"><button aria-pressed={!theme} onClick={() => { setThemeId(null); setLimit(12); }}>全部主題</button>{themes.map((t) => <button key={t.id} aria-pressed={theme?.id === t.id} onClick={() => { setThemeId(t.id); setLimit(12); }}>{t.title}</button>)}</div>{theme && <p>{theme.description}</p>}<p className={styles.note}>共 {filtered.length} 則{query || theme ? "符合條件的" : "公開"}觀點。以下次數為整體回應，群組的小樣本資訊會依服務隱私規則遮蔽。</p><div className={styles.statements}>{filtered.slice(0, limit).map((s) => <article key={s.sid} className={styles.statement}><span>#{s.sid}</span><div><p>{s.text}</p>{report ? <VoteBar stats={stats.get(s.sid)} /> : <p className={styles.note}>統計暫不可用</p>}</div></article>)}</div>{!filtered.length && !loading && <p className={styles.note}>目前沒有符合條件的觀點。</p>}{filtered.length > limit && <button className={styles.more} onClick={() => setLimit((v) => v + 12)}>載入更多觀點（尚有 {filtered.length - limit} 則）</button>}</section>
    <footer className={styles.footer}>資料與分析由 Pocket Polis 提供。AI 綜整與統計更新時間可能不同，請以各區標示的時間與引用為準。</footer>
  </section>;
}
