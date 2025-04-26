"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { KayakingDashboard } from "@/components/kayaking-dashboard"
import { Database } from "@/lib/database-types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

type KayakingLog = Database["public"]["Tables"]["wwlog"]["Row"]


export default function WhitewaterLogPage() {
  const [kayakingData, setKayakingData] = useState<KayakingLog[]>([])

  const [loading, setLoading] = useState(true)

  // Fetch kayaking data from Supabase
  useEffect(() => {
    async function fetchKayakingData() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('wwlog')
          .select('*')
          .order('date', { ascending: false })
        
        if (error) {
          console.error("Error fetching kayaking data:", error)
          return
        }
        
        setKayakingData(data)
      } catch (error) {
        console.error("Unexpected error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchKayakingData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back to Portfolio Button */}
        <div className="mb-8">
          <Button variant="outline" className="text-black border-gray-500" asChild>
          <Link href="/">← Back</Link>
          </Button>
        </div>

        {/* Dashboard Section */}
        <div className="bg-[#1a2035] rounded-xl p-4 md:p-6 mb-6">
          <h1 className="text-3xl font-mono mb-6">Whitewater Log</h1>
          {loading ? (
            <div className="text-center py-8">Loading kayaking data...</div>
          ) : (
            <KayakingDashboard data={kayakingData} />
          )}
        </div>
      </div>
    </div>
  )
}