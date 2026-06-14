import * as XLSX from "xlsx"
import type {
  Match,
  PlayerMatchStats,
  Scorecard,
  Standings,
  SeasonStats,
  PlayerSeasonStats,
  Player,
} from "./types"
import { SAMPLE_MATCHES, SAMPLE_PAR, SAMPLE_SCORES } from "./sampleData"

const EXCLUDED_SHEETS = ["Rules", "Match Log", "Stats", "Empty Scorecard Template"]
const POINTS = { eagle: 4, birdie: 2, par: 1, bogey: 1, double: 0.5, triple: 0 }

export const EMOJI = {
  eagle: "🦅",
  birdie: "🐥",
  par: "🚩",
  bogey: "🧻",
  double: "💩",
  triple: "☠️",
}

export function slugify(course: string, date: string): string {
  return `${course} ${date}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Clamp obviously wrong years (e.g. typo 2526 -> 2026) back to 2026.
function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString().slice(0, 10)
  let d = raw.trim()
  const match = d.match(/(\d{3,4})[-/](\d{1,2})[-/](\d{1,2})/)
  if (match) {
    let [, y, m, day] = match
    let year = Number.parseInt(y, 10)
    if (year > 2100) year = 2026
    d = `${year}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`
  }
  return d
}

function relativeToPar(score: number, par: number): keyof typeof POINTS {
  const diff = score - par
  if (diff <= -2) return "eagle"
  if (diff === -1) return "birdie"
  if (diff === 0) return "par"
  if (diff === 1) return "bogey"
  if (diff === 2) return "double"
  return "triple"
}

function emojiFor(kind: keyof typeof POINTS): string {
  return EMOJI[kind]
}

// Build a complete scorecard from par + both players' hole scores.
function buildScorecard(
  course: string,
  date: string,
  holeValue: number,
  par: number[],
  trentScores: number[],
  treyScores: number[],
): Scorecard {
  const trentEmojis: string[] = []
  const treyEmojis: string[] = []
  const trentPointsPerHole: number[] = []
  const treyPointsPerHole: number[] = []
  const trentRunningPoints: number[] = []
  const treyRunningPoints: number[] = []
  const runningScore: string[] = []

  const tStats = emptyStats()
  const yStats = emptyStats()
  let tHolesWon = 0
  let yHolesWon = 0
  let upCount = 0 // positive = Trent up
  let tRun = 0
  let yRun = 0

  for (let i = 0; i < 18; i++) {
    const tKind = relativeToPar(trentScores[i], par[i])
    const yKind = relativeToPar(treyScores[i], par[i])
    trentEmojis.push(emojiFor(tKind))
    treyEmojis.push(emojiFor(yKind))

    const tPts = POINTS[tKind]
    const yPts = POINTS[yKind]
    trentPointsPerHole.push(tPts)
    treyPointsPerHole.push(yPts)
    tRun += tPts
    yRun += yPts
    trentRunningPoints.push(round1(tRun))
    treyRunningPoints.push(round1(yRun))

    tally(tStats, tKind)
    tally(yStats, yKind)

    if (trentScores[i] < treyScores[i]) {
      upCount += 1
      tHolesWon += 1
    } else if (treyScores[i] < trentScores[i]) {
      upCount -= 1
      yHolesWon += 1
    }
    runningScore.push(formatMatchState(upCount))
  }

  const trentTotal = sum(trentScores)
  const treyTotal = sum(treyScores)
  const parTotal = sum(par)

  const winner: Player | "Tie" = upCount > 0 ? "Trent" : upCount < 0 ? "Trey" : "Tie"
  const margin = Math.abs(upCount)
  const moneyWon = margin * holeValue

  const trent: PlayerMatchStats = {
    front9: sum(trentScores.slice(0, 9)),
    back9: sum(trentScores.slice(9, 18)),
    total: trentTotal,
    toPar: trentTotal - parTotal,
    ...tStats,
  }
  const trey: PlayerMatchStats = {
    front9: sum(treyScores.slice(0, 9)),
    back9: sum(treyScores.slice(9, 18)),
    total: treyTotal,
    toPar: treyTotal - parTotal,
    ...yStats,
  }

  return {
    matchId: slugify(course, date),
    course,
    date,
    holeValue,
    par,
    trentScores,
    treyScores,
    trentEmojis,
    treyEmojis,
    runningScore,
    trentPointsPerHole,
    treyPointsPerHole,
    trentRunningPoints,
    treyRunningPoints,
    result: { winner, margin, moneyWon },
    matchStats: {
      trent: { ...trent, holesWon: tHolesWon, pointsWon: round1(tRun) },
      trey: { ...trey, holesWon: yHolesWon, pointsWon: round1(yRun) },
    },
  }
}

function formatMatchState(up: number): string {
  if (up === 0) return "AS"
  return up > 0 ? `Trent ${up}UP` : `Trey ${Math.abs(up)}UP`
}

function emptyStats() {
  return { eagles: 0, birdies: 0, pars: 0, bogeys: 0, doubles: 0, triples: 0 }
}

function tally(s: ReturnType<typeof emptyStats>, kind: keyof typeof POINTS) {
  if (kind === "eagle") s.eagles += 1
  else if (kind === "birdie") s.birdies += 1
  else if (kind === "par") s.pars += 1
  else if (kind === "bogey") s.bogeys += 1
  else if (kind === "double") s.doubles += 1
  else s.triples += 1
}

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

// ---------------------------------------------------------------------------
// Data source: live Google Drive sheet, with sample fallback.
// ---------------------------------------------------------------------------

async function getWorkbook(): Promise<XLSX.WorkBook | null> {
  const id = process.env.GOOGLE_SHEET_ID
  if (!id) return null
  try {
    const url = `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) return null
    const buf = await res.arrayBuffer()
    return XLSX.read(buf, { type: "array" })
  } catch {
    return null
  }
}

