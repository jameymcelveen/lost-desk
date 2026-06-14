import { sql } from "drizzle-orm"
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

/**
 * A desktop is the top-level workspace. Its `slug` is the memorable
 * passphrase (verb-noun-name, e.g. `set-aunt-carlotta`) used as the public
 * route `/:slug`. There is no auth in v1 — knowing the slug is access.
 */
export const desktops = pgTable("desktops", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastOpenedAt: timestamp("last_opened_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

/**
 * A notebook belongs to a desktop. v1 has exactly one notebook per desktop,
 * but the FK is modeled so that can grow later.
 */
export const notebooks = pgTable("notebooks", {
  id: uuid("id").defaultRandom().primaryKey(),
  desktopId: uuid("desktop_id")
    .notNull()
    .references(() => desktops.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("Notebook"),
})

/**
 * A page belongs to a notebook. `idx` is the page's position in the notebook.
 * Pages are created lazily — only when something is first written to them.
 */
export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  notebookId: uuid("notebook_id")
    .notNull()
    .references(() => notebooks.id, { onDelete: "cascade" }),
  idx: integer("idx").notNull(),
  body: text("body").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
})

export type Desktop = typeof desktops.$inferSelect
export type NewDesktop = typeof desktops.$inferInsert
export type Notebook = typeof notebooks.$inferSelect
export type NewNotebook = typeof notebooks.$inferInsert
export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert