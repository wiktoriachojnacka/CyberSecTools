import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolHeader } from "@/components/tool-header"
import { ToolDescription } from "@/components/tool-description"
import { ToolFunctionality } from "@/components/tool-functionality"
import { getToolBySlug, getAllToolSlugs } from "@/lib/tools"

// Generate static params for all tools
export async function generateStaticParams() {
  const slugs = getAllToolSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function ToolPage({ params }) {
  const { slug } = params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#0a0b1e] text-white font-mono relative overflow-hidden">
      {/* Cybernetic background elements - same as main page */}
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

      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="group text-blue-400 hover:text-blue-300 p-0 h-auto font-mono text-sm tracking-wide hover:bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              POWRÓT DO GŁÓWNEJ
            </Button>
          </Link>
        </div>

        {/* Tool header with icon and title */}
        <ToolHeader tool={tool} />

        {/* Tool description section */}
        <ToolDescription tool={tool} />

        {/* Tool functionality section */}
        <ToolFunctionality tool={tool} />
      </div>
    </main>
  )
}
