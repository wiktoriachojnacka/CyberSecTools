export function ToolDescription({ tool }) {
  return (
    <div className="mb-12">
      <div className="bg-[#0f1130]/80 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-100 flex items-center">
          <span className="mr-2 text-purple-400 opacity-70">&gt;</span> O NARZĘDZIU
        </h2>

        <div className="space-y-6 text-blue-200/80">
          <p>{tool.fullDescription}</p>

          {tool.features && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-100">Funkcje:</h3>
              <ul className="list-none space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tool.useCases && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-100">Zastosowania:</h3>
              <ul className="list-none space-y-2">
                {tool.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
