import { Card } from "@heroui/react";
import { monthly } from "./data";
import CardHeader from "@/components/ui/CardHeader";

export default function RevenueChart() {
  const W = 640,
    H = 220,
    padL = 38,
    padB = 24,
    padT = 12,
    padR = 8;
  const max = 140;
  const innerW = W - padL - padR;
  const innerH = H - padB - padT;
  const slot = innerW / monthly.length;
  const bw = Math.min(slot * 0.28, 14);
  const y = (v) => padT + innerH - (v / max) * innerH;
  const ticks = [0, 35, 70, 105, 140];

  const totalInvoiced = monthly.reduce((s, d) => s + d.invoiced, 0);
  const totalCollected = monthly.reduce((s, d) => s + d.collected, 0);
  const collectionRate = Math.round((totalCollected / totalInvoiced) * 100);

  const legend = (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
          Collection rate
        </p>
        <p className="text-lg font-bold tabular-nums text-success">
          {collectionRate}%
        </p>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-muted">
        <span className="flex items-center gap-2">
          <i
            className="size-2.5 rounded-sm"
            style={{ background: "var(--accent)" }}
          />
          Invoiced
        </span>
        <span className="flex items-center gap-2">
          <i
            className="size-2.5 rounded-sm"
            style={{ background: "var(--success)" }}
          />
          Collected
        </span>
      </div>
    </div>
  );

  return (
    <Card className="gap-0 p-0 ring-1 ring-border/60 shadow-sm overflow-hidden">
      <CardHeader
        variant="indigo"
        title="Invoiced vs Collected"
        description="Last 12 months · USD thousands"
        right={legend}
      />
      <div className="p-4 pt-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Monthly invoiced and collected revenue"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={padL}
                x2={W - padR}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--separator)"
                strokeWidth={t === 0 ? "1.5" : "1"}
                strokeDasharray={t === 0 ? "0" : "3 3"}
              />
              <text
                x={padL - 6}
                y={y(t) + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="var(--muted)"
                fontFamily="var(--font-sans)"
              >
                {t === 0 ? "" : `${t}k`}
              </text>
            </g>
          ))}
          {monthly.map((d, i) => {
            const cx = padL + slot * i + slot / 2;
            const isLast = i === monthly.length - 1;
            return (
              <g key={d.m}>
                <rect
                  x={cx - bw - 1.5}
                  y={y(d.invoiced)}
                  width={bw}
                  height={y(0) - y(d.invoiced)}
                  rx="2.5"
                  fill="var(--accent)"
                  opacity={isLast ? "1" : "0.65"}
                />
                <rect
                  x={cx + 1.5}
                  y={y(d.collected)}
                  width={bw}
                  height={y(0) - y(d.collected)}
                  rx="2.5"
                  fill="var(--success)"
                  opacity={isLast ? "1" : "0.65"}
                />
                <text
                  x={cx}
                  y={H - 7}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isLast ? "var(--foreground)" : "var(--muted)"}
                  fontWeight={isLast ? "600" : "400"}
                  fontFamily="var(--font-sans)"
                >
                  {d.m}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
