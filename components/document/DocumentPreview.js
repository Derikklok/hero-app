"use client";

import { forwardRef } from "react";
import Image from "next/image";

const DocumentPreview = forwardRef(function DocumentPreview(
  { doc, type, fmt, subtotal, totalTax, discountAmt, total },
  ref,
) {
  const isInvoice = type === "invoice";
  const accent = doc.accentColor || "#4f46e5";

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        background: "#fff",
        color: "#1a1a2e",
        width: "100%",
        minHeight: "297mm",
        padding: "40px 48px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 36,
        }}
      >
        <div>
          {doc.logo ? (
            <Image
              src={doc.logo}
              alt="Logo"
              width={240}
              height={48}
              unoptimized
              style={{
                width: "auto",
                height: 48,
                marginBottom: 12,
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                background: accent,
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              L
            </div>
          )}
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            {doc.fromName || "Your Company"}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            {doc.fromEmail}
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{doc.fromPhone}</div>
          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              whiteSpace: "pre-line",
              marginTop: 4,
            }}
          >
            {doc.fromAddress}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: accent,
              letterSpacing: -1,
            }}
          >
            {isInvoice ? "INVOICE" : "ESTIMATE"}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>
            {doc.number}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
            <div
              style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}
            >
              <span>Issue date</span>
              <span style={{ fontWeight: 600, color: "#1a1a2e" }}>
                {doc.issueDate}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "flex-end",
                marginTop: 4,
              }}
            >
              <span>{isInvoice ? "Due date" : "Valid until"}</span>
              <span style={{ fontWeight: 600, color: "#1a1a2e" }}>
                {doc.dueDate}
              </span>
            </div>
            {isInvoice && (
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "flex-end",
                  marginTop: 4,
                }}
              >
                <span>Terms</span>
                <span style={{ fontWeight: 600, color: "#1a1a2e" }}>
                  {doc.paymentTerms}
                </span>
              </div>
            )}
          </div>
          {/* Status badge */}
          <div
            style={{
              marginTop: 12,
              display: "inline-block",
              padding: "3px 12px",
              borderRadius: 999,
              background: accent + "18",
              color: accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {doc.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 2,
          background: accent,
          borderRadius: 2,
          marginBottom: 28,
        }}
      />

      {/* Bill To */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#94a3b8",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Bill To
        </div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{doc.toName || "—"}</div>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
          {doc.toEmail}
        </div>
        <div style={{ fontSize: 12, color: "#64748b" }}>{doc.toPhone}</div>
        <div
          style={{
            fontSize: 12,
            color: "#64748b",
            whiteSpace: "pre-line",
            marginTop: 4,
          }}
        >
          {doc.toAddress}
        </div>
      </div>

      {/* Line items table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12,
          marginBottom: 24,
        }}
      >
        <thead>
          <tr style={{ background: accent + "12" }}>
            <th
              style={{
                padding: "8px 12px",
                textAlign: "left",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
                borderRadius: "4px 0 0 4px",
              }}
            >
              Description
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "left",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Unit
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "right",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Qty
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "right",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Rate
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "right",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Tax
            </th>
            <th
              style={{
                padding: "8px 12px",
                textAlign: "right",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: 0.8,
                color: accent,
                textTransform: "uppercase",
                borderRadius: "0 4px 4px 0",
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {doc.lines.map((line, i) => (
            <tr key={line.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "10px 12px", fontWeight: 500 }}>
                {line.desc || `Item ${i + 1}`}
              </td>
              <td style={{ padding: "10px 8px", color: "#64748b" }}>
                {line.unit}
              </td>
              <td
                style={{
                  padding: "10px 8px",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {line.qty}
              </td>
              <td
                style={{
                  padding: "10px 8px",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmt(Number(line.rate))}
              </td>
              <td
                style={{
                  padding: "10px 8px",
                  textAlign: "right",
                  color: "#64748b",
                }}
              >
                {line.tax}%
              </td>
              <td
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmt(Number(line.qty) * Number(line.rate))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 28,
        }}
      >
        <div style={{ width: 260 }}>
          <Row label="Subtotal" value={fmt(subtotal)} />
          <Row label="Tax" value={fmt(totalTax)} />
          {discountAmt > 0 && (
            <Row label="Discount" value={`-${fmt(discountAmt)}`} />
          )}
          {Number(doc.shipping) > 0 && (
            <Row label="Shipping" value={fmt(Number(doc.shipping))} />
          )}
          <div
            style={{
              borderTop: `2px solid ${accent}`,
              marginTop: 8,
              paddingTop: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14 }}>Total</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: 20,
                color: accent,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(doc.notes || doc.terms) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 28,
          }}
        >
          {doc.notes && (
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Notes
              </div>
              <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>
                {doc.notes}
              </div>
            </div>
          )}
          {doc.terms && (
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Terms & Conditions
              </div>
              <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>
                {doc.terms}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #f1f5f9",
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          {doc.fromName} · {doc.fromEmail}
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{doc.number}</div>
      </div>
    </div>
  );
});

function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 0",
        fontSize: 12,
      }}
    >
      <span style={{ color: "#64748b" }}>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

export default DocumentPreview;
