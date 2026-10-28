import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";

export default function AuthShell({
  children,
  eyebrow,
  title,
  description,
  alternate,
  alternateHref,
  alternateLabel,
}) {
  return (
    <div className="auth-page min-h-screen bg-[#071b3a] px-3 py-3 text-[#071b3a] sm:px-5 sm:py-5">
      <div className="relative grid min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[2rem] bg-[#f5f8fc] shadow-2xl sm:min-h-[calc(100vh-2.5rem)] md:grid-cols-[minmax(380px,0.82fr)_1.18fr]">
        <section className="relative z-10 flex min-h-full flex-col bg-[#f5f8fc] px-6 py-7 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
                L
              </span>
              <span className="text-sm font-bold tracking-tight">
                Ledgerline
              </span>
            </Link>
            <span className="text-[11px] text-[#60738d] sm:text-right">
              {alternate}{" "}
              <Link
                href={alternateHref}
                className="font-bold text-accent hover:underline"
              >
                {alternateLabel}
              </Link>
            </span>
          </div>
          <main className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-97.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f2ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2467ae]">
                <span className="size-1.5 rounded-full bg-[#2467ae]" />{" "}
                {eyebrow}
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#60738d]">
                {description}
              </p>
              <Card className="mt-8 gap-0 border border-[#dce6f2] bg-white p-6 shadow-xl shadow-[#071b3a]/5 sm:p-7">
                {children}
              </Card>
            </div>
          </main>
          <p className="text-[10px] text-[#90a0b4]">
            © 2026 Ledgerline · The operating system for revenue teams.
          </p>
        </section>
        <aside className="relative hidden min-h-full overflow-hidden bg-[#071b3a] md:block">
          <Image
            src="/login-image-2.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-55"
            sizes="(min-width: 768px) 60vw, 0vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(143,201,255,0.45),transparent_30%),linear-gradient(145deg,rgba(7,27,58,0.98),rgba(7,27,58,0.45)_65%,rgba(4,19,41,0.9))]" />
          <div className="relative flex h-full min-h-162.5 flex-col justify-between p-8 text-white sm:p-12 lg:p-16">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/75 backdrop-blur">
                The calm command center for finance teams
              </span>
              <h2 className="mt-8 max-w-lg text-4xl font-semibold leading-[1.02] tracking-tight lg:text-6xl">
                See the work.
                <span className="block text-[#8fc9ff]">Move the business.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
                Invoices, collections, and the next best decision — connected in
                one clear workspace.
              </p>
            </div>
            <div className="relative mx-auto h-64 w-full max-w-82.5 rotate-[4deg] overflow-hidden rounded-[1.8rem] border border-white/30 shadow-2xl shadow-black/40">
              <Image
                src="/login-image.jpg"
                alt="Ledgerline workspace preview"
                fill
                className="object-cover object-top"
                sizes="330px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#071b3a]/80 via-transparent to-white/10" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-[#071b3a]/75 p-3 backdrop-blur-md">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                  Collection rate
                </p>
                <p className="mt-1 text-xl font-semibold">98.6%</p>
                <p className="mt-0.5 text-[10px] text-[#8fc9ff]">
                  ↑ 4.2% this quarter
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/15 pt-4 text-[10px] text-white/45">
              <span>Trusted by 1,500+ teams</span>
              <span>SOC 2-ready controls</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
