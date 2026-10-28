import { Card } from "@heroui/react";
import { kpis } from "./data";

function Sparkline({ data, good }) {
  const w = 80,
    h = 28;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color = good ? "var(--success)" : "var(--danger)";
  const last = pts.split(" ").at(-1);
  const [lx, ly] = last.split(",");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx={lx} cy={ly} r="2" fill={color} />
    </svg>
  );
}

const TrendArrow = ({ good, delta }) => (
  <span
    className={`inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums ${good ? "text-success" : "text-danger"}`}
  >
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      {good ? <path d="M5 2 L9 8 L1 8 Z" /> : <path d="M5 8 L9 2 L1 2 Z" />}
    </svg>
    {delta}
  </span>
);

// Each KPI card gets its own header tint cycling through the palette
const KPI_VARIANTS = ["blue", "indigo", "teal", "green", "amber", "rose"];

const headerStyles = {
  blue: {
    bg: "var(--card-header-blue-bg)",
    border: "var(--card-header-blue-border)",
    text: "var(--card-header-blue-text)",
  },
  indigo: {
    bg: "var(--card-header-indigo-bg)",
    border: "var(--card-header-indigo-border)",
    text: "var(--card-header-indigo-text)",
  },
  teal: {
    bg: "var(--card-header-teal-bg)",
    border: "var(--card-header-teal-border)",
    text: "var(--card-header-teal-text)",
  },
  green: {
    bg: "var(--card-header-green-bg)",
    border: "var(--card-header-green-border)",
    text: "var(--card-header-green-text)",
  },
  amber: {
    bg: "var(--card-header-amber-bg)",
    border: "var(--card-header-amber-border)",
    text: "var(--card-header-amber-text)",
  },
  rose: {
    bg: "var(--card-header-rose-bg)",
    border: "var(--card-header-rose-border)",
    text: "var(--card-header-rose-text)",
  },
};

export default function KpiStrip() {
  return (
    <section
      className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6"
      aria-label="Key metrics"
    >
      {kpis.map((k, idx) => {
        const variant = KPI_VARIANTS[idx % KPI_VARIANTS.length];
        const s = headerStyles[variant];
        return (
          <Card
            key={k.label}
            className="gap-0 p-0 ring-1 ring-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Tinted label strip */}
            <div
              className="border-b px-4 pt-3 pb-2"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <p
                className="truncate text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: s.text }}
              >
                {k.label}
              </p>
            </div>
            {/* Value + sparkline */}
            <div className="px-4 pb-4 pt-3">
              <p className="text-2xl font-bold tabular-nums leading-none tracking-tight">
                {k.value}
              </p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <TrendArrow good={k.good} delta={k.delta} />
                  <span className="text-[10px] text-muted">vs last month</span>
                </div>
                <Sparkline data={k.spark} good={k.good} />
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
