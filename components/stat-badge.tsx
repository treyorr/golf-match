export function StatBadge({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-sm border border-gold/20 bg-white px-5 py-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-forest">{value}</div>
      {sub && <div className="tabular mt-0.5 text-sm text-ink/60">{sub}</div>}
    </div>
  )
}
