"use client";

import { useRef, type ReactNode } from "react";

import { IconChevronLeft, IconChevronRight } from "@/components/icons";

export default function Carousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.75), behavior: "smooth" });
  };

  return (
    <div className="group/car relative">
      <div
        ref={ref}
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="glass absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-frost-300 opacity-0 transition hover:text-white group-hover/car:opacity-100 md:grid"
      >
        <IconChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="glass absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-frost-300 opacity-0 transition hover:text-white group-hover/car:opacity-100 md:grid"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
