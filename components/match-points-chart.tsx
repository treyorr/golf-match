"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function MatchPointsChart({
  trent,
  trey,
}: {
  trent: number[]
  trey: number[]
}) {
  const data = trent.map((t, i) => ({ hole: i + 1, Trent: t, Trey: trey[i] }))

  return (
    <div className="h-56 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <LineChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#1c1c1c" strokeOpacity={0.08} vertical={false} />
          <XAxis dataKey="hole" tick={{ fill: "#1c1c1c", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#c8a84b", strokeOpacity: 0.4 }} />
          <YAxis tick={{ fill: "#1c1c1c", fontSize: 11 }} tickLine={false} axisLine={false} width={36} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a3a2a",
              border: "1px solid rgba(200,168,75,0.4)",
              borderRadius: 2,
              color: "#f5f0e8",
            }}
            labelFormatter={(l) => `Hole ${l}`}
          />
          <Line type="monotone" dataKey="Trent" stroke="#c8a84b" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="Trey" stroke="#2d5a3d" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
