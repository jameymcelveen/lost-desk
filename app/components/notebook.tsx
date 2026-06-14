import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

type NotebookState = "empty" | "written" | "turning";

interface NotebookProps {
  state?: NotebookState;
  tenant?: string;
  page?: number;
  total?: number;
}

const sampleParagraphs = [
  "The desk is the only thing I trust to remember. Everything else scatters — tabs, drafts, the half-thought I had on the stairs. Here it stays put, in ink, where I left it.",
  "I keep the rules light. One page is one sitting. When the page fills, it turns, and the turning is the only ceremony. No folders, no tags, no second tool clamoring for attention.",
  "Aunt Carlotta would have liked that. She wrote standing up, in a hand that leaned hard to the right, as if the words were already running ahead of her toward whatever came next.",
];

export function Notebook({
  state = "written",
  tenant = "set-aunt-carlotta",
  page = 12,
  total = 40,
}: NotebookProps) {
  const isTurning = state === "turning";

  return (
    <div className="relative aspect-[3/4] w-full max-w-[420px]">
      {/* Charcoal cover peeking behind the page */}
      <div
        aria-hidden
        className="absolute -inset-x-3 -top-2 bottom-[-14px] rounded-[22px] bg-cover shadow-[0_30px_60px_-20px_rgba(43,42,40,0.45)]"
      />
      {/* Spine shadow on the left where cover wraps */}
      <div
        aria-hidden
        className="absolute -left-3 top-0 bottom-[-14px] w-3 rounded-l-[22px] bg-cover-spine"
      />

      {/* Elastic band along the right edge, pushed open over the page */}
      <div
        aria-hidden
        className="absolute right-2 -top-3 bottom-[-18px] z-10 w-[7px] rounded-full bg-cover-spine shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_6px_10px_-4px_rgba(43,42,40,0.5)]"
      />

      {/* The page (writing surface) */}
      <article
        className="absolute inset-0 overflow-hidden rounded-[16px] bg-surface shadow-[0_2px_0_0_rgba(104,92,83,0.08),0_18px_40px_-24px_rgba(43,42,40,0.5)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, var(--rule) 35px, var(--rule) 36px)",
          backgroundPosition: "0 72px",
        }}
      >
        {/* Left margin rule */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-12 w-px bg-accent/30"
        />

        {/* Ribbon bookmark hanging from the top edge over the page */}
        <div aria-hidden className="absolute right-9 -top-1 z-20">
          <div className="h-20 w-2.5 bg-accent shadow-[0_8px_10px_-6px_rgba(43,42,40,0.5)]" />
          <div className="h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-accent" />
        </div>

        {/* Writing surface */}
        <div
          className="relative h-full pl-16 pr-14 pt-[72px] pb-16 font-serif text-ink"
          role="textbox"
          aria-multiline="true"
          aria-label="Notebook page"
        >
          {state === "empty" ? (
            <p className="text-2xl leading-relaxed text-ink-soft/80 italic">
              Start writing…
              <span className="ml-0.5 inline-block h-7 w-px translate-y-1 animate-pulse bg-ink-soft/70 align-middle" />
            </p>
          ) : (
            <div className="flex flex-col gap-5 text-[1.075rem] leading-[36px] tracking-[0.01em]">
              {sampleParagraphs.map((para, i) => (
                <p key={i} className="-rotate-[0.25deg]">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Bottom-right corner-curl affordance */}
        <button
          type="button"
          aria-label="Turn page"
          className="group absolute bottom-0 right-0 z-20 h-12 w-12 cursor-pointer"
        >
          <span
            className="absolute bottom-0 right-0 block h-12 w-12 rounded-tl-[16px] bg-surface-sunk shadow-[-6px_-6px_12px_-6px_rgba(43,42,40,0.45)] transition-all duration-200 group-hover:h-14 group-hover:w-14"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}
          />
        </button>
      </article>

      {/* Mid page-turn: a curled page sweeping across */}
      {isTurning && (
        <div
          aria-hidden
          className="absolute inset-0 z-30 origin-left"
          style={{
            transform: "perspective(1400px) rotateY(-38deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 rounded-[16px] bg-surface shadow-[18px_22px_40px_-18px_rgba(43,42,40,0.55)]" />
          <div
            className="absolute inset-y-0 right-0 w-1/3 rounded-r-[16px]"
            style={{
              background:
                "linear-gradient(to right, rgba(43,42,40,0) 0%, rgba(43,42,40,0.12) 100%)",
            }}
          />
        </div>
      )}

      {/* Lower-corner chevrons */}
      <button
        type="button"
        aria-label="Previous page"
        className="absolute -left-1 bottom-6 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface/60 hover:text-ink"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next page"
        className="absolute -right-1 bottom-6 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface/60 hover:text-ink"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2} />
      </button>

      {/* Page indicator, bottom-center */}
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-ink-soft tabular-nums">
        {page} / {total}
      </div>
    </div>
  );
}

export function Chrome({ tenant = "set-aunt-carlotta" }: { tenant?: string }) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      {/* Top-left: back to desktop */}
      <Link
        href="/"
        className="pointer-events-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        <span>desktop</span>
      </Link>

      {/* Top-center: engraved nameplate */}
      <div className="pointer-events-auto rounded-md bg-surface-sunk px-4 py-1.5 shadow-[inset_0_1px_2px_rgba(43,42,40,0.18),0_1px_0_rgba(246,241,231,0.6)]">
        <span className="font-mono text-[13px] tracking-tight text-ink-soft">
          {tenant}
        </span>
      </div>

      {/* Right spacer to balance layout */}
      <div className="w-20" aria-hidden />
    </header>
  );
}
