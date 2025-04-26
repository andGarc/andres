"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Select } from "@/components/ui/select"
import { SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"

const Plot =  dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />,
})

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
  const [totalDays, setTotalDays] = useState(0)
  const [plotData, setPlotData] = useState<unknown[]>([])
  const [plotLayout, setPlotLayout] = useState<unknown>({})
  const [uniqueRivers, setUniqueRivers] = useState<string[]>([])
  const [riverStats, setRiverStats] = useState<{ [key: string]: number }>({})
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [years, setYears] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const allYears = Array.from(new Set(data.map(item => new Date(item.date).getFullYear().toString())))
    const sortedYears = allYears.sort((a, b) => Number(b) - Number(a))
    setYears(sortedYears)
    setSelectedYear(sortedYears[0] || "All")
  }, [data])

  useEffect(() => {
    if (!data.length) return

    const filteredData = selectedYear === "All"
      ? data
      : data.filter(item => new Date(item.date).getFullYear().toString() === selectedYear)

    setTotalDays(filteredData.length)

    const rivers = Array.from(new Set(filteredData.map((item) => item.river)))
    setUniqueRivers(rivers)

    const stats: { [key: string]: number } = {}
    rivers.forEach((river) => {
      stats[river] = filteredData.filter((item) => item.river === river).length
    })
    setRiverStats(stats)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const riverData: { [key: string]: { x: string[]; y: number[] } } = {}
    rivers.forEach((river) => {
      riverData[river] = {
        x: [...monthNames],
        y: Array(12).fill(0),
      }
    })

    filteredData.forEach((item) => {
      const date = new Date(item.date)
      const monthIndex = date.getMonth()
      const monthName = monthNames[monthIndex]
      const river = item.river
      const monthIdx = riverData[river].x.indexOf(monthName)
      if (monthIdx !== -1) {
        riverData[river].y[monthIdx]++
      }
    })

    const colors: Record<string, string> = {
      "Little Falls": "#3b82f6",
      "Great Falls": "#10b981",
      Yough: "#f59e0b",
      "White River": "#8b5cf6",
      Other: "#ef4444",
    }

    const sortedRivers = rivers
      .map((river) => ({
        name: river,
        total: riverData[river].y.reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.total - a.total)
      .map((r) => r.name)

    const plotlyData = sortedRivers.map((river) => ({
      x: riverData[river].x,
      y: riverData[river].y,
      name: river,
      type: "bar",
      marker: {
        color: colors[river] || "#ef4444",
      },
    }))

    const monthlyTotals = riverData[sortedRivers[0]].x.map((_, i) =>
      sortedRivers.reduce((sum, river) => sum + riverData[river].y[i], 0)
    )

    const totalsTrace = {
      x: riverData[sortedRivers[0]].x,
      y: monthlyTotals,
      text: monthlyTotals.map((total) => total.toString()),
      mode: "text" as const,
      textposition: "top center",
      showlegend: false,
      hoverinfo: "skip",
      textfont: {
        color: "white",
        size: 12,
      },
    }

    setPlotData([...plotlyData, totalsTrace])

    setPlotLayout({
      barmode: "stack",
      showlegend: true,
      title: {
        text: `Kayaking Days by Month and River${selectedYear !== "All" ? ` (${selectedYear})` : ""}`,
        font: {
          family: "monospace",
          size: 16,
          color: "white",
        },
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 50, r: 20, t: 50, b: 50 },
      xaxis: {
        title: { text: "Month", font: { family: "Arial", size: 12, color: "white" } },
        tickfont: { color: "white" },
        gridcolor: "rgba(255,255,255,0.1)",
      },
      yaxis: {
        title: { text: "Number of Days", font: { family: "Arial", size: 12, color: "white" } },
        tickfont: { color: "white" },
        gridcolor: "rgba(255,255,255,0.1)",
      },
      legend: {
        font: { color: "white" },
        bgcolor: "rgba(30,38,64,0.7)",
        bordercolor: "rgba(255,255,255,0.2)",
        borderwidth: 1,
      },
      autosize: true,
    })
  }, [data, selectedYear])

  if (!isClient) {
    return <Skeleton className="w-full h-[400px]" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Total days on the water {selectedYear !== "All" ? `in ${selectedYear}` : "logged"}: <span className="text-white font-bold">{totalDays}</span>
        </p>
        <Select onValueChange={(year) => setSelectedYear(year)} value={selectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <div className="w-full h-[350px] bg-[#1e2640] rounded-lg p-2">
          {plotData.length > 0 && (
            <Plot
              data={plotData}
              layout={plotLayout}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {uniqueRivers.map((river) => (
          <div key={river} className="bg-[#1e2640] p-3 rounded-lg">
            <h4 className="text-sm font-medium">{river}</h4>
            <p className="text-2xl font-bold">{riverStats[river] || 0}</p>
            <p className="text-xs text-gray-400">days</p>
          </div>
        ))}
      </div>
    </div>
  )
}
