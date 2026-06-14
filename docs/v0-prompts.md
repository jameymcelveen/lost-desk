# v0 Prompts — "lost-desk" v1 (Notebook tool)

Design-only pass. Goal: lock the look of three screens, then port the
markup + CSS variables into Lit web components later via Claude/Cursor.

**Status:** Prompt 1 (Open Notebook) is LOCKED. Use frame 2 (written page) as
the match reference for Prompts 2 and 3 — the "match this" preamble is already
baked into both.

---

## How to run this in v0

Do all of this in **one v0 chat**. Three prompts below (Open Notebook,
The Desktop, Create / Switch), run in this order:

1. **First message** — paste the **Shared design system** block AND the
   **Open Notebook** prompt together. Iterate until you like it.
2. **Screenshot** the written-page frame (frame 2).
3. **Next message, same chat** — paste **The Desktop** prompt, attach frame 2.
4. **Next message, same chat** — paste **Create / Switch**, attach frame 2.
5. *(optional)* Run the **Mobile** pass.

Prompts 2 and 3 already start with a "match this locked design" preamble, so
they inherit the notebook look instead of drifting.

**Why design-only:** v0 emits Next.js/React/Tailwind, not Lit. You're
harvesting the *visual* + the CSS-variable token set, not the framework code.
The prompts force all color into a semantic `:root` block and keep the DOM
clean so it re-skins into Lit cleanly.

---

## Naming & routing model

- A **desktop** is the tenant/workspace. Its name is a generated memorable
  passphrase: lowercase, hyphen-separated, e.g. `set-aunt-carlotta`.
- Each desktop lives at its own URL: `lost-desk.com/<desktop-name>`
  e.g. `lost-desk.com/set-aunt-carlotta`. (Domain not secured yet.)
- A **notebook** is a tool that sits on a desktop. In v1.0 there is exactly one
  and you cannot add more, so its title defaults to `Notebook` (or `Notebook 1`).
- On the open-notebook screen: the back-link carries the DESKTOP name (it's
  where "←" returns to), and the engraved nameplate shows the NOTEBOOK title
  `Notebook` — NOT the desktop name.

## Shared design system  *(paste with prompt 1; it carries through the chat)*

```
== STACK ==
Next.js App Router, React, Tailwind v4. These are static design screens —
no auth, no backend, no real state. Keep components presentational and the
DOM semantic; this will be re-implemented as Lit web components later, so
avoid framework-specific cleverness.

== HARD RULE: COLOR ==
Define ALL colors as CSS custom properties in a single :root block with
semantic names. Never hardcode hex inside components. Tenant-themeable later.

:root{
  /* desk + paper (approximate — will be replaced by repo tokens) */
  --desk:        #EFE7D6;  /* warm parchment desk surface */
  --surface:     #F6F1E7;  /* notebook page / cards */
  --surface-sunk:#ECE3D2;  /* recessed wells, page edges */
  --rule:        #D8CDB8;  /* faint horizontal page rule lines */
  /* ink (Clemson College Avenue #333333, warmed) */
  --ink:         #2B2A28;  /* primary text */
  --ink-soft:    #6B655C;  /* secondary text / placeholders */
  --hairline:    #685C53;  /* Howard's Rock — borders, use at low opacity */
  /* the notebook object */
  --cover:       #3E3E3E;  /* charcoal cover */
  --cover-spine: #2D2D2D;  /* spine + elastic band */
  /* accent (Clemson Campus Brick) */
  --accent:      #B94700;  /* belly band, ribbon, primary actions */
  --accent-ink:  #FFFFFF;  /* text on accent */
  --state-sage:  #566127;  /* Bowman Field — success/state if needed */
}

== DESIGN DIRECTION: "REPRESENTATIVE SKEUOMORPHIC" ==
Flat, iconographic representation of a real bound notebook — NOT a photoreal
texture. Think the clean flat-icon Moleskine look: rounded corners, a single
soft shadow, an elastic band, a ribbon bookmark, and one belly band of accent
color. Vercel-level cleanliness and crispness (hairline borders, generous
whitespace, sharp type) with Claude-warm neutrals (parchment surfaces, warm
near-black ink, one rust accent).

NOT: photoreal leather/paper textures, heavy gradients, glassmorphism, dark
mode, generic SaaS dashboard chrome, or a stock UI-kit look.

== TYPE ==
UI chrome in a clean grotesque (Geist / Inter). Page text in a slightly
warmer, legible face (a humanist serif or a restrained "notebook" face) so
writing on the page feels like writing, not filling a form.

== ICONS ==
Lucide, 2px stroke, color via currentColor. Color lives in chips/bands, not
in the icon stroke.
```

