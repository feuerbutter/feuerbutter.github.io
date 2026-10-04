# Launch and rollback

## Before release

- Review the PR, public content and desktop/mobile screenshots in `handover/qa/`.
- Ensure `pnpm check`, `pnpm build` and `pnpm test` pass.
- Inspect the public PDF and verify the email, appointment and contribution wording.
- Obtain the owner's release approval, as required by the implementation plan. A feature-branch push and PR validation do not release the site.

## Original deployment

Observed on 5 October 2026: GitHub Pages uses **Deploy from a branch**, branch **main**, folder **/ (root)**. There is no custom domain. HTTPS is enforced. The previous content commit is `e811184758001d1170fdcb8275a1c71edf0fd445`. No repository workflow existed at that commit.

## Release after approval

1. In Settings → Pages, switch Source to **GitHub Actions** before merging; leave the custom domain empty and HTTPS enforced.
2. Merge the reviewed PR to `main`. The `Deploy to GitHub Pages` workflow builds, checks and publishes only `dist/`.
3. Verify successful deployment for the merged commit and record its run URL and commit in `handover/CURRENT.md`.
4. Open the live root, `/research/`, `/publications/`, `/talks/`, `/cv/`, each of the three selected-paper pages and `/cv/Weijun-Li-CV.pdf`.
5. Check the deployed CSS and favicon, mail link, citation downloads, DOI/arXiv links, canonical metadata and `/sitemap.xml`.
6. Visit a deliberately missing path and verify the custom 404 page with an HTTP 404 status. Repeat mobile navigation and a direct nested-route visit.

PR checks never deploy to Pages. Manual dispatch of the deployment workflow is restricted to `main` by the build-job condition.

## Rollback

For a normal content correction after migration, revert the relevant change on `main`, push the revert and verify the subsequent Actions deployment. Never force-push.

To restore the pre-migration website, use a reviewable revert of the migration commit(s), restoring `index.html`, the original README, and removing the added build/workflow files from the tracked tree. The baseline is `e811184758001d1170fdcb8275a1c71edf0fd445`; preserve later unrelated changes. Then restore Settings → Pages to **Deploy from a branch**, **main**, **/ (root)**. Keep HTTPS enabled and no custom domain. Verify the branch deployment succeeds and the old site is served.

Restoring only the HTML while leaving Pages configured for the removed build workflow is not a complete rollback. Local file retirement follows the owner's recoverable move policy.
