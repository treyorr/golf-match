export type Player = "Trent" | "Trey"

export type PlayerMatchStats = {
  front9: number
  back9: number
  total: number
  toPar: number
  eagles: number
  birdies: number
  pars: number
  bogeys: number
  doubles: number
  triples: number
}

export type Match = {
  id: string // slugified course + date e.g. "rio-pinar-gc-2026-06-13"
  course: string
  date: string // ISO date string
  winner: Player | "Tie"
  margin: number
  holeValue: number
  moneyWon: number
  trent: PlayerMatchStats
  trey: PlayerMatchStats
}

export type Scorecard = {
  matchId: string
  course: string
  date: string
  holeValue: number
  par: number[] // par for each of 18 holes
  trentScores: number[]
  treyScores: number[]
  trentEmojis: string[]
  treyEmojis: string[]
  runningScore: string[] // e.g. ["1UP", "AS", "2UP"] per hole
  trentPointsPerHole: number[]
  treyPointsPerHole: number[]
  trentRunningPoints: number[]
  treyRunningPoints: number[]
  result: {
    winner: Player | "Tie"
    margin: number
    moneyWon: number
  }
  matchStats: {
    trent: PlayerMatchStats & { holesWon: number; pointsWon: number }
    trey: PlayerMatchStats & { holesWon: number; pointsWon: number }
  }
}

export type PlayerSeasonStats = {
  eagles: number
  birdies: number
  pars: number
  bogeys: number
  doubles: number
  triples: number
  eagleRate: number
  birdieRate: number
  parRate: number
  bogeyRate: number
  doubleRate: number
  tripleRate: number
  avg18: number
  avgFront9: number
  avgBack9: number
}

export type Standings = {
  trentPoints: number
  treyPoints: number
  trentMoney: number
  treyMoney: number
  trentWins: number
  treyWins: number
  ties: number
  pointLeader: Player | "Tie"
  moneyLeader: Player | "Tie"
  moneyUp: number
  matchesPlayed: number
  holesPlayed: number
  progression: {
    matchNumber: number
    course: string
    date: string
    trent: number
    trey: number
  }[]
  lastFive: Match[]
}

export type SeasonStats = {
  trent: PlayerSeasonStats
  trey: PlayerSeasonStats
  matchesPlayed: number
  courses: {
    course: string
    date: string
    winner: Player | "Tie"
    moneyWon: number
  }[]
}
