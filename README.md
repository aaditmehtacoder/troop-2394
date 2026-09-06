# Troop 2/394, Santa Clara, California

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
Eagle projects, navigation, all of it. You never need to touch a component to
change content.

Lines tagged `// CONFIRM` have a source conflict or may be stale. Read
[`docs/research/TROOP_394_FACTS.md`](docs/research/TROOP_394_FACTS.md) before
publishing. It lists every fact on the site with its source, plus the three
things worth checking with the council.

## Pages

| Route | What's on it |
|---|---|
| `/` | Hero carousel, program tiles, Oath & Law, value pillars, quotes, upcoming events, high adventure |
| `/about` | Who we are, patrols, youth leadership, adult roles, troop history |
| `/program` | Weekly meeting agenda, the patrol method, leadership tracks, service |
| `/advancement` | The seven ranks, merit badges, boards of review, Trail to Eagle, the Eagle honor roll |
| `/outdoors` | Monthly campouts, Camp Hi-Sierra, high adventure, traditions, fifteen years of outings, gear |
| `/calendar` | Filterable program-year calendar |
| `/safety` | Youth Protection, two-deep leadership, health forms, reporting |
| `/resources` | Forms, new family guide, dues, the troop's packing list, local gear discounts |
| `/join` | Five steps to join, when/where, who can join, cost, FAQ |
| `/contact` | Contact details, message form, map, directions |
| `/support` | Ways to give money or time |
| `/blog` `/blog/[slug]` | Trip reports written by the Scouts, recovered from the troop's own archive |
| `/feed` | Pinned notices, what is coming up, and the newest posts in one stream |
| `/login` `/signup` | Sign in or create an account, with Google or email |
| `/members` | The signed-in area: calendar, feed, forms |
| `/admin` | Leaders only: edit posts, calendar, announcements, Eagles, leadership, links, albums |

## Accounts, the admin dashboard, and the chatbot

Content, accounts, and the editing dashboard all run on **Supabase**. The site
still works with no keys at all: every page falls back to the researched content
committed in `src/data`, so a fresh clone is complete and readable.

### Connect Supabase

```bash
cp .env.example .env.local     # fill in the project URL and publishable key
```

Then run `supabase/schema.sql` once in the Supabase SQL editor. It creates the
tables, the row-level security policies, and a trigger that gives every new
sign-in a profile. **The first person to sign in becomes the admin**, so the
dashboard is usable immediately.

Seed the database with the researched content:

```bash
SUPABASE_SECRET_KEY=<service_role key> node scripts/seed.mjs
```

The script is idempotent: it matches on natural keys, so running it again
updates rather than duplicates, and it never deletes anything you added.

### Signing in

`/signup` creates an account, `/login` signs in, `/members` is the signed-in
area. Both pages offer Google and email.

Google needs one extra step in the Supabase dashboard: **Authentication →
Providers → Google**, with an OAuth client from the Google Cloud console.
The redirect URL to register is `https://<project>.supabase.co/auth/v1/callback`.
Until that is switched on, email and password works.

Roles are `viewer` → `member` → `leader` → `admin`. Leaders and admins can edit;
everyone else is read only. Promote someone with:

```sql
update public.profiles set role = 'leader' where email = 'them@example.com';
```

### The admin dashboard

`/admin` edits everything on the site that changes during the year: blog posts,
the calendar, announcements, the Eagle honor roll, leadership, forms and links,
and photo albums.

Every screen is generated from `src/lib/admin/collections.ts`. To make something
new editable, add a table to `supabase/schema.sql` and an entry to that file.
Nothing else needs touching.

### The chatbot

The "Ask the troop" widget answers from `src/lib/chat/knowledge.ts`, which is
built from `src/data/troop.ts` so there is one source of truth. It is told to
answer only from those facts and to hand people to a real leader otherwise.

Set `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`) in `.env.local`. The key stays on
the server. Without one, the widget still answers from a keyword fallback in
`src/lib/chat/offline.ts`.

Requests are rate limited per IP on two windows, tunable in `.env.local`:

```
CHAT_LIMIT_PER_MINUTE=6
CHAT_LIMIT_PER_DAY=60
CHAT_MAX_CHARS=800
```

Conversation history is capped at eight turns and replies at 400 tokens, so a
stuck client cannot run up a bill.

### The old file-backed members area

`src/lib/auth/*` and the pages under `src/app/dashboard/` are the previous
JSON-file login system, kept in the repo but no longer routed: `/dashboard`
redirects to `/members`.

## Design

Design tokens were extracted from scouting.org with live `getComputedStyle()`
calls and are documented in
[`docs/research/scouting-org/DESIGN_TOKENS.md`](docs/research/scouting-org/DESIGN_TOKENS.md);
the interaction model is in `BEHAVIORS.md` alongside it.

- Navy `#003F87`, utility bar `#005696`, accent blue `#067EEB`, red `#CE1126`, tan `#D6CEBD`
- Roboto Slab for headings, nav, and buttons; Roboto for body, self-hosted via `next/font`
- Every button is a 28px pill in uppercase Roboto Slab, as on the original
- Two-row fixed header: navy utility bar over a white nav bar with dropdowns

**No image files.** The fleur-de-lis, troop badge, icons, and every landscape
backdrop are original inline SVG, so the site hotlinks nothing, has no
third-party image dependencies, and loads with zero image requests.

## Stack

Next.js 16 (App Router, React 19, TypeScript strict) · Tailwind CSS v4 ·
static export of 16 routes · JSON-LD, sitemap, and robots included.
