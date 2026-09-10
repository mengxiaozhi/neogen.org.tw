# Logo integration design QA

## Evidence

- Source visual truth: `/Users/mengxiaozhi/Documents/ChatGPT/neogen.org.tw/design/references/association-lily-pen-source.png`
- Generated design master: `/Users/mengxiaozhi/Documents/ChatGPT/neogen.org.tw/design/concepts/brand/association-logo-duotone-v1.png`
- Production assets: `/Users/mengxiaozhi/Documents/ChatGPT/neogen.org.tw/public/brand/association-logo-main.png` and `/Users/mengxiaozhi/Documents/ChatGPT/neogen.org.tw/public/brand/association-logo-event.png`
- Focused implementation comparison: `/Users/mengxiaozhi/Documents/ChatGPT/neogen.org.tw/design/qa/association-logo-comparison.png`
- Browser-rendered implementation: Codex in-app browser captures from `http://127.0.0.1:3218/` and `http://127.0.0.1:3218/2027`, inspected inline during this QA pass.
- Desktop viewport: 1280 × 720 CSS px at device scale factor 1.
- Mobile viewport: 375 × 812 CSS px at device scale factor 1.
- Source pixels: 960 × 960. Generated master: 1254 × 1254. Production assets: 768 × 768 with alpha. Focused comparison canvas: 1600 × 900.
- Density normalization: source and production marks were each rendered into fixed comparison panels with contain sizing; no browser or device chrome was included.
- States checked: main header, main full-screen mobile navigation open, 2027 header at desktop and mobile widths, and 2027 mobile footer.

## Findings

- No actionable P0, P1, or P2 differences remain.
- Fonts and typography: the main wordmark keeps the existing display-serif treatment and the 2027 lockup keeps its existing sans-serif sticker typography. Both retain readable hierarchy and remain on one line at the tested 375 px viewport.
- Spacing and layout rhythm: the symbol-to-wordmark gaps, 40–52 px header marks, mobile close/menu controls, and footer lockup remain aligned without overflow or clipped tap targets.
- Colors and visual tokens: the main version maps the mark to `#0a0a0a` and `#f2380a`; the event version maps it to `#195b32` and `#e85505` on `#f7f5e9`. These match the existing site tokens and keep sufficient contrast on both light and green menu backgrounds.
- Image quality and asset fidelity: the lily, diagonal fountain pen, nib, cap, and warm accent details remain recognizable. The production PNGs preserve transparent edges and remain sharp at header size. No placeholder, code-drawn approximation, or stretched raster is used.
- Copy and content: no organization name, activity title, legal information, navigation label, or contact copy changed.
- Accessibility: decorative logo instances use empty alternative text within already-labelled links. Brand links keep explicit accessible names, and mobile menu controls remain keyboard-labelled.

## Full-view comparison evidence

- Main desktop: the 48 px mark anchors the left wordmark without increasing the 92 px header height or crowding desktop navigation.
- Main mobile: the 40 px mark and association name fit beside the 44 px menu control at 375 px. In the open full-screen menu, the logo remains visible on a white tile over the dark background.
- 2027 desktop: the header deliberately keeps only the yellow `YOUTH ON AIR` activity lockup; removing the separate association mark restores clear space without shifting the navigation or CTA.
- 2027 mobile: the same activity-only lockup fits comfortably beside the 44 px menu control without clipping.
- 2027 footer: the 40 px association mark aligns with the association link without a frame, border, or contrasting tile and does not force the legal-information rows off canvas.

## Focused comparison evidence

- The combined comparison image places the supplied source beside both production variants at normalized sizes. The simplified mark retains the source's flower-over-pen relationship and diagonal movement while removing the texture and fine speckling that would collapse at navigation size.
- A focused region beyond the logo lockups was not needed because no other page imagery or layout was redesigned.

## Comparison history

1. Initial generated master: the central mark was directionally correct, but isolated dark speckles remained in transparent padding. This was a P2 image-quality issue at large export sizes.
2. Fix: the asset-preparation script now keeps the centered connected artwork component, removes isolated pixels, flattens each site palette, trims the alpha bounds, adds proportional transparent padding, and resizes with Lanczos filtering.
3. Post-fix evidence: `design/qa/association-logo-comparison.png` shows clean padding and consistent contours in both palettes. Browser captures confirm no visible halo, crop, or layout overflow at desktop and mobile header sizes.
4. Annotation refinement: the separate association mark was removed from the 2027 header, and the frame was removed from the footer mark. Browser inspection at 983 × 692 and 375 × 812 confirms the requested lighter lockups.

## Interactions and runtime checks

- Main mobile menu opened, completed its transition to full screen, and closed successfully.
- Browser console errors and warnings checked after both routes and responsive states: none.
- Root and 2027 Open Graph image routes rendered successfully with the corresponding logo palettes.
- Production build, TypeScript, ESLint, and diff whitespace checks passed.

## Follow-up polish

- None required for the requested logo integration.

final result: passed
