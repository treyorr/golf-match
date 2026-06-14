import type { Standings } from "@/lib/types"

function PlayerPanel({
  name,
  points,
  money,
  wins,
  losses,
  ties,
  leading,
}: {
  name: string
  points: number
  money: number
  wins: number
  losses: number
  ties: number
  leading: boolean
}) {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8 text-center">
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl font-bold tracking-wide text-parchment sm:text-3xl">{name}</span>
        {leading && (
          <span className="rounded-sm bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-forest-dark">
            Lead
          </span>
        )}
      </div>

      <div className="tabular mt-4 font-display text-7xl font-black leading-none text-gold sm:text-8xl">
        {points}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-soft">Points</div>

      <div className="mt-6 w-full border-t border-gold/30 pt-4">
        <div className="tabular font-display text-2xl font-bold text-parchment">${money}</div>
        <div className="text-xs uppercase tracking-[0.2em] text-parchment/60">Money Won</div>
      </div>

      <div className="mt-4 w-full border-t border-gold/30 pt-4">
        <div className="tabular font-display text-xl font-semibold text-parchment">
          {wins}–{losses}
          {ties > 0 ? `–${ties}` : ""}
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-parchment/60">Record</div>
      </div>
    </div>
  )
}

export function HeroScoreboard({ standings }: { standings: Standings }) {
  return (
    <div className="overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-b from-forest to-forest-dark shadow-lg">
      <div className="border-b border-gold/40 px-6 py-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">The Leaderboard</span>
      </div>
      <div className="relative flex flex-col md:flex-row">
        <PlayerPanel
          name="Trent"
          points={standings.trentPoints}
          money={standings.trentMoney}
          wins={standings.trentWins}
          losses={standings.treyWins}
          ties={standings.ties}
          leading={standings.pointLeader === "Trent"}
        />

        {/* VS divider */}
        <div className="flex items-center justify-center border-y border-gold/30 py-3 md:border-x md:border-y-0 md:px-2">
          <span className="font-display text-lg font-bold italic text-gold">VS</span>
        </div>

        <PlayerPanel
          name="Trey"
          points={standings.treyPoints}
          money={standings.treyMoney}
          wins={standings.treyWins}
          losses={standings.trentWins}
          ties={standings.ties}
          leading={standings.pointLeader === "Trey"}
        />
      </div>
    </div>
  )
}