---

## Prompt 1 · Open Notebook  — paste this FIRST  *(LOCKED)*

```
Design the OPEN NOTEBOOK screen for a desktop app whose only tool (for now)
is a notebook you write on. Use the shared design system above.

LAYOUT
- Full-bleed --desk surface, very subtle, no texture, optional faint vignette.
- Centered: a single open notebook page (single page, NOT a two-page spread).
  The charcoal --cover wraps the page; show a binding seam + a thin page-stack
  edge on one side so it reads as an open book, not a screen in a case.
- The page is --surface with faint --rule horizontal lines, a rust margin rule,
  and generous margins.
- A rust (--accent) ribbon bookmark hangs from the top edge near the spine and
  trails off the page. It NEVER crosses the text column — keep the writing
  column narrow enough to always clear it.
- The elastic band sits along the right edge.
- The page is the writing surface: looks like a contenteditable area, text in
  --ink in the warm page face.

CHROME (minimal, floats over the desk, not a heavy toolbar)
- Top-left: a small back affordance that carries the DESKTOP name, e.g.
  "← set-aunt-carlotta" (returns to the desktop).
- Top-center: a slim engraved nameplate showing the NOTEBOOK title in a
  monospace-ish treatment — "Notebook" (v1.0 default; not the desktop name).
- Page-turn: subtle left/right chevrons at the lower corners, plus a bottom-
  right corner-curl affordance that turns the page. Page indicator bottom-
  center, e.g. "12 / 40". Imply a soft page-curl turn animation.

STATES (show as separate frames)
1. Empty page — placeholder "Start writing…" in --ink-soft.
2. Page with a few paragraphs of handwriting-style body text. When the page
   fills, soft-fade the bottom line so it reads "page full," not "cut off."
3. Mid page-turn with the corner curled, a page sweeping across.

Sunlight-readable contrast, large touch targets, no decoration for its own sake.
```

---

## Prompt 2 · The Desktop  — same chat, attach frame 2

```
== MATCH THIS LOCKED DESIGN (see attached screenshot) ==
This is the "Open Notebook" screen, already approved. Match it exactly. Do not
reinterpret the look — reuse the same tokens, type, material, and spacing.
- Palette: the same CSS custom properties as the attached screen. Warm parchment
  --desk surface, charcoal --cover notebook, rust --accent (Campus Brick) for the
  margin rule, ribbon, and any primary action. Warm near-black --ink text.
- Type: UI chrome in a clean grotesque; any "paper" text in the same warm serif.
- The notebook object: charcoal bound cover, rounded corners, one soft drop
  shadow, an elastic band and a rust ribbon. The ribbon hangs from the spine/top
  edge and NEVER crosses content.
- Skeuomorphic but flat/iconographic, NOT photoreal. No textures, no gradients
  beyond a single soft shadow, no glassmorphism, no dark mode.
- Same nameplate treatment: mono, e.g. "set-aunt-carlotta".
Keep hairlines, whitespace, and corner radii consistent with the attached screen.

== SCREEN: THE DESKTOP ==
A clean surface that holds tools. For v1 the only tool is the notebook.

LAYOUT
- --desk surface fills the screen.
- A small engraved nameplate (top-left or center) shows the desktop name,
  e.g. "set-aunt-carlotta", in the same treatment as the notebook chrome.
- The notebook sits on the desk as a CLOSED bound object, rendered like a clean
  flat Moleskine icon at hero size: --cover charcoal, a horizontal belly band
  across the middle, a matching ribbon at the bottom, an elastic band down the
  right edge, rounded corners, one soft drop shadow. The belly band and ribbon
  are the SAME rust --accent as the open-notebook ribbon — NOT a brighter orange.
  The notebook's title "Notebook" appears on its cover/spine (v1.0 default).
  Tapping it opens the notebook (the Prompt 1 screen).
- Compose the desk so MORE tools can land later without breaking it: leave a
  subtle implied grid / breathing room around the notebook. Do not add other
  tools yet — notebook only.
- Unobtrusive corner control: "switch desktop" / "+ new desktop".

STATE
- One frame: desktop with the single notebook tool, lots of calm empty desk.

Keep it quiet and confident. No dashboard widgets, no nav rail clutter.
```

