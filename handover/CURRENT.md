# Academic website redesign

Maintained checkout: `/Users/wjli/Workspace/feuerbutter.github.io`, local Mac.
Branch: `codex/academic-website-redesign`.
Repository: `feuerbutter/feuerbutter.github.io`; upstream `origin`.
Owner: this website implementation chat. No delegated writers or monitors.

## Objective and decisions

Implement the supplied academic website plan using the owner's actual CV. Five main pages, three selected-paper pages, static Astro/TypeScript/CSS, a canonical seven-record bibliography, eight talks/posters, and a three-page public PDF are implemented. Use `wjli@ihep.ac.cn`, explicitly supplied by the owner. Use the shared AtmNu/ATMO vibrant palette, requested during implementation; verified against the maintained FactorPlotting palette at `b05406d`. Research claims stay within the CV and public sources.

## Review and release

Local implementation and QA are complete. Review PR: https://github.com/feuerbutter/feuerbutter.github.io/pull/2 (open, attached to the implementation chat). Implementation commit: `4264b2a8a2fbdf8f3ad1d8822984333444178571`, pushed and verified against origin. The next step is the owner's review and release approval. GitHub validation is configured for every feature-branch push and PR; consult the PR checks for the latest head. The implementation plan explicitly defers production deployment until approval. Pages currently publishes `main` from `/ (root)`; the reviewed migration must switch its source to GitHub Actions before merge. There has been no production deployment in this task.

Baseline: `e811184758001d1170fdcb8275a1c71edf0fd445`. The original local root HTML is recoverably retained under `/Users/wjli/Workspace/discarded/feuerbutter.github.io/redesign-20261005/original/index.html`, as well as in Git history. No data was permanently deleted.

## Evidence and maintenance

- `handover/VALIDATION.md`: checks, measured results and limitations.
- `handover/qa/`: before/after desktop and mobile screenshots plus link/contrast/reflow evidence.
- `docs/CONTENT_AUDIT.md`: CV reconciliation and public source evidence.
- `docs/CONTENT_GUIDE.md`: exact update locations and public PDF regeneration.
- `docs/LAUNCH_CHECKLIST.md`: release and rollback, including the prior Pages configuration.
- Local preview: Astro preview on loopback port 4321; serve `dist/` only.

Original private CV and extraction were kept outside the repository. Optional portrait, additional profile identifiers and teaching/mentoring details remain omitted. Live-site verification is outstanding until release approval and successful deployment.
