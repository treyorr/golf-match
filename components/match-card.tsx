import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Match } from "@/lib/types"

function winnerColor(winner: Match["winner"]) {
  if (winner === "Tie") return "var(--color-ink)"
  return winner === "Trent" ? "var(--color-gold)" : "var(--color-green)"
}

export function MatchCard({ match, index }: { match: Match; index: number }) {
  return (
    <Link
      href={`/matches/${match.id}`}
      className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-parchment-dark/60 sm:px-6"
      style={{ backgroundColor: index % 2 === 1 ? "var(--color-parchment)" : "transparent" }}
    >
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-lg font-bold text-ink sm:text-xl">{match.course}</div>
        <div className="text-sm text-ink/60">{match.date}</div>
      </div>

      <div className="hidden sm:block">
        <span
          className="rounded-sm px-3 py-1 font-display text-sm font-bold"
          style={{ color: "var(--color-parchment)", backgroundColor: winnerColor(match.winner) }}
        >
          {match.winner === "Tie" ? "Halved" : match.winner}
        </span>
      </div>

      <div className="w-16 text-center">
        <div className="tabular font-display text-base font-bold text-ink">
          {match.winner === "Tie" ? "AS" : `${match.margin}UP`}
        </div>
        <div className="text-[0.65rem] uppercase tracking-widest text-ink/50">Margin</div>
      </div>

      <div className="w-16 text-center">
        <div className="tabular font-display text-base font-bold text-forest">${match.moneyWon}</div>
        <div className="text-[0.65rem] uppercase tracking-widest text-ink/50">Money</div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-gold" />
    </Link>
  )
}
