import { Plus, ChevronsUpDown } from "lucide-react";
import { ClosedNotebook } from "./components/closed-notebook";

const DESKTOP_NAME = "set-aunt-carlotta";

export default function DesktopPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-desk">
      {/* Faint vignette over the desk */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 35%, transparent 55%, rgba(43,42,40,0.07) 100%)",
        }}
      />

      {/* Engraved desktop nameplate, top-center */}
      <div className="absolute inset-x-0 top-0 z-20 flex justify-center px-6 py-6">
        <div className="rounded-md bg-surface-sunk px-4 py-1.5 shadow-[inset_0_1px_2px_rgba(43,42,40,0.18),0_1px_0_rgba(246,241,231,0.6)]">
          <span className="font-mono text-[13px] tracking-tight text-ink-soft">
            {DESKTOP_NAME}
          </span>
        </div>
      </div>

      {/* Unobtrusive desktop controls, top-right */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-1">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <ChevronsUpDown className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline">switch desktop</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline">new desktop</span>
        </button>
      </div>

      {/* The desk surface — an implied grid that more tools can land on later */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-28">
        <section
          aria-label="Tools on this desktop"
          className="grid w-full max-w-[1100px] grid-cols-2 gap-x-12 gap-y-16 sm:grid-cols-3 lg:grid-cols-4"
        >
          {/* The single tool: the notebook */}
          <div className="flex flex-col items-center gap-10">
            <ClosedNotebook title="Notebook" version="v1.0" href="/notebook" />
            <span className="font-sans text-sm font-medium text-ink-soft">
              Notebook
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
