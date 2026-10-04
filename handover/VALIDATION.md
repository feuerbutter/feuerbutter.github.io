# Validation — 5 October 2026

Implementation: Astro 7.3.5, Node 24.19.0, pnpm 11.19.0. Browser: Microsoft Edge on macOS, production build served over loopback. Pre-release results apply to the reviewed implementation. The production release and live verification below confirm that the same build is published.

## Completed

- `pnpm check`: zero errors, warnings and hints.
- `pnpm build`: nine HTML pages (five main pages, three paper pages, 404), plus eight citation files, sitemap and public assets.
- `pnpm test`: generated HTML, local links/fragments, canonical URLs, metadata uniqueness, heading hierarchy, landmarks, image alternatives, named links, publication deduplication, full citation authors, scholar tags, sitemap, PDF signature and zero-script output. Exact final counts/size measurements are in `qa/build-check.json`.
- All nine HTML pages opened directly in Edge. Main content and longest paper titles checked at mobile width. Main pages also checked at 1440 px.
- Homepage reflow at 320, 360, 390, 768, 1280 and 1440 px: no horizontal overflow. Body biography is 17 px on small screens and 18 px on desktop. Main navigation hit areas are at least 44 × 44 px. See `qa/responsive-home.json`.
- Keyboard: first Tab reaches the visible skip link; Enter focuses `main`; next Tab reaches the first content link. Focus is a visible 3 px solid outline. Screenshot: `qa/keyboard-focus.jpg`.
- Native Edge browser zoom: 200% confirmed by browser UI, effective 720 px viewport from 1440 px; CV reflow has no overflow. Zoom restored to 100%. See `qa/zoom-200.jpg`.
- Native Edge CV print preview: three pages, navigation/actions suppressed, readable print layout; print was cancelled without saving or printing.
- Core content is server-rendered HTML with no script elements or JavaScript assets. The complete content/link checks run on this HTML; no runtime script is needed. Browser JavaScript was not separately disabled through settings.
- All visible homepage text colour pairs were measured from computed browser styles: navy/paper 15.24:1, muted/paper 5.89:1, paper/navy 15.24:1, navy/sage 8.24:1. These exceed WCAG AA normal-text contrast. See `qa/contrast.json`.
- Three-page public CV rendered with Poppler and every page visually inspected after the final navy palette change. Chinese name uses an embedded subset font; titles, dates, email, links and page breaks are intact. PDF is 43,916 bytes.
- Outgoing links: 17 of 19 distinct URLs returned HTTP 200. The EPJ proceedings and Entropy DOI destinations returned HTTP 403 to the automated fetch; both have verified bibliographic records and remain linked. No 404 observed. See `qa/external-links.json`.

## Limits and release checks

No Lighthouse score or full screen-reader/WCAG certification is claimed. Automated accessibility checks cover the named structural checks above; they are not an axe audit. The public PDF is not tagged; the HTML CV provides the accessible reading alternative. Print preview was checked for CV, not every publication pagination variant. User-site root paths and all assets pass local checks; production route/asset/404 checks are complete as recorded below.

No portrait or unverified researcher identifiers were added. The content audit records the source-CV date ambiguity, publisher title spelling and the Neutel event/archive date reconciliation.

## Production release — 5 October 2026

- Owner approved publishing. PR #2 merged as `b727f3eeea31c3c8b3eadf0a96763ac41b37273f` after both checks passed.
- Pages source changed to GitHub Actions and verified persisted on a fresh settings page before merge. HTTPS enforced; no custom domain.
- Deployment succeeded in 34 seconds: https://github.com/feuerbutter/feuerbutter.github.io/actions/runs/37245380412 . GitHub reported non-fatal hosted-runner/action runtime migration notices; all build, test and deploy steps passed.
- HTTP checks: all 22 published files returned HTTP 200 and matched the reviewed local build exactly, including all HTML, the three-page PDF, eight BibTeX files, CSS, favicon, robots.txt and sitemap. One deliberately missing route returned HTTP 404 with the exact custom 404 content. See `qa/live-http-check.json`.
- Live browser: all nine HTML views opened successfully (the custom 404 via a missing URL), correct headings and navy styling, no desktop overflow. Homepage canonical and `mailto:wjli@ihep.ac.cn` verified. See `qa/live-browser-routes.json` and `qa/live-desktop.jpg`.
- At 390 px: homepage and Publications had no horizontal overflow; all five navigation targets were at least 44 × 44 px, and the Publications navigation link worked. Viewport override reset after checking. See `qa/live-mobile.jpg`.
- Published PDF opened in Edge's viewer as three pages; first-page identity and appointment/education layout checked. The HTTP byte comparison establishes the same previously reviewed three-page document is served. See `qa/live-cv-viewer.jpg`.
