/**
 * CardHeader
 * ----------
 * A tinted card header strip consumed by every dashboard widget.
 *
 * Usage:
 *   <CardHeader variant="blue" title="Invoices" right={<Badge />} />
 *
 * Variants (defined as CSS tokens in globals.css → "Card header variants"):
 *   blue | indigo | teal | green | amber | rose
 *
 * To add a new variant:
 *   1. Add --card-header-{name}-bg/border/text tokens in globals.css (light + dark).
 *   2. Add the name to the `styles` map below.
 *   That's it — no other file needs to change.
 */

const styles = {
  blue: {
    bg:     "var(--card-header-blue-bg)",
    border: "var(--card-header-blue-border)",
    text:   "var(--card-header-blue-text)",
  },
  indigo: {
    bg:     "var(--card-header-indigo-bg)",
    border: "var(--card-header-indigo-border)",
    text:   "var(--card-header-indigo-text)",
  },
  teal: {
    bg:     "var(--card-header-teal-bg)",
    border: "var(--card-header-teal-border)",
    text:   "var(--card-header-teal-text)",
  },
  green: {
    bg:     "var(--card-header-green-bg)",
    border: "var(--card-header-green-border)",
    text:   "var(--card-header-green-text)",
  },
  amber: {
    bg:     "var(--card-header-amber-bg)",
    border: "var(--card-header-amber-border)",
    text:   "var(--card-header-amber-text)",
  },
  rose: {
    bg:     "var(--card-header-rose-bg)",
    border: "var(--card-header-rose-border)",
    text:   "var(--card-header-rose-text)",
  },
};

export default function CardHeader({ variant = "blue", title, description, right, className = "" }) {
  const s = styles[variant] ?? styles.blue;
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 ${className}`}
      style={{ background: s.bg, borderColor: s.border }}
    >
      <div>
        <p className="text-sm font-semibold" style={{ color: s.text }}>{title}</p>
        {description && (
          <p className="mt-0.5 text-xs" style={{ color: s.text, opacity: 0.7 }}>{description}</p>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
