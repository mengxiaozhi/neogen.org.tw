# 2027 青年參議院活動頁

先以內建 image_gen 生成網頁概念，再生成正式插畫，最後實作 `/2027`。

- `landing-concept.png`：網頁視覺概念。
- `/public/2027/youth-assembly-illustration.png`：網頁正式插畫。
- `/public/2027/event-poster.png`：使用者提供的原始海報，原樣保存供下載。
- 已知資訊包含「2027」「青年參議院」「立法院會議」，使用者另確認活動於 2027 年 1 月 25 日至 27 日舉辦。每日活動時間、場地、報名條件、費用、議程皆未提供，網頁明確標示待公布。活動理念為宣傳文案，不表示已確認的議程。

## 3D 互動方向

參考 [g0v Summit 2026](https://summit.g0v.tw/2026/) 首屏以物件操作探索場景的方式，另以本活動的橘、綠、米白色重新製作議事小劇場。沒有沿用參考網站的模型或程式碼。

- Three.js 原生場景：議事建築、七張椅子、議事槌、太陽與葉片。建築是互動示意，不代表已確認的活動場地。
- 拖曳旋轉、點椅子變色、敲槌帶動座位與彩紙、重設場景；按鈕也支援鍵盤。
- 只在進入畫面後載入 3D；減少動態或節省數據時預設顯示原插畫。減少動態下手動開啟 3D 只在操作時繪製，不啟動自動動畫。
- 手機保留垂直捲動與頁面縮放，水平滑動可旋轉；捲離場景或切換背景分頁即停止繪製。
- 可切回插畫；切換、離開頁面及 WebGL 失效時清除動畫、事件與 GPU 資源。

## Concept prompt (built-in image_gen)

Use case: ui-mockup. Create one polished desktop event landing page visual concept, 1440 x 1200, for the Traditional Chinese event "2027 青年參議院 — 立法院會議". Input image is the supplied official poster, a visual and event-name reference, NOT a layout to duplicate. Current date 2026-09-07. Only known event facts are year 2027 and the exact event name; do not invent date, venue, agenda, speakers, registration eligibility, partners, or pricing.
Visual direction: independent youth culture editorial, vibrant risograph print, cream/off-white paper #f7f5e9, deep evergreen #185b32, burnt bright orange #e85505, sunny yellow #ffe02c. Large confident typography and spacious asymmetric graphic layout, tactile screenprint grain, flat cut paper illustrations. Not a generic corporate landing page.
Top: thin cream masthead with a small simple sun icon and text "青年參議院 2027" left, navigation "活動理念", "活動資訊", "常見問題", and green action "查看活動資訊" right, thin green rule.
Hero takes most of first 900px, left 50% type, right 50% illustration. On left tiny editorial eyebrow "讓青春，走進公共現場". Huge orange "2027" around 200px; enormous dark green "青年參議院" on two neatly stacked lines; orange subtitle "— 立法院會議 —". A compact 2-line invitation in readable dark green: "讓每一個提問，都成為改變的起點。" Main orange button "探索活動" with diagonal arrow, secondary underlined link "收藏活動海報". On right use a new lively composition based on the supplied poster: 3 youthful figures, one holding a megaphone, another raising a hand, one with a notebook, orange stylized civic building and gavel, white lilies and Taiwan silhouette, yellow irregular sun and green leaves. Illustration blends seamlessly into the cream background, no card or frame. Small rotated yellow sticker "青春發聲中".
Across bottom of hero a full-bleed green ribbon with spaced cream text "獨立思考 ✳ 青年發聲 ✳ 公共參與 ✳ 多元對話".
Below ribbon start the next cream editorial section: a small left section index "01 / 活動理念", large left headline "關心的事，\n一起帶進討論。" and 2 short readable paragraphs on right about youth public participation. Enough whitespace. All UI text Traditional Chinese with exact event name, avoid invented factual details. No browser chrome, no device mockup, no shadows, no gradients. Buildable intentional website design.

## Illustration prompt (built-in image_gen)

Use case: illustration-story. Asset type: final website hero illustration for 2027 青年參議院. Generate a new standalone editorial risograph artwork, portrait near-square 1024x1200. Input image 1 is the original official event poster: preserve its hand printed youth activism illustration language, color palette and the appearance/clothing of the three illustrated youths. Input image 2 is a website concept: extract/recreate only the RIGHT SIDE illustration as a clean standalone asset, remove all page UI and ALL text and numbers.
Composition: three expressive Taiwanese illustrated youth in foreground at bottom half: on left a young man with short tousled hair, backpack and raised arm; in center a young woman with ponytail, backpack, holding a notebook; on right a young man wearing cap and hoodie speaking through a megaphone. Friendly expressive bold deep green ink outlines and cream fills. Behind them an orange simple symmetrical civic assembly building with steps and an orange gavel above. Upper area has white lilies outlined in green, small deep green silhouette of Taiwan near top right, yellow sun with short rays, small outlined white dove, tiny hand drawn cloud. Bottom foreground green leaves, organic bright yellow and burnt orange bush shapes. Main objects have generous separation, illustration fills right/left edge naturally and reaches bottom edge, but top is comfortably padded.
Style: beautiful lively vintage Taiwanese community poster, hand-cut linocut / silk screen printing, subtle speckled ink gaps, thick energetic imperfect contours. LIMITED spot colors: deep evergreen #195b32, orange #e85505, yellow #ffe02c, warm ivory. Background flat uniform warm ivory #f7f5e9, no heavy distressed background, no vignette, no gradient. Clear legible silhouettes, artisan design. Critical: absolutely NO text, NO letters, NO year, NO sticker, NO labels, no typography or UI, no watermark. Entire output is illustration art only, not a website screenshot, no frame, no phone, no photorealism.
