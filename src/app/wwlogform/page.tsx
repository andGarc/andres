"use client"

import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

interface KayakingLog {
  id: number
  date: string
  river: string
  level: number
  level_type: string
  notes: string
}

export default function WhitewaterLogFormPage() {
  const [date, setDate] = useState("")
  const [riverSection, setRiverSection] = useState("Little Falls")
  const [level, setLevel] = useState("0.00")
  const [measurementUnit, setMeasurementUnit] = useState<"FT" | "CFS">("FT")
  const [notes, setNotes] = useState("")
  const [kayakingData, setKayakingData] = useState<KayakingLog[]>([])

  // Set default date to today on initial load
  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    setDate(formattedDate)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Convert level to number
      const levelValue = parseFloat(level)

      // Insert new entry into Supabase
      const { data, error } = await supabase
        .from('wwlog')
        .insert([
          {
            date,
            river: riverSection,
            level: levelValue,
            level_type: measurementUnit,
            notes
          }
        ])
        .select()

      if (error) {
        console.error("Error adding log entry:", error)
        alert("Failed to submit log entry: " + error.message)
        return
      }

      if (data) {
        // Add the new entry to the local state
        setKayakingData([data[0], ...kayakingData])

        // Reset form fields except date
        setNotes("")
        setLevel("0.00")

        alert("Log entry submitted successfully!")
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      alert("An unexpected error occurred")
    }
  }

  // Sample river sections
  const riverSections = [
    "Little Falls",
    "Great Falls",
    "Yough",
    "White River",
    "Other"
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back to Portfolio Button */}
        <div className="mb-8">
          <Button variant="outline" className="text-black border-gray-500" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>

        {/* Form Section */}
        <div className="bg-[#1a2035] rounded-xl p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-xl mb-4">Form</h2>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-lg">Date</h3>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1e2640] border border-[#2a3559] text-white h-12 rounded-lg px-3 mt-2 focus:outline-none"
                required
              />
            </div>

            {/* River Section */}
            <div>
              <h3 className="text-lg">River Section</h3>
              <select
                value={riverSection}
                onChange={(e) => setRiverSection(e.target.value)}
                className="w-full bg-[#1e2640] border border-[#2a3559] text-white h-12 rounded-lg px-3 mt-2 focus:outline-none appearance-none"
                required
              >
                {riverSections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <h3 className="text-lg">Level</h3>
              <input
                type="number"
                step="0.01"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#1e2640] border border-[#2a3559] text-white h-12 rounded-lg px-3 mt-2 focus:outline-none"
                required
              />
            </div>

            {/* Measurement Unit */}
            <div>
              <h3 className="text-lg">Measurement Unit</h3>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="ft"
                    name="measurementUnit"
                    value="FT"
                    checked={measurementUnit === "FT"}
                    onChange={() => setMeasurementUnit("FT")}
                    className="h-5 w-5"
                  />
                  <label htmlFor="ft" className="text-lg">FT</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cfs"
                    name="measurementUnit"
                    value="CFS"
                    checked={measurementUnit === "CFS"}
                    onChange={() => setMeasurementUnit("CFS")}
                    className="h-5 w-5"
                  />
                  <label htmlFor="cfs" className="text-lg">CFS</label>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg">Notes</h3>
              <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.substring(0, 200))}
                  placeholder="Add your notes here..."
                  className="w-full bg-[#1e2640] border border-[#2a3559] text-white min-h-[100px] rounded-lg p-3 mt-2 focus:outline-none resize-none"
                />
                <div className="absolute bottom-2 right-3 text-sm text-gray-400">{notes.length}/200</div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
