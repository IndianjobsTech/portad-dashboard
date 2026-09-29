import Reveal from "@/components/reveal";
import {
  IconArrowRight,
  IconBadgeCheck,
  IconBlocks,
  IconRefresh,
  IconShield,
  IconTerminal,
  IconUpload,
} from "@/components/icons";

const STEPS = [
  {
    title: "Export",
    body: "Pull the workspace into a neutral, checksummed .portad package — attachments included.",
    icon: IconUpload,
  },
  {
    title: "Validate",
    body: "Five layers check structure, references and integrity before a single byte is mapped.",
    icon: IconShield,
  },
  {
    title: "Map",
    body: "Field-level mapping rules translate the source schema — every decision is recorded.",
    icon: IconBlocks,
  },
  {
    title: "Transform",
    body: "One command rewrites the package for the target system with a per-field fidelity report.",
    icon: IconRefresh,
  },
  {
    title: "Import",
    body: "Resumable import writes into the target; checkpoints mean interruptions never redo work.",
    icon: IconArrowRight,
  },
  {
    title: "Verify",
    body: "A round-trip diff proves what moved, what changed, and what could not be carried.",
    icon: IconBadgeCheck,
  },
];

export default function Process() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent lg:block"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.07} className="h-full">
              <div className="glass group relative h-full rounded-2xl p-6 transition duration-300 hover:border-brand-400/40 hover:bg-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/10 text-brand-300 transition group-hover:bg-brand-500/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-frost-600">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-frost-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-frost-400">{step.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-frost-500">
          <IconTerminal className="h-4 w-4 text-brand-400" />
          Every stage is a CLI command you can run, script, and audit locally.
        </div>
      </Reveal>
    </div>
  );
}
