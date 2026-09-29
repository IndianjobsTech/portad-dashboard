"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FaqItem = { q: string; a: string };

export default function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/8 rounded-2xl border border-white/10 bg-white/[0.03]">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="px-5 sm:px-7">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-frost-100">{item.q}</span>
              <span
                className={
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-frost-400 transition-transform duration-300 " +
                  (isOpen ? "rotate-45 bg-brand-500/15 text-brand-300" : "")
                }
                aria-hidden
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-sm leading-7 text-frost-400">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
