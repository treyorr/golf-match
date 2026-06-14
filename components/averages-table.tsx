import type { PlayerSeasonStats } from "@/lib/types"

type Row = { label: string; trent: string; trey: string; lowerBetter?: boolean; tNum: number; yNum: number }

export function AveragesTable({ trent, trey }: { trent: PlayerSeasonStats; trey: PlayerSeasonStats }) {
  const rows: Row[] = [
    { label: "Avg 18", trent: String(trent.avg18), trey: String(trey.avg18), lowerBetter: true, tNum: trent.avg18, yNum: trey.avg18 },
    { label: "Avg Front 9", trent: String(trent.avgFront9), trey: String(trey.avgFront9), lowerBetter: true, tNum: trent.avgFront9, yNum: trey.avgFront9 },
    { label: "Avg Back 9", trent: String(trent.avgBack9), trey: String(trey.avgBack9), lowerBetter: true, tNum: trent.avgBack9, yNum: trey.avgBack9 },
    { label: "Birdie %", trent: `${trent.birdieRate}%`, trey: `${trey.birdieRate}%`, tNum: trent.birdieRate, yNum: trey.birdieRate },
    { label: "Par %", trent: `${trent.parRate}%`, trey: `${trey.parRate}%`, tNum: trent.parRate, yNum: trey.parRate },
    { label: "Bogey %", trent: `${trent.bogeyRate}%`, trey: `${trey.bogeyRate}%`, lowerBetter: true, tNum: trent.bogeyRate, yNum: trey.bogeyRate },
    { label: "Triples", trent: String(trent.triples), trey: String(trey.triples), lowerBetter: true, tNum: trent.triples, yNum: trey.triples },
  ]

  const winnerColor = (r: Row, side: "t" | "y") => {
    if (r.tNum === r.yNum) return "var(--color-ink)"
    const trentBetter = r.lowerBetter ? r.tNum < r.yNum : r.tNum > r.yNum
    const isWinner = side === "t" ? trentBetter : !trentBetter
    return isWinner ? "var(--color-gold)" : "var(--color-ink)"
  }

  return (
    <div className="overflow-hidden rounded-sm border border-gold/20 bg-white shadow-sm">
      <div className="grid grid-cols-3 border-b border-gold/30 bg-forest px-4 py-2.5 text-parchment">
        <span className="font-display text-sm font-bold text-gold">Trent</span>
        <span className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-parchment/60">Stat</span>
        <span className="text-right font-display text-sm font-bold text-gold">Trey</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="grid grid-cols-3 items-center px-4 py-2.5"
          style={{ backgroundColor: i % 2 === 1 ? "var(--color-parchment)" : "transparent" }}
        >
          <span className="tabular font-display text-lg font-bold" style={{ color: winnerColor(r, "t") }}>
            {r.trent}
          </span>
          <span className="text-center text-xs font-semibold uppercase tracking-wider text-ink/60">{r.label}</span>
          <span className="tabular text-right font-display text-lg font-bold" style={{ color: winnerColor(r, "y") }}>
            {r.trey}
          </span>
        </div>
      ))}
    </div>
  )
}
