"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, Linkedin, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectModal } from "@/components/project-modal"
import Data from '../Data.json'

// Projects
const projects = Data.projects

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside className="flex flex-col space-y-6 md:space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <Image src="/profile.png" alt="Profile" width={60} height={60} className="rounded-full" />
              <div>
                <h1 className="text-2xl font-mono">ANDRES G.</h1>
                {/* <p className="text-gray-400 text-sm">Data Scientist // Developer</p> */}
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-gray-300 text-base leading-relaxed">
                Build things. Keep it light. See what happens.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:garcia.andres@proton.me">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/andres-garcia/">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/andGarc">
                  <Github className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="flex-grow" />

            {/* Footer */}
            <footer className="text-gray-400 text-xs">
              <p>© AG Powered by Vercel</p>
            </footer>
          </aside>

          {/* Right Content */}
          <main className="flex flex-col space-y-8">
            {/* Projects Section */}
            <section className="sm:px-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-mono">My Projects</h2>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#">
                    →
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className="relative bg-gray-900 rounded-lg p-2 aspect-[5/4] flex flex-col justify-end hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <div className="text-right">
                      <h3 className="text-white font-bold text-base">{project.title}</h3>
                      <p className="text-blue-400 text-xs">{project.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Timeline Section */}
            <section className="bg-blue-600 rounded-xl p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-mono">Professional Timeline</h2>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/timeline">
                    →
                  </Link>
                </Button>
              </div>

              <div className="relative overflow-x-auto pb-4 -mx-2">
              <div className="hidden md:block absolute left-0 right-0 top-1/4 transform -translate-y-1/2 h-[2px] bg-blue-400 bg-opacity-50"></div>
                <div className="flex space-x-8 px-2">
                  {[
                    { year: "2012 - 2016", label: "USMC" },
                    { year: "2016 - 2019", label: "Student" },
                    { year: "2019 - 2020", label: "Aegis Project Controls" },
                    { year: "2020 - 2021", label: "UMD Research" },
                    { year: "2021 - Present", label: "Northrop Grumman" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[80px]">
                      <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600 mb-2" />
                      <p className="font-bold text-white text-center text-xs">{item.year}</p>
                      <p className="text-blue-100 text-center text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Check these out + Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section className="bg-gray-900 rounded-xl p-4">
                <h2 className="text-xl font-mono mb-4">Check these out!</h2>
                <div className="space-y-3">
                  <div>
                    <Link href="/wwlog" className="text-blue-400 font-bold text-sm">
                      Whitewater Log
                    </Link>
                    <p className="text-gray-400 text-xs">🫳 My days at church</p>
                  </div>
                  <div>
                    <Link href="http://laundry-tracker-one.vercel.app" className="text-blue-400 font-bold text-sm">
                      SoRo Laundry Tracker
                    </Link>
                    <p className="text-gray-400 text-xs">🧺 Vermont Law School Laundry Tracker</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-900 rounded-xl p-4">
                <h2 className="text-xl font-mono mb-4">Education</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-sm">Stanford University</h3>
                    <p className="text-gray-400 text-xs">Professional Certificate, Artificial Intelligence</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">UMD College Park</h3>
                    <p className="text-gray-400 text-xs">MS Geospatial Intelligence</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">UMD College Park</h3>
                    <p className="text-gray-400 text-xs">BS Geospatial Information Science</p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
      )}
    </div>
  )
}
