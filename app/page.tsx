import Link from "next/link"
import { getStandings, getStats } from "@/lib/golfData"
import { HeroScoreboard } from "@/components/hero-scoreboard"
import { PointsChart } from "@/components/points-chart"
import { SectionTitle } from "@/components/section-title"
import { StatBadge } from "@/components/stat-badge"
import { AveragesTable } from "@/components/averages-table"

export const revalidate = 300

export default async function StandingsPage() {
  const [standings, stats] = await Promise.all([getStandings(), getStats()])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <HeroScoreboard standings={standings} />

      {/* Stat badges */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatBadge label="Point Leader" value={standings.pointLeader} sub={`${standings.trentPoints} – ${standings.treyPoints}`} />
        <StatBadge
          label="Money Leader"
          value={standings.moneyLeader}
          sub={standings.moneyUp > 0 ? `Up $${standings.moneyUp}` : "All square"}
        />
        <StatBadge label="Matches Played" value={String(standings.matchesPlayed)} sub={`${standings.holesPlayed} holes`} />
      </div>

      {/* Points progression */}
      <section className="mt-10">
        <SectionTitle>Points Progression</SectionTitle>
        <div className="rounded-sm border border-gold/20 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-6 rounded-full bg-gold" /> Trent
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-6 rounded-full bg-green" /> Trey
            </span>
          </div>
          <PointsChart data={standings.progression} />
        </div>
      </section>

      {/* Last 5 matches */}
      <section className="mt-10">
        <SectionTitle>Last 5 Matches</SectionTitle>
        <div className="overflow-hidden rounded-sm border border-gold/20 bg-white shadow-sm">
          {standings.lastFive.map((m, i) => (
            <Link
              key={m.id}
              href={`/matches/${m.id}`}
              className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-parchment-dark/60"
              style={{ backgroundColor: i % 2 === 1 ? "var(--color-parchment)" : "transparent" }}
            >
              <div className="min-w-0">
                <div className="truncate font-display text-base font-bold text-ink">{m.course}</div>
                <div className="text-xs text-ink/60">{m.date}</div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: m.winner === "Tie" ? "var(--color-ink)" : m.winner === "Trent" ? "var(--color-gold)" : "var(--color-green)" }}
                >
                  {m.winner === "Tie" ? "Halved" : `${m.winner} ${m.margin}UP`}
                </span>
                <span className="tabular w-12 text-sm font-semibold text-ink">${m.moneyWon}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Season averages */}
      <section className="mt-10">
        <SectionTitle>Season Averages</SectionTitle>
        <AveragesTable trent={stats.trent} trey={stats.trey} />
      </section>
    </div>
  )
}
