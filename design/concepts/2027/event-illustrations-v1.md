# 2027 活動插畫

## 目前使用狀態（2026-09-09）

依使用者的三處版面註記，活動理念區已移除人物插畫；議題實驗室改為深綠與橘色交會雙環；頁尾改為中央留白的黃色星芒，並移除椅子紙卡及其圖說。兩個裝飾圖形由 `app/2027/event-symbol.tsx` 輸出 SVG，沿用活動配色，手機版縮小尺寸。活動 favicon 與主視覺未變更，以下三張 PNG 保留作為歷史素材，不再由活動頁引用。

已發布至正式網域，部署為 `dpl_CNGW27JFDGJMjSaB8XSgfd3FqjhN`。桌面與手機版已檢查，無水平溢出；討論頁籤和結果頁入口正常。ESLint、8 項報名回歸測試與 Vercel 建置通過。正式 `/2027` 與 `/2027/report` 回應 200，報名介面保持隱藏，報名 API 回應 404。

## 第一版製作紀錄（2026-09-08）

使用內建 imagegen 生成。正式採用第一版透明 PNG；去除光暈的試稿出現不透明格紋，未用於網站。所有正式圖片保留原始 alpha 與版畫紋理，以米白紙片承接邊緣的柔光。

2026-09-08 已發布至 https://www.neogen.org.tw/2027 ，Vercel 部署為 `dpl_Awsagc2JYeGazhFUC2iyrca9CZ7q`。活動頁與報告頁的 icon 均為 96 × 96 PNG；三張插畫使用 Next Image 的延遲載入、固定比例與響應式尺寸。桌面及 390 × 844 手機版、共識頁籤與報告導覽均經瀏覽器檢查，ESLint、8 項報名回歸測試與 Vercel 建置通過。正式報名區仍不渲染，報名 API 維持 404。

## 第一版素材與原位置

- `public/2027/youth-dialogue-v1.png`：活動理念／一起提問，1536 × 1024。
- `public/2027/exchange-ideas-v1.png`：議題實驗室／交換觀點，1536 × 1024。
- `public/2027/seat-for-you-v1.png`：頁尾邀請／留一個位置給你，1536 × 1024。
- `public/2027/youth-voice-icon-v1.png`：已確認的活動 icon，由 `app/2027/icon.tsx` 輸出 96 × 96 PNG，套用 /2027 及其子頁。

## 生成提示

### youth-dialogue-v1

Use case: editorial illustration for a Taiwanese youth public-dialogue event website. Create one finished isolated illustration in a cohesive handmade screenprint / linocut style: bold broad dark forest-green contours, slightly irregular hand-cut edges, restrained dry-ink grain inside colored shapes, flat graphic shapes, warm playful civic culture. Strict palette: forest green #195B32, vermilion orange #E95A08, sunflower yellow #FFE02C, warm ivory #F7F5E9. This matches a yellow speech-bubble sticker emblem holding an orange megaphone with a thick forest-green rim. No text, lettering, numbers, labels, watermark, logo, flags, gradients, realism, 3D lighting, mockup or surrounding UI. Genuinely transparent PNG background with clean alpha; no opaque rectangular background or baked checkerboard. Main silhouettes use ivory details and a modest ivory paper-cut outer contour so they remain legible on both ivory and dark-green webpage sections. Give art 8% safe margins, no cropped subjects. High resolution, landscape 3:2 composition, compact balanced silhouette.
Subject: three friendly stylized young adults of Taiwan seated closely around a simple orange oval discussion table, waist-up or seated simplified forms. One raises a hand with curiosity, one listens attentively, one holds an open notebook with only abstract short strokes. Dark-green hair, ivory skin as unshaded print negative space, yellow/orange/ivory clothing. Above the group, two small wordless speech bubbles and one simple four-point yellow spark form a gentle arch. Two understated leaf shapes at the base. A lively cohesive editorial scene about asking questions together, not a collection of separate icons. Faces are minimal and expressive, hands anatomically coherent, clear gesture and warm inclusive atmosphere.

### exchange-ideas-v1

