"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <div>
          <Button variant="outline" className="text-black border-gray-500" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>

        {/* Professional Timeline Detail Section */}
        <section className="bg-gray-900 rounded-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-mono mb-4">Professional Timeline</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm md:text-base">Northrop Grumman</h3>
              <p className="text-gray-400 text-xs md:text-sm">2024 - Present: Senior Principal Data Scientist</p>
              <p className="text-gray-400 text-xs md:text-sm">2023 - 2024: Principal Data Scientist</p>
              <p className="text-gray-400 text-xs md:text-sm">2022 - 2023: Data Scientist</p>
              <p className="text-gray-400 text-xs md:text-sm">2021 - 2022: Data Analyst</p>
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">UMD Research</h3>
              <p className="text-gray-400 text-xs md:text-sm">2021 - 2021: Graduate Research Assistant - SESYNC: National Socio-Environmental Synthesis Center</p>
              <p className="text-gray-400 text-xs md:text-sm">2020 - 2021: Graduate Research Assistant - UMD Center for Geospatial Information Science</p>
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">Aegis Project Controls</h3>
              <p className="text-gray-400 text-xs md:text-sm">2019 - 2020: Project Controls Engineer</p>
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">University of Maryland</h3>
              <p className="text-gray-400 text-xs md:text-sm">2016 - 2019: Student - GIS & GEOINT</p>
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">United States Marine Corps</h3>
              <p className="text-gray-400 text-xs md:text-sm">2012 - 2016: Marine Corps Infantry</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
