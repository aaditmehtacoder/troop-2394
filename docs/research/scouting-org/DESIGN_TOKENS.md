# scouting.org. Extracted Design Tokens

Source: https://www.scouting.org/ (WordPress + Elementor)
Extracted live via BrowserOS neo `getComputedStyle()` on 2026-08-27.

## Color palette (verified by full-document color census)

| Token | Value | Census hits | Where it appears |
|---|---|---|---|
| `--sa-navy` | `#003F87` rgb(0,63,135) | 101 | Section headings, buttons, Scout Life band, footer |
| `--sa-navy-bar` | `#005696` rgb(0,86,150) | 3 | Top utility bar background |
| `--sa-blue` | `#067EEB` rgb(6,126,235) | 125 | Outline-button text/border, links, accents |
| `--sa-red` | `#CE1126` rgb(206,17,38) | 5 | Scouts BSA tile, flag accents |
| `--sa-tan` | `#D6CEBD` rgb(214,206,189) | 5 | "The Scouting Programs" band background |
| `--sa-ink` | `#212121` rgb(33,33,33) | 1549 | Body copy (dominant text color) |
| `--sa-slate` | `#33373D` rgb(51,55,61) | 176 | Secondary text |
| `--sa-gray` | `#515354` rgb(81,83,84) | 137 | Muted captions |
| `--sa-gray-100` | `#F2F2F2` |, | Instagram band, alternating panels |
| `--sa-white` | `#FFFFFF` | 169 | Page background, pill buttons |

Program tile colors (sampled from "THE SCOUTING PROGRAMS"):
gold `#E1C04C` · red `#C0392B` · forest `#1E5631` · deep navy `#1B2A4A` · periwinkle `#4A6FBF`

## Typography

Two families only, confirmed by scanning every `h1..h4,p,a,button,span,li,div`:

- **Headings / nav / buttons:** `"Roboto Slab", serif` (weights 500, 700)
- **Body:** `Roboto, sans-serif` (weight 400)
- Google Fonts is preconnected (`fonts.gstatic.com`); Material Icons also loaded.

| Role | Computed values |
|---|---|
| Hero H2 | 64px / 80px, 700, uppercase, `letter-spacing: 2px`, white |
| Hero H2 (slide) | 50px, 700, sentence case, white |
| Section H2 | 40px, 700, **uppercase**, navy `#003F87` |
| Sub H2 | 32px, 700, sentence case, navy |
| H4 | 24px / 31.92px, 700, `letter-spacing: 0.8px`, navy |
| H4 (tile) | 24px, 500, white or `#333` |
| H3 (small) | 14px / 20.02px, 700, `letter-spacing: 0.25px`, navy |
| Body `p` | 16px / 24px, 400, `#212121`, `margin-bottom: 16px` |
| Nav link | Roboto Slab 11px, 700, uppercase, `letter-spacing: 1px`, white, `padding: 15px`, `margin-right: 7px` |

## Buttons, all variants observed

`border-radius: 28px` on **every** button. Roboto Slab, 700, uppercase.

| Variant | background | color | border | padding | letter-spacing |
|---|---|---|---|---|---|
| Header pill | `#FFF` | `#003F87` | none | `12px 16px` | `0.8px` (14px text) |
| Hero CTA ("JOIN NOW") | `#FFF` | `#003F87` | `1px solid #003F87` | `20px 0` | `1px` |
| Solid navy ("LEARN MORE") | `#003F87` | `#FFF` | `1px solid #003F87` | `20px 90px` | `0.2px` |
| Outline blue ("SHOP NOW", "FOLLOW", "SUBSCRIBE") | `#FFF` | `#067EEB` | `1px solid #067EEB` | `16-20px` | `0.2-1px` |
| On-navy ghost ("DONATE NOW") | `#FFF` | `#003F87` | `1px solid #FFF` | `20px 90px` | `0.2px` |

## Layout

- Content container ≈ **1180px**, centered.
- Header total height **120px**: navy utility bar `70px` + white nav bar `50px`.
- Header is fixed; `#sc-navbar-fix-space` spacer sits above `body > .site`.
- Page background `#FFFFFF`; document height ≈ 6718px at 1778px viewport.
