"use client";

import { useSyncExternalStore } from "react";

import {
  getStubSession,
  signInStub,
  signOutStub,
  subscribeSession,
} from "@/lib/stub-auth";

function serverSnapshot() {
  return null;
}

export default function Account() {
  const session = useSyncExternalStore(
    subscribeSession,
    getStubSession,
    serverSnapshot,
  );

  if (!session) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Not signed in</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Sign in is a browser-local preview session for now. Real accounts
          (GitHub, Google, email via Firebase Auth) arrive with the hosted plane.
        </p>
        <button
          type="button"
          onClick={() => signInStub()}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Sign in (preview)
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      <div className="mt-6 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Email</dt>
            <dd className="font-medium">{session.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Provider</dt>
            <dd className="font-medium">stub preview (browser-local)</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Signed in</dt>
            <dd className="font-medium">
              {new Date(session.since).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
      <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
        This session is not a real account — it only exists in this browser and
        grants no API access. Firebase Auth wiring is pending the web config.
      </p>
      <button
        type="button"
        onClick={() => signOutStub()}
        className="mt-4 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:border-zinc-400 dark:border-zinc-700"
      >
        Sign out
      </button>
    </div>
  );
}
