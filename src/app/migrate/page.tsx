"use client";

import { useState } from "react";

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

export default function Migrate() {
  const [step, setStep] = useState<Step>(0);
  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const canAdvance =
    (step === 0 && source !== null) ||
    (step === 1 && target !== null) ||
    (step === 2 && fileName !== null);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">New migration</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A four-step wizard. Hosted execution is not enabled yet — each step mirrors
        the CLI flow it will one day run for you.
      </p>

      <ol className="mt-8 flex items-center gap-2">
        {STEP_LABELS.map((label, index) => {
          const state = index < step ? "done" : index === step ? "current" : "todo";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                  (state === "current"
                    ? "bg-blue-600 text-white"
                    : state === "done"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400")
                }
              >
                {state === "done" ? "✓" : index + 1}
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
              {index < STEP_LABELS.length - 1 && (
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        {step === 0 && (
          <div>
            <h2 className="font-medium">Choose a source</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SOURCES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={!item.ready}
                  onClick={() => setSource(item.id)}
                  className={
                    "rounded-lg border p-4 text-left transition-colors disabled:opacity-50 " +
                    (source === item.id
                      ? "border-blue-500 ring-1 ring-blue-500"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600")
                  }
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                    {item.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-medium">Choose a target</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {TARGETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={!item.ready}
                  onClick={() => setTarget(item.id)}
                  className={
                    "rounded-lg border p-4 text-left transition-colors disabled:opacity-50 " +
                    (target === item.id
                      ? "border-blue-500 ring-1 ring-blue-500"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600")
                  }
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                    {item.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-medium">Attach a package</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Have a <code className="font-mono">.portad</code> package already? Attach
              it here. (Uploads are UI-only for now — files never leave this page.)
            </p>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 px-6 py-10 text-center hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600">
              <input
                type="file"
                accept=".zip,.portad"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setFileName(file ? file.name : null);
                }}
              />
              <span className="text-sm font-medium">
                {fileName ?? "Click to choose a .portad package"}
              </span>
              <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                or run <code className="font-mono">portad export</code> to create one
              </span>
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-medium">Run the migration</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Hosted runs are queued for the hosted plane. Until then, the exact
              pipeline runs locally:
            </p>
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-7 text-zinc-100">
              {CLI_RUN.map((cmd) => (
                <div key={cmd}>
                  <span className="text-zinc-500">$ </span>
                  {cmd}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
              Hosted execution not enabled yet — button intentionally disabled.
            </p>
            <button
              type="button"
              disabled
              className="mt-3 rounded-md bg-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              Run hosted migration
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1) as Step)}
          disabled={step === 0}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-700"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep((current) => Math.min(3, current + 1) as Step)}
          disabled={step === 3 || !canAdvance}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:bg-zinc-300 disabled:text-zinc-600 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-400"
        >
          {step === 2 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}
