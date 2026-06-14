import { eq } from "drizzle-orm"

import { isValidSlug, normalizeSlug } from "../lib/slug"

import { db } from "./index"
import { desktops, type Desktop } from "./schema"

/** Postgres unique-violation SQLSTATE. */
const UNIQUE_VIOLATION = "23505"

// Drizzle wraps driver errors (DrizzleQueryError), so the Postgres SQLSTATE
// lives on the underlying `cause`. Walk the cause chain to find it.
function isUniqueViolation(error: unknown): boolean {
  let current: unknown = error
  while (current && typeof current === "object") {
    if ((current as { code?: string }).code === UNIQUE_VIOLATION) {
      return true
    }
    current = (current as { cause?: unknown }).cause
  }
  return false
}

export type RenameDesktopResult =
  | { ok: true; desktop: Desktop }
  /** `newSlug` isn't a valid slug after normalization. */
  | { ok: false; reason: "invalid" }
  /** Another desktop already uses that slug. */
  | { ok: false; reason: "taken" }
  /** No desktop exists at `currentSlug`. */
  | { ok: false; reason: "not_found" }

/**
 * Rename a desktop by changing its slug.
 *
 * The new name is normalized (see {@link normalizeSlug}) and must be a valid
 * slug. Uniqueness is enforced by the database; if the slug is already in use —
 * including by a reserved desktop — this returns `{ ok: false, reason: "taken" }`
 * rather than throwing. Renaming a desktop to its own current slug is a no-op
 * success.
 *
 * On success the caller should redirect to the route built from
 * `result.desktop.slug` (the normalized value), not the raw input.
 */
export async function renameDesktop(
  currentSlug: string,
  rawNewSlug: string,
): Promise<RenameDesktopResult> {
  const newSlug = normalizeSlug(rawNewSlug)

  if (!isValidSlug(newSlug)) {
    return { ok: false, reason: "invalid" }
  }

  // No-op rename (possibly just a normalization round-trip): confirm it exists.
  if (newSlug === currentSlug) {
    const existing = await db.query.desktops.findFirst({
      where: eq(desktops.slug, currentSlug),
    })
    return existing
      ? { ok: true, desktop: existing }
      : { ok: false, reason: "not_found" }
  }

  try {
    const [updated] = await db
      .update(desktops)
      .set({ slug: newSlug })
      .where(eq(desktops.slug, currentSlug))
      .returning()

    if (!updated) {
      return { ok: false, reason: "not_found" }
    }
    return { ok: true, desktop: updated }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, reason: "taken" }
    }
    throw error
  }
}

/** Look up a desktop by its slug, or `undefined` if none exists. */
export function getDesktopBySlug(slug: string): Promise<Desktop | undefined> {
  return db.query.desktops.findFirst({ where: eq(desktops.slug, slug) })
}
