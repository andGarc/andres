"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, loading: () => <Skeleton className="w-full h-[300px]" /> })

interface KayakingData {
  date: string
  level: number
  notes: string | null
  river: string
  level_type: string
}

interface KayakingDashboardProps {
  data: KayakingData[]
}

export function KayakingDashboard({ data }: KayakingDashboardProps) {
  const [selectedYear, setSelectedYear] = useState("All")
  const [years, setYears] = useState<string[]>([])
  const [plotData, setPlotData] = useState<any[]>([])
  const [totalDays, setTotalDays] = useState(0)
  const [rivers, setRivers] = useState<string[]>([])
  const [riverStats, setRiverStats] = useState<Record<string, number>>({})
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    if (!data.length) return

    const yearSet = new Set(data.map(d => new Date(d.date).getFullYear().toString()))
    const sortedYears = Array.from(yearSet).sort((a, b) => Number(b) - Number(a))
    setYears(["All", ...sortedYears])
    setSelectedYear(sortedYears[0] || "All")
  }, [data])

  useEffect(() => {
    if (!data.length) return

    const filtered = selectedYear === "All" ? data : data.filter(d => new Date(d.date).getFullYear().toString() === selectedYear)
    setTotalDays(filtered.length)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const riverCounts = filtered.reduce((acc, { river, date }) => {
      const month = monthNames[new Date(date).getMonth()]
      acc[river] = acc[river] || Array(12).fill(0)
      acc[river][monthNames.indexOf(month)]++
      return acc
    }, {} as Record<string, number[]>)

    const sortedRivers = Object.keys(riverCounts).sort((a, b) =>
      riverCounts[b].reduce((p, c) => p + c, 0) - riverCounts[a].reduce((p, c) => p + c, 0)
    )

    const colors: Record<string, string> = {
      "Little Falls": "#3b82f6",
      "Great Falls": "#10b981",
      Yough: "#f59e0b",
      "White River": "#8b5cf6",
      Other: "#ef4444",
    }

    const traces = sortedRivers.map(river => ({
      x: monthNames,
      y: riverCounts[river],
      name: river,
      type: "bar",
      marker: { color: colors[river] || "#ef4444" },
    }))

    const monthlyTotalsArray = monthNames.map((_, i) => sortedRivers.reduce((sum, r) => sum + (riverCounts[r][i] || 0), 0))
    setMonthlyTotals(monthlyTotalsArray)

    const totalsTrace = {
      x: monthNames,
      y: monthlyTotalsArray,
      text: monthlyTotalsArray.map(String),
      mode: "text" as const,
      textposition: "top center",
      showlegend: false,
      hoverinfo: "skip",
      textfont: { color: "white", size: 12 },
    }

    setPlotData([...traces, totalsTrace])

    const riverDayCounts = sortedRivers.reduce((acc, river) => {
      acc[river] = riverCounts[river].reduce((a, b) => a + b, 0)
      return acc
    }, {} as Record<string, number>)

    setRivers(sortedRivers)
    setRiverStats(riverDayCounts)
  }, [data, selectedYear])

  if (!isClient) return <Skeleton className="w-full h-[400px]" />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Total days {selectedYear !== "All" ? `in ${selectedYear}` : "logged"}: <span className="text-white font-bold">{totalDays}</span>
        </p>
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[350px] bg-[#1e2640] rounded-lg p-2">
        {plotData.length > 0 && (
          <Plot
            data={plotData}
            layout={{
              barmode: "stack",
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              margin: { l: 50, r: 20, t: 80, b: 50 },
              showlegend: true,
              title: {
                text: `Kayaking Days${selectedYear !== "All" ? ` (${selectedYear})` : ""}`,
                font: { family: "monospace", size: 16, color: "white" },
              },
              xaxis: { title: "", tickfont: { color: "white" }, gridcolor: "rgba(255,255,255,0.1)" },
              yaxis: {
                title: "Days",
                tickfont: { color: "white" },
                gridcolor: "rgba(255,255,255,0.1)",
                rangemode: "tozero",
                range: [0, Math.max(...monthlyTotals) * 1.15],
              },
              legend: {
                orientation: "h",
                y: -0.2,
                x: 0.5,
                xanchor: "center",
                font: { color: "white" },
                bgcolor: "rgba(30,38,64,0.7)",
                bordercolor: "rgba(255,255,255,0.2)",
                borderwidth: 1,
              },
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rivers.map(river => (
          <div key={river} className="bg-[#1e2640] p-3 rounded-lg">
            <h4 className="text-sm font-medium">{river}</h4>
            <p className="text-2xl font-bold">{riverStats[river]}</p>
            <p className="text-xs text-gray-400">days</p>
          </div>
        ))}
      </div>
    </div>
  )
}
