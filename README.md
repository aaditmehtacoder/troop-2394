# Troop 394, Santa Clara, California

The website for **Scouts BSA Troop 394** (and its linked girl troop, Troop 2394),
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

## Sending email

The contact form posts to `/api/contact`, which sends two messages: the enquiry
to the troop, and an acknowledgement to whoever wrote in. Both are built in
`src/lib/email/templates.ts` and sent through `src/lib/email/index.ts`.

### Set it up with the troop's Gmail

The default is the troop's own account over SMTP. Nothing to sign up for and
nothing to pay for, and sent mail lands in the troop's own Sent folder where
the next committee can find it.

1. Sign in as `troop394sc@gmail.com` and turn on **2-Step Verification** under
   [Security](https://myaccount.google.com/security). App passwords do not
   exist as an option until you do.
2. Go to [App passwords](https://myaccount.google.com/apppasswords), create one,
   and name it something like `Troop website`.
3. Put the 16 characters in `.env.local`. Spaces are fine, they get stripped:

   ```
   GMAIL_USER=troop394sc@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```

4. Check it, then send yourself a real one:

   ```
   npm run check:email
   npm run check:email -- you@example.com
   ```

Set the same two variables in the Vercel project for production. An app
password is not the account password: it only grants mail, and revoking it on
that page cuts the website off immediately without touching the account.

### The other two states

| State | What happens |
| --- | --- |
| `RESEND_API_KEY` set, no Gmail pair | Sends through Resend instead. For if the troop moves to its own domain. |
| Nothing set | `/api/contact` answers `501`, and the form falls back to opening the visitor's own mail client. The page still works. |

### Looking at the emails

`/api/email-preview` renders the troop's copy and `?t=ack` the visitor's, in
development only. It is not a substitute for sending yourself a real one, since
Gmail and Outlook both rewrite HTML on the way in.

Three gates run before anything sends: a honeypot field, reCAPTCHA v3 when
`RECAPTCHA_SECRET_KEY` is set, and a per-IP rate limit of 5 an hour and 20 a
day.

## Design

Design tokens were extracted from scouting.org with live `getComputedStyle()`
calls and are documented in
[`docs/research/scouting-org/DESIGN_TOKENS.md`](docs/research/scouting-org/DESIGN_TOKENS.md);
the interaction model is in `BEHAVIORS.md` alongside it.

- Navy `#003F87`, utility bar `#005696`, accent blue `#067EEB`, red `#CE1126`, tan `#D6CEBD`
- Roboto Slab for headings, nav, and buttons; Roboto for body, self-hosted via `next/font`
- Every button is a 28px pill in uppercase Roboto Slab, as on the original
- Two-row fixed header: navy utility bar over a white nav bar with dropdowns

### The logo

The troop's mark is its neckerchief patch: a campfire under `SCCC TROOP 394`.
`SCCC` is the Santa Clara County Council, which is what our council was called
before the 2013 merger, so the cloth is older than the name on it.

It ships twice, because one file cannot do both jobs:

- **`TroopPatch` in `src/components/brand/Marks.tsx`** — the patch redrawn as
  SVG, for the header, the footer and `app/icon.svg`. A photograph of
  embroidery is mush at 32px. Pass `lettering={false}` below about 250px, where
  the two lines of type close up into a smear; the wordmark beside it carries
  the number. Its `patch` export holds the colours, sampled from a 300ppi scan.
- **`public/images/brand/*`** — the scan itself, cut out and cleaned up, for the
  About page and the Open Graph card, where the stitching is the point. The
  original is kept at `docs/brand/troop-neckerchief-patch.pdf`.

The fleur-de-lis, the icons, and every landscape backdrop are still original
inline SVG, so nothing here is hotlinked.

## Stack

Next.js 16 (App Router, React 19, TypeScript strict) · Tailwind CSS v4 ·
static export of 16 routes · JSON-LD, sitemap, and robots included.
