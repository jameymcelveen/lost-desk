# CLAUDE.md — lost-desk

Build spec and working agreement for Claude Code. **This is the single source of
truth.** If anything here conflicts with loose chat instructions, this wins. Keep
it current as v1 lands.

## What we're building

lost-desk is a multi-tenant **desktop** app. Each desktop is a tenant/workspace
with a memorable name (e.g. `set-aunt-carlotta`) and its own URL (`/<slug>`). No
auth. A desktop holds **tools**; in v1 there is exactly one tool — a **notebook**
you write on and turn pages in. Functionally, v1 is "create or enter a desktop and
use its notebook."

## Stack (pinned — do not substitute)

- **Client:** Vite + TypeScript + **Lit** web components. No React. The v0 designs
  were React/Next — treat them as the *visual spec to reproduce in Lit*, not code
  to keep.
- **API:** Vercel Serverless Functions (TypeScript) under `/api`. Lit is
  client-side and cannot touch Postgres directly; all DB access goes through `/api`.
- **DB:** Neon Postgres via **Drizzle ORM** + drizzle-kit.
- **Host:** Vercel. Push to `main` = production deploy.
- Node 20+, strict TypeScript.

Why this shape: honors the Lit requirement, deploys zero-config on Vercel (static
SPA + functions), and gives a clean API boundary for the DB.

## Repo / deploy

- SPA builds with `vite build` → `dist`. Vercel framework preset = Vite.
- `vercel.json` SPA fallback so deep links serve the app while `/api` hits functions:
  ```json
  { "rewrites": [{ "source": "/((?!api).*)", "destination": "/index.html" }] }
  ```
  Vercel serves real static assets before applying rewrites, so this won't swallow
  JS/CSS. Verify deep-link `/<slug>` and asset loading after the first deploy.
- Push to `main` → prod; branches/PRs → preview URLs (Vercel Git integration;
  confirm Production Branch = `main`).
- **Secrets:** `DATABASE_URL` comes from Neon, injected into the Vercel project.
  Pull locally with `vercel env pull .env.local`. `.env.local` is gitignored —
  never commit it. Drizzle and the functions read `process.env.DATABASE_URL`.

## Design system — tokens

All color lives in CSS custom properties on `:root` in a global `tokens.css`
loaded from `index.html`. Custom properties pierce shadow DOM, so components
reference `var(--x)` directly in their `static styles`. Never hardcode hex in a
component.

```css
:root{
  /* desk + paper (parchment values approximate — reconcile with the Christ
     Medical tokens if present in the repo) */
  --desk:        #EFE7D6;
  --surface:     #F6F1E7;
  --surface-sunk:#ECE3D2;
  --rule:        #D8CDB8;
  /* ink */
  --ink:         #2B2A28;
  --ink-soft:    #6B655C;
  --hairline:    #685C53;  /* use at low opacity */
  /* notebook object */
  --cover:       #3E3E3E;
  --cover-spine: #2D2D2D;
  /* accent — Clemson Campus Brick */
  --accent:      #B94700;
  --accent-ink:  #FFFFFF;
  --state-sage:  #566127;
}
```

- **Type:** UI chrome in a clean grotesque (Geist/Inter); page text in a warm serif
  so writing feels like writing.
- **Icons:** Lucide, 2px stroke, currentColor.
- **Aesthetic — "representative skeuomorphic":** flat/iconographic cues of a real
  object (rounded corners, one soft shadow, elastic band, ribbon, belly band).
  Never photoreal, no gradients beyond a single soft shadow, no glassmorphism, no
  dark mode.

## Screens (reproduce the locked v0 designs in Lit)

The approved screenshots in the repo are the visual spec. Match tokens, spacing,
radii, and shadow exactly.

1. **Entry — Create / Switch desktop** (`/`)
    - Centered card on the desk. Primary rust button "Create a new desktop".
    - Create mints a slug, reveals it (e.g. `set-aunt-carlotta`) with the URL hint
      `lost-desk.com/<slug>`, a "regenerate" link, and "Enter →".
    - Below: list of existing desktops (slug + last-opened), tap to enter. Empty
      state: "No desktops yet. Create one to get started."

