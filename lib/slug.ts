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
