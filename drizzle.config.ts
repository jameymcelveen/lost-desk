import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

// Load env from .env.local (Next.js convention); fall back to .env.
config({ path: ".env.local" })

// Use the direct (unpooled) connection for migrations when available — the
// pooler is meant for app queries, not DDL.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL is not set")
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  strict: true,
  verbose: true,
})
