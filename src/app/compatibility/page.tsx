import type { Metadata } from "next";

export const metadata: Metadata = { title: "Compatibility" };

const SOURCES = [
  { name: "Notion", status: "Supported", detail: "Pages, databases, records, attachments, relations" },
  { name: "Fixtures demo", status: "Supported", detail: "Synthetic workspace for tests and demos" },
  { name: "Trello", status: "Planned", detail: "Milestone 0.3" },
  { name: "ClickUp", status: "Planned", detail: "Milestone 0.4" },
  { name: "Asana", status: "Planned", detail: "Milestone 0.4" },
];

const TARGETS = [
  { name: "Huly", status: "Supported", detail: "Unified Import Format workspace" },
  { name: "Notion", status: "Planned", detail: "Round-trip import" },
];

function Badge({ status }: { status: string }) {
  const ready = status === "Supported";
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
        (ready
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400")
      }
    >
      {status}
    </span>
  );
}

export default function Compatibility() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Compatibility matrix</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        What can move where, today. Field-level fidelity (PRESERVED / TRANSFORMED /
        UNSUPPORTED / FAILED) is reported per migration by{" "}
        <code className="font-mono text-sm">portad transform</code>.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Sources
          </h2>
          <ul className="space-y-3">
            {SOURCES.map((item) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{item.detail}</p>
                </div>
                <Badge status={item.status} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Targets
          </h2>
          <ul className="space-y-3">
            {TARGETS.map((item) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{item.detail}</p>
                </div>
                <Badge status={item.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        The matrix will eventually be generated from adapter capability YAML
        (review §5.1) — contributions welcome via the adapter SDK.
      </p>
    </div>
  );
}
