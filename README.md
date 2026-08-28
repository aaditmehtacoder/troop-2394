# Troop 2/394 — Santa Clara, California

The website for **Scouts BSA Troop 2/394** (Troop 394 and linked girl Troop 2394),
chartered by the Santa Clara Elks Lodge #2347 since March 1993.

Built as a pixel-faithful reconstruction of scouting.org's design language,
retailored to the troop. Replaces the legacy DokuWiki at `troop-394.org`,
which currently returns HTTP 500.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run check    # lint + typecheck + build
```

Node 24+.

## Editing the site

**Almost everything lives in one file: [`src/data/troop.ts`](src/data/troop.ts).**
Meeting times, the calendar, contact details, dues, FAQs, leadership roles,
Eagle projects, navigation — all of it. You never need to touch a component to
change content.

Lines tagged `// CONFIRM` have a source conflict or may be stale. Read
[`docs/research/TROOP_394_FACTS.md`](docs/research/TROOP_394_FACTS.md) before
publishing — it lists every fact on the site with its source, plus the three
things worth checking with the council.

## Pages

| Route | What's on it |
|---|---|
| `/` | Hero carousel, program tiles, Oath & Law, value pillars, quotes, upcoming events, high adventure |
| `/about` | Who we are, patrols, youth leadership, adult roles, troop history |
| `/program` | Weekly meeting agenda, the patrol method, leadership tracks, service |
| `/advancement` | The seven ranks, merit badges, boards of review, Trail to Eagle, our Eagle Scouts |
| `/outdoors` | Monthly campouts, where we camp, Camp Hi-Sierra, high adventure, gear, Leave No Trace |
| `/calendar` | Filterable program-year calendar |
| `/safety` | Youth Protection, two-deep leadership, health forms, reporting |
| `/resources` | Forms, new family guide, dues, council & district |
| `/join` | Five steps to join, when/where, who can join, cost, FAQ |
| `/contact` | Contact details, message form, map, directions |
| `/support` | Ways to give money or time |

## Design

Design tokens were extracted from scouting.org with live `getComputedStyle()`
calls and are documented in
[`docs/research/scouting-org/DESIGN_TOKENS.md`](docs/research/scouting-org/DESIGN_TOKENS.md);
the interaction model is in `BEHAVIORS.md` alongside it.

- Navy `#003F87`, utility bar `#005696`, accent blue `#067EEB`, red `#CE1126`, tan `#D6CEBD`
- Roboto Slab for headings, nav, and buttons; Roboto for body — self-hosted via `next/font`
- Every button is a 28px pill in uppercase Roboto Slab, as on the original
- Two-row fixed header: navy utility bar over a white nav bar with dropdowns

**No image files.** The fleur-de-lis, troop badge, icons, and every landscape
backdrop are original inline SVG, so the site hotlinks nothing, has no
third-party image dependencies, and loads with zero image requests.

## Stack

Next.js 16 (App Router, React 19, TypeScript strict) · Tailwind CSS v4 ·
static export of 16 routes · JSON-LD, sitemap, and robots included.
