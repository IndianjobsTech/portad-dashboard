"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import {
  getStubSession,
  signInStub,
  signOutStub,
  subscribeSession,
} from "@/lib/stub-auth";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/migrate", label: "Migrate" },
  { href: "/jobs", label: "Jobs" },
  { href: "/compatibility", label: "Compatibility" },
];

function signedInSnapshot(): boolean {
  return getStubSession() !== null;
}

function serverSnapshot(): boolean {
  return false;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const signedIn = useSyncExternalStore(
    subscribeSession,
    signedInSnapshot,
    serverSnapshot,
  );

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Porta<span className="text-blue-600 dark:text-blue-400">D</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-md px-3 py-1.5 transition-colors " +
                  (active
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <>
              <Link
                href="/account"
                className="hidden rounded-md border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 sm:block"
              >
                preview session
              </Link>
              <button
                type="button"
                onClick={() => signOutStub()}
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signInStub()}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
