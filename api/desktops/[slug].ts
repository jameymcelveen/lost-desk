import type { VercelRequest, VercelResponse } from "@vercel/node"

import { renameDesktop } from "../../db/desktops"

/**
 * `PATCH /api/desktops/:slug` — rename a desktop.
 *
 * Body: `{ "slug": "<new-name>" }`. The new name is normalized and must be
 * unique; reserved desktops count as taken. On success returns the desktop's
 * new (normalized) slug so the client can reroute to the same view under the
 * new name — e.g. rewrite the first path segment of the current URL from the
 * old slug to `body.slug` and navigate (`/old/notebook` → `/new/notebook`).
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH")
    return res.status(405).json({ error: "method_not_allowed" })
  }

  // `[slug].ts` → req.query.slug; it's an array only for catch-all routes.
  const currentSlug = Array.isArray(req.query.slug)
    ? req.query.slug[0]
    : req.query.slug
  if (!currentSlug) {
    return res.status(400).json({ error: "missing_slug" })
  }

  const body = (req.body ?? {}) as { slug?: unknown }
  if (typeof body.slug !== "string") {
    return res
      .status(400)
      .json({ error: "invalid_body", message: "Expected a string `slug`." })
  }

  const result = await renameDesktop(currentSlug, body.slug)

  if (result.ok) {
    return res.status(200).json({ slug: result.desktop.slug })
  }

  switch (result.reason) {
    case "invalid":
      return res.status(400).json({
        error: "invalid_slug",
        message: "That name can't be used as a desktop address.",
      })
    case "taken":
      return res.status(409).json({
        error: "slug_taken",
        message: "That name is already taken.",
      })
    case "not_found":
      return res.status(404).json({ error: "not_found" })
  }
}
