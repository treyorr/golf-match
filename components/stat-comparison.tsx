export function StatComparison({
  label,
  trent,
  trey,
  suffix = "",
  lowerBetter = false,
}: {
  label: string
  trent: number
  trey: number
  suffix?: string
  lowerBetter?: boolean
}) {
  const total = trent + trey || 1
  const trentPct = (trent / total) * 100
  const treyPct = (trey / total) * 100

  const trentBetter = trent === trey ? null : lowerBetter ? trent < trey : trent > trey

  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="tabular font-display text-base font-bold" style={{ color: trentBetter === true ? "var(--color-gold)" : "var(--color-ink)" }}>
          {trent}
          {suffix}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</span>
        <span className="tabular font-display text-base font-bold" style={{ color: trentBetter === false ? "var(--color-green)" : "var(--color-ink)" }}>
          {trey}
          {suffix}
        </span>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-sm bg-parchment-dark">
        <div className="h-full bg-gold" style={{ width: `${trentPct}%` }} />
        <div className="h-full bg-green" style={{ width: `${treyPct}%` }} />
      </div>
    </div>
  )
}
