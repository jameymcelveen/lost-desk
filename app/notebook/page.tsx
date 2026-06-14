import { Chrome, Notebook } from "../components/notebook";

const frames = [
  {
    label: "1 — Empty page",
    note: "Placeholder “Start writing…” in soft ink.",
    state: "empty" as const,
    page: 1,
  },
  {
    label: "2 — Written page",
    note: "A few paragraphs of body text on the writing surface.",
    state: "written" as const,
    page: 12,
  },
  {
    label: "3 — Mid page-turn",
    note: "Corner curled, a page sweeping across.",
    state: "turning" as const,
    page: 13,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-desk">
      {/* Faint vignette over the desk */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 30%, transparent 55%, rgba(43,42,40,0.07) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="mb-12">
          <h1 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
            lost-desk · Anchor 1
          </h1>
          <p className="mt-1 font-serif text-2xl text-ink">Open Notebook</p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-3">
          {frames.map((frame) => (
            <section key={frame.label} className="flex flex-col items-center">
              {/* Each frame is its own framed desk surface */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-desk shadow-[inset_0_0_0_1px_rgba(104,92,83,0.12)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(110% 90% at 50% 25%, transparent 60%, rgba(43,42,40,0.06) 100%)",
                  }}
                />
                <Chrome />
                <div className="flex items-center justify-center px-8 pb-24 pt-28">
                  <Notebook
                    state={frame.state}
                    page={frame.page}
                    total={40}
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="font-sans text-sm font-semibold text-ink">
                  {frame.label}
                </p>
                <p className="mt-1 max-w-[34ch] font-sans text-sm leading-relaxed text-ink-soft">
                  {frame.note}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
