"use client";

export type StubSession = {
  email: string;
  provider: "preview";
  since: string;
};

const KEY = "portad.stub-session";

let cacheRaw: string | null | undefined;
let cacheSession: StubSession | null = null;

export function getStubSession(): StubSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheSession;
  let session: StubSession | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StubSession;
      if (parsed && typeof parsed.email === "string") session = parsed;
    } catch {
      session = null;
    }
  }
  cacheRaw = raw;
  cacheSession = session;
  return session;
}

export function subscribeSession(onChange: () => void): () => void {
  window.addEventListener("portad-session-changed", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("portad-session-changed", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function signInStub(): StubSession {
  const session: StubSession = {
    email: "preview@portad.local",
    provider: "preview",
    since: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  cacheRaw = JSON.stringify(session);
  cacheSession = session;
  window.dispatchEvent(new Event("portad-session-changed"));
  return session;
}

export function signOutStub(): void {
  window.localStorage.removeItem(KEY);
  cacheRaw = null;
  cacheSession = null;
  window.dispatchEvent(new Event("portad-session-changed"));
}
