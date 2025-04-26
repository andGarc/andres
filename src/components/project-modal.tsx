"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    subtitle: string
    description: string
    technologies: string[]
    longDescription?: string
    link?: string
  }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
      // Add a small delay to trigger the fade-in animation
      const timer = setTimeout(() => setIsVisible(true), 10)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
      return () => {
        document.removeEventListener("keydown", handleEscapeKey)
        clearTimeout(timer)
        document.body.style.overflow = ""
      }
    } else {
      setIsVisible(false)
      return undefined
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-[#1a2035] text-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="text-gray-400 uppercase text-sm font-medium mb-2">PROJECT</div>

          <h2 className="text-3xl md:text-4xl font-mono mb-4">{project.title}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-[#2a3559] text-blue-200 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="text-gray-300 mb-8 space-y-4">
            <p>{project.description}</p>
            {project.longDescription && <p>{project.longDescription}</p>}
          </div>

          <div className="flex justify-between items-center">
            <button onClick={onClose} className="text-gray-400 hover:text-white font-medium">
              Close
            </button>

            {project.link ? (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  More info <ExternalLink size={16} />
                </a>
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">More info</Button>
            )}
          </div>
        </div>
      </div>

      {/* Close button in the top right */}
      <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={onClose}>
        <X className="w-6 h-6" />
      </button>
    </div>
  )
}