---

## Prompt 3 · Create / Switch desktop  — same chat, attach frame 2

```
== MATCH THIS LOCKED DESIGN (see attached screenshot) ==
This is the "Open Notebook" screen, already approved. Match it exactly. Do not
reinterpret the look — reuse the same tokens, type, material, and spacing.
- Palette: the same CSS custom properties as the attached screen. Warm parchment
  --desk surface, charcoal --cover notebook, rust --accent (Campus Brick) for
  primary actions. Warm near-black --ink text.
- Type: UI chrome in a clean grotesque; any "paper" text in the same warm serif.
- Skeuomorphic but flat/iconographic, NOT photoreal. No textures, no gradients
  beyond a single soft shadow, no glassmorphism, no dark mode.
- Same nameplate treatment: mono, e.g. "set-aunt-carlotta".
Keep hairlines, whitespace, and corner radii consistent with the attached screen.

== SCREEN: CREATE / SWITCH DESKTOP ==
The ENTRY screen for creating and switching desktops. A "desktop" is a
workspace = a tenant. No login.

LAYOUT
- --desk surface, a single calm centered card (--surface, hairline border at
  low-opacity --hairline, soft shadow).
- Primary action: a rust (--accent) button "Create a new desktop".
- On create, reveal the minted name with a subtle animation, shown like a
  generated memorable passphrase: lowercase, hyphen-separated three-word style,
  e.g. "set-aunt-carlotta", "loud-river-pelican", "calm-uncle-figment". These
  are DESKTOP names. Show the resulting URL as a hint, e.g.
  "lost-desk.com/set-aunt-carlotta". Include a small "regenerate" link and an
  "Enter →" button.
- Below: a list of existing desktops, each row = name (mono treatment) +
  "last opened" timestamp, tappable to enter.
- Empty/first-run state: "No desktops yet. Create one to get started."
- One line of microcopy: a desktop is your workspace; names are memorable so
  you don't need a login.

STATES (separate frames)
1. First run (empty list, just the create action).
2. Post-create (minted name revealed, Enter button).
3. Returning (2–3 desktops listed).
```

---

## Mobile  *(add to any prompt, or run after the desktop look is locked)*

```
Mobile (single column, ~390px):
- Same three screens, bound notebook (NO rings — keep the desktop metaphor).
- Open notebook: the page goes full-bleed, type directly, swipe left/right to
  turn pages, page number floats bottom-center, ribbon still visible at top.
- Desktop: notebook is the full-width hero with the nameplate above it.
- Entry: the create card stacks full-width.

ALT (only if testing rings): swap the bound cover for a top-spiral binding on
mobile. Not recommended — it splits the metaphor from desktop.
```

---

## Notes for the port (later, in repo)

- The win here is the `:root` token block + the page/notebook DOM structure.
  Lift those into your repo `tokens` file and Lit components; reconcile the
  approximate parchment values against the authoritative Christ Medical tokens.
- Anchor accents are real: Campus Brick `#B94700`, Howard's Rock `#685C53`,
  Bowman `#566127`, College Avenue `#333333`. Parchment/surface values above
  are eyeballed placeholders.
- Keep "tools on a desktop" extensible in the markup — the notebook is tool #1.
- Routing: a desktop is `/<desktop-name>` (the tenant). v1.0 has exactly one
  notebook per desktop, titled "Notebook", with no add-notebook affordance yet.