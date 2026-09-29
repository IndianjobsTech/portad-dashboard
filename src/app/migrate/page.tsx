"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Step = 0 | 1 | 2 | 3;

const STEP_LABELS = ["Source", "Target", "Package", "Run"] as const;

const SOURCES = [
  { id: "notion", name: "Notion", detail: "Pages, databases, attachments", ready: true },
  { id: "fixtures", name: "Fixtures demo", detail: "Synthetic workspace, no account needed", ready: true },
  { id: "trello", name: "Trello", detail: "Planned (0.3)", ready: false },
  { id: "clickup", name: "ClickUp", detail: "Planned (0.4)", ready: false },
];

const TARGETS = [
  { id: "huly", name: "Huly", detail: "Unified Import Format workspace", ready: true },
  { id: "notion", name: "Notion", detail: "Round-trip import planned", ready: false },
];

const CLI_RUN = [
  "portad export notion",
  "portad transform --target huly",
  "portad import huly --resume",
];

const TREE = [
  { depth: 0, name: "notion.portad/", kind: "dir" as const },
  { depth: 1, name: "manifest.json", kind: "file" as const, meta: "checksums · 12 KB" },
  { depth: 1, name: "report.json", kind: "file" as const, meta: "mapping decisions" },
  { depth: 1, name: "data/", kind: "dir" as const },
  { depth: 2, name: "pages.json", kind: "file" as const, meta: "842 records" },
  { depth: 2, name: "databases.json", kind: "file" as const, meta: "6 databases" },
  { depth: 2, name: "comments.json", kind: "file" as const, meta: "431 threads" },
  { depth: 1, name: "attachments/", kind: "dir" as const },
  { depth: 2, name: "12 files", kind: "file" as const, meta: "84.2 MB · sha256 ✓" },
];

export default function Migrate() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const canAdvance =
    (step === 0 && source !== null) ||
    (step === 1 && target !== null) ||
    (step === 2 && fileName !== null);

  const progress = (step / (STEP_LABELS.length - 1)) * 100;

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
        New migration
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gradient-soft sm:text-4xl">
        Four steps, zero surprises
      </h1>
      <p className="mt-3 max-w-xl leading-7 text-frost-400">
        Hosted execution is not enabled yet — each step mirrors the CLI flow it will
        one day run for you.
      </p>

      {/* Stepper */}
      <div className="mt-10">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-4 h-px bg-white/10"
          />
          <motion.div
            aria-hidden
            className="absolute left-0 top-4 h-px bg-gradient-to-r from-brand-500 to-ice-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <ol className="relative flex justify-between">
            {STEP_LABELS.map((label, index) => {
              const state =
                index < step ? "done" : index === step ? "current" : "todo";
              return (
                <li key={label} className="flex flex-col items-center gap-2">
                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-space-900 transition-colors " +
                      (state === "current"
                        ? "bg-gradient-to-br from-brand-500 to-ice-400 text-white shadow-[0_0_24px_-4px_rgba(22,104,255,0.8)]"
                        : state === "done"
                          ? "bg-emerald-500/90 text-white"
                          : "border border-white/15 bg-space-850 text-frost-500")
                    }
                  >
                    {state === "done" ? "✓" : index + 1}
                  </span>
                  <span
                    className={
                      "text-xs font-medium " +
                      (state === "todo" ? "text-frost-600" : "text-frost-200")
                    }
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Card */}
      <div className="glass mt-10 min-h-[380px] rounded-3xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...slide}
            transition={{ duration: reduce ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold text-frost-50">Choose a source</h2>
                <p className="mt-1 text-sm text-frost-500">
                  Where the workspace lives today.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SOURCES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={!item.ready}
                      onClick={() => setSource(item.id)}
                      className={
                        "rounded-2xl border p-4 text-left transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 " +
                        (source === item.id
                          ? "border-brand-400 bg-brand-500/10 shadow-[0_0_0_1px_rgba(61,139,255,0.5)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]")
                      }
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-medium text-frost-100">{item.name}</span>
                        {!item.ready && (
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-frost-600">
                            planned
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs text-frost-500">
                        {item.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-frost-50">Choose a target</h2>
                <p className="mt-1 text-sm text-frost-500">
                  Where the workspace should land.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {TARGETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={!item.ready}
                      onClick={() => setTarget(item.id)}
                      className={
                        "rounded-2xl border p-4 text-left transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 " +
                        (target === item.id
                          ? "border-brand-400 bg-brand-500/10 shadow-[0_0_0_1px_rgba(61,139,255,0.5)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]")
                      }
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-medium text-frost-100">{item.name}</span>
                        {!item.ready && (
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-frost-600">
                            planned
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs text-frost-500">
                        {item.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-frost-50">Attach a package</h2>
                <p className="mt-1 text-sm text-frost-500">
                  Have a <code className="font-mono text-brand-300">.portad</code>{" "}
                  package already? Attach it here — files never leave this page.
                </p>
                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 px-6 py-10 text-center transition hover:border-brand-400/60 hover:bg-brand-500/5">
                  <input
                    type="file"
                    accept=".zip,.portad"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setFileName(file ? file.name : null);
                    }}
                  />
                  <span className="text-sm font-medium text-frost-100">
                    {fileName ?? "Click to choose a .portad package"}
                  </span>
                  <span className="mt-1.5 font-mono text-xs text-frost-500">
                    or run portad export to create one
                  </span>
                </label>

                <AnimatePresence>
                  {fileName && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-2xl border border-white/10 bg-space-950/70 p-4 font-mono text-[13px] leading-7">
                        <div className="mb-2 text-frost-600">
                          preview · {fileName}
                        </div>
                        {TREE.map((node) => (
                          <div
                            key={node.depth + node.name}
                            className="flex items-center justify-between gap-4"
                            style={{ paddingLeft: node.depth * 18 }}
                          >
                            <span
                              className={
                                node.kind === "dir"
                                  ? "text-brand-300"
                                  : "text-frost-300"
                              }
                            >
                              {node.kind === "dir" ? "▸ " : "• "}
                              {node.name}
                            </span>
                            {node.meta && (
                              <span className="text-[11px] text-frost-600">
                                {node.meta}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-frost-50">
                  Run the migration
                </h2>
                <p className="mt-1 text-sm text-frost-500">
                  Hosted runs are queued for the hosted plane. Until then, the exact
                  pipeline runs locally:
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-space-950">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[11px] text-frost-600">terminal</span>
                  </div>
                  <div className="p-4 font-mono text-sm leading-7 text-frost-300">
                    {CLI_RUN.map((cmd) => (
                      <div key={cmd}>
                        <span className="text-brand-400">$ </span>
                        {cmd}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-5 flex items-start gap-2 text-sm text-amber-300/90">
                  <span aria-hidden>⚠</span>
                  Hosted execution not enabled yet — the button below is intentionally
                  disabled.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-2xl bg-white/8 px-4 py-3 text-sm font-medium text-frost-600"
                >
                  Run hosted migration
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1) as Step)}
          disabled={step === 0}
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-frost-300 transition hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="font-mono text-xs text-frost-600">
          step {step + 1} / {STEP_LABELS.length}
        </div>
        <button
          type="button"
          onClick={() => setStep((current) => Math.min(3, current + 1) as Step)}
          disabled={step === 3 || !canAdvance}
          className="btn-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/8 disabled:text-frost-600 disabled:shadow-none"
        >
          {step === 2 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}
