# Weijun Li — academic website

A static academic website for [Weijun Li](https://feuerbutter.github.io/), built with Astro, TypeScript and ordinary CSS. Research, publications, talks and the public CV are readable without JavaScript. The original MIT licence and repository history are retained.

## Work locally

Use Node 24 (minimum 22.12.0) and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm test
pnpm preview
```

`pnpm build` produces `dist/`. Only `dist/` is deployed. Do not publish the repository directory as static content: it also contains maintenance documentation and QA evidence. PDF generation is independent of the website build; the reviewed public PDF is committed.

## Maintain content

- [Content guide](docs/CONTENT_GUIDE.md): exact files to edit and the update process.
- [Content audit](docs/CONTENT_AUDIT.md): sources, reconciliations and omitted optional fields.
- [Design decisions](docs/DESIGN_DECISIONS.md): visual and architectural choices.
- [Launch checklist](docs/LAUNCH_CHECKLIST.md): release, live smoke tests and rollback.
- [Current handover](handover/CURRENT.md): implementation and review status.

The site is a GitHub Pages **user site** at the domain root. `astro.config.mjs` deliberately has no repository-name base path. PR checks validate the change without deploying it. After release approval, switch Pages from branch publishing to GitHub Actions, then merge the PR. The deployment workflow accepts only `main`.

Keep private CV originals and internal research material outside this public repository. Only verified professional content belongs in the site and its data files.
