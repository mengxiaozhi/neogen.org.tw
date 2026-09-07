import { youthDiscussion } from "@/lib/pocket-polis";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" };
const reply = (error: string, status: number) => Response.json({ error }, { status, headers });
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
type Context = { params: Promise<{ path?: string[] }> };

async function forward(request: Request, context: Context) {
  const { path = [] } = await context.params;
  const endpoint = path.join("/");
  const allowed = request.method === "GET" ? ["", "next", "results", "statements-public", "synthesis"] : ["votes", "statements"];
  if (path.length > 1 || !allowed.includes(endpoint)) return reply("找不到此功能。", 404);
  // Fixed conversation and explicit public endpoints: admin/create/export are never proxied.
  const origin = process.env.POCKET_POLIS_ORIGIN ?? youthDiscussion.origin;
  const id = process.env.POCKET_POLIS_CONVERSATION_ID ?? youthDiscussion.id;
  const upstream = new URL(`/api/conversations/${encodeURIComponent(id)}${endpoint ? `/${endpoint}` : ""}`, origin);
  let body: string | undefined;
  if (request.method === "GET" && (endpoint === "next" || endpoint === "results")) {
    const pid = new URL(request.url).searchParams.get("pid");
    if (endpoint === "next" || pid !== null) {
      if (!pid || !uuid.test(pid)) return reply("參與識別碼無效，請重新載入。", 400);
      upstream.searchParams.set("pid", pid);
    }
  }
  if (request.method === "POST") {
    const source = request.headers.get("origin");
    if (source) {
      try {
        const sourceUrl = new URL(source);
        // Next may expose its internal localhost URL; compare the browser-facing Host.
        if (!["http:", "https:"].includes(sourceUrl.protocol) || (sourceUrl.host !== request.headers.get("host") && source !== "https://neogen.org.tw")) return reply("不允許此來源。", 403);
      } catch { return reply("不允許此來源。", 403); }
    }
    if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("請使用 JSON 格式。", 415);
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > 4096) return reply("內容過長。", 413);
    let input;
    try { input = JSON.parse(text); } catch { return reply("資料格式不正確。", 400); }
    if (!input || typeof input !== "object" || !uuid.test(input.pid ?? "")) return reply("參與識別碼無效。", 400);
    if (endpoint === "votes") {
      if (!Number.isInteger(input.sid) || input.sid < 1 || ![1, -1, 0].includes(input.value)) return reply("投票資料不正確。", 400);
      body = JSON.stringify({ pid: input.pid, sid: input.sid, value: input.value });
    } else {
      if (typeof input.text !== "string" || !input.text.trim() || input.text.trim().length > 280) return reply("請輸入 1 至 280 字的觀點。", 400);
      body = JSON.stringify({ pid: input.pid, text: input.text.trim() });
    }
  }
  try {
    const response = await fetch(upstream, { method: request.method, headers: { "Content-Type": "application/json" }, body, cache: "no-store", signal: AbortSignal.timeout(12000), redirect: "error" });
    const data = await response.json();
    if (!response.ok) {
      const messages: Record<string, string> = {
        "conversation closed": "討論已結束，仍可查看共識結果。",
        "submissions disabled": "目前暫停接受新觀點。",
        "statement not available": "這則觀點已調整，請重新取得下一則。",
        "statement limit reached": "本場觀點數已達上限。",
      };
      return reply(messages[data.error] ?? "討論服務暫時無法完成操作，請稍後重試。", response.status);
    }
    return Response.json(data, { headers });
  } catch { return reply("暫時無法連線至討論服務，請稍後重試。", 502); }
}

export const GET = forward;
export const POST = forward;