2. **Desktop** (`/<slug>`)
    - Calm desk surface. Desktop name on the top nameplate. Top-right: "switch
      desktop" / "+ new desktop".
    - The notebook tool as a closed bound object: charcoal cover, "Notebook" title,
      rust belly band, elastic band, small ribbon at the bottom. Tap → open notebook.
    - Layout leaves room for more tools later; v1 shows only the notebook.

3. **Open notebook** (`/<slug>/notebook`)
    - Single open page on the desk, binding seam on one side. Faint rule lines, rust
      margin rule, ribbon from the top edge (never over text).
    - Chrome: top-left `← <slug>` (back to desktop), center nameplate `Notebook`,
      page-turn chevrons + corner-curl, page indicator `n / total`.
    - The page is the writing surface (contenteditable). Autosave. Turn pages;
      turning forward past the last page creates a new blank page.

**Mobile (responsive, ~390px):** same flow, bound notebook full-bleed, swipe
left/right to turn pages, page number floats bottom-center. No rings.

## Naming & routing

- Desktop slug = memorable passphrase, verb-noun-name, lowercase, hyphenated
  (e.g. `set-aunt-carlotta`). Unique; retry on collision.
- Routes: `/` entry, `/<slug>` desktop, `/<slug>/notebook` open notebook. Use a
  lightweight client router (@vaadin/router, or a small hand-rolled one).

## Data model (Drizzle)

- `desktops`: id, slug (unique), created_at, last_opened_at.
- `notebooks`: id, desktop_id (FK), title (default `Notebook`), created_at. Exactly
  one per desktop in v1.
- `pages`: id, notebook_id (FK), idx (int), body (text), updated_at. Lazily created.

Generate and run the initial migration. Add a typed db client and a slug generator
with its own word lists.

## API surface (under /api, TS functions)

- `POST /api/desktops` → mint slug, create the desktop and its single notebook,
  return `{ slug }`.
- `GET /api/desktops` → list (slug, last_opened_at).
- `GET /api/desktops/:slug` → desktop + notebook; bump last_opened_at. 404 if no slug.
- `GET /api/desktops/:slug/pages/:idx` → page by idx, create blank if missing;
  include total page count.
- `PUT /api/desktops/:slug/pages/:idx` → save body.

Keep it RESTish and minimal. Validate the slug exists; 404 otherwise.

## Behavior

- Page autosave: debounce ~500ms on input, optimistic.
- Page count is the number of pages that exist; the `/ 40` in the mock is a
  placeholder, not a fixed size.
- Entering a desktop updates last_opened_at.

## Out of scope for v1 (do not build)

Auth/accounts, multiple notebooks, multiple tools, sharing/permissions, export,
real-time collaboration. No settings sprawl.

## Conventions

- Strict TS. Component prefix `ld-` (`ld-app`, `ld-entry`, `ld-desktop`,
  `ld-notebook-tool`, `ld-notebook-open`, `ld-page`).
- Lit reactive properties/state; styles in `static styles` referencing tokens via
  `var()`.
- Small, presentational components; data fetching in a thin client module, not in
  leaf components.

## Build order

1. Scaffold Vite + TS + Lit; add `tokens.css`; `ld-app` shell + client router.
2. Build the three screens as static Lit components against the tokens (no data
   yet) to match the screenshots.
3. Drizzle schema + slug generator + initial migration (needs `DATABASE_URL`).
4. `/api` functions; wire screens to them (create/list/enter desktop, page
   read/save/turn).
5. `vercel.json`, deploy to Vercel, pull env, verify push-to-main prod deploy and
   deep links.

## Definition of done (v1)

Create a desktop → land on `/<slug>` → open the notebook → type → it persists →
turn pages → reload and everything is still there. Switch and return to other
desktops. Deployed on Vercel, deploying on every push to main.