Use case: editorial illustration for a Taiwanese youth public-dialogue event website. Create one finished isolated illustration in a cohesive handmade screenprint / linocut style: bold broad dark forest-green contours, slightly irregular hand-cut edges, restrained dry-ink grain inside colored shapes, flat graphic shapes, warm playful civic culture. Strict palette: forest green #195B32, vermilion orange #E95A08, sunflower yellow #FFE02C, warm ivory #F7F5E9. This matches a yellow speech-bubble sticker emblem holding an orange megaphone with a thick forest-green rim. No text, lettering, numbers, labels, watermark, logo, flags, gradients, realism, 3D lighting, mockup or surrounding UI. Genuinely transparent PNG background with clean alpha; no opaque rectangular background or baked checkerboard. Main silhouettes use ivory details and a modest ivory paper-cut outer contour so they remain legible on both ivory and dark-green webpage sections. Give art 8% safe margins, no cropped subjects. High resolution, landscape 3:2 composition, compact balanced silhouette.
Subject: two large interlocking wordless speech bubbles, one orange and one yellow, with thick forest-green outlines and ivory interior cutouts, cradled by two simple stylized hands reaching from lower left and lower right. One bubble carries a tiny simple leaf motif, the other three large rounded dots; a small ivory four-point spark marks where the bubbles meet. The hands emerge from green and ivory sleeves. The complete composition symbolizes exchanging different opinions and finding common ground. Strong sculptural paper-cut silhouette, simple forms, generous negative space, no diagram nodes or chart, no people faces, no megaphone. Keep wide and compact, almost like an original printed badge.

### seat-for-you-v1

Use case: editorial illustration for a Taiwanese youth public-dialogue event website. Create one finished isolated illustration in a cohesive handmade screenprint / linocut style: bold broad dark forest-green contours, slightly irregular hand-cut edges, restrained dry-ink grain inside colored shapes, flat graphic shapes, warm playful civic culture. Strict palette: forest green #195B32, vermilion orange #E95A08, sunflower yellow #FFE02C, warm ivory #F7F5E9. This matches a yellow speech-bubble sticker emblem holding an orange megaphone with a thick forest-green rim. No text, lettering, numbers, labels, watermark, logo, flags, gradients, realism, 3D lighting, mockup or surrounding UI. Genuinely transparent PNG background with clean alpha; no opaque rectangular background or baked checkerboard. Main silhouettes use ivory details and a modest ivory paper-cut outer contour so they remain legible on both ivory and dark-green webpage sections. Give art 8% safe margins, no cropped subjects. High resolution, landscape 3:2 composition, compact balanced silhouette.
Subject: a single welcoming orange wooden chair in a charming flat three-quarter view, with dark-green linework and yellow seat, next to a small open ivory notebook resting on the seat corner. The chair is completely empty, ready for someone to join a conversation. A small green leafy sprig rises behind the chair on the left and three short yellow welcome rays shine to the upper right. A sweeping yellow oval print at the base subtly echoes a conversation circle; maintain transparent space around the silhouette. Give chair and leaves a clear ivory paper-cut outer outline so the illustration reads strongly on a forest-green background. Few purposeful objects, refined simple composition, no other chairs or people, no lettering.

## 試稿修正提示（未採用）

Edit the provided illustration. Preserve the exact composition, people/objects, colors, ink grain, and crisp ivory sticker outline. The ONLY change is to completely remove the blurry glow/halo/shadow surrounding the illustration and between all separate shapes. Everything outside the crisp ivory paper-cut edge must be perfectly transparent (alpha=0), including gaps between elements. There must be NO glow, NO feathered light, NO drop shadow, NO grey backdrop, NO background color, and NO checkerboard pixels. Keep the crisp slightly irregular ivory outline itself. Deliver the same landscape PNG dimensions with real transparent background. Do not redraw, move, or add objects. The asset must composite cleanly onto a solid forest-green website background.

Remove the background from this illustration and return a transparent-background PNG cutout. Preserve the printed artwork and its crisp cream outline exactly. Remove all gray checkerboard areas, including holes inside the artwork. No shadow or glow. This is a background-removal task, not a mockup.
