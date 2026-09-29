import type { Metadata } from "next";

import { Section, SectionHeading } from "@/components/section";
import Reveal from "@/components/reveal";

import CompatibilityMatrix from "./matrix";

export const metadata: Metadata = { title: "Compatibility" };

export default function Compatibility() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Compatibility matrix"
        title="What can move where, today"
        sub={
          <>
            Field-level fidelity (PRESERVED / TRANSFORMED / UNSUPPORTED / FAILED) is
            reported per migration by{" "}
            <code className="font-mono text-sm text-brand-300">portad transform</code>.
          </>
        }
      />
      <Reveal delay={0.1}>
        <CompatibilityMatrix />
      </Reveal>
      <p className="mt-10 text-xs text-frost-600">
        The matrix will eventually be generated from adapter capability YAML —
        contributions welcome via the adapter SDK.
      </p>
    </Section>
  );
}
