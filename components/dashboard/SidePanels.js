import { Card } from "@heroui/react";
import { activity, aging, money, pipeline } from "./data";
import CardHeader from "@/components/ui/CardHeader";

function ProgressBar({ pct, color = "var(--accent)", bg = "var(--default)" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: bg }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const stageColors = {
  Draft: "var(--muted)",
  Sent: "var(--accent)",
  Viewed: "var(--warning)",
  Negotiating: "var(--success)",
};

export function EstimatePipeline() {
  const max = Math.max(...pipeline.map((p) => p.value));
  const total = pipeline.reduce((s, p) => s + p.value, 0);
  return (
    <Card className="gap-0 p-0 ring-1 ring-border/60 shadow-sm overflow-hidden">
      <CardHeader
        variant="teal"
        title="Estimate Pipeline"
        right={
          <span className="rounded-full bg-white/40 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums" style={{ color: "var(--card-header-teal-text)" }}>
            {money(total, true)}
          </span>
        }
      />
      <ul className="flex flex-col divide-y divide-separator">
        {pipeline.map((p) => (
          <li key={p.stage} className="flex flex-col gap-2 px-4 py-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-2 font-medium">
                <i className="size-2 rounded-full" style={{ background: stageColors[p.stage] }} />
                {p.stage}
                <span className="rounded-full bg-surface-secondary px-1.5 py-0.5 text-[10px] text-muted">{p.count}</span>
              </span>
              <span className="tabular-nums font-semibold">{money(p.value)}</span>
            </div>
            <ProgressBar pct={(p.value / max) * 100} color={stageColors[p.stage]} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

const agingColors = ["var(--success)", "var(--accent)", "var(--warning)", "var(--danger)"];

export function ReceivablesAging() {
  const total = aging.reduce((s, a) => s + a.value, 0);
  return (
    <Card className="gap-0 p-0 ring-1 ring-border/60 shadow-sm overflow-hidden">
      <CardHeader
        variant="green"
        title="Receivables Aging"
        right={
          <span className="rounded-full bg-white/40 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums" style={{ color: "var(--card-header-green-text)" }}>
            {money(total, true)}
          </span>
        }
      />
      <div className="px-4 pt-3 pb-1">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-default gap-0.5">
          {aging.map((a, i) => (
            <div
              key={a.bucket}
              style={{ width: `${(a.value / total) * 100}%`, background: agingColors[i] }}
              className="first:rounded-l-full last:rounded-r-full"
            />
          ))}
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-0 divide-x divide-y divide-separator">
        {aging.map((a, i) => (
          <li key={a.bucket} className="flex flex-col gap-0.5 px-4 py-2.5">
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <i className="size-2 rounded-sm" style={{ background: agingColors[i] }} />
              {a.bucket}
            </span>
            <span className="text-[13px] font-semibold tabular-nums">{money(a.value)}</span>
            <span className="text-[10px] text-muted">{Math.round((a.value / total) * 100)}% of total</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

const toneDot = {
  success: "bg-success",
  accent: "bg-accent",
  warning: "bg-warning",
  danger: "bg-danger",
  default: "bg-muted",
};

const toneBg = {
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  default: "bg-default text-muted",
};

export function ActivityFeed() {
  return (
    <Card className="gap-0 p-0 ring-1 ring-border/60 shadow-sm overflow-hidden">
      <CardHeader
        variant="blue"
        title="Recent Activity"
        right={
          <button className="text-[11px] font-medium hover:underline" style={{ color: "var(--card-header-blue-text)" }}>
            View all
          </button>
        }
      />
      <ul className="flex flex-col">
        {activity.map((a, i) => (
          <li key={i} className="flex items-start gap-3 border-b border-separator px-4 py-3 last:border-b-0 hover:bg-surface-secondary transition-colors">
            <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${toneBg[a.tone]}`}>
              <i className={`size-1.5 rounded-full ${toneDot[a.tone]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] leading-snug">{a.text}</p>
              <p className="mt-0.5 text-[10px] text-muted">{a.t}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
