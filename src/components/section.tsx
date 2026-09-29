import type { ReactNode } from "react";

import Reveal from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={
          "text-xs font-semibold uppercase tracking-[0.22em] text-brand-400 " +
          (centered ? "" : "")
        }
        id={id}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient-soft sm:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-7 text-frost-400 sm:text-lg">{sub}</p>
      )}
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={"mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 " + (className ?? "")}
    >
      {children}
    </section>
  );
}
