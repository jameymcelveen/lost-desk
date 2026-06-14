import { ArrowRight, Plus, RefreshCw } from "lucide-react";

type State = "first-run" | "post-create" | "returning";

const existing = [
  { name: "loud-river-pelican", opened: "opened 2h ago" },
  { name: "calm-uncle-figment", opened: "opened yesterday" },
  { name: "set-aunt-carlotta", opened: "opened 3 days ago" },
];

export function DesktopCard({ state }: { state: State }) {
  return (
    <div className="w-full rounded-2xl bg-surface p-7 shadow-[0_18px_40px_-20px_rgba(43,42,40,0.45)] ring-1 ring-hairline/15">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-serif text-xl text-ink">Lost Desk</h2>
        <p className="mx-auto mt-2 max-w-[32ch] font-sans text-[13px] leading-relaxed text-ink-soft">
          A desktop is your workspace. Names are memorable, so you never need a
          login.
        </p>
      </div>

      {/* Create action / minted name */}
      <div className="mt-6">
        {state === "post-create" ? (
          <div className="rounded-xl bg-surface-sunk p-5 ring-1 ring-hairline/12">
            <p className="text-center font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
              Your new desktop
            </p>
            <p className="mt-3 text-center font-mono text-lg tracking-tight text-ink">
              set-aunt-carlotta
            </p>
            <p className="mt-1 text-center font-mono text-[12px] text-ink-soft">
              lost-desk.com/set-aunt-carlotta
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                Regenerate
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-sans text-[13px] font-semibold text-accent-ink shadow-[0_8px_16px_-8px_rgba(185,71,0,0.7)] transition-transform hover:-translate-y-px"
              >
                Enter
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-sans text-sm font-semibold text-accent-ink shadow-[0_10px_20px_-10px_rgba(185,71,0,0.75)] transition-transform hover:-translate-y-px"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Create a new desktop
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-hairline/12" />

      {/* Existing desktops list */}
      <div>
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
          Your desktops
        </p>

        {state === "returning" ? (
          <ul className="mt-3 flex flex-col gap-1">
            {existing.map((d) => (
              <li key={d.name}>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-sunk"
                >
                  <span className="font-mono text-[13px] text-ink">
                    {d.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-sans text-[12px] text-ink-soft">
                      {d.opened}
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-ink-soft opacity-0 transition-opacity group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 rounded-lg bg-surface-sunk px-4 py-5 text-center ring-1 ring-hairline/10">
            <p className="font-sans text-[13px] leading-relaxed text-ink-soft">
              No desktops yet. Create one to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
