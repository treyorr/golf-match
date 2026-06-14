"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { PlayerSeasonStats } from "@/lib/types"

export function ScoringDistribution({
  trent,
  trey,
}: {
  trent: PlayerSeasonStats
  trey: PlayerSeasonStats
}) {
  const data = [
    { type: "Eagle", Trent: trent.eagles, Trey: trey.eagles },
    { type: "Birdie", Trent: trent.birdies, Trey: trey.birdies },
    { type: "Par", Trent: trent.pars, Trey: trey.pars },
    { type: "Bogey", Trent: trent.bogeys, Trey: trey.bogeys },
    { type: "Double", Trent: trent.doubles, Trey: trey.doubles },
    { type: "Triple+", Trent: trent.triples, Trey: trey.triples },
  ]

  return (
    <div className="h-72 w-full rounded-sm border border-gold/20 bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#1c1c1c" strokeOpacity={0.08} vertical={false} />
          <XAxis dataKey="type" tick={{ fill: "#1c1c1c", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#c8a84b", strokeOpacity: 0.4 }} />
          <YAxis tick={{ fill: "#1c1c1c", fontSize: 12 }} tickLine={false} axisLine={false} width={36} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a3a2a",
              border: "1px solid rgba(200,168,75,0.4)",
              borderRadius: 2,
              color: "#f5f0e8",
            }}
            cursor={{ fill: "rgba(200,168,75,0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Bar dataKey="Trent" fill="#c8a84b" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Trey" fill="#2d5a3d" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
