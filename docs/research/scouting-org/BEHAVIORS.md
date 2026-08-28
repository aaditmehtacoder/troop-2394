# scouting.org — Behavior & Interaction Model

## Header
- **Fixed** at top; a zero-height `#sc-navbar-fix-space` div reserves layout space.
- Two rows: navy `#005696` utility bar (70px) over a white nav bar (50px).
- Utility bar: logo left, then search icon, then `BE A SCOUT · SCOUT SHOP · WAYS TO SUPPORT`
  as plain uppercase links, then `GIVE NOW` and `MY.SCOUTING` as white pills.
- Nav bar: 10 top-level items, 8 of which report `[collapsed]` in the accessibility tree —
  i.e. **click/hover-expanded submenus**, not a scroll-driven mechanism.
- Mobile: hamburger toggles a full-height off-canvas panel.

## Hero
- An Elementor `e-n-carousel` (Swiper) — `swiper-initialized swiper-horizontal`.
- Autoplaying slides; each slide is a full-bleed background image/video with a dark
  overlay, centered white logo, `h2`, and a pill CTA.
- Slides observed: "Just Announced! 2026 National Jamboree", "Support Our Mission",
  "Your Scouting adventure starts here."
- Background media: `Slide1Home-BgImage-scaled.webp`, `desktop-slide-2-home-2x`,
  `bg-slide3-home-2x`. Video slide uses an iframe ("Introducing Scouting America").

## Testimonials
- Second Swiper: 6 slides, dot pagination (`Go to slide 1..6`) plus prev/next arrows.
- Each slide = circular headshot + quote + name + role.

## High Adventure
- Third Swiper (`wbel_post_slider`): 4 cards — Philmont, Sea Base, Northern Tier, The Summit.

## Section rhythm (top → bottom)
1. Hero carousel (full-bleed)
2. `SCOUTING IS THE DIFFERENCE` — heading + lede + H4 + three photo cards
3. `THE SCOUTING PROGRAMS` — **tan `#D6CEBD` band**, 5 colored tiles, navy solid CTA
4. `"BE PREPARED"` — split band: left navy photo panel w/ motto, right `#EDEDED`
   panel with Our Mission / Scout Law / Scout Oath
5. `WELCOME TO SCOUTING` — alternating tinted copy blocks beside a photo
6. `THE VALUE OF SCOUTING` — 4 icon + heading + paragraph blocks
7. Testimonial carousel
8. Four quick-action tiles: Join / Donate / Volunteer / Careers
9. `NATIONAL HIGH ADVENTURE BASES` — carousel + navy CTA
10. Scout Shop banner
11. Instagram band (`#F2F2F2`)
12. Scout Life subscribe band (navy `#003F87`)
13. Footer — RESOURCES / INFO / LEGAL columns, social icons, 3 CTA pills, stacked logo

## Responsive
- Breakpoints follow Elementor defaults: ≤767px mobile, 768–1024px tablet.
- Program tiles: 5-across → 2-across → 1-across.
- Split "BE PREPARED" band stacks vertically on mobile.

## Not reproduced in the Troop 394 build (deliberately)
- Scoutly chatbot widget (`#scoutly-chatbot-chatButton`) — third-party, national-only.
- Instagram embed — replaced with a troop photo strip.
- Hotlinked scouting.org image assets — replaced with original SVG artwork so the
  troop site is self-contained and does not hotlink another site's files.
