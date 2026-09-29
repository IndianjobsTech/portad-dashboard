"use client";

import { useEffect, useState } from "react";

import { API_URL } from "@/lib/config";

type State =
  | { kind: "checking" }
  | { kind: "online"; version: string; latencyMs: number }
  | { kind: "offline"; detail: string };

export default function ApiStatus() {
  const [state, setState] = useState<State>({ kind: "checking" });

  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      const started = performance.now();
      try {
        const res = await fetch(`${API_URL}/healthz`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = (await res.json()) as { status?: string; version?: string };
        if (body.status !== "ok") throw new Error("unexpected status payload");
        if (!cancelled) {
          setState({
            kind: "online",
            version: body.version ?? "unknown",
            latencyMs: Math.round(performance.now() - started),
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ kind: "offline", detail: err instanceof Error ? err.message : "error" });
        }
      }
    };

    void probe();
    const timer = window.setInterval(() => void probe(), 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <span
        aria-hidden
        className={
          "inline-block h-2.5 w-2.5 rounded-full " +
          (state.kind === "online"
            ? "bg-emerald-500"
            : state.kind === "offline"
              ? "bg-red-500"
              : "animate-pulse bg-amber-500")
        }
      />
      <span className="font-medium text-zinc-800 dark:text-zinc-100">
        {state.kind === "checking" && "Checking API…"}
        {state.kind === "online" && `API online · v${state.version}`}
        {state.kind === "offline" && "API unreachable"}
      </span>
      <span className="text-zinc-500 dark:text-zinc-400">
        {state.kind === "online" && `${state.latencyMs} ms`}
        {state.kind === "offline" && state.detail}
        {state.kind === "checking" && "…"}
      </span>
    </div>
  );
}
