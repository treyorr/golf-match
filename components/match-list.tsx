"use client"

import { useState } from "react"
import { MatchCard } from "@/components/match-card"
import type { Match } from "@/lib/types"

const FILTERS = ["All", "Trent Wins", "Trey Wins"] as const
type Filter = (typeof FILTERS)[number]

export function MatchList({ matches }: { matches: Match[] }) {
  const [filter, setFilter] = useState<Filter>("All")

  const filtered = matches.filter((m) => {
    if (filter === "Trent Wins") return m.winner === "Trent"
    if (filter === "Trey Wins") return m.winner === "Trey"
    return true
  })

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="rounded-sm border px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors"
              style={{
                color: active ? "var(--color-parchment)" : "var(--color-forest)",
                backgroundColor: active ? "var(--color-forest)" : "transparent",
                borderColor: "color-mix(in srgb, var(--color-gold) 40%, transparent)",
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-sm border border-gold/20 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-ink/60">No matches found.</div>
        ) : (
          filtered.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)
        )}
      </div>
    </div>
  )
}
