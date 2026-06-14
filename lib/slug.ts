/**
 * Slug generator for desktop passphrases.
 *
 * A slug is a memorable three-word phrase in the shape `verb-noun-name`,
 * e.g. `set-aunt-carlotta`. It doubles as the public route `/:slug` and the
 * only thing standing between a visitor and a desktop (there is no auth in
 * v1), so the word lists are intentionally large to keep the space sparse.
 */

const verbs = [
  "set", "find", "keep", "send", "draw", "open", "fold", "lift", "wind",
  "mend", "pour", "ring", "sail", "tend", "wave", "roam", "hum", "knit",
  "skip", "trade", "carve", "brew", "chase", "dust", "glide", "hatch",
  "jump", "leap", "mind", "name", "pluck", "quiet", "rest", "stir", "twirl",
  "weave", "yield", "bask", "coast", "drift", "ease", "flutter", "gather",
  "hover", "linger", "muse", "nestle", "perch", "ramble", "savor", "wander",
]

const nouns = [
  "aunt", "uncle", "ember", "harbor", "lantern", "meadow", "orchard", "pebble",
  "quill", "ribbon", "thicket", "willow", "anchor", "beacon", "cottage",
  "dapple", "feather", "garden", "hollow", "island", "kettle", "ladder",
  "marble", "needle", "otter", "parcel", "rabbit", "saddle", "teapot",
  "valley", "whistle", "acorn", "bramble", "clover", "dewdrop", "fern",
  "grove", "heron", "ivy", "juniper", "kingfisher", "lichen", "moss",
  "nettle", "owl", "poppy", "reed", "sparrow", "thistle", "wren",
]

const names = [
  "carlotta", "amos", "bertha", "cyrus", "delphine", "edwin", "florence",
  "gideon", "harriet", "ignatius", "josephine", "klaus", "lorenzo",
  "matilda", "norbert", "ottoline", "percival", "quincy", "rosalind",
  "silas", "tabitha", "ulysses", "vivienne", "wilbur", "xenia", "yolanda",
  "zachary", "agnes", "barnaby", "cordelia", "desmond", "eugenia",
  "ferdinand", "gwendolyn", "horace", "imogen", "jasper", "katarina",
  "leopold", "mirabel", "nathaniel", "octavia", "phineas", "rosamund",
  "sebastian", "theodora", "ursula", "vernon", "winifred", "yusuf",
]

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Generate a random `verb-noun-name` slug, e.g. `set-aunt-carlotta`.
 *
 * With the current word lists there are ~50³ ≈ 125k combinations. Callers
 * that need a guaranteed-unique slug should generate, attempt the insert, and
 * regenerate on a unique-constraint collision.
 */
export function generateSlug(): string {
  return `${pick(verbs)}-${pick(nouns)}-${pick(names)}`
}

/** Min/max length for a desktop slug (also a sane URL-segment bound). */
export const SLUG_MIN_LENGTH = 2
export const SLUG_MAX_LENGTH = 63

/**
 * Coerce arbitrary user input into a slug-shaped string: lowercased, accent-
 * stripped, with any run of non-alphanumerics collapsed to a single hyphen and
 * leading/trailing hyphens removed. e.g. `"  Aunt Carlotta! "` → `aunt-carlotta`.
 */
export function normalizeSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // drop combining diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Whether a string is a valid, already-normalized slug: lowercase alphanumeric
 * words joined by single hyphens, within the length bounds. Pair with
 * {@link normalizeSlug} — validate the normalized form, not raw input.
 */
export function isValidSlug(slug: string): boolean {
  return (
    slug.length >= SLUG_MIN_LENGTH &&
    slug.length <= SLUG_MAX_LENGTH &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  )
}
