import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: "Smart Invoicing",
    desc: "Create, send, and track invoices in seconds. Automated reminders keep cash flowing.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Revenue Analytics",
    desc: "Live charts on invoiced vs collected, aging buckets, and win rates — all in one view.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Client Management",
    desc: "Centralise contacts, track payment history, and manage estimates per client.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Enterprise Security",
    desc: "Role-based access, audit logs, and SOC 2 compliant infrastructure built in.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Estimate Pipeline",
    desc: "Move estimates from draft to signed with a visual kanban-style pipeline.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Automated Reminders",
    desc: "Schedule payment reminders by due date, overdue days, or custom triggers.",
  },
];

const stats = [
  { value: "12,000+", label: "Businesses" },
  { value: "$2.4B", label: "Invoiced annually" },
  { value: "98.6%", label: "Collection rate" },
  { value: "4 min", label: "Avg. setup time" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-background">

      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-accent-foreground shadow-sm">
              L
            </div>
            <span className="text-sm font-semibold tracking-tight">Ledgerline</span>
          </div>
          <nav className="hidden items-center gap-6 text-[13px] font-medium text-muted md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Why us</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted hover:bg-default hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">

        {/* Hero */}
        <section className="mx-auto flex w-full max-w-300 flex-col items-center gap-6 px-6 pb-16 pt-20 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-medium text-muted shadow-sm">
            <span className="size-1.5 rounded-full bg-success" />
            Now with AI-powered payment predictions
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[56px] lg:leading-[1.1]">
            The invoicing platform built for{" "}
            <span className="text-accent">serious businesses</span>
          </h1>
          <p className="max-w-xl text-base text-muted md:text-lg">
            Ledgerline gives finance teams a single place to invoice, collect, and forecast — with the depth of enterprise software and the speed of a startup tool.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Start free — no credit card
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-border bg-surface px-5 py-2.5 text-[14px] font-medium text-foreground shadow-sm hover:bg-surface-secondary transition-colors"
            >
              Sign in to dashboard →
            </Link>
          </div>
          <p className="text-[12px] text-muted">Free 14-day trial · Cancel anytime · SOC 2 compliant</p>
        </section>

        {/* Dashboard preview */}
        <section className="mx-auto w-full max-w-275 px-6 pb-20">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl ring-1 ring-border/40">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-secondary px-4 py-3">
              <span className="size-2.5 rounded-full bg-danger/60" />
              <span className="size-2.5 rounded-full bg-warning/60" />
              <span className="size-2.5 rounded-full bg-success/60" />
              <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-surface px-3 text-[11px] text-muted ring-1 ring-border">
                app.ledgerline.io/dashboard
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 rounded bg-surface-tertiary" />
                  <div className="mt-1.5 h-3 w-36 rounded bg-surface-tertiary/60" />
                </div>
                <div className="h-7 w-28 rounded-lg bg-surface-tertiary" />
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                    <div className="h-2.5 w-16 rounded bg-surface-tertiary" />
                    <div className="mt-2 h-5 w-20 rounded bg-surface-tertiary" />
                    <div className="mt-3 h-6 w-full rounded bg-surface-tertiary/50" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                  <div className="mb-3 h-3 w-32 rounded bg-surface-tertiary" />
                  <div className="flex items-end gap-1.5 h-24">
                    {[65, 80, 72, 88, 95, 90, 105, 112, 100, 118, 125, 128].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                        <div className="rounded-sm" style={{ height: `${(h / 128) * 80}%`, background: i === 11 ? "var(--accent)" : "var(--accent)", opacity: i === 11 ? 1 : 0.35 }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                  <div className="mb-3 h-3 w-28 rounded bg-surface-tertiary" />
                  {["Draft", "Sent", "Viewed", "Negotiating"].map((s, i) => (
                    <div key={s} className="mb-2.5">
                      <div className="mb-1 flex justify-between">
                        <div className="h-2.5 w-16 rounded bg-surface-tertiary" />
                        <div className="h-2.5 w-10 rounded bg-surface-tertiary" />
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-tertiary overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${[40, 70, 55, 35][i]}%`, background: ["var(--muted)", "var(--accent)", "var(--warning)", "var(--success)"][i], opacity: 0.7 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-300 grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-8 py-10">
                <span className="text-3xl font-bold tracking-tight text-foreground">{s.value}</span>
                <span className="text-[13px] text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-300 px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Everything your finance team needs</h2>
            <p className="mt-3 text-[15px] text-muted">Built for teams that invoice at scale and can&apos;t afford gaps in their receivables.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {f.icon}
                </div>
                <h3 className="mb-1.5 text-[14px] font-semibold">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-300 flex-col items-center gap-5 px-6 py-20 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to get paid faster?</h2>
            <p className="max-w-md text-[15px] text-muted">Join thousands of businesses that trust Ledgerline to run their revenue operations.</p>
            <Link
              href="/register"
              className="rounded-lg bg-accent px-6 py-2.5 text-[14px] font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Create your free account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-secondary">
        <div className="mx-auto flex max-w-300 items-center justify-between px-6 py-5 text-[12px] text-muted">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-md bg-accent text-[9px] font-bold text-accent-foreground">L</div>
            <span>Ledgerline</span>
          </div>
          <span>&copy; 2026 Ledgerline Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
