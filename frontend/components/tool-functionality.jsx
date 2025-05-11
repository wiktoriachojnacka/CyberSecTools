import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ToolFunctionality({ tool }) {
  return (
    <div className="mb-12">
      <div className="bg-[#0f1130]/80 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-100 flex items-center">
          <span className="mr-2 text-purple-400 opacity-70">&gt;</span> UŻYJ NARZĘDZIA
        </h2>

        {tool.isDownloadOnly ? (
          <div className="text-center py-8">
            <p className="text-blue-200/80 mb-6">
              To narzędzie wymaga instalacji na komputerze. Kliknij poniżej, aby pobrać.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
              <Download className="mr-2 h-4 w-4" />
              Pobierz {tool.title}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Placeholder for tool functionality - will be implemented by the user */}
            <div className="bg-[#0a0b1e] border border-blue-500/20 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center text-blue-200/60">
                <p className="mb-2">Tutaj będzie zaimplementowana funkcjonalność narzędzia</p>
                <p className="text-sm">(Miejsce na backend i interfejs użytkownika)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
