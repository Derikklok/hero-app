import Topbar from "@/components/dashboard/Topbar";
import KpiStrip from "@/components/dashboard/KpiStrip";
import RevenueChart from "@/components/dashboard/RevenueChart";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import {
  ActivityFeed,
  EstimatePipeline,
  ReceivablesAging,
} from "@/components/dashboard/SidePanels";

export default function DashboardPage() {
  return (
    <>
      <Topbar />
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 p-4 md:p-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Overview</h1>
            <p className="mt-0.5 text-xs text-muted">
              October 2026 · Fiscal Q4
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted shadow-sm">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Oct 1 – Oct 31, 2026
          </div>
        </div>

        <KpiStrip />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-w-0 flex-col gap-4">
            <RevenueChart />
            <InvoiceTable />
          </div>
          <aside className="grid grid-cols-1 content-start gap-4 md:grid-cols-3 xl:grid-cols-1">
            <EstimatePipeline />
            <ReceivablesAging />
            <ActivityFeed />
          </aside>
        </div>
      </main>
    </>
  );
}
