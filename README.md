<div align="center">

# 🗄️ lost-desk

### A desktop you will never lose.

Mint a desktop, get a memorable name like `set-aunt-carlotta`, and find it again at
`lost-desk.com/set-aunt-carlotta`. No accounts, no passwords — the name *is* the key.

[![Lit](https://img.shields.io/badge/Lit-3-324FFF?logo=lit&logoColor=white)](https://lit.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team)
[![Neon Postgres](https://img.shields.io/badge/Neon-Postgres-00E599?logo=postgresql&logoColor=white)](https://neon.tech)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deploy_on_push-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#license)

</div>

---

## What it is

lost-desk is a multi-tenant **desktop** app. Each desktop is a tiny workspace with a
memorable, hyphenated passphrase for a name (`verb-noun-name`, e.g. `set-aunt-carlotta`)
and its own URL at `/<slug>`. There's no auth — knowing the name is access.

A desktop holds **tools**. In v1 there is exactly one: a **notebook** you write on and
turn pages in. So v1, in one sentence, is *"create or enter a desktop and use its notebook."*

## How it works

```
  /                      Entry — create a new desktop or jump back into an existing one
  /<slug>                Desktop — a calm desk surface holding your notebook
  /<slug>/notebook       Notebook — an open page you write on; turn pages, autosaved
```

- **Create** mints a fresh slug, shows it to you, and drops you on your new desk.
- **Write** straight onto the page — autosaved as you type.
- **Turn** past the last page to start a new blank one. Pages are created lazily, only
  once you write on them.
- **Come back** anytime via the slug. Everything persists.

## Stack

| Layer       | Choice                                                      |
| ----------- | ---------------------------------------------------------- |
| **Client**  | [Vite](https://vitejs.dev) + TypeScript + [Lit](https://lit.dev) web components (`ld-*`) |
| **API**     | Vercel Serverless Functions (TypeScript) under `/api`      |
| **Database**| [Neon](https://neon.tech) Postgres via [Drizzle ORM](https://orm.drizzle.team) + drizzle-kit |
| **Hosting** | [Vercel](https://vercel.com) — push to `main` = production deploy |

The aesthetic is *representative skeuomorphic*: flat, iconographic cues of a real
desk and bound notebook — rounded corners, one soft shadow, an elastic band, a ribbon —
never photoreal. Warm parchment surfaces, Clemson campus-brick accent, no dark mode.

## Data model

Three tables, modeled in [`db/schema.ts`](db/schema.ts) and managed with drizzle-kit:

| Table       | Columns                                                            |
| ----------- | ----------------------------------------------------------------- |
| `desktops`  | `id`, `slug` (unique), `created_at`, `last_opened_at`             |
| `notebooks` | `id`, `desktop_id` → desktops, `title` (default `Notebook`)       |
| `pages`     | `id`, `notebook_id` → notebooks, `idx`, `body`, `updated_at`      |

One notebook per desktop in v1; pages are created lazily on first write. Foreign keys
cascade on delete. A `verb-noun-name` slug generator lives in [`lib/slug.ts`](lib/slug.ts)
(~125k combinations), and a typed Drizzle client backed by Neon's serverless driver is
exported from [`db/index.ts`](db/index.ts).

## Getting started

```bash
# 1. install
pnpm install

# 2. pull secrets from the Vercel project (provides DATABASE_URL from Neon)
vercel env pull .env.local

# 3. apply the database migrations
pnpm db:migrate

# 4. run the dev server
pnpm dev
```

### Database scripts

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `pnpm db:generate`  | Generate a SQL migration from changes to the schema   |
| `pnpm db:migrate`   | Apply pending migrations to the database              |
| `pnpm db:push`      | Push the schema directly (handy in early development) |
| `pnpm db:studio`    | Open Drizzle Studio to browse the data                |

> `.env.local` holds `DATABASE_URL` and is gitignored — never commit it.

## Project layout

```
db/
  schema.ts      Drizzle table definitions + inferred types
  index.ts       Typed db client (Neon serverless driver)
lib/
  slug.ts        verb-noun-name passphrase generator
drizzle/         Generated SQL migrations
drizzle.config.ts
CLAUDE.md        Build spec & working agreement — the single source of truth
```

## License

ISC © [Jamey McElveen](https://github.com/jameymcelveen)
