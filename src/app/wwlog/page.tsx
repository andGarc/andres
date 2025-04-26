"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { KayakingDashboard } from "@/components/kayaking-dashboard"
import { Database } from "@/lib/database-types"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type KayakingLog = Database["public"]["Tables"]["wwlog"]["Row"]

export default function WhitewaterLogPage() {
  const [data, setData] = useState<KayakingLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("wwlog").select("*").order("date", { ascending: false })
      if (error) console.error("Error fetching kayaking data:", error)
      else setData(data as KayakingLog[])
      setLoading(false)
    })()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button asChild variant="outline" className="text-black border-gray-500 mb-8">
          <Link href="/">← Back</Link>
        </Button>

        <div className="bg-[#1a2035] rounded-xl p-4 md:p-6 mb-6">
          <h1 className="text-3xl font-mono mb-6">Whitewater Log</h1>
          {loading ? (
            <div className="text-center py-8">Loading kayaking data...</div>
          ) : (
            <KayakingDashboard data={data} />
          )}
        </div>
      </div>
    </div>
  )
}