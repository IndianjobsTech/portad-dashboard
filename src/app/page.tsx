import Link from "next/link";

import ApiStatus from "@/components/api-status";

const FEATURES = [
  {
    title: "Local-first",
    body: "Your data leaves the machine only when you say so. The .portad package is fully usable without any PortaD service.",
  },
  {
    title: "Resumable",
    body: "Interrupted migrations continue from checkpoints — verified downloads and written files are reused, never redone.",
  },
  {
    title: "Verifiable",
    body: "Five validation layers, checksums, and a round-trip diff prove what migrated, what changed, and what cannot be carried.",
  },
  {
    title: "Extensible",
    body: "A small adapter SDK with entry-point discovery, stable errors, and a fixtures framework for contributors.",
  },
];

const CLI_STEPS = [
  "portad export notion",
  "portad validate ./package.portad",
  "portad transform --target huly",
  "portad import huly",
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Move your workspace,
          <br />
          keep the <span className="text-blue-600 dark:text-blue-400">truth</span>.
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          PortaD exports a SaaS workspace into a neutral, checksummed package,
          reports exactly what will survive the trip, and imports it into the
          target system — with a diff at the end that proves nothing was invented.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/migrate"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Start a migration
          </Link>
          <Link
            href="/jobs"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            View jobs
          </Link>
        </div>
        <div className="mt-6">
          <ApiStatus />
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <h2 className="font-medium">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {feature.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-medium">Run it today from your terminal</h2>
        <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-100">
          {CLI_STEPS.map((cmd) => (
            <div key={cmd}>
              <span className="text-zinc-500">$ </span>
              {cmd}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Hosted execution (upload a package, we run the pipeline) arrives with the
          hosted plane — until then the dashboard previews the flow and the CLI does
          the work.
        </p>
      </section>
    </div>
  );
}
