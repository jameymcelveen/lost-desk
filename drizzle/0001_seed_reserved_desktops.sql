-- Reserve a set of personal desktop slugs so they can't be claimed by anyone
-- else. Idempotent: re-running is a no-op once the rows exist. Each reserved
-- desktop also gets its single notebook to honor the v1 one-notebook invariant.

INSERT INTO "desktops" ("slug") VALUES
  ('mcelveen'),
  ('jamey'),
  ('connie'),
  ('jake'),
  ('slater'),
  ('seth'),
  ('james')
ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "notebooks" ("desktop_id")
SELECT "d"."id"
FROM "desktops" "d"
WHERE "d"."slug" IN ('mcelveen', 'jamey', 'connie', 'jake', 'slater', 'seth', 'james')
  AND NOT EXISTS (
    SELECT 1 FROM "notebooks" "n" WHERE "n"."desktop_id" = "d"."id"
  );
