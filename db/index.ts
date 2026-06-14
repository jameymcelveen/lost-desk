import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(databaseUrl)

/**
 * Typed Drizzle client backed by Neon's serverless HTTP driver. Import this
 * everywhere you need to talk to the database; the schema is attached so
 * `db.query.*` is fully typed.
 */
export const db = drizzle(sql, { schema })

export * from "./schema"