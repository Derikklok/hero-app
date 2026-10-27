export const money = (n, compact = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(n);

export const kpis = [
  { label: "Revenue (MTD)", value: "$128,420", delta: "+12.4%", good: true, spark: [12, 18, 15, 22, 20, 28, 31, 29, 36] },
  { label: "Outstanding", value: "$46,880", delta: "-3.1%", good: true, spark: [30, 34, 33, 31, 35, 32, 30, 29, 28] },
  { label: "Overdue", value: "$12,310", delta: "+8.2%", good: false, spark: [6, 7, 7, 9, 8, 10, 11, 12, 13] },
  { label: "Open estimates", value: "23", delta: "+4", good: true, spark: [14, 15, 17, 16, 18, 19, 20, 22, 23] },
  { label: "Win rate", value: "61%", delta: "+2.0 pt", good: true, spark: [52, 54, 53, 57, 58, 56, 60, 59, 61] },
  { label: "Avg. days to pay", value: "18.6", delta: "+1.2 d", good: false, spark: [15, 16, 17, 16, 17, 18, 18, 19, 19] },
];

export const monthly = [
  { m: "Nov", invoiced: 82, collected: 74 },
  { m: "Dec", invoiced: 91, collected: 80 },
  { m: "Jan", invoiced: 76, collected: 79 },
  { m: "Feb", invoiced: 88, collected: 81 },
  { m: "Mar", invoiced: 102, collected: 90 },
  { m: "Apr", invoiced: 97, collected: 95 },
  { m: "May", invoiced: 110, collected: 99 },
  { m: "Jun", invoiced: 118, collected: 104 },
  { m: "Jul", invoiced: 109, collected: 107 },
  { m: "Aug", invoiced: 124, collected: 112 },
  { m: "Sep", invoiced: 131, collected: 118 },
  { m: "Oct", invoiced: 128, collected: 96 },
];

export const invoices = [
  { id: "INV-2041", client: "Northwind Traders", issued: "Oct 21", due: "Nov 04", amount: 12400, paid: 0, status: "Sent" },
  { id: "INV-2040", client: "Bluepeak Construction", issued: "Oct 19", due: "Nov 02", amount: 8750, paid: 8750, status: "Paid" },
  { id: "INV-2039", client: "Harbor & Finch LLP", issued: "Oct 15", due: "Oct 29", amount: 3200, paid: 0, status: "Sent" },
  { id: "INV-2038", client: "Lumen Dental Group", issued: "Oct 12", due: "Oct 26", amount: 5980, paid: 2500, status: "Partial" },
  { id: "INV-2037", client: "Orchard Lane Cafe", issued: "Oct 08", due: "Oct 22", amount: 1460, paid: 0, status: "Overdue" },
  { id: "INV-2036", client: "Vantage Logistics", issued: "Oct 05", due: "Oct 19", amount: 22900, paid: 0, status: "Overdue" },
  { id: "INV-2035", client: "Kestrel Studios", issued: "Oct 03", due: "Oct 17", amount: 4150, paid: 4150, status: "Paid" },
  { id: "INV-2034", client: "Redwood Property Mgmt", issued: "Sep 30", due: "Oct 14", amount: 9300, paid: 9300, status: "Paid" },
  { id: "INV-2033", client: "Atlas Fabrication", issued: "Sep 27", due: "Oct 11", amount: 17650, paid: 0, status: "Overdue" },
  { id: "INV-2032", client: "Summit Physio", issued: "Sep 24", due: "Oct 08", amount: 2240, paid: 2240, status: "Paid" },
  { id: "INV-2031", client: "Greenleaf Nurseries", issued: "Sep 20", due: "Oct 04", amount: 6820, paid: 6820, status: "Paid" },
  { id: "INV-2030", client: "Pioneer Auto Group", issued: "Sep 18", due: "Oct 02", amount: 11050, paid: 0, status: "Draft" },
];

export const statusColor = {
  Paid: "success",
  Sent: "accent",
  Partial: "warning",
  Overdue: "danger",
  Draft: "default",
};

export const pipeline = [
  { stage: "Draft", count: 6, value: 38200 },
  { stage: "Sent", count: 9, value: 84600 },
  { stage: "Viewed", count: 5, value: 52300 },
  { stage: "Negotiating", count: 3, value: 41800 },
];

export const aging = [
  { bucket: "Current", value: 28400 },
  { bucket: "1–30 d", value: 11200 },
  { bucket: "31–60 d", value: 4800 },
  { bucket: "60+ d", value: 2480 },
];

export const activity = [
  { t: "09:42", text: "Bluepeak Construction paid INV-2040", tone: "success" },
  { t: "09:10", text: "Estimate EST-518 viewed by Atlas Fabrication", tone: "accent" },
  { t: "08:55", text: "Reminder sent for INV-2036 (12 days late)", tone: "warning" },
  { t: "Yesterday", text: "Estimate EST-515 accepted, $14,200", tone: "success" },
  { t: "Yesterday", text: "Low stock: 3/4\" copper fittings (8 left)", tone: "danger" },
  { t: "Mon", text: "Expense logged: Fuel, $186.40", tone: "default" },
];

export const navItems = ["Dashboard", "Invoices", "Estimates", "Clients", "Inventory", "Expenses", "Reports"];
