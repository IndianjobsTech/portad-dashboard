import { GITHUB_URL } from "@/lib/config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center">
        <p>© 2026 VishMuKa TechWorks Private Limited · MIT licensed</p>
        <nav className="flex gap-4">
          <a href={GITHUB_URL} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            GitHub
          </a>
          <a
            href="https://portad-production.up.railway.app/healthz"
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            API health
          </a>
          <a href="/migrate" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Migrate
          </a>
        </nav>
      </div>
    </footer>
  );
}
