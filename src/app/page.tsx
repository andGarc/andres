"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, Linkedin, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectModal } from "@/components/project-modal"
import Data from '../Data.json';

// Projects
const projects = Data.projects;

export default function Portfolio() {
  // State for modal
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to open modal with selected project
  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-5 md:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <Image src="/placeholder.svg" alt="Profile" width={60} height={60} className="rounded-full" />
              <div>
                <h1 className="text-xl md:text-2xl font-mono">ANDRES G.</h1>
                <p className="text-gray-400">Data Scientist // Developer</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Build things. Keep it light. See what happens.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
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
            </div>

            {/* Spacer to push copyright to bottom */}
            <div className="flex-grow"></div>
            
            {/* Copyright section aligned with education section */}
            <div className="text-gray-400 text-sm mt-auto">
              <p>© AG Powered by Vercel</p>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Menu Button - Only show on mobile */}
            <div className="flex justify-end lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Link href="/timeline">
                  <span className="sr-only">View full timeline</span>→
                </Link>
              </Button>
            </div>

            {/* Projects Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-mono">My Projects</h2>
                <Button variant="ghost" size="icon" className="text-white">
                  <Link href="">
                    <span className="sr-only">View all projects</span>→
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className="relative bg-gray-900 rounded-lg overflow-hidden flex flex-col justify-center p-4 aspect-[4/3] transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <div className="text-right">
                      <h3 className="text-white font-bold text-md md:text-l">{project.title}</h3>
                      <p className="text-blue-400 text-xs md:text-sm">{project.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Timeline Section - Horizontal */}
            <section className="bg-blue-600 rounded-xl p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-mono">Professional Timeline</h2>
                <Button variant="ghost" size="icon" className="text-white">
                  <Link href="/timeline">
                    <span className="sr-only">View full timeline</span>→
                  </Link>
                </Button>
              </div>

              <div className="relative pb-4">
                {/* Timeline line */}
                <div className="absolute left-0 right-0 top-[45px] h-[2px] bg-blue-400 bg-opacity-50"></div>

                {/* Timeline entries - horizontal scrolling */}
                <div className="flex space-x-8 md:space-x-12 overflow-x-auto pb-4 relative scrollbar-hide">
                  <div className="flex flex-col items-center relative min-w-[100px] md:min-w-[120px]">
                    <div className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full bg-white border-4 border-blue-600 z-10 mb-2"></div>
                    <p className="font-bold text-white text-center text-sm md:text-base">2012 - 2016</p>
                    <p className="text-blue-100 text-center text-xs md:text-sm">USMC</p>
                  </div>

                  <div className="flex flex-col items-center relative min-w-[100px] md:min-w-[120px]">
                    <div className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full bg-white border-4 border-blue-600 z-10 mb-2"></div>
                    <p className="font-bold text-white text-center text-sm md:text-base">2016 - 2019</p>
                    <p className="text-blue-100 text-center text-xs md:text-sm">Student</p>
                  </div>

                  <div className="flex flex-col items-center relative min-w-[100px] md:min-w-[120px]">
                    <div className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full bg-white border-4 border-blue-600 z-10 mb-2"></div>
                    <p className="font-bold text-white text-center text-sm md:text-base">2019 - 2020</p>
                    <p className="text-blue-100 text-center text-xs md:text-sm">Aegis Project Controls</p>
                  </div>

                  <div className="flex flex-col items-center relative min-w-[100px] md:min-w-[120px]">
                    <div className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full bg-white border-4 border-blue-600 z-10 mb-2"></div>
                    <p className="font-bold text-white text-center text-sm md:text-base">2020 - 2021</p>
                    <p className="text-blue-100 text-center text-xs md:text-sm">UMD Research</p>
                  </div>

                  <div className="flex flex-col items-center relative min-w-[100px] md:min-w-[120px]">
                    <div className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full bg-white border-4 border-blue-600 z-10 mb-2"></div>
                    <p className="font-bold text-white text-center text-sm md:text-base">2021 - Present</p>
                    <p className="text-blue-100 text-center text-xs md:text-sm">Northrop Grumman</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Check these out and Education Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check these out Section */}
              <section className="relative overflow-hidden rounded-xl bg-gray-900 p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-mono mb-2 md:mb-4">Check these out!</h2>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <a href="/wwlog" className="text-blue-400 font-bold text-sm md:text-base">
                      Whitewater Log
                    </a>
                    <p className="text-gray-400 text-xs md:text-sm">
                    🫳 My days at church
                    </p>
                  </div>
                  <div>
                    <a href="http://laundry-tracker-one.vercel.app" className="text-blue-400 font-bold text-sm md:text-base">
                    SoRo Laundry Tracker
                    </a>
                    <p className="text-gray-400 text-xs md:text-sm">
                    🧺 Vermont Law School Laundry Tracker
                    </p>
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-mono mb-2 md:mb-4">Education</h2>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Stanford University</h3>
                    <p className="text-gray-400 text-xs md:text-sm">
                      Professional Certificate, Artificial Intelligence
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">University of Maryland College Park</h3>
                    <p className="text-gray-400 text-xs md:text-sm">MS Geospatial Intelligence (GEOINT)</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">University of Maryland College Park</h3>
                    <p className="text-gray-400 text-xs md:text-sm">BS Geospatial Information Science</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    {/* Project Modal */}
    {selectedProject && (
        <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
    )}
    </div>
  )
}
