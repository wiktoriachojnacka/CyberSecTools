<<<<<<< HEAD
import { ToolCard } from "@/components/tool-card"
import { Lock, Search, Globe, Brain, Keyboard, Archive, FileText, KeyRound, ScrollText } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Home() {
  const tools = [
    {
      icon: <Lock className="h-10 w-10 text-cyan-400" />,
      title: "Encrypt and check integrity",
      description: "Secure your data with encryption and verify its integrity",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      icon: <Search className="h-10 w-10 text-violet-400" />,
      title: "Hash and compare",
      description: "Generate and compare hash values for files and text",
      color: "from-violet-500/20 to-purple-500/20",
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-400" />,
      title: "Port Scanner",
      description: "Scan network ports to identify open services and potential vulnerabilities",
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      icon: <Brain className="h-10 w-10 text-fuchsia-400" />,
      title: "Classic Encryption",
      description: "Implement traditional encryption algorithms like Caesar cipher and Vigenère",
      color: "from-fuchsia-500/20 to-purple-500/20",
    },
    {
      icon: <Keyboard className="h-10 w-10 text-purple-400" />,
      title: "Keylogger (demo)",
      description: "Educational demonstration of keylogging techniques for security awareness",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      icon: <Archive className="h-10 w-10 text-indigo-400" />,
      title: "Brute-force ZIP",
      description: "Recover passwords from protected ZIP archives using brute force methods",
      color: "from-indigo-500/20 to-blue-500/20",
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-400" />,
      title: "HTTP Header Analyzer",
      description: "Analyze HTTP headers to identify security issues and misconfigurations",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <KeyRound className="h-10 w-10 text-violet-400" />,
      title: "Password Generator & Evaluation",
      description: "Create strong passwords and evaluate password strength",
      color: "from-violet-500/20 to-fuchsia-500/20",
    },
    {
      icon: <ScrollText className="h-10 w-10 text-cyan-400" />,
      title: "Tool Logs",
      description: "View logs and activity history from all security tools",
      color: "from-cyan-500/20 to-indigo-500/20",
    },
  ]
=======
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ToolCard } from "@/components/tool-card"
import { getAllTools } from "@/lib/tools"

export default function Home() {
  const tools = getAllTools()
>>>>>>> main

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
<<<<<<< HEAD
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              color={tool.color}
            />
=======
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block">
              <ToolCard icon={tool.icon} title={tool.title} description={tool.description} color={tool.color} />
            </Link>
>>>>>>> main
          ))}
        </div>
      </div>
    </main>
  )
<<<<<<< HEAD
} 
=======
}
>>>>>>> main
