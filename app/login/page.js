"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // Simulate auth — replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("ll_auth", "1");
    router.push("/dashboard");
  }

  return (
    <div className="auth-shell grid h-screen overflow-hidden bg-background md:grid-cols-[minmax(360px,420px)_1fr]">
      <section className="relative flex h-screen min-h-0 flex-col overflow-hidden border-r border-border bg-surface/95">
        <main className="flex min-h-full flex-1 items-center justify-center px-6 py-8 sm:px-10">
        <div className="w-full max-w-100">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground shadow-sm">
                L
              </div>
              <span className="text-sm font-semibold tracking-tight">Ledgerline</span>
            </Link>
            <span className="text-right text-[12px] text-muted">
              No account?{" "}
              <Link href="/register" className="font-medium text-accent hover:underline">
                Sign up free
              </Link>
            </span>
          </div>
          {/* Card */}
          <div className="auth-card rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <div className="mb-6">
              <span className="mb-3 inline-flex rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">Secure workspace access</span>
              <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
              <p className="mt-1 text-[13px] text-muted">
                Sign in to your Ledgerline account
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-danger/30 bg-danger/8 px-3.5 py-2.5 text-[13px] text-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-foreground">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="h-9 rounded-lg bg-field-background px-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-foreground">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[12px] text-accent hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-9 rounded-lg bg-field-background px-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex h-9 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold text-accent-foreground shadow-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {loading ? (
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-separator" />
              <span className="text-[11px] text-muted">or continue with</span>
              <div className="h-px flex-1 bg-separator" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-[12px] font-medium text-foreground hover:bg-surface-secondary transition-colors shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-[12px] font-medium text-foreground hover:bg-surface-secondary transition-colors shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-[12px] text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-accent hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
        </main>
      </section>

      <aside className="relative h-screen min-h-0 overflow-hidden bg-[#071b3a] md:block" aria-label="Ledgerline platform preview">
        <Image
          src="/login-image.jpg"
          alt="Ledgerline workspace on a mobile device"
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="(min-width: 1024px) 65vw, 0vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,27,58,0.98)_0%,rgba(7,27,58,0.68)_34%,rgba(7,27,58,0.16)_72%,rgba(7,27,58,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(83,156,255,0.38),transparent_30%),radial-gradient(circle_at_20%_92%,rgba(19,91,173,0.5),transparent_34%)]" />

        <div className="relative z-10 flex h-screen flex-col justify-between overflow-hidden p-10 xl:p-16">
          <div className="max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#7dd3fc] shadow-[0_0_12px_#7dd3fc]" />
              The command center for modern finance teams
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-[1.08] tracking-tight text-white xl:text-6xl">
              Clarity for every
              <span className="block text-[#8fc9ff]">business decision.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/65 xl:text-base">
              Bring invoices, collections, and revenue intelligence into one calm, connected workspace.
            </p>
          </div>

          <div className="relative mx-auto mt-12 h-97.5 w-full max-w-162.5 xl:h-117.5">
            <div className="absolute left-[8%] top-[8%] h-[82%] w-[48%] rotate-[-7deg] overflow-hidden rounded-[2rem] border border-white/30 bg-white/10 shadow-2xl shadow-black/40 backdrop-blur-sm">
              <Image
                src="/login-image-2.jpg"
                alt="Ledgerline analytics preview"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1280px) 300px, 240px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#071b3a]/55 via-transparent to-white/10" />
            </div>
            <div className="absolute bottom-0 right-[4%] h-[92%] w-[46%] rotate-[7deg] overflow-hidden rounded-[2rem] border border-white/40 bg-white/10 shadow-2xl shadow-black/50 backdrop-blur-sm">
              <Image
                src="/login-image.jpg"
                alt="Ledgerline invoice overview"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1280px) 300px, 240px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#071b3a]/50 via-transparent to-white/10" />
            </div>
            <div className="absolute bottom-[9%] left-[5%] z-10 rounded-2xl border border-white/20 bg-[#0b2b5b]/85 px-4 py-3 text-white shadow-xl backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Collection rate</p>
              <p className="mt-1 text-xl font-semibold">98.6%</p>
              <p className="mt-0.5 text-[10px] text-[#8fc9ff]">↑ 4.2% this quarter</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5 text-[11px] text-white/50">
            <span>Trusted by finance teams that scale</span>
            <span className="hidden sm:inline">SOC 2 · SSO ready · Audit trails</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
