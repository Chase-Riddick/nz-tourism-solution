# Prototypes — throwaway by design

`design-room-bakeoff.tpl.html` is the source template for the 2026-08-19 design
bake-off (four style boards: Modern Heritage / Field Notes / Big Sky / Sharp Kiwi),
published as the "Sam's NZ Design Room" artifact. `@@…@@` tokens are spliced at
build time: fonts from Google Fonts subsets (Fraunces, Inter, Caveat, Archivo
Black) and photography base64'd from `public/photos/`. Prices on the boards are
placeholders set 15% under Cheeky Kiwi's published Aug 2026 list.

This is **not** production code (prototype skill, UI branch). The winning board's
patterns get re-implemented behind failing tests in the v2 rebuild — never copied
across. Delete this directory once the v2 design system is merged.

## The canvas (2026-08-21)

`canvas.tpl.html` — the E-only refinement canvas that supersedes the bake-off as
the working surface (issues #17, #21, #22, #23, #24, #27, #28). One long page:
the Night & Day homepage followed by every other page type — tours, two detail
templates, the five-step booking flow with inert mock checkout, guides, FAQ and
policies, contact — all in the E system, all with real researched content.
A `№ sections` toggle (or the `n` key) overlays addressable section numbers.
Review happens in batches against a PDF of questions, not per-slice rounds
(process change recorded on #16). Built locally with the same token-splice
script as the bake-off; never merged, patterns re-implemented behind failing
tests only.
