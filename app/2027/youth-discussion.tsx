"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Minus, Send, X, RefreshCw, MessageSquare, Sparkles } from "lucide-react";
import { youthDiscussion } from "@/lib/pocket-polis";
import { EventSymbol } from "./event-symbol";
import styles from "./discussion.module.css";

type Info = { status: "open" | "closed"; allowSubmissions: boolean };
type Statement = { sid: number; text: string };
type Round = { statement: Statement | null; progress: { voted: number; total: number } };
type Results = { result: { nParticipantsClustered: number; inclusionThreshold: number; k: number; points: { x: number; y: number; group: number }[]; groups: { id: number; label: string; size: number }[]; consensus: { agree: { sid: number }[]; disagree: { sid: number }[] } } };
const api = "/api/2027/discussion";

async function request<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${api}${path}`, { method: body ? "POST" : "GET", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined, cache: "no-store", signal: AbortSignal.timeout(15000) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "服務暫時無法使用，請稍後再試。");
  return data;
}

export function YouthDiscussion() {
  const section = useRef<HTMLElement>(null);
  const participant = useRef("");
  const lock = useRef(false);
  const [info, setInfo] = useState<Info | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [view, setView] = useState<"vote" | "write" | "results">("vote");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [text, setText] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [statements, setStatements] = useState<Statement[]>([]);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      request<Info>("").then((data) => { if (active) setInfo(data); }).catch(() => { if (active) setError("討論資訊暫時無法載入，請點選重新連線。"); });
    }, { rootMargin: "200px" });
    if (section.current) observer.observe(section.current);
    return () => { active = false; observer.disconnect(); };
  }, []);

  function pid() {
    if (participant.current) return participant.current;
    const key = `neogen:polis:v1:${youthDiscussion.id}`;
    let value: string | null = null;
    try { value = localStorage.getItem(key); } catch { /* Session identity remains available when storage is blocked. */ }
    if (!value || !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(value)) value = crypto.randomUUID();
    participant.current = value;
    try { localStorage.setItem(key, value); } catch { setNotice("瀏覽器未允許儲存，本次識別碼只在此頁有效；重新整理後會視為新的參與者。"); }
    return value;
  }

  async function run(action: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError(""); setNotice("");
    try { await action(); } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "連線中斷，操作結果尚未確認。投票可重新連線確認；投稿請先確認審核狀態，避免重複送出。");
    } finally { lock.current = false; setBusy(false); }
  }

  function start() {
    void run(async () => {
      const current = await request<Info>(""); setInfo(current);
      if (current.status === "closed") { setNotice("本場討論已結束，歡迎查看共識結果。"); return; }
      setRound(await request<Round>(`/next?pid=${encodeURIComponent(pid())}`));
    });
  }

  function vote(value: -1 | 0 | 1) {
    if (!round?.statement) return;
    const sid = round.statement.sid;
    void run(async () => {
      const result = await request<{ next: Statement | null; progress: Round["progress"] }>("/votes", { pid: pid(), sid, value });
      setRound({ statement: result.next, progress: result.progress });
      setNotice(value === 0 ? "已略過，下一個觀點交給你。" : "已記錄你的選擇，謝謝你讓觀點被看見。");
    });
  }

  function showResults() {
    setView("results");
    void run(async () => {
      const [data, words, current] = await Promise.all([request<Results>("/results"), request<{ statements: Statement[] }>("/statements-public"), request<Info>("")]);
      setResults(data); setStatements(words.statements); setInfo(current);
    });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    void run(async () => {
      const result = await request<{ status: "approved" | "pending" }>("/statements", { pid: pid(), text: text.trim() });
      setText(""); setNotice(result.status === "pending" ? "觀點已送出，審核通過後就會加入討論。" : "觀點已加入討論，謝謝你的分享。");
    });
  }

  const closed = info?.status === "closed";
  const ready = results && results.result.k >= 2;
  const points = results?.result.points ?? [];
  const mapBounds = points.reduce((bounds, point) => ({ minX: Math.min(bounds.minX, point.x), maxX: Math.max(bounds.maxX, point.x), minY: Math.min(bounds.minY, point.y), maxY: Math.max(bounds.maxY, point.y) }), { minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const mapScale = Math.min(350 / (mapBounds.maxX - mapBounds.minX || 1), 170 / (mapBounds.maxY - mapBounds.minY || 1));
  const colors = ["#195b32", "#c24706", "#b08800", "#597777", "#914d66"];
  const consensus = results?.result.consensus.agree.map((item) => statements.find((s) => s.sid === item.sid)).filter((s): s is Statement => !!s).slice(0, 3) ?? [];

  return (
    <section ref={section} id="event-discussion" tabIndex={-1} className={styles.section} aria-labelledby="discussion-heading">
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <p className={styles.eyebrow}>03 / 青年議題實驗室 <span>YOUR VOICE MATTERS</span></p>
          <span className={styles.stamp}>先聽見，再靠近。</span>
        </div>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2 id="discussion-heading">一個選擇，<br />讓對話<span>往前一點。</span></h2>
            <p>{youthDiscussion.description}</p>
            <ol className={styles.steps}>
              <li><b>01</b><span>讀一個觀點，留下你的選擇。</span></li>
              <li><b>02</b><span>補上一句，你在意的事。</span></li>
              <li><b>03</b><span>看見不同立場，也找找共同點。</span></li>
            </ol>
            <Link href="/2027/report" className={styles.reportLink}>完整意見地圖與 AI 綜整<ArrowUpRight size={17} aria-hidden="true" /></Link>
            <EventSymbol variant="dialogue" className={styles.dialogueSymbol} />
            <p className={styles.note}>不必登入，以這個瀏覽器的隨機識別碼記錄參與。統計反映此場參與者的回應，並非具代表性的民意調查。</p>
          </div>
          <div className={styles.board}>
            <div className={styles.boardTop}><span>2027 青年參議院 · 會前對話</span><span>{closed ? "已結束" : info ? "開放參與" : "連線中"}</span></div>
            <h3>{youthDiscussion.title}</h3>
            <noscript><p className={styles.error}>此互動需要 JavaScript。<a href={`${youthDiscussion.origin}/c/${youthDiscussion.id}`}>開啟 Pocket Polis 參與頁</a></p></noscript>
            <div className={styles.tabs} aria-label="討論功能">
              <button aria-pressed={view === "vote"} disabled={busy} onClick={() => { setView("vote"); setError(""); setNotice(""); }}>回應觀點</button>
              <button aria-pressed={view === "write"} disabled={busy} onClick={() => { setView("write"); setError(""); setNotice(""); }}>提出觀點</button>
              <button aria-pressed={view === "results"} disabled={busy} onClick={showResults}>共識進度</button>
            </div>
            <div className={styles.panel} aria-busy={busy}>
              {view === "vote" && <>
                {!round ? <div className={styles.welcome}><MessageSquare size={34} aria-hidden="true" /><h4>{closed ? "把這場對話，接著讀下去。" : "沒有標準答案，只有你的想法。"}</h4><p>每次讀一則觀點，選擇同意、不同意，或先略過。初始觀點是討論引子，不代表協會立場。</p><button className={styles.primary} disabled={busy || closed} onClick={start}>{busy ? "準備中…" : "開始回應"}<ArrowUpRight size={19} aria-hidden="true" /></button></div> : <>
                  <div className={styles.progress}><span>已回應 {round.progress.voted} / {round.progress.total}</span><progress max={Math.max(1, round.progress.total)} value={round.progress.voted} aria-label="回應進度" /></div>
                  {round.statement ? <><blockquote className={styles.statement} key={round.statement.sid}><span aria-hidden="true">“</span>{round.statement.text}</blockquote><div className={styles.voteButtons}><button disabled={busy || closed} onClick={() => vote(1)}><Check aria-hidden="true" />同意</button><button disabled={busy || closed} onClick={() => vote(-1)}><X aria-hidden="true" />不同意</button><button disabled={busy || closed} onClick={() => vote(0)}><Minus aria-hidden="true" />略過</button></div></> : <div className={styles.welcome}><Sparkles size={34} aria-hidden="true" /><h4>這一輪，聽見你了。</h4><p>目前的觀點都已回應。你可以提出新觀點，或看看正在形成的共同點。</p><button className={styles.primary} disabled={busy} onClick={showResults}>看看共識進度<ArrowUpRight size={19} aria-hidden="true" /></button><button className={styles.textButton} disabled={busy || closed} onClick={start}>查看是否有新觀點</button></div>}
                </>}
              </>}
              {view === "write" && <form className={styles.form} onSubmit={submit}><label htmlFor="youth-statement">你希望大家一起想想的，是什麼？</label><p>一句話聚焦一件事，讓其他人能表達同意或不同意。請勿填寫姓名、電話或其他個人資料。</p><textarea id="youth-statement" value={text} onChange={(e) => setText(e.target.value)} maxLength={280} rows={4} required disabled={busy || closed || !info?.allowSubmissions} placeholder="我認為，青年參與公共決策可以…" /><div className={styles.formBottom}><span>{text.length} / 280 字</span><button className={styles.primary} disabled={busy || closed || !info?.allowSubmissions || !text.trim()} type="submit">{busy ? "送出中…" : "送出觀點"}<Send size={17} aria-hidden="true" /></button></div><p className={styles.note}>{closed ? "討論已結束。" : info && !info.allowSubmissions ? "目前暫停接受新觀點。" : "投稿經審核通過後公開。請就事論事，尊重不同觀點。"}</p></form>}
              {view === "results" && <div className={styles.results}>{!results ? <p>{busy ? "正在整理回應…" : "點選重新整理，查看大家的回應。"}</p> : !ready ? <><Sparkles size={32} aria-hidden="true" /><h4>共識，需要更多聲音。</h4><p>目前有 {results.result.nParticipantsClustered} 位參與者達到分群回應門檻。至少 4 位參與者各回應 {results.result.inclusionThreshold} 則觀點後，系統才會嘗試分群；形成不同群組後，才能比較跨群共同點。</p><p className={styles.note}>現在還不足以判斷跨群共識，邀請更多不同想法的人加入吧。</p></> : <><h4>不同的聲音，正在靠近。</h4>{points.length > 0 && <figure className={styles.opinionMap}><svg viewBox="0 0 400 220" role="img" aria-label={`意見分布圖，共 ${points.length} 位已分群參與者，顯示前 ${Math.min(points.length, 1000)} 位。`}><path d="M200 20V200M20 110H380" stroke="#195b3220" strokeDasharray="4 5" />{points.slice(0, 1000).map((point, index) => <circle key={index} cx={200 + (point.x - (mapBounds.minX + mapBounds.maxX) / 2) * mapScale} cy={110 - (point.y - (mapBounds.minY + mapBounds.maxY) / 2) * mapScale} r="5" fill={colors[Math.abs(point.group) % colors.length]} opacity=".72" />)}</svg><figcaption>每點是一位已分群參與者；越靠近，回應越相似。座標不代表政治光譜或立場優劣。{points.length > 1000 && "此處顯示前 1,000 位，請至完整報告查看。"}</figcaption></figure>}<div className={styles.groups}>{results.result.groups.map((group) => <span key={group.id}>{group.label} · {group.size} 人</span>)}</div>{consensus.length ? <ul>{consensus.map((s) => <li key={s.sid}>{s.text}</li>)}</ul> : <p>目前尚未形成可呈現的共同同意觀點，請到完整報告查看不同意見。</p>}</>}<button className={styles.textButton} onClick={showResults} disabled={busy}><RefreshCw size={15} aria-hidden="true" />重新整理進度</button><p className={styles.note}>報告會隨回應累積更新；AI 綜整僅在資料與額度足夠時產生。</p></div>}
            </div>
            {error && <div className={styles.error} role="alert"><p>{error}</p><button onClick={() => { if (view === "results") showResults(); else void run(async () => { setInfo(await request<Info>("")); if (round) setRound(await request<Round>(`/next?pid=${encodeURIComponent(pid())}`)); }); }} disabled={busy}>重新連線</button></div>}
            <p className={styles.notice} role="status" aria-live="polite">{notice}</p>
            <div className={styles.boardFooter}><span>把差異帶進討論，把理解帶回生活。</span><a href="https://github.com/mashbean/pocket-polis" target="_blank" rel="noopener noreferrer">Powered by Pocket Polis ↗</a></div>
          </div>
        </div>
        <p className={styles.disclosure}>這是 2027 活動的會前意見交流，參與討論不等於完成活動報名。持有連結者可查看本場討論與彙整結果；本場不列入 Pocket Polis 公開目錄，也不開放公開下載逐筆投票資料。</p>
      </div>
    </section>
  );
}
