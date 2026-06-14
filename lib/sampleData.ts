// Fallback sample data so the dashboard renders before the live
// Google Sheet is connected. Once GOOGLE_SHEET_ID is set, real data is used.

export const SAMPLE_PAR = [4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 4, 3, 5, 4]

export const SAMPLE_MATCHES: { key: string; course: string; date: string; holeValue: number }[] = [
  { key: "m1", course: "Rio Pinar GC", date: "2025-09-14", holeValue: 2 },
  { key: "m2", course: "Dubsdread CC", date: "2025-10-05", holeValue: 3 },
  { key: "m3", course: "Winter Park 9", date: "2025-11-02", holeValue: 1 },
  { key: "m4", course: "Eagle Creek GC", date: "2025-12-07", holeValue: 5 },
  { key: "m5", course: "Orange Tree CC", date: "2026-01-18", holeValue: 4 },
  { key: "m6", course: "Stoneybrook East", date: "2026-02-15", holeValue: 2 },
  { key: "m7", course: "MetroWest GC", date: "2026-04-01", holeValue: 3 },
  { key: "m8", course: "Rio Pinar GC", date: "2026-06-13", holeValue: 5 },
]

type Scores = { trent: number[]; trey: number[] }

export const SAMPLE_SCORES: Record<string, Scores> = {
  m1: {
    trent: [4, 5, 3, 6, 4, 5, 4, 6, 5, 5, 6, 4, 5, 4, 4, 3, 6, 5],
    trey: [5, 4, 4, 6, 5, 4, 3, 5, 4, 4, 6, 3, 4, 5, 5, 4, 5, 4],
  },
  m2: {
    trent: [4, 4, 4, 5, 4, 5, 3, 6, 5, 4, 5, 4, 5, 4, 5, 3, 6, 4],
    trey: [5, 5, 3, 6, 5, 4, 4, 6, 4, 5, 6, 4, 4, 5, 4, 4, 6, 5],
  },
  m3: {
    trent: [4, 5, 3, 5, 5, 4, 4, 5, 5, 4, 6, 3, 5, 4, 4, 4, 5, 4],
    trey: [4, 4, 4, 5, 4, 5, 3, 6, 4, 5, 5, 4, 4, 4, 5, 3, 6, 4],
  },
  m4: {
    trent: [3, 4, 3, 5, 4, 4, 4, 5, 4, 4, 5, 3, 4, 5, 4, 3, 5, 4],
    trey: [5, 5, 4, 6, 5, 5, 4, 6, 5, 5, 6, 4, 5, 5, 5, 4, 6, 5],
  },
  m5: {
    trent: [5, 5, 4, 6, 5, 5, 4, 6, 5, 5, 6, 4, 5, 5, 5, 4, 7, 5],
    trey: [4, 4, 3, 5, 4, 4, 4, 5, 5, 4, 5, 3, 5, 4, 4, 4, 5, 4],
  },
  m6: {
    trent: [4, 4, 3, 5, 4, 5, 3, 5, 4, 4, 5, 4, 4, 4, 4, 3, 5, 5],
    trey: [4, 5, 3, 5, 4, 4, 4, 5, 4, 5, 5, 3, 4, 4, 5, 3, 5, 4],
  },
  m7: {
    trent: [4, 4, 4, 5, 5, 4, 3, 5, 4, 5, 5, 3, 4, 4, 4, 4, 5, 4],
    trey: [5, 4, 3, 6, 4, 5, 4, 6, 5, 4, 6, 4, 5, 5, 4, 3, 5, 5],
  },
  m8: {
    trent: [4, 4, 3, 4, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 4, 3, 5, 4],
    trey: [4, 5, 4, 5, 5, 4, 4, 6, 4, 5, 5, 4, 5, 4, 5, 4, 6, 4],
  },
}
