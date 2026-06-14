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
import type { Standings } from "@/lib/types"

type Point = Standings["progression"][number]

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: Point }[] }) {
  if (!active || !payload || payload.length === 0) return null
  const p = payload[0].payload
  return (
    <div className="rounded-sm border border-gold/40 bg-forest px-3 py-2 text-parchment shadow-lg">
      <div className="font-display text-sm font-bold">{p.course}</div>
      <div className="text-xs text-parchment/70">{p.date}</div>
      <div className="mt-1 text-xs">
        <span className="text-gold">Trent {p.trent}</span>
        {" · "}
        <span style={{ color: "#5b8c6e" }}>Trey {p.trey}</span>
      </div>
    </div>
  )
}

export function PointsChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="#1c1c1c" strokeOpacity={0.08} vertical={false} />
          <XAxis
            dataKey="matchNumber"
            tick={{ fill: "#1c1c1c", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#c8a84b", strokeOpacity: 0.4 }}
            label={{ value: "Match", position: "insideBottom", offset: -2, fill: "#1c1c1c", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "#1c1c1c", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="trent"
            name="Trent"
            stroke="#c8a84b"
            strokeWidth={3}
            dot={{ r: 3, fill: "#c8a84b" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="trey"
            name="Trey"
            stroke="#2d5a3d"
            strokeWidth={3}
            dot={{ r: 3, fill: "#2d5a3d" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
