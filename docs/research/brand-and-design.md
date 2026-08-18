# Brand, name, and visual direction

## The name: Slow North

**Slow North** — a North Island small-group tour operator.

### Why not a te reo Māori name

The obvious move for a New Zealand tour company is a te reo name. The research says
don't, and this is a considered position rather than timidity:

> "Using Māori words in names, slogans, or advertising to signify belonging,
> solidarity, or appeal to Māori customers is cultural appropriation unless it is
> based on strong foundations. Those foundations are best laid by building cultural
> competence and connections."
> — Taiuru & Associates, Māori culture guidelines for brand owners

IPONZ runs a **Māori Advisory Committee** over trademark applications, which can decline
a mark on a **noa/tapu** basis. A te reo name is not a design choice a website can make
on an operator's behalf — it needs meaning, whakapapa and, realistically, relationships.

So the *business* name is English. **Te reo still appears throughout the site**, correctly
and with macrons, where it is the actual name of a place (Taupō, Tongariro, Ōpōtiki,
Whirinaki, Te Urewera). Using a place's real name is not appropriation; using a
sacred word as a logo is. That line is deliberate and is drawn once, here.

→ `sam-decisions.md`: if Sam wants a te reo name, the path is engagement first,
IPONZ second — not a naming exercise.

### Why not "Longwhite"

It was the leading candidate until research killed it. **"Long White Tours" is an
existing New Zealand tour operator** (listed on newzealand.com), "The Long White Cloud"
is used by at least two other travel businesses, and **Long White** is a well-known
Asahi RTD brand in New Zealand. Three collisions in one name.

### Why "Slow North" works

It is a **positioning statement, not decoration.** A two-to-four person operator cannot
beat a 16-seat coach on breadth or price — Wild Kiwi does a 7-day North Island loop at
$283/day precisely because it fills sixteen seats. What a small operator *can* sell is
pace: fewer people, longer at each stop, roads the coaches skip.

"Slow North" says that in two words, in the vocabulary of slow travel — an established
category, not an invention. It is English (so it sidesteps the above), reads and
pronounces cleanly for a German speaker, and no New Zealand tour operator is using it.

→ `sam-decisions.md`: name and trademark clearance through IPONZ is Sam's, not mine.
A web search is not a trademark search.

## Visual direction

### The brief's instinct, and where the research moves it

The instinct given was: *New Zealand's blues and greens, possibly on a dark ground,
modern and clean but subtly rich.* Treated as an instinct, not a specification.

**Confirmed: the dark ground.** Category research on premium travel sites converges on
photography-led design where the image carries the mood, with "refined serif headlines,
sans-serif body, deep blue accents, 16:9 hero photography, generous whitespace." A dark
ground lets landscape photography sit *in* the page rather than on it, and it is
genuinely differentiating — nearly every New Zealand tourism site, 100% Pure New Zealand
downward, is bright white.

**Confirmed: blues and greens.** They are the right hues.

**Changed: "blues and greens" alone is a South Island palette.** This is the one place
the research points somewhere else, and it is the most useful thing in this document.

Alpine blue-green — glacial lakes, snow, tussock — is the visual signature of Aoraki,
Fiordland, Wanaka. It is the postcard, and it is *the other island.* The North Island's
distinguishing landscape is **volcanic and geothermal**: basalt and black sand, the
sulphur-yellow and ochre of Wai-O-Tapu, the orange rim of the Champagne Pool, silica
terraces, steam over Rotorua, pumice country on the Central Plateau.

A palette of blue and green alone would render this operator generically *New Zealand*
and specifically *not North Island* — the exact confusion a site selling North Island
tours cannot afford.

**So: blues and greens hold the ground, and a geothermal warm accent does the work.**

### Palette

Drawn from North Island landscape rather than from a colour wheel:

| Token | Drawn from | Role |
|---|---|---|
| **Basalt** — near-black, blue-green shifted, never neutral grey | Piha black sand, volcanic rock | Primary dark ground |
| **Forest** — deep blue-shifted green | kauri and podocarp canopy | Structure, secondary surfaces |
| **Lake** — clear turquoise | Emerald Lakes, Taupō | Primary interactive / link colour |
| **Sulphur** — warm ochre-yellow | Wai-O-Tapu, Champagne Pool rim | **The accent.** Sparingly: CTAs, price emphasis, seasonal markers |
| **Silica** — warm off-white, never pure #fff | silica terraces | Light working surfaces, body text on dark |

The warm accent against cool ground is what produces "subtly rich" without ornament.
One accent, used rarely, reads as considered; two read as a theme.

### Dark ground, but not everywhere — and this is the important nuance

A fully dark site sells exclusivity. This operator sells **$295 day tours to families**,
and full-dark would misprice it visually before a reader reaches a number.

The split, by what the page is doing:

- **Dark (basalt):** hero, destination and itinerary storytelling, galleries, the
  homepage narrative, section transitions. Anywhere photography leads.
- **Light (silica):** prices, dates, what's-included tables, FAQs, booking, policies,
  contact. Anywhere the reader is *working* rather than *dreaming*.

That is also an accessibility argument: dense tabular information at length is harder to
read as light-on-dark, and pricing tables are the densest thing on the site.

### Typography

Per category research — refined serif display, sans body:

- **Display:** a high-contrast serif with real optical presence at large sizes.
- **Body:** a neutral, highly legible sans.
- **Hard requirement: precomposed macron vowels (ā ē ī ō ū).** Taupō, Ōpōtiki, Whakatāne
  and Te Rēinga all need them. A font that only fakes macrons with combining diacritics
  renders them badly and this is exactly the detail a New Zealander notices. Latin
  Extended-A coverage is a **selection criterion, not a nice-to-have** — the same
  unicode-range self-hosting pattern the reference build uses (`../capital-v3`
  `src/styles/global.css`) carries over directly, and German needs ä ö ü ß from the
  same range.

### What is deliberately not done

- **No marae, moko, or taonga as decorative texture.** Not as a background, not as a
  divider, not as an icon set.
- **No "100% Pure" mimicry.** It is a national tourism campaign, not a small operator's
  visual language, and borrowing it reads as either official or derivative.
- **No full-screen autoplay video.** It is the category cliché, it is a bandwidth
  problem on rural New Zealand connections, and a small operator has no footage.
- **No red-and-green pairing.** Pōhutukawa crimson is genuinely the North Island's
  signature flower, and next to forest green it reads as Christmas. The geothermal
  ochre gets the warm slot instead.

## Sources

- Taiuru & Associates, Māori culture guidelines for brand owners — https://www.taiuru.co.nz/branding/
- RNZ, Can companies legally use Māori names? — https://www.rnz.co.nz/life/people/identity/can-companies-legally-use-maori-names
- Long White Tours (existing operator) — https://www.newzealand.com/int/plan/business/long-white-tours/
- Long White (Asahi Beverages NZ) — https://www.longwhite.co.nz/
- Luxury/travel web design pattern research, 2026-08-18 — Colorlib, Mediaboom, SiteBuilderReport surveys
