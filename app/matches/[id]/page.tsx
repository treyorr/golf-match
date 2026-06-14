import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getMatchById, getMatches } from "@/lib/golfData"
import { ScorecardGrid } from "@/components/scorecard-grid"
import { RunningScoreBar } from "@/components/running-score-bar"
import { MatchPointsChart } from "@/components/match-points-chart"
import { PlayerStatBox } from "@/components/player-stat-box"
import { SectionTitle } from "@/components/section-title"

export const revalidate = 300

export async function generateStaticParams() {
  const matches = await getMatches()
  return matches.map((m) => ({ id: m.id }))
}

export default async function ScorecardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const card = await getMatchById(id)
  if (!card) notFound()

  const { result } = card
  const winnerName = result.winner
  const winnerColor = winnerName === "Tie" ? "var(--color-parchment)" : winnerName === "Trent" ? "var(--color-gold)" : "#9fcea9"

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/matches" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-gold">
        <ChevronLeft className="h-4 w-4" /> All Matches
      </Link>

      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-forest sm:text-4xl">{card.course}</h1>
        <p className="mt-1 text-ink/60">{card.date}</p>
      </header>

      {/* Winner banner */}
      <div
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-gold/30 px-5 py-4 text-parchment"
        style={{ backgroundColor: "var(--color-forest)" }}
      >
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold-soft">Result</div>
          <div className="font-display text-2xl font-bold" style={{ color: winnerColor }}>
            {winnerName === "Tie" ? "Match Halved" : `${winnerName} wins ${result.margin}UP`}
          </div>
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <div className="tabular font-display text-2xl font-bold text-gold">${card.holeValue}</div>
            <div className="text-[0.65rem] uppercase tracking-widest text-parchment/60">Hole Value</div>
          </div>
          <div>
            <div className="tabular font-display text-2xl font-bold text-gold">${result.moneyWon}</div>
            <div className="text-[0.65rem] uppercase tracking-widest text-parchment/60">Money Won</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <SectionTitle>Scorecard</SectionTitle>
            <ScorecardGrid card={card} />
          </section>

          <section>
            <SectionTitle>Running Match Score</SectionTitle>
            <RunningScoreBar card={card} />
          </section>

          <section>
            <SectionTitle>Points Progression</SectionTitle>
            <div className="rounded-sm border border-gold/20 bg-white p-4 shadow-sm">
              <MatchPointsChart trent={card.trentRunningPoints} trey={card.treyRunningPoints} />
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <SectionTitle>Match Stats</SectionTitle>
          <PlayerStatBox
            name="Trent"
            color="var(--color-gold)"
            stats={card.matchStats.trent}
            holesWon={card.matchStats.trent.holesWon}
            pointsWon={card.matchStats.trent.pointsWon}
          />
          <PlayerStatBox
            name="Trey"
            color="var(--color-green)"
            stats={card.matchStats.trey}
            holesWon={card.matchStats.trey.holesWon}
            pointsWon={card.matchStats.trey.pointsWon}
          />
        </aside>
      </div>
    </div>
  )
}
