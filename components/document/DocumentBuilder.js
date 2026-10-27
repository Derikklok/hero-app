"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import DocumentPreview from "./DocumentPreview";

const TAX_RATES = [0, 5, 8, 10, 13, 15, 20];
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];
const PAYMENT_TERMS = ["Due on receipt", "Net 7", "Net 15", "Net 30", "Net 45", "Net 60"];

function newLine() {
  return { id: crypto.randomUUID(), desc: "", qty: 1, unit: "", rate: 0, tax: 0 };
}

export default function DocumentBuilder({ type }) {
  const isInvoice = type === "invoice";
  const previewRef = useRef(null);

  const today = new Date().toISOString().slice(0, 10);
  const defaultDue = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

  const [doc, setDoc] = useState({
    number: isInvoice ? "INV-2042" : "EST-519",
    issueDate: today,
    dueDate: defaultDue,
    currency: "USD",
    paymentTerms: "Net 30",
    status: isInvoice ? "Draft" : "Draft",
    // From (your company)
    fromName: "Ledgerline Inc.",
    fromEmail: "billing@ledgerline.io",
    fromAddress: "123 Finance St, Suite 400\nSan Francisco, CA 94105",
    fromPhone: "+1 (415) 555-0100",
    // To (client)
    toName: "",
    toEmail: "",
    toAddress: "",
    toPhone: "",
    // Content
    lines: [newLine()],
    discount: 0,
    discountType: "percent", // "percent" | "fixed"
    shipping: 0,
    notes: "",
    terms: "Payment is due within the agreed terms. Late payments may incur a 1.5% monthly fee.",
    // Branding
    logo: null,
    accentColor: "#4f46e5",
  });

  const set = (k) => (e) => setDoc((d) => ({ ...d, [k]: e.target.value }));
  const setVal = (k, v) => setDoc((d) => ({ ...d, [k]: v }));

  // Line item helpers
  const setLine = (id, k, v) =>
    setDoc((d) => ({ ...d, lines: d.lines.map((l) => (l.id === id ? { ...l, [k]: v } : l)) }));
  const addLine = () => setDoc((d) => ({ ...d, lines: [...d.lines, newLine()] }));
  const removeLine = (id) => setDoc((d) => ({ ...d, lines: d.lines.filter((l) => l.id !== id) }));
  const duplicateLine = (id) =>
    setDoc((d) => {
      const idx = d.lines.findIndex((l) => l.id === id);
      const copy = { ...d.lines[idx], id: crypto.randomUUID() };
      const next = [...d.lines];
      next.splice(idx + 1, 0, copy);
      return { ...d, lines: next };
    });

  // Totals
  const lineSubtotals = doc.lines.map((l) => Number(l.qty) * Number(l.rate));
  const subtotal = lineSubtotals.reduce((s, v) => s + v, 0);
  const lineTaxes = doc.lines.map((l) => Number(l.qty) * Number(l.rate) * (Number(l.tax) / 100));
  const totalTax = lineTaxes.reduce((s, v) => s + v, 0);
  const discountAmt =
    doc.discountType === "percent" ? subtotal * (Number(doc.discount) / 100) : Number(doc.discount);
  const total = subtotal + totalTax - discountAmt + Number(doc.shipping);

  const fmt = useCallback(
    (n) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: doc.currency, maximumFractionDigits: 2 }).format(n),
    [doc.currency]
  );

  // Logo upload
  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setVal("logo", ev.target.result);
    reader.readAsDataURL(file);
  };

  // PDF via browser print
  const handlePrint = () => {
    if (previewRef.current) {
      const win = window.open("", "_blank");
      win.document.write(`
        <!DOCTYPE html><html><head>
        <title>${doc.number}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, system-ui, sans-serif; font-size: 13px; color: #1a1a2e; background: #fff; }
          @media print { @page { margin: 0; size: A4; } body { -webkit-print-color-adjust: exact; } }
        </style>
        </head><body>
        ${previewRef.current.innerHTML}
        <script>window.onload=()=>{window.print();window.close();}<\/script>
        </body></html>
      `);
      win.document.close();
    }
  };

  const statusColors = {
    Draft: "bg-default text-muted",
    Sent: "bg-accent/10 text-accent",
    Paid: "bg-success/10 text-success",
    Void: "bg-danger/10 text-danger",
    Accepted: "bg-success/10 text-success",
    Declined: "bg-danger/10 text-danger",
    Expired: "bg-warning/10 text-warning",
  };
  const statuses = isInvoice ? ["Draft", "Sent", "Paid", "Void"] : ["Draft", "Sent", "Accepted", "Declined", "Expired"];

  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-13 max-w-[1600px] items-center gap-3 px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span className="text-[13px]">Dashboard</span>
          </Link>
          <span className="text-border">/</span>
          <span className="text-[13px] font-medium">{isInvoice ? "New Invoice" : "New Estimate"}</span>

          <div className="ml-auto flex items-center gap-2">
            {/* Status badge */}
            <select
              value={doc.status}
              onChange={set("status")}
              className={`rounded-full border-0 px-3 py-1 text-[12px] font-semibold outline-none cursor-pointer ${statusColors[doc.status]}`}
            >
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>

            <div className="h-5 w-px bg-border" />

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-foreground hover:bg-surface-secondary transition-colors shadow-sm"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Save PDF
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-foreground hover:bg-surface-secondary transition-colors shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Send
            </button>
            <button className="rounded-lg bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity">
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-0 overflow-hidden">

        {/* ── LEFT: Form ── */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">

          {/* Section: Document meta */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-muted">Document Details</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Field label={isInvoice ? "Invoice #" : "Estimate #"}>
                <input value={doc.number} onChange={set("number")} className={input()} />
              </Field>
              <Field label="Issue Date">
                <input type="date" value={doc.issueDate} onChange={set("issueDate")} className={input()} />
              </Field>
              <Field label={isInvoice ? "Due Date" : "Valid Until"}>
                <input type="date" value={doc.dueDate} onChange={set("dueDate")} className={input()} />
              </Field>
              <Field label="Currency">
                <select value={doc.currency} onChange={set("currency")} className={input()}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              {isInvoice && (
                <Field label="Payment Terms" className="col-span-2">
                  <select value={doc.paymentTerms} onChange={set("paymentTerms")} className={input()}>
                    {PAYMENT_TERMS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              )}
            </div>
          </section>

          {/* Section: From / To */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-muted">Parties</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* From */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-foreground">From</p>
                  <label className="cursor-pointer text-[11px] text-accent hover:underline">
                    {doc.logo ? "Change logo" : "Upload logo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                  </label>
                </div>
                {doc.logo && <img src={doc.logo} alt="Logo" className="h-10 w-auto object-contain rounded" />}
                <input value={doc.fromName} onChange={set("fromName")} placeholder="Company name" className={input()} />
                <input value={doc.fromEmail} onChange={set("fromEmail")} placeholder="Email" className={input()} />
                <input value={doc.fromPhone} onChange={set("fromPhone")} placeholder="Phone" className={input()} />
                <textarea value={doc.fromAddress} onChange={set("fromAddress")} placeholder="Address" rows={2} className={input("resize-none")} />
              </div>
              {/* To */}
              <div className="flex flex-col gap-3">
                <p className="text-[12px] font-semibold text-foreground">Bill To</p>
                <input value={doc.toName} onChange={set("toName")} placeholder="Client name or company" className={input()} />
                <input value={doc.toEmail} onChange={set("toEmail")} placeholder="Client email" className={input()} />
                <input value={doc.toPhone} onChange={set("toPhone")} placeholder="Client phone" className={input()} />
                <textarea value={doc.toAddress} onChange={set("toAddress")} placeholder="Client address" rows={2} className={input("resize-none")} />
              </div>
            </div>
          </section>

          {/* Section: Line items */}
          <section className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted">Line Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-[13px]">
                <thead className="bg-surface-secondary text-[11px] font-medium uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-4 py-2.5 text-left w-[35%]">Description</th>
                    <th className="px-3 py-2.5 text-left w-[12%]">Unit</th>
                    <th className="px-3 py-2.5 text-right w-[10%]">Qty</th>
                    <th className="px-3 py-2.5 text-right w-[14%]">Rate</th>
                    <th className="px-3 py-2.5 text-right w-[10%]">Tax %</th>
                    <th className="px-3 py-2.5 text-right w-[14%]">Amount</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-separator">
                  {doc.lines.map((line, idx) => (
                    <tr key={line.id} className="group">
                      <td className="px-4 py-2">
                        <input
                          value={line.desc}
                          onChange={(e) => setLine(line.id, "desc", e.target.value)}
                          placeholder={`Item ${idx + 1}`}
                          className="w-full rounded-md bg-transparent px-2 py-1 outline-none ring-0 hover:bg-surface-secondary focus:bg-field-background focus:ring-1 focus:ring-focus transition text-[13px]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={line.unit}
                          onChange={(e) => setLine(line.id, "unit", e.target.value)}
                          placeholder="hrs"
                          className="w-full rounded-md bg-transparent px-2 py-1 outline-none hover:bg-surface-secondary focus:bg-field-background focus:ring-1 focus:ring-focus transition text-[13px]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          value={line.qty}
                          onChange={(e) => setLine(line.id, "qty", e.target.value)}
                          className="w-full rounded-md bg-transparent px-2 py-1 text-right outline-none hover:bg-surface-secondary focus:bg-field-background focus:ring-1 focus:ring-focus transition text-[13px]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.rate}
                          onChange={(e) => setLine(line.id, "rate", e.target.value)}
                          className="w-full rounded-md bg-transparent px-2 py-1 text-right outline-none hover:bg-surface-secondary focus:bg-field-background focus:ring-1 focus:ring-focus transition text-[13px]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={line.tax}
                          onChange={(e) => setLine(line.id, "tax", e.target.value)}
                          className="w-full rounded-md bg-transparent px-2 py-1 text-right outline-none hover:bg-surface-secondary focus:bg-field-background focus:ring-1 focus:ring-focus transition text-[13px]"
                        >
                          {TAX_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2 text-right font-medium tabular-nums">
                        {fmt(Number(line.qty) * Number(line.rate))}
                      </td>
                      <td className="pr-3 py-2">
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => duplicateLine(line.id)}
                            title="Duplicate"
                            className="flex size-6 items-center justify-center rounded text-muted hover:bg-default hover:text-foreground transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeLine(line.id)}
                            title="Remove"
                            className="flex size-6 items-center justify-center rounded text-muted hover:bg-danger/10 hover:text-danger transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-separator px-5 py-3">
              <button
                onClick={addLine}
                className="flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add line item
              </button>
            </div>
          </section>

          {/* Section: Totals + Discount + Shipping */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:ml-auto md:w-80">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium tabular-nums">{fmt(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted">Tax</span>
                <span className="font-medium tabular-nums">{fmt(totalTax)}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-muted shrink-0">Discount</span>
                <div className="ml-auto flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    value={doc.discount}
                    onChange={set("discount")}
                    className="w-20 rounded-lg bg-field-background px-2 py-1 text-right text-[13px] outline-none ring-1 ring-field-border focus:ring-2 focus:ring-focus transition"
                  />
                  <select
                    value={doc.discountType}
                    onChange={set("discountType")}
                    className="rounded-lg bg-field-background px-2 py-1 text-[13px] outline-none ring-1 ring-field-border focus:ring-2 focus:ring-focus transition"
                  >
                    <option value="percent">%</option>
                    <option value="fixed">$</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-muted shrink-0">Shipping</span>
                <input
                  type="number"
                  min="0"
                  value={doc.shipping}
                  onChange={set("shipping")}
                  className="ml-auto w-24 rounded-lg bg-field-background px-2 py-1 text-right text-[13px] outline-none ring-1 ring-field-border focus:ring-2 focus:ring-focus transition"
                />
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-[14px] font-bold">Total</span>
                <span className="text-[18px] font-bold tabular-nums text-accent">{fmt(total)}</span>
              </div>
            </div>
          </section>

          {/* Section: Notes & Terms */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-muted">Notes & Terms</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Notes (visible to client)">
                <textarea
                  value={doc.notes}
                  onChange={set("notes")}
                  placeholder="Thank you for your business…"
                  rows={3}
                  className={input("resize-none")}
                />
              </Field>
              <Field label="Terms & Conditions">
                <textarea
                  value={doc.terms}
                  onChange={set("terms")}
                  rows={3}
                  className={input("resize-none")}
                />
              </Field>
            </div>
          </section>

          {/* Section: Branding */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-muted">Branding</h2>
            <div className="flex items-center gap-4">
              <Field label="Accent color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={doc.accentColor}
                    onChange={set("accentColor")}
                    className="h-9 w-14 cursor-pointer rounded-lg border border-field-border bg-field-background p-1"
                  />
                  <input
                    value={doc.accentColor}
                    onChange={set("accentColor")}
                    className={input()}
                    style={{ width: 100 }}
                  />
                </div>
              </Field>
            </div>
          </section>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div className="hidden xl:flex w-[520px] shrink-0 flex-col border-l border-border bg-surface-secondary">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Live Preview</span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-[12px] font-medium text-accent hover:underline"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Save as PDF
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="origin-top scale-[0.72] rounded-xl shadow-lg" style={{ transformOrigin: "top center" }}>
              <DocumentPreview ref={previewRef} doc={doc} type={type} fmt={fmt} subtotal={subtotal} totalTax={totalTax} discountAmt={discountAmt} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[11px] font-medium uppercase tracking-wider text-muted">{label}</label>
      {children}
    </div>
  );
}

function input(extra = "") {
  return `h-9 w-full rounded-lg bg-field-background px-3 text-[13px] text-field-foreground outline-none ring-1 ring-field-border placeholder:text-field-placeholder focus:ring-2 focus:ring-focus transition ${extra}`;
}
