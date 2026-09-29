import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Jobs" };

export default function Jobs() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Hosted migration jobs will appear here with live progress, resumable state,
        and downloadable reports.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Job</th>
              <th className="px-4 py-3 font-medium">Route</th>
              <th className="px-4 py-3 font-medium">Started</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-zinc-500 dark:text-zinc-400">
                No jobs yet.{" "}
                <Link href="/migrate" className="text-blue-600 hover:underline dark:text-blue-400">
                  Start a migration
                </Link>{" "}
                — or run the pipeline locally with the CLI.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Job records live in Firestore with Postgres as the orchestration store on
        Railway (review §5); both light up with the hosted worker.
      </p>
    </div>
  );
}
