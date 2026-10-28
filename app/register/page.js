"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = [
    "bg-danger",
    "bg-danger",
    "bg-warning",
    "bg-warning",
    "bg-success",
  ];
  const labels = ["", "Weak", "Weak", "Fair", "Strong"];

  if (!password) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score] : "bg-separator"}`}
          />
        ))}
      </div>
      <span
        className={`text-[11px] font-medium ${score <= 2 ? "text-danger" : score === 3 ? "text-warning" : "text-success"}`}
      >
        {labels[score]}
      </span>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!form.agree) {
      setError("Please accept the terms to continue.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem("ll_auth", "1");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* Nav */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-accent-foreground shadow-sm">
              L
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Ledgerline
            </span>
          </Link>
          <span className="text-[13px] text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-105">
          {/* Trust badges */}
          <div className="mb-6 flex items-center justify-center gap-4 text-[11px] text-muted">
            {["SOC 2 Compliant", "256-bit encryption", "Free 14-day trial"].map(
              (t) => (
                <span key={t} className="flex items-center gap-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ),
            )}
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight">
                Create your account
              </h1>
              <p className="mt-1 text-[13px] text-muted">
                Start your free 14-day trial. No credit card required.
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
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Jane Smith"
                  autoComplete="name"
                  className="h-9 rounded-lg bg-field-background px-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-foreground">
                  Work email
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
                <label className="text-[12px] font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className="h-9 rounded-lg bg-field-background px-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition"
                />
                <PasswordStrength password={form.password} />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={set("agree")}
                  className="mt-0.5 rounded"
                />
                <span className="text-[12px] text-muted leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-accent hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-accent hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

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
                  "Create account"
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-separator" />
              <span className="text-[11px] text-muted">or sign up with</span>
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
