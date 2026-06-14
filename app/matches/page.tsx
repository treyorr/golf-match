import { getMatches } from "@/lib/golfData"
import { MatchList } from "@/components/match-list"

export const revalidate = 300

export default async function MatchesPage() {
  const matches = await getMatches()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-forest sm:text-4xl">Match History</h1>
        <p className="mt-1 text-ink/60">Every round, newest first. Tap a match for the full scorecard.</p>
      </header>

      <MatchList matches={matches} />
    </div>
  )
}
