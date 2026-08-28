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
| `/login` `/signup` | Members-area sign in and account request |
| `/dashboard` | Member overview: next event, meeting details, upcoming, key links |
| `/dashboard/calendar` | Full filterable program-year calendar |
| `/dashboard/forms` | Forms, pre-campout and summer-camp checklists, packing, dues |
| `/dashboard/members` | Administrator only: approve accounts and set roles |

## Members area

`/login`, `/signup`, and `/dashboard/*` are a real, server-enforced members area.

**How accounts work.** Anyone can request one, but nobody gets in automatically —
each request lands as `pending` until an administrator approves it. The very
first account created bootstraps as the administrator so there is somebody to do
the approving.

Roles are `pending` → `member` → `leader` → `admin`.

**First run:**

```bash
npm run dev
# visit http://localhost:3394/signup  — this first account becomes the admin
```

**Before you deploy** (both matter):

1. **Set a session secret.** Copy `.env.example` to `.env.local` and fill it in:
   ```bash
   echo "SESSION_SECRET=$(openssl rand -base64 48)" > .env.local
   ```
   The app refuses to start in production without one. In development it
   generates a secret into `.data/` so logins survive a restart.

2. **Swap the user store for a database.** `src/lib/auth/store.ts` keeps members
   in `.data/users.json`. That works on a normal server but **not on serverless
   hosting** (Vercel, Netlify functions), where the filesystem is ephemeral and
   per-instance. Replace the six query/mutation functions at the bottom of that
   file — nothing else in the app touches the file layer.

**How it's secured.**

| | |
|---|---|
| Passwords | scrypt with a per-user random salt, compared in constant time |
| Sessions | HMAC-SHA256 signed cookie — `httpOnly`, `sameSite=lax`, `secure` in production, 14-day expiry |
| Authorization | Checked in the `/dashboard` **server layout**, not in middleware — so a member hitting `/dashboard/members` directly is redirected, not merely shown a hidden link |
| Revocation | The user is re-read from the store on every request, so demoting or deleting an account takes effect immediately |
| Brute force | Fixed-window rate limits per email and per IP on login, per IP on signup |
| Enumeration | A wrong password and an unknown email return the identical message, and both run a hash comparison so they take similar time |
| Indexing | `/dashboard`, `/login`, and `/signup` are `noindex` and disallowed in `robots.txt` |
| Dependencies | Zero added — `node:crypto` only |

**What it deliberately does not store.** Name, email, and how someone is
connected to the troop. Nothing else. Advancement, health forms, and any other
youth data belong in Scoutbook and the troop's physical files — not in a
website's database.

**Not built yet:** password reset by email (a leader sets a new password
instead), and email notification on approval. Both need an email provider.

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
