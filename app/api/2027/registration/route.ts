import { isEventRegistrationEnabled } from "@/lib/event-features";
import { REGISTRATION_FORM_URL } from "@/lib/event-registration";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" };

// Retire the six-field proxy before reading or forwarding any personal data.
export async function POST() {
  if (!isEventRegistrationEnabled()) return Response.json({ error: "找不到此功能。" }, { status: 404, headers });
  return Response.json({
    error: "報名已改用新版 Google 表單，請重新載入活動頁或開啟新版表單填寫。",
    formUrl: REGISTRATION_FORM_URL,
  }, { status: 410, headers });
}
