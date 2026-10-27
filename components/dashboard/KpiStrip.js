import { Card } from "@heroui/react";
import { kpis } from "./data";

function Sparkline({ data, good }) {
  const w = 80, h = 28;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color = good ? "var(--success)" : "var(--danger)";
  const first = pts.split(" ")[0];
  const last = pts.split(" ").at(-1);
  const [lx, ly] = last.split(",");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
      <circle cx={lx} cy={ly} r="2" fill={color} />
    </svg>
  );
}

const TrendArrow = ({ good, delta }) => (
  <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums ${good ? "text-success" : "text-danger"}`}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      {good
        ? <path d="M5 2 L9 8 L1 8 Z" />
        : <path d="M5 8 L9 2 L1 2 Z" />}
    </svg>
    {delta}
  </span>
);

export default function KpiStrip() {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6" aria-label="Key metrics">
      {kpis.map((k) => (
        <Card key={k.label} className="gap-0 p-4 ring-1 ring-border/60 shadow-sm hover:shadow-md transition-shadow">
          <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted">{k.label}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums leading-none tracking-tight">{k.value}</p>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <TrendArrow good={k.good} delta={k.delta} />
              <span className="text-[10px] text-muted">vs last month</span>
            </div>
            <Sparkline data={k.spark} good={k.good} />
          </div>
        </Card>
      ))}
    </section>
  );
}
