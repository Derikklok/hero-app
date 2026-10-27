"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { navItems } from "./data";

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

export default function Topbar() {
  const router = useRouter();
  const [active, setActive] = useState("Dashboard");

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-[1600px] items-center gap-6 px-4 md:px-6">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-accent-foreground shadow-sm">
            L
          </div>
          <span className="text-sm font-semibold tracking-tight">Ledgerline</span>
          <span className="hidden rounded-full border border-border bg-surface-secondary px-2 py-0.5 text-[10px] font-medium text-muted md:block">
            Business
          </span>
        </div>

        <div className="mx-1 h-5 w-px bg-border hidden lg:block" />

        {/* Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active === item
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-default hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <span className="pointer-events-none absolute left-2.5 text-muted">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search invoices, clients…"
              className="h-8 w-56 rounded-lg bg-field-background pl-8 pr-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition"
            />
          </div>

          <button className="relative flex size-8 items-center justify-center rounded-lg text-muted hover:bg-default hover:text-foreground transition-colors">
            <BellIcon />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-danger" />
          </button>

          <div className="mx-1 h-5 w-px bg-border" />

          <Button size="sm" variant="secondary" className="hidden sm:flex" onPress={() => router.push("/estimates/new")}>New estimate</Button>
          <Button size="sm" variant="primary" onPress={() => router.push("/invoices/new")}>New invoice</Button>

          <div className="relative group ml-1">
            <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-semibold text-accent ring-2 ring-accent/30">
              JD
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-focus-within:block w-44 rounded-xl border border-border bg-surface shadow-lg ring-1 ring-border/40 overflow-hidden z-30">
              <div className="border-b border-border px-3.5 py-2.5">
                <p className="text-[12px] font-semibold">Jane Doe</p>
                <p className="text-[11px] text-muted">jane@company.com</p>
              </div>
              <button
                onClick={() => { localStorage.removeItem("ll_auth"); router.push("/"); }}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-[12px] text-danger hover:bg-danger/8 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
