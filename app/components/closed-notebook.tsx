import Link from "next/link";

interface ClosedNotebookProps {
  title?: string;
  version?: string;
  href?: string;
}

export function ClosedNotebook({
  title = "Notebook",
  version = "v1.0",
  href = "/notebook",
}: ClosedNotebookProps) {
  return (
    <Link
      href={href}
      aria-label={`Open ${title}`}
      className="group relative block aspect-[3/4] w-full max-w-[300px] rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-desk"
    >
      {/* One soft drop shadow under the closed cover */}
      <div
        aria-hidden
        className="absolute inset-0 translate-y-2 rounded-[20px] bg-cover shadow-[0_26px_50px_-18px_rgba(43,42,40,0.45)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_34px_60px_-18px_rgba(43,42,40,0.5)]"
      />

      {/* Charcoal cover */}
      <div className="absolute inset-0 translate-y-2 overflow-hidden rounded-[20px] bg-cover transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        {/* Spine strip on the left */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[10px] bg-cover-spine"
        />

        {/* Horizontal belly band across the middle (rust) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 bg-accent shadow-[0_1px_0_rgba(0,0,0,0.12),0_-1px_0_rgba(0,0,0,0.12)]"
        />

        {/* Elastic band down the right edge (charcoal spine tone) */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-5 w-[7px] bg-cover-spine shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        />

        {/* Cover title plate */}
        <div className="absolute inset-x-0 top-[18%] flex flex-col items-center gap-1 px-6 text-center">
          <span className="font-serif text-2xl tracking-tight text-surface">
            {title}
          </span>
          <span className="font-mono text-[11px] tracking-widest text-surface/55">
            {version}
          </span>
        </div>
      </div>

      {/* Ribbon hanging from the bottom edge (rust), clear of content */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-7"
      >
        <div className="h-9 w-3 bg-accent shadow-[0_8px_10px_-6px_rgba(43,42,40,0.5)]" />
        <div className="h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-accent" />
      </div>
    </Link>
  );
}
