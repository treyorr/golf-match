import type { Scorecard } from "@/lib/types"

function stateColor(state: string): string {
  if (state.startsWith("Trent")) return "var(--color-gold)"
  if (state.startsWith("Trey")) return "var(--color-green)"
  return "var(--color-ink)"
}

function shortLabel(state: string): string {
  if (state === "AS") return "AS"
  if (state.startsWith("Trent")) return `T▲${state.replace(/\D/g, "")}`
  if (state.startsWith("Trey")) return `Y▲${state.replace(/\D/g, "")}`
  return state
}

export function RunningScoreBar({ card }: { card: Scorecard }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gold/20 bg-white p-4 shadow-sm">
      <div className="flex min-w-[640px] gap-1">
        {card.runningScore.map((state, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[0.65rem] font-semibold text-ink/40">{i + 1}</span>
            <div
              className="flex h-9 w-full items-center justify-center rounded-sm text-[0.7rem] font-bold text-parchment"
              style={{ backgroundColor: stateColor(state) }}
              title={state}
            >
              {shortLabel(state)}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink/50">
        Match state after each hole. Gold = Trent ahead, green = Trey ahead, AS = all square.
      </p>
    </div>
  )
}
