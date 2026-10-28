"use client";

import { useMemo, useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { invoices, money, statusColor } from "./data";
import CardHeader from "@/components/ui/CardHeader";

const FILTERS = ["All", "Overdue", "Sent", "Partial", "Paid", "Draft"];

const COLUMNS = [
  { key: "id", label: "Invoice #" },
  { key: "client", label: "Client" },
  { key: "issued", label: "Issued", hide: true },
  { key: "due", label: "Due Date" },
  { key: "amount", label: "Amount", num: true },
  { key: "balance", label: "Balance", num: true },
  { key: "status", label: "Status" },
];

const SortIcon = ({ active, dir }) => (
  <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" className={active ? "opacity-100" : "opacity-30"}>
    <path d="M4 0 L7 4 L1 4 Z" opacity={active && dir === "asc" ? "1" : "0.4"} />
    <path d="M4 10 L7 6 L1 6 Z" opacity={active && dir === "desc" ? "1" : "0.4"} />
  </svg>
);

export default function InvoiceTable() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "id", dir: "desc" });
  const [selected, setSelected] = useState(() => new Set());

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = invoices
      .map((r) => ({ ...r, balance: r.amount - r.paid }))
      .filter((r) => (filter === "All" ? true : r.status === filter))
      .filter((r) => !q || r.client.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    const { key, dir } = sort;
    list.sort((a, b) => {
      const av = a[key], bv = b[key];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [filter, query, sort]);

  const total = rows.reduce((s, r) => s + r.amount, 0);
  const balance = rows.reduce((s, r) => s + r.balance, 0);
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));

  const overdueCount = invoices.filter((r) => r.status === "Overdue").length;

  return (
    <Card className="gap-0 p-0 ring-1 ring-border/60 shadow-sm overflow-hidden">
      {/* Header */}
      <CardHeader
        variant="rose"
        title="Invoices"
        right={
          <div className="flex flex-wrap items-center gap-2">
            {overdueCount > 0 && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                {overdueCount} overdue
              </span>
            )}
            <div className="flex rounded-lg p-0.5 gap-0.5" style={{ background: "rgba(0,0,0,0.25)" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors"
                  style={
                    filter === f
                      ? { background: "rgba(255,255,255,0.95)", color: "var(--card-header-rose-bg)" }
                      : { color: "rgba(255,255,255,0.75)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative flex items-center">
              <svg className="pointer-events-none absolute left-2.5" style={{ color: "rgba(255,255,255,0.6)" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search client or number…"
                className="invoice-search h-8 w-52 rounded-lg pl-8 pr-3 text-[12px] outline-none transition"
                style={{ background: "rgba(0,0,0,0.25)", color: "#fff", caretColor: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
              />
            </div>
          </div>
        }
      />

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-2 border-b border-border bg-accent/8 px-4 py-2 text-xs">
          <span className="font-semibold text-accent">{selected.size} selected</span>
          <div className="mx-2 h-3.5 w-px bg-border" />
          <Button size="sm" variant="secondary" className="h-6 px-2.5 text-xs">Send reminder</Button>
          <Button size="sm" variant="secondary" className="h-6 px-2.5 text-xs">Mark paid</Button>
          <Button size="sm" variant="secondary" className="h-6 px-2.5 text-xs">Export</Button>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-muted hover:text-foreground transition-colors">
            ✕ Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[13px] tabular-nums">
          <thead className="bg-surface-secondary text-[11px] font-medium uppercase tracking-wider text-muted">
            <tr>
              <th className="w-10 py-2.5 pl-4 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all"
                  className="rounded"
                />
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={`px-3 py-2.5 ${c.num ? "text-right" : "text-left"} ${c.hide ? "hidden xl:table-cell" : ""}`}
                >
                  <button
                    onClick={() => toggleSort(c.key)}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    {c.label}
                    <SortIcon active={sort.key === c.key} dir={sort.dir} />
                  </button>
                </th>
              ))}
              <th className="w-16 px-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-separator">
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`group transition-colors hover:bg-surface-secondary ${selected.has(r.id) ? "bg-accent/5" : ""}`}
              >
                <td className="py-2.5 pl-4">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleRow(r.id)}
                    aria-label={`Select ${r.id}`}
                    className="rounded"
                  />
                </td>
                <td className="px-3 py-2.5 font-semibold text-accent">{r.id}</td>
                <td className="max-w-[180px] truncate px-3 py-2.5 font-medium">{r.client}</td>
                <td className="hidden px-3 py-2.5 text-muted xl:table-cell">{r.issued}</td>
                <td className={`px-3 py-2.5 ${r.status === "Overdue" ? "font-medium text-danger" : "text-muted"}`}>
                  {r.due}
                </td>
                <td className="px-3 py-2.5 text-right font-medium">{money(r.amount)}</td>
                <td className={`px-3 py-2.5 text-right ${r.balance === 0 ? "text-muted" : "font-semibold"}`}>
                  {r.balance === 0 ? "—" : money(r.balance)}
                </td>
                <td className="px-3 py-2.5">
                  <Chip size="sm" variant="soft" color={statusColor[r.status]}>{r.status}</Chip>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <Button size="sm" variant="ghost" className="h-6 px-2.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Open ↗
                  </Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="py-12 text-center text-sm text-muted">
                  No invoices match your filter.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="border-t-2 border-border bg-surface-secondary text-[12px] font-semibold">
            <tr>
              <td colSpan={5} className="py-2.5 pl-4 text-muted">{rows.length} invoice{rows.length !== 1 ? "s" : ""}</td>
              <td className="px-3 py-2.5 text-right">{money(total)}</td>
              <td className="px-3 py-2.5 text-right text-warning">{money(balance)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
