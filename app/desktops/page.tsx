import { DesktopCard } from "../components/desktop-card";

const frames = [
  {
    label: "1 — First run",
    note: "Empty list, just the create action.",
    state: "first-run" as const,
  },
  {
    label: "2 — Post-create",
    note: "Minted name revealed with the Enter button.",
    state: "post-create" as const,
  },
  {
    label: "3 — Returning",
    note: "A few existing desktops listed, tappable to enter.",
    state: "returning" as const,
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
            lost-desk · Anchor 0
          </h1>
          <p className="mt-1 font-serif text-2xl text-ink">
            Create / Switch Desktop
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-20 lg:grid-cols-3">
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
                <div className="flex items-center justify-center px-7 py-14">
                  <DesktopCard state={frame.state} />
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
