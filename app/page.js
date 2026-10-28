import Image from "next/image";
import Link from "next/link";

const capabilities = [
  ["01", "Invoice with intention", "Build polished invoices, estimates, and payment journeys that move from draft to paid without friction."],
  ["02", "See the signal", "Turn every receivable into a clear operating picture with live cash flow, aging, and collection intelligence."],
  ["03", "Move as one team", "Give sales, finance, and leadership one trusted workspace with permissions and audit trails built in."],
];

const features = [
  { title: "Invoice operations", text: "Create, send, and follow up in seconds.", icon: "↗" },
  { title: "Revenue intelligence", text: "Know what is coming in before it lands.", icon: "◒" },
  { title: "Client command", text: "Every relationship, payment, and promise in context.", icon: "◎" },
  { title: "Controls at scale", text: "Roles, approvals, and audit-ready history.", icon: "◇" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground shadow-sm">L</span>
      <span className="text-sm font-bold tracking-tight">Ledgerline</span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071b3a]/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 text-xs font-medium text-white/65 md:flex">
            <a href="#platform" className="transition hover:text-white">Platform</a>
            <a href="#workflow" className="transition hover:text-white">How it works</a>
            <a href="#customers" className="transition hover:text-white">Customers</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden rounded-lg px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white sm:block">Sign in</Link>
            <Link href="/register" className="rounded-lg bg-[#8fc9ff] px-4 py-2 text-xs font-bold text-[#071b3a] shadow-lg shadow-[#8fc9ff]/15 transition hover:bg-white">Start free</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[720px] overflow-hidden bg-[#071b3a] text-white">
          <Image src="/login-image-2.jpg" alt="City skyline at night" fill priority className="object-cover object-center opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071b3a_5%,rgba(7,27,58,0.88)_40%,rgba(7,27,58,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(104,183,255,0.32),transparent_30%)]" />
          <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 py-24 lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/75 backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#8fc9ff] shadow-[0_0_14px_#8fc9ff]" />
                The operating system for revenue teams
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                Make every
                <span className="block text-[#8fc9ff]">payment count.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                Ledgerline gives ambitious businesses the clarity to invoice faster, collect confidently, and make decisions from one source of truth.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/register" className="rounded-xl bg-[#8fc9ff] px-5 py-3 text-sm font-bold text-[#071b3a] shadow-xl shadow-black/20 transition hover:bg-white">Build your workspace <span className="ml-2">↗</span></Link>
                <a href="#platform" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15">Explore the platform</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/50">
                <span>14-day free trial</span><span>No credit card</span><span>SOC 2-ready controls</span>
              </div>
            </div>
            <div className="absolute bottom-8 right-6 hidden max-w-xs rounded-2xl border border-white/20 bg-[#0b2b5b]/75 p-4 shadow-2xl backdrop-blur-md lg:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Your next decision</p>
              <p className="mt-2 text-sm leading-5 text-white/85">“Collections are up 14%. Two accounts need attention today.”</p>
              <div className="mt-3 flex items-center justify-between text-[10px]"><span className="text-white/45">Ledgerline signal</span><span className="text-[#8fc9ff]">Live now</span></div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:px-10">
            <span>Trusted by operators at</span><span className="text-sm tracking-tight text-foreground/60">Northstar</span><span className="text-sm tracking-tight text-foreground/60">Arc & Co.</span><span className="text-sm tracking-tight text-foreground/60">Summitworks</span><span className="text-sm tracking-tight text-foreground/60">Kinetic</span>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">One calm command center</p>
              <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-tight tracking-tight md:text-5xl">The work behind the numbers, finally in view.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted">Revenue operations should not feel like detective work. Ledgerline connects the daily actions that create cash with the signals leaders need to steer the business.</p>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-lg text-accent">{feature.icon}</span>
                <h3 className="mt-8 text-sm font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
                <span className="mt-8 block text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">Learn more ↗</span>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="bg-[#071b3a] text-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-32">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fc9ff]">Designed for momentum</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">From first quote to final payment.</h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/55">A modern operating rhythm for teams who are done stitching together spreadsheets, inboxes, and disconnected tools.</p>
              <Link href="/register" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#071b3a] transition hover:bg-[#8fc9ff]">Start your 14-day trial</Link>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {capabilities.map(([number, title, text]) => (
                <div key={number} className="grid gap-5 py-8 sm:grid-cols-[70px_0.8fr_1.2fr] sm:items-start">
                  <span className="font-mono text-sm text-[#8fc9ff]">{number}</span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="customers" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10 lg:py-32">
          <div className="relative min-h-[400px] overflow-hidden rounded-[2rem] bg-[#0b2b5b]">
            <Image src="/login-image.jpg" alt="City skyline viewed from above" fill className="object-cover object-center opacity-70" sizes="(min-width: 1024px) 55vw, 100vw" />
            <div className="absolute inset-0 bg-linear-to-t from-[#071b3a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-[#071b3a]/75 p-5 text-white backdrop-blur-md">
              <p className="text-3xl font-semibold">98.6%</p><p className="mt-1 text-xs text-white/60">average collection rate across Ledgerline customers</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Built for the long view</p>
            <blockquote className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-4xl">“Ledgerline gave our team the confidence to grow without adding complexity.”</blockquote>
            <div className="mt-8 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">AR</span><div><p className="text-sm font-semibold">Amelia Rhodes</p><p className="text-xs text-muted">COO, Northstar Studio</p></div></div>
          </div>
        </section>

        <section id="pricing" className="border-y border-border bg-surface-secondary">
          <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-10 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">A clearer way forward</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">Your next best business decision starts here.</h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted">Set up in minutes. Bring your team in when you are ready. Grow into the operating system your business deserves.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/register" className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg transition hover:opacity-90">Create your free workspace</Link><Link href="/login" className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:bg-background">I already have an account</Link></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#071b3a] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div><Logo /><p className="mt-3 text-xs text-white/45">The operating system for revenue teams.</p></div>
          <div className="flex flex-wrap gap-6 text-xs text-white/50"><a href="#platform" className="hover:text-white">Platform</a><a href="#workflow" className="hover:text-white">How it works</a><a href="#pricing" className="hover:text-white">Pricing</a><Link href="/login" className="hover:text-white">Sign in</Link></div>
          <span className="text-xs text-white/35">© 2026 Ledgerline Inc.</span>
        </div>
      </footer>
    </div>
  );
}
