# Content guide

All public content is local and checked at build time. Visitors do not call publication APIs.

| Change | Edit |
| --- | --- |
| Name, role, affiliation, email, biography, GitHub | `src/data/profile.json` |
| Papers, full author order, citation names, status, selected ordering | `src/data/publications.json` |
| Research narratives and associated publication IDs | `src/content/research/*.md` |
| Talk dates, titles, presenter/coauthor roles, public resource links | `src/data/talks.json` |
| Appointments, education, awards, collaborations, languages | `src/data/cv.json` |
| Public PDF | `public/cv/Weijun-Li-CV.pdf` |
| Colours and fonts | `src/styles/tokens.css` |
| Layout and responsive/print styling | `src/styles/global.css` |

Publication `authors` preserve full source order. `bibtexAuthors` preserve the same order in unambiguous `Family, Given` form, including multiword family names. Shortened display lists are generated; do not reorder authors to put the owner first. `selectedRank` selects the homepage entries and generates the corresponding detail pages. Each selected paper has a summary and a CV-supported personal-contribution paragraph. A journal paper and its preprint share one record with a separate `preprintYear`.

`public: true` records are curated public website content. It is a build-time content field, not permission to publish future unreviewed material. Keep any private drafts outside the repository. The public dataset intentionally does not attempt to import the full T2K collaboration bibliography.

Add a paper or talk by editing its dataset, then run `pnpm check && pnpm build && pnpm test`. Inspect long titles at mobile width. The generated bibliography and individual `.bib` files require no separate edits. Update profile `reviewed` and CV `issued` only when their content has actually been reviewed; they are not build timestamps.

## Public CV

The public edition is a compact academic record, not a verbatim copy of the private source document. It omits application-oriented marks, grant amounts, speculative/internal performance claims and any unprovided personal details. It retains appointments, degrees, awards, the seven scholarly records, eight presentations, software, detector work and skills.

The committed PDF is built from the same JSON records:

```sh
python3 -m pip install reportlab
python3 scripts/build-public-cv.py
```

For the Chinese name, pass `--cjk-font /path/to/a/Chinese-capable.ttf`; the reviewed edition used the locally available Arial Unicode font. The optional font is subset-embedded, and the PDF remains portable. Without a font argument, the generator uses the English name. Use the installed/bundled Python environment rather than installing packages when ReportLab is already available.

After generation, render and inspect every PDF page, including pagination and glyphs. Reconcile the issue date in `cv.json` and the displayed/public-PDF date. The script uses that date; do not replace the original CV revision date with the public-edition date. The source document did not declare a revision date.

## Optional additions

A verified portrait, researcher identifiers, teaching and mentoring can be added when supplied. There are no empty placeholders for them. Use public event pages rather than private slide attachments. No analytics, scheduled scraping or remote runtime data source is configured.
