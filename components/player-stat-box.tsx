import { EMOJI } from "@/lib/golfData"
import type { PlayerMatchStats } from "@/lib/types"

const ROWS: { label: string; key: keyof PlayerMatchStats; emoji: string }[] = [
  { label: "Eagles", key: "eagles", emoji: EMOJI.eagle },
  { label: "Birdies", key: "birdies", emoji: EMOJI.birdie },
  { label: "Pars", key: "pars", emoji: EMOJI.par },
  { label: "Bogeys", key: "bogeys", emoji: EMOJI.bogey },
  { label: "Doubles", key: "doubles", emoji: EMOJI.double },
  { label: "Triples+", key: "triples", emoji: EMOJI.triple },
]

export function PlayerStatBox({
  name,
  color,
  stats,
  holesWon,
  pointsWon,
}: {
  name: string
  color: string
  stats: PlayerMatchStats
  holesWon: number
  pointsWon: number
}) {
  return (
    <div className="rounded-sm border border-gold/20 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-gold/20 pb-2">
        <span className="font-display text-lg font-bold" style={{ color }}>{name}</span>
        <span className="tabular text-sm text-ink/60">
          {stats.total} ({stats.toPar >= 0 ? `+${stats.toPar}` : stats.toPar})
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {ROWS.map((r) => (
          <div key={r.key} className="rounded-sm bg-parchment px-1 py-2">
            <div className="text-base leading-none">{r.emoji}</div>
            <div className="tabular mt-1 font-display text-lg font-bold text-ink">{stats[r.key]}</div>
            <div className="text-[0.6rem] uppercase tracking-wider text-ink/50">{r.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gold/20 pt-3 text-center">
        <div>
          <div className="tabular font-display text-xl font-bold text-forest">{holesWon}</div>
          <div className="text-[0.6rem] uppercase tracking-wider text-ink/50">Holes Won</div>
        </div>
        <div>
          <div className="tabular font-display text-xl font-bold text-forest">{pointsWon}</div>
          <div className="text-[0.6rem] uppercase tracking-wider text-ink/50">Points Won</div>
        </div>
      </div>
    </div>
  )
}
