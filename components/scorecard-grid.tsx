import type { Scorecard } from "@/lib/types"

function sum(a: number[]) {
  return a.reduce((x, y) => x + y, 0)
}

function toParLabel(n: number) {
  if (n === 0) return "E"
  return n > 0 ? `+${n}` : String(n)
}

const TRENT = "var(--color-gold)"
const TREY = "var(--color-green)"

export function ScorecardGrid({ card }: { card: Scorecard }) {
  const { par, trentScores, treyScores } = card
  const front = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const back = [9, 10, 11, 12, 13, 14, 15, 16, 17]

  const f9Par = sum(par.slice(0, 9))
  const b9Par = sum(par.slice(9))
  const totPar = f9Par + b9Par

  // cell base classes
  const cell = "border-b border-gold/20 px-2 py-2 text-center tabular text-sm"
  const totalCell = "border-b border-l-2 border-gold/40 border-l-gold px-2 py-2 text-center tabular text-sm font-bold bg-parchment"

  const stickyLabel =
    "sticky left-0 z-10 border-b border-r border-gold/30 bg-forest px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-parchment"

  const winBg = (player: "t" | "y", i: number): string | undefined => {
    if (trentScores[i] === treyScores[i]) return undefined
    const trentLower = trentScores[i] < treyScores[i]
    if (player === "t" && trentLower) return "color-mix(in srgb, var(--color-gold) 30%, transparent)"
    if (player === "y" && !trentLower) return "color-mix(in srgb, var(--color-green) 22%, transparent)"
    return undefined
  }

  const scoreClass = (score: number, holePar: number) => {
    const diff = score - holePar
    if (diff <= -2) return "score-mark score-mark-eagle"
    if (diff === -1) return "score-mark score-mark-birdie"
    if (diff === 1) return "score-mark score-mark-bogey"
    if (diff >= 2) return "score-mark score-mark-double"
    return "inline-flex h-7 min-w-7 items-center justify-center"
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-gold/20 bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr>
            <th className={stickyLabel}>Hole</th>
            {front.map((i) => (
              <th key={i} className="border-b border-gold/30 bg-forest px-2 py-2 text-center text-xs font-bold text-parchment">
                {i + 1}
              </th>
            ))}
            <th className="border-b border-l-2 border-gold/40 border-l-gold bg-green px-2 py-2 text-center text-xs font-bold text-parchment">
              F9
            </th>
            {back.map((i) => (
              <th key={i} className="border-b border-gold/30 bg-forest px-2 py-2 text-center text-xs font-bold text-parchment">
                {i + 1}
              </th>
            ))}
            <th className="border-b border-l-2 border-gold/40 border-l-gold bg-green px-2 py-2 text-center text-xs font-bold text-parchment">
              B9
            </th>
            <th className="border-b border-l-2 border-gold/40 border-l-gold bg-green px-2 py-2 text-center text-xs font-bold text-parchment">
              Tot
            </th>
            <th className="border-b border-l-2 border-gold/40 border-l-gold bg-green px-2 py-2 text-center text-xs font-bold text-parchment">
              +/-
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Par */}
          <tr>
            <td className={stickyLabel}>Par</td>
            {front.map((i) => (
              <td key={i} className={`${cell} text-ink/70`}>{par[i]}</td>
            ))}
            <td className={`${totalCell} text-ink/70`}>{f9Par}</td>
            {back.map((i) => (
              <td key={i} className={`${cell} text-ink/70`}>{par[i]}</td>
            ))}
            <td className={`${totalCell} text-ink/70`}>{b9Par}</td>
            <td className={`${totalCell} text-ink/70`}>{totPar}</td>
            <td className={`${totalCell} text-ink/70`}>—</td>
          </tr>

          {/* Trent scores */}
          <tr>
            <td className={stickyLabel} style={{ color: TRENT }}>Trent</td>
            {front.map((i) => (
              <td key={i} className={`${cell} font-semibold text-ink`} style={{ backgroundColor: winBg("t", i) }}>
                <span className={scoreClass(trentScores[i], par[i])}>{trentScores[i]}</span>
              </td>
            ))}
            <td className={totalCell}>{sum(trentScores.slice(0, 9))}</td>
            {back.map((i) => (
              <td key={i} className={`${cell} font-semibold text-ink`} style={{ backgroundColor: winBg("t", i) }}>
                <span className={scoreClass(trentScores[i], par[i])}>{trentScores[i]}</span>
              </td>
            ))}
            <td className={totalCell}>{sum(trentScores.slice(9))}</td>
            <td className={totalCell}>{sum(trentScores)}</td>
            <td className={totalCell} style={{ color: TRENT }}>{toParLabel(sum(trentScores) - totPar)}</td>
          </tr>

          {/* Trey scores */}
          <tr>
            <td className={stickyLabel} style={{ color: "#7fb894" }}>Trey</td>
            {front.map((i) => (
              <td key={i} className={`${cell} font-semibold text-ink`} style={{ backgroundColor: winBg("y", i) }}>
                <span className={scoreClass(treyScores[i], par[i])}>{treyScores[i]}</span>
              </td>
            ))}
            <td className={totalCell}>{sum(treyScores.slice(0, 9))}</td>
            {back.map((i) => (
              <td key={i} className={`${cell} font-semibold text-ink`} style={{ backgroundColor: winBg("y", i) }}>
                <span className={scoreClass(treyScores[i], par[i])}>{treyScores[i]}</span>
              </td>
            ))}
            <td className={totalCell}>{sum(treyScores.slice(9))}</td>
            <td className={totalCell}>{sum(treyScores)}</td>
            <td className={totalCell} style={{ color: TREY }}>{toParLabel(sum(treyScores) - totPar)}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}
