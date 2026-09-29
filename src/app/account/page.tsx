"use client";

import { useState, type FormEvent } from "react";

import { LogoTile } from "@/components/logo";
import Reveal from "@/components/reveal";
import {
  friendlyAuthError,
  signInEmail,
  signInPreview,
  signInWithGitHub,
  signInWithGoogle,
  signOut,
  signUpEmail,
  useAuth,
  type AuthSession,
} from "@/lib/auth";
import { firebaseEnabled } from "@/lib/firebase";

const PROVIDER_LABELS: Record<string, string> = {
  password: "Email & password",
  "github.com": "GitHub",
  "google.com": "Google",
  preview: "Preview (browser-local)",
};

function SsoButton({
  label,
  hint,
  onClick,
  busy,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  busy?: boolean;
}) {
  const disabled = !firebaseEnabled || busy;
  return (
    <button
      type="button"
      disabled={disabled}
      title={firebaseEnabled ? hint : "Firebase isn't configured yet"}
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-frost-200 transition hover:border-white/25 disabled:cursor-not-allowed disabled:text-frost-500"
    >
      {label}
      {!firebaseEnabled && (
        <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] uppercase tracking-wider text-frost-600">
          soon
        </span>
      )}
      {busy && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-frost-600 border-t-frost-200" />
      )}
    </button>
  );
}

function LoadingCard() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <div className="glass flex flex-col items-center gap-4 rounded-3xl p-10">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-brand-400" />
        <p className="text-sm text-frost-400">Restoring session…</p>
      </div>
    </div>
  );
}

function SignInCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"email" | "github" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(kind: "email" | "github" | "google", action: () => Promise<void>) {
    setBusy(kind);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(null);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter an email and password.");
      return;
    }
    void run("email", () =>
      mode === "signin"
        ? signInEmail(email.trim(), password)
        : signUpEmail(email.trim(), password),
    );
  }

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
              Real accounts issue a Firebase ID token you can inspect on the account
              page — or open a browser-local preview session.
            </p>

            <form onSubmit={submit} className="mt-7 space-y-3 text-left">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-frost-400">
                  Email
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/12 bg-space-950/70 px-4 py-3 text-sm text-frost-100 outline-none transition placeholder:text-frost-600 focus:border-brand-400/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-frost-400">
                  Password
                </span>
                <input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/12 bg-space-950/70 px-4 py-3 text-sm text-frost-100 outline-none transition placeholder:text-frost-600 focus:border-brand-400/60"
                />
              </label>

              {error && (
                <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs leading-5 text-rose-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy !== null}
                className="btn-gradient w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-all disabled:opacity-60"
              >
                {busy === "email"
                  ? "Working…"
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setError(null);
                }}
                className="text-brand-300 transition hover:text-brand-200"
              >
                {mode === "signin"
                  ? "New here? Create an account"
                  : "Have an account? Sign in"}
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <SsoButton
                label="Continue with GitHub"
                hint="Opens the GitHub sign-in popup via Firebase"
                busy={busy === "github"}
                onClick={() => void run("github", signInWithGitHub)}
              />
              <SsoButton
                label="Continue with Google"
                hint="Opens the Google sign-in popup via Firebase"
                busy={busy === "google"}
                onClick={() => void run("google", signInWithGoogle)}
              />
              <button
                type="button"
                onClick={() => signInPreview()}
                className="w-full rounded-2xl border border-white/10 px-4 py-2.5 text-xs text-frost-500 transition hover:border-white/25 hover:text-frost-300"
              >
                Skip — use a preview session
              </button>
            </div>

            <p className="mt-6 text-xs leading-5 text-frost-600">
              Preview sessions only exist in this browser and grant no API access.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function SessionCard({ session }: { session: AuthSession }) {
  const [copied, setCopied] = useState(false);

  async function copyToken() {
    if (!session.token) return;
    try {
      await navigator.clipboard.writeText(session.token);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const rows: Array<[string, string]> = [
    ["Email", session.email],
    ["User ID", session.uid ?? "browser-local"],
    ["Provider", PROVIDER_LABELS[session.provider] ?? session.provider],
    ["Signed in", new Date(session.since).toLocaleString()],
    [
      "ID token expires",
      session.expiresAt ? new Date(session.expiresAt).toLocaleString() : "—",
    ],
    [
      "ID token",
      session.token ? `${session.token.slice(0, 16)}…` : "not issued (preview)",
    ],
    [
      "API access",
      session.mode === "firebase" ? "Bearer token on API calls" : "none",
    ],
  ];

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
              <p
                className={
                  "mt-0.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium " +
                  (session.mode === "firebase"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-amber-400/30 bg-amber-400/10 text-amber-300")
                }
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full animate-pulse-dot " +
                    (session.mode === "firebase" ? "bg-emerald-400" : "bg-amber-400")
                  }
                />
                {session.mode === "firebase" ? "signed in" : "preview session"}
              </p>
            </div>
          </div>

          <dl className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-space-950/50 p-5 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="shrink-0 text-frost-500">{label}</dt>
                <dd className="truncate font-medium text-frost-100" title={value}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {session.token && (
            <button
              type="button"
              onClick={() => void copyToken()}
              className="mt-4 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-frost-200 transition hover:border-white/30 hover:text-white"
            >
              {copied ? "Token copied" : "Copy ID token"}
            </button>
          )}

          <p className="mt-5 text-xs leading-5 text-frost-600">
            {session.mode === "firebase"
              ? "This ID token is issued by Firebase and expires automatically; API calls attach it as a Bearer token."
              : "This session is not a real account — it only exists in this browser and grants no API access."}
          </p>

          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-6 w-full rounded-2xl border border-white/15 px-4 py-3 text-sm font-medium text-frost-300 transition hover:border-white/35 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export default function Account() {
  const { ready, session } = useAuth();

  if (!ready) return <LoadingCard />;
  if (!session) return <SignInCard />;
  return <SessionCard session={session} />;
}