function buildAllScorecards(wb: XLSX.WorkBook | null): Scorecard[] {
  if (!wb) {
    return SAMPLE_MATCHES.map((m) =>
      buildScorecard(
        m.course,
        m.date,
        m.holeValue,
        SAMPLE_PAR,
        SAMPLE_SCORES[m.key].trent,
        SAMPLE_SCORES[m.key].trey,
      ),
    )
  }

  const cards: Scorecard[] = []
  for (const name of wb.SheetNames) {
    if (EXCLUDED_SHEETS.includes(name)) continue
    const card = parseScorecardSheet(wb, name)
    if (card) cards.push(card)
  }
  // Fall back to samples if nothing usable was parsed.
  if (cards.length === 0) return buildAllScorecards(null)
  return cards
}

// Defensive scorecard sheet parser. Looks for "Par", "Trent", "Trey" rows.
function parseScorecardSheet(wb: XLSX.WorkBook, name: string): Scorecard | null {
  try {
    const rows = XLSX.utils.sheet_to_json<(string | number)[]>(wb.Sheets[name], {
      header: 1,
      blankrows: false,
    })
    const findRow = (label: string) =>
      rows.find((r) => String(r[0] ?? "").trim().toLowerCase() === label.toLowerCase())
    const numbers = (r: (string | number)[] | undefined) =>
      (r ?? []).slice(1, 19).map((v) => Number(v) || 0)

    const par = numbers(findRow("Par"))
    const trentScores = numbers(findRow("Trent"))
    const treyScores = numbers(findRow("Trey"))
    if (par.length < 18 || trentScores.length < 18 || treyScores.length < 18) return null

    // Derive course + date from sheet name "Course - YYYY-MM-DD"
    const dash = name.lastIndexOf(" - ")
    const course = dash > 0 ? name.slice(0, dash).trim() : name
    const rawDate = dash > 0 ? name.slice(dash + 3).trim() : ""
    const date = normalizeDate(rawDate)

    // Hole value can live in a "Hole Value" row, default to 1.
    const hvRow = findRow("Hole Value") || findRow("Hole Value ($)")
    const holeValue = hvRow ? Number(hvRow[1]) || 1 : 1

    return buildScorecard(course, date, holeValue, par.slice(0, 18), trentScores.slice(0, 18), treyScores.slice(0, 18))
  } catch {
    return null
  }
}

function scorecardToMatch(c: Scorecard): Match {
  return {
    id: c.matchId,
    course: c.course,
    date: c.date,
    winner: c.result.winner,
    margin: c.result.margin,
    holeValue: c.holeValue,
    moneyWon: c.result.moneyWon,
    trent: stripExtra(c.matchStats.trent),
    trey: stripExtra(c.matchStats.trey),
  }
}

