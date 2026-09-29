"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const COMMANDS = [
  "portad export notion",
  "portad validate ./notion.portad",
  "portad transform --target huly",
  "portad import huly --resume",
  "portad diff ./report.json",
];

const TYPING_MS = 55;
const ERASING_MS = 28;
const HOLD_MS = 1600;

type Phase = "typing" | "holding" | "erasing";

export default function Terminal() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduce) return;
    const target = COMMANDS[index];
    let timer: number | undefined;

    if (phase === "typing") {
      if (text.length < target.length) {
        timer = window.setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          TYPING_MS,
        );
      } else {
        timer = window.setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("erasing"), HOLD_MS);
    } else if (text.length > 0) {
      timer = window.setTimeout(() => setText(text.slice(0, -1)), ERASING_MS);
    } else {
      timer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % COMMANDS.length);
        setPhase("typing");
      }, 320);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [index, text, phase, reduce]);

  if (reduce) {
    return (
      <div className="rounded-2xl border border-white/10 bg-space-950 p-6 font-mono text-sm leading-7 text-frost-300 shadow-2xl shadow-black/40">
        {COMMANDS.map((cmd) => (
          <div key={cmd}>
            <span className="text-brand-400">$ </span>
            {cmd}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-space-950 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-frost-500">portad — zsh</span>
      </div>
      <div className="p-6 font-mono text-[13px] leading-7 text-frost-300 sm:text-sm">
        <div>
          <span className="text-brand-400">$ </span>
          {text}
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-brand-400/80" />
        </div>
        <div className="mt-3 space-y-1 text-frost-600">
          <div>✓ exported 1,284 records · 12 attachments</div>
          <div>✓ 5 validation layers passed · checksums verified</div>
          <div className="text-emerald-400/80">✓ round-trip diff clean — nothing invented</div>
        </div>
      </div>
    </div>
  );
}
