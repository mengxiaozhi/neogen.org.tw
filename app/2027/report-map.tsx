"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import type { PolisReport } from "@/lib/polis-report-types";
import styles from "./report.module.css";

export const groupColor = (id: number) => ["#195b32", "#c24706", "#977800", "#527980", "#925a78"][Math.abs(id) % 5];

export function ReportMap({ report }: { report: PolisReport }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [group, setGroup] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const { result, you } = report;
  const activeGroup = result.groups.some((g) => g.id === group) ? group : null;

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    function draw() {
      const context = element!.getContext("2d");
      if (!context) return;
      const width = element!.clientWidth;
      const height = element!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      element!.width = width * dpr; element!.height = height * dpr;
      context.scale(dpr, dpr);
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "#195b3220"; context.setLineDash([4, 6]);
      context.beginPath(); context.moveTo(width / 2, 20); context.lineTo(width / 2, height - 20);
      context.moveTo(20, height / 2); context.lineTo(width - 20, height / 2); context.stroke(); context.setLineDash([]);
      const points = you ? [...result.points, you] : result.points;
      const bounds = points.reduce((b, p) => ({ x0: Math.min(b.x0, p.x), x1: Math.max(b.x1, p.x), y0: Math.min(b.y0, p.y), y1: Math.max(b.y1, p.y) }), { x0: 0, x1: 0, y0: 0, y1: 0 });
      const scale = Math.min((width - 55) / (bounds.x1 - bounds.x0 || 1), (height - 65) / (bounds.y1 - bounds.y0 || 1)) * zoom;
      const x = (v: number) => width / 2 + (v - (bounds.x0 + bounds.x1) / 2) * scale;
      const y = (v: number) => height / 2 - (v - (bounds.y0 + bounds.y1) / 2) * scale;
      for (const point of result.points) {
        context.globalAlpha = activeGroup !== null && point.group !== activeGroup ? 0.12 : 0.7;
        context.fillStyle = groupColor(point.group); context.beginPath();
        context.arc(x(point.x), y(point.y), activeGroup === point.group ? 5 : 3.5, 0, Math.PI * 2); context.fill();
      }
      context.globalAlpha = 1;
      if (you) {
        context.strokeStyle = "#195b32"; context.lineWidth = 2.5; context.fillStyle = "#ffe02c";
        context.beginPath(); context.arc(x(you.x), y(you.y), 8, 0, Math.PI * 2); context.fill(); context.stroke();
        context.font = "bold 13px sans-serif"; context.fillStyle = "#195b32"; context.fillText("你", x(you.x) + 12, y(you.y) + 4);
      }
    }
    const observer = new ResizeObserver(draw); observer.observe(element); draw();
    return () => observer.disconnect();
  }, [result, you, zoom, activeGroup]);

  return <figure className={styles.map}>
    <div className={styles.mapTools} aria-label="意見地圖操作">
      <span>全部 {result.points.length} 個分群回應位置</span>
      <div><button aria-label="縮小地圖" disabled={zoom <= 1} onClick={() => setZoom((v) => Math.max(1, v - .5))}><Minus size={16} /></button><span>{zoom.toFixed(1)}×</span><button aria-label="放大地圖" disabled={zoom >= 3} onClick={() => setZoom((v) => Math.min(3, v + .5))}><Plus size={16} /></button><button aria-label="重設地圖" onClick={() => { setZoom(1); setGroup(null); }}><RotateCcw size={16} /></button></div>
    </div>
    {result.points.length ? <canvas ref={canvas} className={styles.canvas} role="img" aria-label={`完整意見地圖，${result.points.length} 位已分群參與者，${result.k} 個群組。${you ? "黃色標記是你的回應位置。" : ""}`}>群組人數與代表觀點列於下方。</canvas> : <div className={styles.mapEmpty}>先留下回應，讓觀點慢慢在地圖上相遇。<small>目前尚無可呈現的分群位置。</small></div>}
    <div className={styles.groupFilters} aria-label="突出顯示群組">
      <button aria-pressed={activeGroup === null} onClick={() => setGroup(null)}>全部群組</button>
      {result.groups.map((g) => <button key={g.id} aria-pressed={activeGroup === g.id} onClick={() => setGroup(g.id)} style={{ borderColor: groupColor(g.id) }}><i style={{ background: groupColor(g.id) }} />{g.label} 群 · {g.size} 人</button>)}
    </div>
    <figcaption>每點是一位已分群參與者，相同回應可能重疊；距離反映回應相似程度，座標不代表政治光譜或立場優劣。點選群組可突出顯示，放大時可用「重設地圖」回到全圖。{you ? "黃色標記代表這個瀏覽器的回應位置。" : "完成足夠回應後，重新開啟報告可查看你的位置。"}</figcaption>
  </figure>;
}
