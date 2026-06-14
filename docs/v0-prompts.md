# v0 Prompts — "Desktop" v1 (Notebook tool)

Design-only pass. Goal: lock the look of three screens, then port the
markup + CSS variables into Lit web components later via Claude/Cursor.

**Run order (same play as Christ Medical):**
1. Run **Anchor 1 — Open Notebook** first. It decides type, color, material, page-turn.
2. Screenshot the winner.
3. Run **Anchor 2 — The Desktop** and **Anchor 3 — Create / Switch** in the *same v0 chat*, each starting with "Match the attached screenshot." Attach the Anchor 1 shot.

**Why design-only:** v0 emits Next.js/React/Tailwind, not Lit. You're harvesting the *visual* + the CSS-variable token set, not the framework code. The prompts force all color into a semantic `:root` block and keep the DOM clean so it re-skins into Lit cleanly.

---

## Shared design system (paste into Anchor 1; carries through the chat)

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

## Anchor 1 — Open Notebook  *(run first)*

```
Design the OPEN NOTEBOOK screen for a desktop app whose only tool (for now)
is a notebook you write on. Use the shared design system above.

LAYOUT
- Full-bleed --desk surface, very subtle, no texture, optional faint vignette.
- Centered: a single open notebook page (single page, NOT a two-page spread).
  The charcoal --cover wraps/peeks behind the page; the page is --surface with
  faint --rule horizontal lines and generous margins.
- A rust (--accent) ribbon bookmark hangs from the top edge over the page.
- The elastic band sits along the right edge, pushed open.
- The page is the writing surface: looks like a contenteditable area, text in
  --ink in the warm page face, a left margin rule.

CHROME (minimal, floats over the desk, not a heavy toolbar)
- Top-left: a small "← desktop" affordance.
- Top-center: a slim engraved nameplate showing the tenant/desktop name in a
  monospace-ish treatment, e.g. "set-aunt-carlotta".
- Page-turn: subtle left/right chevrons at the lower corners, plus a bottom-
  right corner-curl affordance that turns the page. Page indicator bottom-
  center, e.g. "12 / 40". Imply a soft page-curl turn animation.

STATES (show as separate frames)
1. Empty page — placeholder "Start writing…" in --ink-soft.
2. Page with a few paragraphs of handwriting-style body text.
3. (optional) mid page-turn with the corner curled.

Sunlight-readable contrast, large touch targets, no decoration for its own sake.
```

---

## Anchor 2 — The Desktop  *(same chat; attach Anchor 1 screenshot)*

```
Match the attached open-notebook screenshot exactly — same palette, type,
material, and shadow language. Now design THE DESKTOP: a clean surface that
holds tools. For v1 the only tool is the notebook.

LAYOUT
- --desk surface fills the screen.
- A small engraved nameplate (top-left or center) shows the desktop name,
  e.g. "set-aunt-carlotta", in the same treatment as the notebook chrome.
- The notebook sits on the desk as a CLOSED bound object, rendered like a clean
  flat Moleskine icon at hero size: --cover charcoal, a horizontal belly band
  in --accent across the middle, a matching --accent ribbon at the bottom, an
  elastic band down the right edge, rounded corners, one soft drop shadow.
  Tapping it opens the notebook (the Anchor 1 screen).
- Compose the desk so MORE tools can land later without breaking it: leave a
  subtle implied grid / breathing room around the notebook. Do not add other
  tools yet — notebook only.
- Unobtrusive corner control: "switch desktop" / "+ new desktop".

STATE
- One frame: desktop with the single notebook tool, lots of calm empty desk.

Keep it quiet and confident. No dashboard widgets, no nav rail clutter.
```

---

## Anchor 3 — Create / Switch Desktop  *(same chat; attach Anchor 1 screenshot)*

```
Match the attached design language. Design the ENTRY screen for creating and
switching desktops. A "desktop" is a workspace = a tenant. No login.

LAYOUT
- --desk surface, a single calm centered card (--surface, hairline border at
  low-opacity --hairline, soft shadow).
- Primary action: a rust (--accent) button "Create a new desktop".
- On create, reveal the minted name with a subtle animation, shown like a
  generated memorable passphrase: lowercase, hyphen-separated three-word style,
  e.g. "set-aunt-carlotta", "loud-river-pelican", "calm-uncle-figment". Include
  a small "regenerate" link and an "Enter →" button.
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

## Mobile

Add to any anchor, or run a mobile pass after desktop is locked:

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