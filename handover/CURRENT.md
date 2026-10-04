# Academic website redesign

Maintained checkout: `/Users/wjli/Workspace/feuerbutter.github.io`, local Mac.
Branch: `main` (maintained checkout synchronized after release).
Review branch: `codex/academic-website-redesign`, retained for history.
Repository: `feuerbutter/feuerbutter.github.io`; upstream `origin`.
Owner: this website implementation chat. No delegated writers or monitors.

## Objective and decisions

Implement the supplied academic website plan using the owner's actual CV. Five main pages, three selected-paper pages, static Astro/TypeScript/CSS, a canonical seven-record bibliography, eight talks/posters, and a three-page public PDF are implemented. Use `wjli@ihep.ac.cn`, explicitly supplied by the owner. Use the shared AtmNu/ATMO vibrant palette, requested during implementation; verified against the maintained FactorPlotting palette at `b05406d`. Research claims stay within the CV and public sources.

## Review and release

The owner approved merge and publication on 5 October 2026. PR https://github.com/feuerbutter/feuerbutter.github.io/pull/2 is merged. Release commit: `b727f3eeea31c3c8b3eadf0a96763ac41b37273f`. Both PR validation checks passed before merge. GitHub Pages source is now **GitHub Actions**, verified on a freshly loaded settings page before confirming the merge. HTTPS remains enforced and there is no custom domain.

The production deployment succeeded: https://github.com/feuerbutter/feuerbutter.github.io/actions/runs/37245380412 (34 seconds; build and deploy successful). Live website: https://feuerbutter.github.io/ . All 22 published files matched the approved build byte-for-byte. A deliberately missing path returned HTTP 404 with the custom page. Every HTML route was opened in Edge; mobile navigation, the navy styling, contact email, canonical URL and public three-page PDF were verified. Evidence is in `handover/qa/live-*`.

Automatic approval review initially rejected merge confirmation because saved Pages configuration had not yet been verified. A fresh settings page established that GitHub had persisted the source selection automatically; the subsequent merge was accepted. No controls were bypassed and no permission blocker remains.

Current next step: normal content maintenance using `docs/CONTENT_GUIDE.md`. No release action remains. The release-record commit changes documentation and QA evidence only, not deployed content.

Baseline: `e811184758001d1170fdcb8275a1c71edf0fd445`. The original local root HTML is recoverably retained under `/Users/wjli/Workspace/discarded/feuerbutter.github.io/redesign-20261005/original/index.html`, as well as in Git history. No data was permanently deleted.

## Evidence and maintenance

- `handover/VALIDATION.md`: checks, measured results and limitations.
- `handover/qa/`: before/after desktop and mobile screenshots plus link/contrast/reflow evidence.
- `docs/CONTENT_AUDIT.md`: CV reconciliation and public source evidence.
- `docs/CONTENT_GUIDE.md`: exact update locations and public PDF regeneration.
- `docs/LAUNCH_CHECKLIST.md`: release and rollback, including the prior Pages configuration.
- Local preview: Astro preview on loopback port 4321; serve `dist/` only.

Original private CV and extraction were kept outside the repository. Optional portrait, additional profile identifiers and teaching/mentoring details remain omitted. Full screen-reader, axe and Lighthouse audits remain outside the completed checks; see `handover/VALIDATION.md`.
