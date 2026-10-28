import Image from "next/image";
import Link from "next/link";

const clients = ["Northstar", "Arc & Co.", "Summitworks", "Kinetic", "Monument", "Brightline", "Foundry"];

const modules = [
  { number: "01", title: "Invoice operations", text: "Create polished invoices and estimates, send them from one place, and know exactly what happens next.", stat: "4.2×", label: "faster billing cycles" },
  { number: "02", title: "Collection intelligence", text: "Prioritise the accounts that need attention with aging signals, payment predictions, and automated reminders.", stat: "98.6%", label: "average collection rate" },
  { number: "03", title: "Business control", text: "Give every team the context they need while keeping approvals, roles, and audit history under control.", stat: "100%", label: "actions traceable" },
];

const steps = [
  ["01", "Connect your workspace", "Bring your clients, invoices, and team roles together in one secure operating layer."],
  ["02", "Run the daily rhythm", "Create, approve, send, and follow up without switching between spreadsheets and inboxes."],
  ["03", "Make the next decision", "See what is paid, what is at risk, and where to focus before the week gets away from you."],
];

function Logo({ light = false }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${light ? "text-white" : "text-foreground"}`}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground shadow-sm">L</span>
      <span className="text-sm font-bold tracking-tight">Ledgerline</span>
    </Link>
  );
}

function MiniDashboard() {
  return (
    <div className="relative mx-auto mt-14 w-full max-w-5xl overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#071426] text-white shadow-2xl shadow-[#071b3a]/30">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="size-2 rounded-full bg-[#ff6b5f]" /><span className="size-2 rounded-full bg-[#ffc857]" /><span className="size-2 rounded-full bg-[#57d49b]" />
        <span className="ml-3 text-[10px] text-white/35">app.ledgerline.io / overview</span>
        <span className="ml-auto rounded-full bg-[#8fc9ff]/10 px-2.5 py-1 text-[9px] text-[#8fc9ff]">Live workspace</span>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-[170px_1fr] md:p-7">
        <div className="hidden border-r border-white/10 pr-5 md:block">
          <div className="mb-7 flex items-center gap-2 text-xs font-semibold"><span className="flex size-6 items-center justify-center rounded-md bg-[#8fc9ff] text-[#071b3a]">L</span> Ledgerline</div>
          <div className="space-y-4 text-[10px] text-white/35"><p className="rounded-md bg-white/10 px-2.5 py-2 text-white">Overview</p><p>Invoices</p><p>Estimates</p><p>Clients</p><p>Reports</p><p>Settings</p></div>
        </div>
        <div>
          <div className="flex items-end justify-between"><div><p className="text-[10px] text-white/40">Tuesday, October 28</p><h3 className="mt-1 text-xl font-semibold">Good morning, Jane</h3></div><span className="rounded-md bg-[#8fc9ff] px-3 py-2 text-[10px] font-bold text-[#071b3a]">+ New invoice</span></div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[["Revenue", "$128,420", "+12.4%"], ["Outstanding", "$46,880", "-3.1%"], ["Overdue", "$12,310", "+8.2%"], ["Collection rate", "98.6%", "+4.2%"]].map(([label, value, delta]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.045] p-3"><p className="text-[9px] uppercase tracking-wider text-white/35">{label}</p><p className="mt-2 text-base font-semibold">{value}</p><p className="mt-1 text-[9px] text-[#74e0aa]">{delta} vs last month</p></div>)}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4"><div className="flex justify-between"><p className="text-[10px] font-medium">Invoiced vs collected</p><p className="text-[9px] text-white/35">Last 12 months</p></div><div className="mt-5 flex h-24 items-end gap-2">{[38, 54, 45, 70, 58, 76, 64, 82, 69, 88, 74, 96].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-[#8fc9ff]" style={{ height: `${height}%`, opacity: index > 8 ? 1 : 0.35 }} />)}</div></div>
          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4"><p className="text-[10px] font-medium">Collection focus</p><div className="mt-4 space-y-3">{[["Acme Group", "$18,420", "bg-[#8fc9ff]", "88%"], ["Monument Labs", "$9,240", "bg-[#ffc857]", "72%"], ["Kinetic Studio", "$6,180", "bg-[#74e0aa]", "64%"]].map(([name, value, color, width]) => <div key={name}><div className="flex justify-between text-[9px]"><span className="text-white/55">{name}</span><span>{value}</span></div><div className="mt-1 h-1 rounded-full bg-white/10"><div className={`h-full rounded-full ${color}`} style={{ width }} /></div></div>)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#f5f8fc] text-[#071b3a]">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo light />
          <nav className="hidden items-center gap-8 text-xs font-medium text-white/65 md:flex"><a href="#platform" className="hover:text-white">Platform</a><a href="#workflow" className="hover:text-white">How it works</a><a href="#clients" className="hover:text-white">Customers</a><a href="#pricing" className="hover:text-white">Pricing</a></nav>
          <div className="flex items-center gap-2"><Link href="/login" className="hidden rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white sm:block">Sign in</Link><Link href="/register" className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#071b3a] shadow-lg transition hover:bg-[#8fc9ff]">Book a demo</Link></div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden rounded-b-[2.5rem] bg-[#071b3a] px-4 pb-8 pt-24 text-white sm:px-6 lg:pb-12">
          <Image src="/login-image-2.jpg" alt="" fill priority className="object-cover object-center opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(83,156,255,0.5),transparent_38%),linear-gradient(180deg,#071b3a_0%,#0b2b5b_58%,#071426_100%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/75 backdrop-blur"><span className="size-1.5 rounded-full bg-[#8fc9ff]" /> Trusted by 1,500+ finance teams building with clarity</div>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Revenue operations,<br /><span className="text-[#8fc9ff]">without the noise.</span></h1>
            <p className="mt-7 max-w-xl text-sm leading-6 text-white/60 sm:text-base">Ledgerline is the calm, intelligent workspace for invoicing, collections, and the decisions that keep your business moving forward.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/register" className="rounded-lg bg-[#8fc9ff] px-5 py-3 text-xs font-bold text-[#071b3a] transition hover:bg-white">Get started — it&apos;s free ↗</Link><a href="#platform" className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-xs font-medium hover:bg-white/10">See how it works</a></div>
            <p className="mt-4 text-[10px] text-white/35">14 days free · No credit card · Set up in 4 minutes</p>
            <MiniDashboard />
            <div className="mt-7 flex items-center gap-3 text-[10px] text-white/35"><span className="flex -space-x-2">{["#8fc9ff", "#ffc857", "#74e0aa", "#f38ba8"].map((color, i) => <span key={i} className="size-6 rounded-full border-2 border-[#071b3a]" style={{ background: color }} />)}</span><span>Join teams running a clearer business</span></div>
          </div>
        </section>

        <section id="clients" className="overflow-hidden border-b border-[#dce6f2] bg-white py-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#60738d]">Powering the teams behind better businesses</p>
          <div className="logo-marquee mt-6"><div className="logo-marquee-track">{[...clients, ...clients].map((client, index) => <span key={`${client}-${index}`} className="whitespace-nowrap text-lg font-semibold tracking-tight text-[#6b7d96]">{client}</span>)}</div></div>
        </section>

        <section id="platform" className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2467ae]">Built for business velocity</p><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Everything your revenue team needs to move with confidence.</h2></div><p className="max-w-xl text-base leading-7 text-[#60738d] lg:pt-8">Most businesses do not have a revenue problem. They have a visibility problem. Ledgerline brings your financial work into one connected system so every person can act on the same signal.</p></div>
          <div className="mt-16 grid gap-4 lg:grid-cols-3">{modules.map((module) => <article key={module.number} className="rounded-2xl border border-[#dce6f2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex items-center justify-between"><span className="font-mono text-xs text-[#2467ae]">{module.number}</span><span className="rounded-full bg-[#eaf4ff] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#2467ae]">Core module</span></div><h3 className="mt-12 text-lg font-bold">{module.title}</h3><p className="mt-3 text-sm leading-6 text-[#60738d]">{module.text}</p><div className="mt-10 border-t border-[#e5edf5] pt-5"><p className="text-2xl font-semibold text-[#071b3a]">{module.stat}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[#60738d]">{module.label}</p></div></article>)}</div>
        </section>

        <section id="workflow" className="bg-[#eaf2fa]"><div className="mx-auto max-w-6xl px-6 py-24 lg:py-32"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2467ae]">How Ledgerline works</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">A better rhythm for every week.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#60738d]">Designed around the real operating rhythm of a growing business, from the first quote to the final payment.</p></div><div className="mt-16 grid gap-4 md:grid-cols-3">{steps.map(([number, title, text]) => <div key={number} className="relative rounded-2xl border border-white bg-white p-7"><span className="flex size-9 items-center justify-center rounded-full bg-[#071b3a] font-mono text-xs text-[#8fc9ff]">{number}</span><h3 className="mt-10 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#60738d]">{text}</p>{number !== "03" && <span className="absolute right-[-17px] top-12 z-10 hidden text-xl text-[#2467ae] md:block">→</span>}</div>)}</div></div></section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-32"><div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#071b3a]"><Image src="/login-image.jpg" alt="Night city skyline" fill className="object-cover opacity-65" sizes="(min-width: 1024px) 60vw, 100vw" /><div className="absolute inset-0 bg-linear-to-t from-[#071b3a] via-transparent to-transparent" /><div className="absolute bottom-7 left-7 rounded-2xl border border-white/20 bg-[#071b3a]/70 p-5 text-white backdrop-blur-md"><p className="text-3xl font-semibold">12,000+</p><p className="mt-1 text-xs text-white/55">businesses have a clearer view of revenue</p></div></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2467ae]">One source of truth</p><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">Less chasing. More choosing.</h2><p className="mt-6 text-base leading-7 text-[#60738d]">When your team can see the same picture, work gets lighter. Ledgerline gives leaders the confidence to decide what matters now — and what can wait.</p><div className="mt-8 space-y-4 text-sm font-medium"><p className="flex gap-3"><span className="text-[#2467ae]">✓</span> Centralised client and payment history</p><p className="flex gap-3"><span className="text-[#2467ae]">✓</span> Automated reminders that feel personal</p><p className="flex gap-3"><span className="text-[#2467ae]">✓</span> Audit-ready controls for every growing team</p></div></div></section>

        <section id="pricing" className="bg-[#071b3a] px-6 text-white"><div className="mx-auto flex max-w-4xl flex-col items-center py-24 text-center lg:py-32"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fc9ff]">Your next best decision</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Bring clarity to the way you grow.</h2><p className="mt-6 max-w-lg text-sm leading-6 text-white/55">Start with a free workspace. Invite your team when you are ready. See what Ledgerline can change in your business.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/register" className="rounded-lg bg-[#8fc9ff] px-6 py-3 text-xs font-bold text-[#071b3a] hover:bg-white">Create your free workspace ↗</Link><Link href="/login" className="rounded-lg border border-white/20 px-6 py-3 text-xs font-medium hover:bg-white/10">Sign in to Ledgerline</Link></div></div></section>
      </main>

      <footer className="bg-[#041329] px-6 py-10 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><Logo light /><p className="mt-3 text-xs text-white/35">The operating system for revenue teams.</p></div><div className="flex flex-wrap gap-6 text-xs text-white/45"><a href="#platform" className="hover:text-white">Platform</a><a href="#workflow" className="hover:text-white">How it works</a><a href="#clients" className="hover:text-white">Customers</a><a href="#pricing" className="hover:text-white">Pricing</a></div><span className="text-xs text-white/30">© 2026 Ledgerline Inc.</span></div></footer>
    </div>
  );
}
