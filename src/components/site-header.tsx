"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { LogoTile, Wordmark } from "@/components/logo";
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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-space-900/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70">
          <LogoTile size={34} />
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 text-sm md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3.5 py-1.5 transition-colors " +
                  (active
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-frost-400 hover:text-frost-100")
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
                className="hidden rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-frost-400 transition hover:border-white/25 hover:text-frost-100 sm:block"
              >
                preview session
              </Link>
              <button
                type="button"
                onClick={() => signOutStub()}
                className="rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-frost-200 transition hover:border-white/30 hover:text-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signInStub()}
              className="btn-gradient rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
