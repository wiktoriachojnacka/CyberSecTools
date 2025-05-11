import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0b1e] text-white font-mono relative overflow-hidden flex items-center justify-center">
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

      <div className="relative z-10 text-center p-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-2 tracking-tighter mb-6">
          404
        </h1>
        <h2 className="text-2xl text-cyan-100 mb-8">Narzędzie nie zostało znalezione</h2>
        <p className="text-blue-200/70 mb-8 max-w-md mx-auto">
          Narzędzie, którego szukasz, nie istnieje lub zostało przeniesione do innej lokalizacji.
        </p>
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Button>
        </Link>
      </div>
    </main>
  )
}