function stripExtra(s: PlayerMatchStats & { holesWon: number; pointsWon: number }): PlayerMatchStats {
  const { holesWon, pointsWon, ...rest } = s
  return rest
}

let _cache: Scorecard[] | null = null
async function allCards(): Promise<Scorecard[]> {
  const wb = await getWorkbook()
  const cards = buildAllScorecards(wb)
  // Sort ascending by date for progression order.
  return cards.sort((a, b) => a.date.localeCompare(b.date))
}

export async function getMatches(): Promise<Match[]> {
  const cards = await allCards()
  return cards.map(scorecardToMatch).sort((a, b) => b.date.localeCompare(a.date))
}

export async function getMatchById(id: string): Promise<Scorecard | null> {
  const cards = await allCards()
  return cards.find((c) => c.matchId === id) ?? null
}

export async function getStandings(): Promise<Standings> {
  const cards = await allCards() // ascending by date
  let trentPoints = 0
  let treyPoints = 0
  let trentMoney = 0
  let treyMoney = 0
  let trentWins = 0
  let treyWins = 0
  let ties = 0
  let holesPlayed = 0
  const progression: Standings["progression"] = []

  cards.forEach((c, i) => {
    trentPoints += c.matchStats.trent.pointsWon
    treyPoints += c.matchStats.trey.pointsWon
    holesPlayed += 18
    if (c.result.winner === "Trent") {
      trentWins += 1
      trentMoney += c.result.moneyWon
    } else if (c.result.winner === "Trey") {
      treyWins += 1
      treyMoney += c.result.moneyWon
    } else {
      ties += 1
    }
    progression.push({
      matchNumber: i + 1,
      course: c.course,
      date: c.date,
      trent: round1(trentPoints),
      trey: round1(treyPoints),
    })
  })

  const pointLeader: Player | "Tie" =
    trentPoints > treyPoints ? "Trent" : treyPoints > trentPoints ? "Trey" : "Tie"
  const moneyLeader: Player | "Tie" =
    trentMoney > treyMoney ? "Trent" : treyMoney > trentMoney ? "Trey" : "Tie"

  const matches = cards.map(scorecardToMatch).sort((a, b) => b.date.localeCompare(a.date))

  return {
    trentPoints: round1(trentPoints),
    treyPoints: round1(treyPoints),
    trentMoney,
    treyMoney,
    trentWins,
    treyWins,
    ties,
    pointLeader,
    moneyLeader,
    moneyUp: Math.abs(trentMoney - treyMoney),
    matchesPlayed: cards.length,
    holesPlayed,
    progression,
    lastFive: matches.slice(0, 5),
  }
}

export async function getStats(): Promise<SeasonStats> {
  const cards = await allCards()
  const trent = aggregate(cards, "trent")
  const trey = aggregate(cards, "trey")
  const courses = cards
    .map((c) => ({
      course: c.course,
      date: c.date,
      winner: c.result.winner,
      moneyWon: c.result.moneyWon,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))

  return { trent, trey, matchesPlayed: cards.length, courses }
}

function aggregate(cards: Scorecard[], who: "trent" | "trey"): PlayerSeasonStats {
  let eagles = 0
  let birdies = 0
  let pars = 0
  let bogeys = 0
  let doubles = 0
  let triples = 0
  let totalSum = 0
  let front9Sum = 0
  let back9Sum = 0

  for (const c of cards) {
    const s = c.matchStats[who]
    eagles += s.eagles
    birdies += s.birdies
    pars += s.pars
    bogeys += s.bogeys
    doubles += s.doubles
    triples += s.triples
    totalSum += s.total
    front9Sum += s.front9
    back9Sum += s.back9
  }

  const holes = cards.length * 18 || 1
  const n = cards.length || 1

  return {
    eagles,
    birdies,
    pars,
    bogeys,
    doubles,
    triples,
    eagleRate: pct(eagles, holes),
    birdieRate: pct(birdies, holes),
    parRate: pct(pars, holes),
    bogeyRate: pct(bogeys, holes),
    doubleRate: pct(doubles, holes),
    tripleRate: pct(triples, holes),
    avg18: round1(totalSum / n),
    avgFront9: round1(front9Sum / n),
    avgBack9: round1(back9Sum / n),
  }
}

function pct(part: number, whole: number): number {
  return Math.round((part / whole) * 1000) / 10
}
