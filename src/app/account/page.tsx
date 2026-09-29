"use client";

import { useSyncExternalStore } from "react";

import { LogoTile } from "@/components/logo";
import Reveal from "@/components/reveal";
import {
  getStubSession,
  signInStub,
  signOutStub,
  subscribeSession,
} from "@/lib/stub-auth";

function serverSnapshot() {
  return null;
}

function SsoButton({ label, hint }: { label: string; hint: string }) {
  return (
    <button
      type="button"
      disabled
      title={hint}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-frost-500 transition hover:border-white/20 disabled:cursor-not-allowed"
    >
      {label}
      <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] uppercase tracking-wider text-frost-600">
        soon
      </span>
    </button>
  );
}

export default function Account() {
  const session = useSyncExternalStore(
    subscribeSession,
    getStubSession,
    serverSnapshot,
  );

  if (!session) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center">
            <div
              aria-hidden
              className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-brand-500/20 blur-3xl"
            />
            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center">
                <LogoTile size={56} />
              </span>
              <h1 className="mt-5 text-2xl font-semibold tracking-tight text-frost-50">
                Sign in to PortaD
              </h1>
              <p className="mt-2 text-sm leading-6 text-frost-400">
                Real accounts (GitHub, Google, email via Firebase Auth) arrive with the
                hosted plane. Until then you can open a browser-local preview session.
              </p>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={() => signInStub()}
                  className="btn-gradient w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-all"
                >
                  Continue with preview session
                </button>
                <SsoButton label="Continue with GitHub" hint="Firebase Auth wiring is pending the web config" />
                <SsoButton label="Continue with Google" hint="Firebase Auth wiring is pending the web config" />
              </div>

              <p className="mt-6 text-xs leading-5 text-frost-600">
                The preview session only exists in this browser and grants no API
                access.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <Reveal>
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-4">
            <LogoTile size={52} />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight text-frost-50">
                {session.email}
              </h1>
              <p className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
                preview session
              </p>
            </div>
          </div>

          <dl className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-space-950/50 p-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-frost-500">Provider</dt>
              <dd className="font-medium text-frost-100">stub (browser-local)</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-frost-500">Signed in</dt>
              <dd className="font-medium text-frost-100">
                {new Date(session.since).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-frost-500">API access</dt>
              <dd className="font-medium text-frost-100">none</dd>
            </div>
          </dl>

          <p className="mt-5 text-xs leading-5 text-frost-600">
            This session is not a real account — it only exists in this browser and
            grants no API access. Firebase Auth wiring is pending the web config.
          </p>

          <button
            type="button"
            onClick={() => signOutStub()}
            className="mt-6 w-full rounded-2xl border border-white/15 px-4 py-3 text-sm font-medium text-frost-300 transition hover:border-white/35 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </Reveal>
    </div>
  );
}
