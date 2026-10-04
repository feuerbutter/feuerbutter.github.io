# Design decisions

The site follows an academic editorial layout: warm paper (`#faf9f6`), navy (`#002147`), sage (`#A3C1AD`) and restrained red/teal accents, Georgia headings and a system sans-serif body. A 1080 px reading area, fine dividers and open layouts establish hierarchy. The owner requested the AtmNu plotting palette during implementation, superseding the original single-teal proposal. No portrait was supplied; the text-led introduction uses an adjacent research summary.

The five primary destinations are Home, Research, Publications, Talks and CV. Research is organised around questions, methods, personal contributions and public outputs. A single canonical bibliography generates the homepage, publication list, three substantive selected-paper pages, citations and public PDF.

All reading and navigation work with zero client JavaScript. The site makes no font, analytics or profile-API request. Visible focus, a skip link, semantic landmarks, named links, mobile navigation and print styles are provided. Body copy is approximately 17–18 px on desktop. No animation is required, and the stylesheet respects reduced motion.

Astro 7.3.5, Node 24 and pnpm 11.19.0 were selected against the current package metadata. Dependencies are locked. GitHub Actions are pinned to verified official release-tag commits. No database, UI framework or server adapter is used.

The homepage remains compact and research-led. Empty news, teaching and profile sections are omitted. The scholarly metadata appears only on individual publication pages, not the aggregate list. Indexing by a search engine is not guaranteed.

## Shared plotting palette

The current FactorPlotting `docs/atmo_palette.md` and default style were checked in place on 5 October 2026 at commit `b05406d`. Its custom ATMO vibrant base tuple is navy `#002147`, cyan `#33BBEE`, teal `#009988`, orange `#EE7733`, red `#ED2939`, blue `#0077BB`, sage `#A3C1AD`. The three-series order is navy/red/teal.

The site uses navy for text/actions, sage as a labelled panel fill, and navy/red/teal rules as supplementary research accents. All seven original values are named CSS tokens. Pale/bright palette colours are not used as small body text on white. Research labels and numbers carry meaning independently of colour; the page does not borrow physics class labels from the plotting scheme. The public CV and favicon share the navy.
