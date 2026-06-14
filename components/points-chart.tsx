"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import type { Standings } from "@/lib/types"

type Point = Standings["progression"][number]

function ChartTooltip({
  active,
  payload,
  mode,
}: {
  active?: boolean
  payload?: { payload: Point }[]
  mode: "points" | "money"
}) {
  if (!active || !payload || payload.length === 0) return null
  const p = payload[0].payload
  
  let leaderText = ""
  let leadColor = "#f5f0e8"
  
  if (mode === "points") {
    const lead = p.trentLead
    leaderText = lead === 0 ? "All Square" : lead > 0 ? `Trent +${lead}` : `Trey +${Math.abs(lead)}`
    leadColor = lead > 0 ? "#c8a84b" : lead < 0 ? "#5b8c6e" : "#f5f0e8"
  } else {
    const lead = p.trentMoneyLead
    leaderText = lead === 0 ? "All Square" : lead > 0 ? `Trent +$${lead}` : `Trey +$${Math.abs(lead)}`
    leadColor = lead > 0 ? "#c8a84b" : lead < 0 ? "#5b8c6e" : "#f5f0e8"
  }
  
  return (
    <div className="rounded-sm border border-gold/40 bg-forest px-3 py-2 text-parchment shadow-lg">
      <div className="font-display text-sm font-bold">{p.course}</div>
      <div className="text-xs text-parchment/70">{p.date}</div>
      <div className="mt-1 text-sm font-semibold" style={{ color: leadColor }}>
        {leaderText}
      </div>
    </div>
  )
}

export function PointsChart({ data }: { data: Point[] }) {
  const [mode, setMode] = useState<"points" | "money">("points")

  // Compute domain for symmetrical Y axis
  const maxAbsPoints = data.reduce((m, d) => Math.max(m, Math.abs(d.trentLead)), 0)
  const yBoundPoints = Math.ceil(maxAbsPoints + 1)

  const maxAbsMoney = data.reduce((m, d) => Math.max(m, Math.abs(d.trentMoneyLead)), 0)
  const yBoundMoney = Math.max(50, Math.ceil(maxAbsMoney / 50) * 50 + 50)

  const yBound = mode === "points" ? yBoundPoints : yBoundMoney
  const dataKey = mode === "points" ? "trentLead" : "trentMoneyLead"

  return (
    <div className="w-full">
      {/* Switcher and Legend */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Switcher */}
        <div className="inline-flex rounded-full bg-parchment p-1 border border-gold/10">
          <button
            onClick={() => setMode("points")}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              mode === "points"
                ? "bg-forest text-parchment shadow-sm font-bold"
                : "text-forest/60 hover:text-forest"
            }`}
          >
            Points Lead
          </button>
          <button
            onClick={() => setMode("money")}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              mode === "money"
                ? "bg-forest text-parchment shadow-sm font-bold"
                : "text-forest/60 hover:text-forest"
            }`}
          >
            Money Lead
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm font-semibold text-ink">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gold shadow-sm" /> Trent Leading
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green shadow-sm" /> Trey Leading
          </span>
        </div>
      </div>

      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 20 }}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8a84b" stopOpacity={0.42} />
                <stop offset="50%" stopColor="#c8a84b" stopOpacity={0} />
                <stop offset="50%" stopColor="#2d5a3d" stopOpacity={0} />
                <stop offset="100%" stopColor="#2d5a3d" stopOpacity={0.44} />
              </linearGradient>
              <filter id="leadShadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#122a1e" floodOpacity="0.45" />
              </filter>
            </defs>
            <CartesianGrid stroke="#1c1c1c" strokeOpacity={0.08} vertical={false} />
            <XAxis
              dataKey="matchNumber"
              tick={{ fill: "#1c1c1c", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#c8a84b", strokeOpacity: 0.4 }}
              label={{ value: "Match", position: "insideBottom", offset: -5, fill: "#1c1c1c", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "#1c1c1c", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={45}
              domain={[-yBound, yBound]}
              tickFormatter={(v: number) => {
                if (v === 0) return "AS"
                if (mode === "points") {
                  return v > 0 ? `T+${v}` : `Y+${Math.abs(v)}`
                } else {
                  return v > 0 ? `T+$${v}` : `Y+$${Math.abs(v)}`
                }
              }}
            />
            <ReferenceLine y={0} stroke="#1c1c1c" strokeOpacity={0.3} strokeDasharray="4 3" />
            <Tooltip content={<ChartTooltip mode={mode} />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#c8a84b"
              strokeWidth={2.5}
              fill="url(#leadGradient)"
              filter="url(#leadShadow)"
              dot={{ r: 3, fill: "#c8a84b", stroke: "#c8a84b" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
