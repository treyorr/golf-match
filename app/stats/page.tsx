import { getStats } from "@/lib/golfData"
import { SectionTitle } from "@/components/section-title"
import { StatBadge } from "@/components/stat-badge"
import { StatComparison } from "@/components/stat-comparison"
import { ScoringDistribution } from "@/components/scoring-distribution"

export const revalidate = 300

export default async function StatsPage() {
  const stats = await getStats()
  const { trent, trey } = stats

  const better = (t: number, y: number, lower = false) =>
    t === y ? "—" : (lower ? t < y : t > y) ? "Trent" : "Trey"

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-forest sm:text-4xl">Season Stats</h1>
        <p className="mt-1 text-ink/60">Aggregate performance across {stats.matchesPlayed} matches.</p>
      </header>

      {/* Big stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatBadge label="Best Avg Score" value={`${Math.min(trent.avg18, trey.avg18)}`} sub={better(trent.avg18, trey.avg18, true)} />
        <StatBadge label="Top Birdie Rate" value={`${Math.max(trent.birdieRate, trey.birdieRate)}%`} sub={better(trent.birdieRate, trey.birdieRate)} />
        <StatBadge label="Lowest Bogey Rate" value={`${Math.min(trent.bogeyRate, trey.bogeyRate)}%`} sub={better(trent.bogeyRate, trey.bogeyRate, true)} />
        <StatBadge label="Triples ☠️" value={`${trent.triples + trey.triples}`} sub="Combined" />
      </div>

      {/* Head to head */}
      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle>Head to Head</SectionTitle>
          <div className="rounded-sm border border-gold/20 bg-white px-5 py-3 shadow-sm">
            <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-gold">Trent</span>
              <span className="text-green">Trey</span>
            </div>
            <StatComparison label="Avg 18" trent={trent.avg18} trey={trey.avg18} lowerBetter />
            <StatComparison label="Avg Front 9" trent={trent.avgFront9} trey={trey.avgFront9} lowerBetter />
            <StatComparison label="Avg Back 9" trent={trent.avgBack9} trey={trey.avgBack9} lowerBetter />
            <StatComparison label="Birdie %" trent={trent.birdieRate} trey={trey.birdieRate} suffix="%" />
            <StatComparison label="Par %" trent={trent.parRate} trey={trey.parRate} suffix="%" />
            <StatComparison label="Bogey %" trent={trent.bogeyRate} trey={trey.bogeyRate} suffix="%" lowerBetter />
          </div>
        </div>

        <div>
          <SectionTitle>Scoring Distribution</SectionTitle>
          <ScoringDistribution trent={trent} trey={trey} />
        </div>
      </section>

      {/* Courses played */}
      <section className="mt-10">
        <SectionTitle>Courses Played</SectionTitle>
        <div className="overflow-hidden rounded-sm border border-gold/20 bg-white shadow-sm">
          {stats.courses.map((c, i) => (
            <div
              key={`${c.course}-${c.date}`}
              className="flex items-center justify-between px-4 py-3"
              style={{ backgroundColor: i % 2 === 1 ? "var(--color-parchment)" : "transparent" }}
            >
              <div className="min-w-0">
                <div className="truncate font-display text-base font-bold text-ink">{c.course}</div>
                <div className="text-xs text-ink/60">{c.date}</div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: c.winner === "Tie" ? "var(--color-ink)" : c.winner === "Trent" ? "var(--color-gold)" : "var(--color-green)" }}
                >
                  {c.winner === "Tie" ? "Halved" : c.winner}
                </span>
                <span className="tabular w-12 text-sm font-semibold text-forest">${c.moneyWon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
