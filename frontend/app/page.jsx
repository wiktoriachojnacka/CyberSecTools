import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ToolCard } from "@/components/tool-card"
import { getAllTools } from "@/lib/tools"

export default function Home() {
  const tools = getAllTools()

  return (
    <main className="min-h-screen bg-[#0a0b1e] text-white font-mono relative overflow-hidden">
      {/* Cybernetic background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(98,0,255,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,20,0.8),rgba(5,5,20,0.8))]"></div>
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="col-span-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            ></div>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="row-span-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
            ></div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <header className="mb-12 text-center">
          <p className="text-blue-200 text-lg tracking-wide mb-8">
            Your comprehensive suite of cybersecurity microservices
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block">
              <ToolCard icon={tool.icon} title={tool.title} description={tool.description} color={tool.color} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
