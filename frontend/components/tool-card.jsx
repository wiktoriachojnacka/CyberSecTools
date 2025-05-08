"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ToolCard({ icon, title, description, color }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`border border-purple-500/20 shadow-lg transition-all duration-300 mt-4 ${
        isHovered ? "transform -translate-y-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]" : ""
      } overflow-hidden bg-[#0f1130] backdrop-blur-sm relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing border effect */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""} pointer-events-none`}
      >
        <div className="absolute inset-0 rounded-lg border border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
      </div>

      <CardContent className="p-0">
        <div className={`p-6 bg-gradient-to-r ${color} flex items-center justify-center h-28 relative overflow-hidden`}>
          {/* Tech pattern overlay */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="col-span-full h-[1px] bg-white/30"></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="row-span-full w-[1px] bg-white/30"></div>
            ))}
          </div>

          <div className={`transform transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"} z-10`}>
            {icon}
          </div>

          {/* Glowing dot */}
          <div
            className={`absolute bottom-2 right-2 w-2 h-2 rounded-full bg-cyan-400 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-50"}`}
          ></div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-cyan-100">{title}</h3>
          <p className="text-blue-200/70 mb-5 text-sm">{description}</p>
          <Button
            variant="ghost"
            className="group text-purple-400 hover:text-cyan-300 p-0 h-auto font-mono text-sm tracking-wide hover:bg-transparent"
          >
            <span className="mr-1 opacity-70">&gt;</span> LAUNCH TOOL
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 