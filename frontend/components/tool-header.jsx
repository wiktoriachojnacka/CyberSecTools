export function ToolHeader({ tool }) {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center mb-6">
        <div
          className={`p-6 rounded-full bg-gradient-to-r ${tool.gradientColor} flex items-center justify-center h-24 w-24 relative overflow-hidden`}
        >
          {/* Tech pattern overlay */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="col-span-full h-[1px] bg-white/30"></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="row-span-full w-[1px] bg-white/30"></div>
            ))}
          </div>
          <div className="z-10 transform scale-125">{tool.icon}</div>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-2 tracking-tighter">
        {tool.title}
      </h1>
      <div className="w-48 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 mx-auto mt-2 relative">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full blur-[3px]"></div>
      </div>
    </div>
  )
}
