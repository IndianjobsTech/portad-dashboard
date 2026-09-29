"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { IconSearch } from "@/components/icons";

type Entry = {
  name: string;
  status: "Supported" | "Planned";
  detail: string;
  kind: "source" | "target";
};

const ENTRIES: Entry[] = [
  { name: "Notion", status: "Supported", detail: "Pages, databases, records, attachments, relations", kind: "source" },
  { name: "Fixtures demo", status: "Supported", detail: "Synthetic workspace for tests and demos", kind: "source" },
  { name: "Trello", status: "Planned", detail: "Milestone 0.3", kind: "source" },
  { name: "ClickUp", status: "Planned", detail: "Milestone 0.4", kind: "source" },
  { name: "Asana", status: "Planned", detail: "Milestone 0.4", kind: "source" },
  { name: "Huly", status: "Supported", detail: "Unified Import Format workspace", kind: "target" },
  { name: "Notion", status: "Planned", detail: "Round-trip import", kind: "target" },
];

const FILTERS = ["All", "Supported", "Planned"] as const;
type Filter = (typeof FILTERS)[number];

function Badge({ status }: { status: Entry["status"] }) {
  const ready = status === "Supported";
  return (
    <span
      className={
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider " +
        (ready
          ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border border-white/12 bg-white/[0.05] text-frost-500")
      }
    >
      {status}
    </span>
  );
}

export default function CompatibilityMatrix() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.filter(
      (entry) =>
        (filter === "All" || entry.status === filter) &&
        (q === "" ||
          entry.name.toLowerCase().includes(q) ||
          entry.detail.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  const groups = useMemo(
    () => ({
      source: visible.filter((e) => e.kind === "source"),
      target: visible.filter((e) => e.kind === "target"),
    }),
    [visible],
  );

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-frost-600">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search platforms…"
            aria-label="Search platforms"
            className="w-full rounded-full border border-white/12 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-frost-100 placeholder:text-frost-600 outline-none transition focus:border-brand-400/60 focus:bg-white/[0.06]"
          />
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={
                "rounded-full border px-4 py-2 text-xs font-medium transition " +
                (filter === option
                  ? "border-brand-400/60 bg-brand-500/15 text-brand-200"
                  : "border-white/12 text-frost-400 hover:border-white/30 hover:text-frost-200")
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {(["source", "target"] as const).map((kind) => (
          <section key={kind}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-frost-600">
              {kind === "source" ? "Sources" : "Targets"}
            </h2>
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {groups[kind].map((item) => (
                  <motion.li
                    key={`${kind}-${item.name}-${item.detail}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="glass flex items-start justify-between gap-4 rounded-2xl p-4 transition hover:border-brand-400/30"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-frost-100">{item.name}</p>
                      <p className="mt-0.5 text-xs leading-5 text-frost-500">
                        {item.detail}
                      </p>
                    </div>
                    <Badge status={item.status} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {groups[kind].length === 0 && (
              <p className="rounded-2xl border border-dashed border-white/12 p-6 text-center text-sm text-frost-600">
                No matches — try another search.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
