import Link from "next/link"
import { Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Andres</h1>
            <p className="text-xl text-gray-400">
              Build things. Keep it light. See what happens.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm uppercase tracking-widest text-gray-500">About</h2>
              <p className="text-gray-300">
                Currently working as a Data Scientist at <Link
                    href="https://www.northropgrumman.com"
                    className="text-blue-600 transition-colors">NG</Link>, where I leverage AI and emerging technologies to make manufacturing more efficient.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm uppercase tracking-widest text-gray-500">Projects</h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://github.com/andGarc/match.mentor"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">match.mentor</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Match.Mentor makes it easy to build valuable mentoring relationships.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">NLP</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Python</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">BERT</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Streamlit</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://gisumd.github.io/COVID-19-API-Documentation/"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">Global COVID-19 Trends and Impact Survey API</h3>
                    <p className="text-sm text-gray-400 mt-1">API for accessing the University of Maryland Social Data Science Center Global COVID-19 Trends and Impact Survey data.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Python</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">JavaScript</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">SQL</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">FastAPI</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/andGarc/em_map/blob/main/README.md"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">em.map</h3>
                    <p className="text-sm text-gray-400 mt-1">Real-time tracking application celebrating Em's 365 days of running, featuring live location feeds and custom mapping visualization.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">R</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Shiny</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Mapbox</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Tile API</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">AWS</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/andGarc/laundry-tracker"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">Vermont Law School Laundry Tracker</h3>
                    <p className="text-sm text-gray-400 mt-1">Real-time coordination system for shared laundry machines in multi-unit buildings, eliminating the hassle of checking availability and preventing forgotten loads.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">React</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">Supabase</span>
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">TailwindCSS</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm uppercase tracking-widest text-gray-500">Check these out</h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/wwlog"
                    target=""
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">Whitewater Log</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      🫳 My days at church
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="http://laundry-tracker-one.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">SoRo Laundry Tracker</h3>
                    <p className="text-sm text-gray-400 mt-1">🧺 Vermont Law School Laundry Tracker</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://makerworld.com/en/@usr_andresito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-medium">🌱 MakerWorld Profile</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      
                    </p>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm uppercase tracking-widest text-gray-500">Contact</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-800 text-white hover:bg-gray-900 hover:text-white"
                >
                  <Link href="mailto:garcia.andres@proton.me">
                    <Mail className="h-4 w-4 mr-2" />
                  </Link>
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-800 text-white hover:bg-gray-900 hover:text-white"
                >
                  <Link href="https://www.linkedin.com/in/andres-garcia/">
                    <Linkedin className="h-4 w-4 mr-2" />
                  </Link>
                  Linkedin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Andres Garcia. All rights reserved.</p>
      </footer>
    </div>
  )
}
