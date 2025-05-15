import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { ToolCard } from "./components/ToolCard"
import FileEncryptor from "./components/FileEncryptor"
import "./App.css"

// Import icons from react-icons instead of lucide-react
import { FaLock, FaSearch, FaGlobe, FaBrain, FaKeyboard, FaArchive, FaFileAlt, FaKey, FaScroll } from "react-icons/fa"

function App() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    {
      id: "encrypt",
      icon: <FaLock className="tool-icon cyan" />,
      title: "Encrypt and check integrity",
      description: "Secure your data with encryption and verify its integrity",
      color: "cyan-gradient",
    },
    {
      icon: <FaSearch className="tool-icon violet" />,
      title: "Hash and compare",
      description: "Generate and compare hash values for files and text",
      color: "violet-gradient",
    },
    {
      icon: <FaGlobe className="tool-icon blue" />,
      title: "Port Scanner",
      description: "Scan network ports to identify open services and potential vulnerabilities",
      color: "blue-gradient",
    },
    {
      icon: <FaBrain className="tool-icon fuchsia" />,
      title: "Classic Encryption",
      description: "Implement traditional encryption algorithms like Caesar cipher and Vigenère",
      color: "fuchsia-gradient",
    },
    {
      icon: <FaKeyboard className="tool-icon purple" />,
      title: "Keylogger (demo)",
      description: "Educational demonstration of keylogging techniques for security awareness",
      color: "purple-gradient",
    },
    {
      icon: <FaArchive className="tool-icon indigo" />,
      title: "Brute-force ZIP",
      description: "Recover passwords from protected ZIP archives using brute force methods",
      color: "indigo-gradient",
    },
    {
      icon: <FaFileAlt className="tool-icon blue" />,
      title: "HTTP Header Analyzer",
      description: "Analyze HTTP headers to identify security issues and misconfigurations",
      color: "blue-cyan-gradient",
    },
    {
      icon: <FaKey className="tool-icon violet" />,
      title: "Password Generator & Evaluation",
      description: "Create strong passwords and evaluate password strength",
      color: "violet-fuchsia-gradient",
    },
    {
      icon: <FaScroll className="tool-icon cyan" />,
      title: "Tool Logs",
      description: "View logs and activity history from all security tools",
      color: "cyan-indigo-gradient",
    },
  ]

  const handleToolLaunch = (toolId) => {
    setActiveTool(toolId);
  };

  const handleBack = () => {
    setActiveTool(null);
  };

  return (
    <div className="app">
      {/* Cybernetic background elements */}
      <div className="cyber-background">
        <div className="radial-gradient"></div>
        <div className="overlay"></div>
        <div className="grid-lines">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`h-${i}`} className="horizontal-line"></div>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`v-${i}`} className="vertical-line"></div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar onBack={activeTool ? handleBack : undefined} />

      <div className="container">
        {!activeTool ? (
          <>
            <header className="header">
              <p className="subtitle">Your comprehensive suite of cybersecurity microservices</p>
            </header>

            <div className="tools-grid">
              {tools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  color={tool.color}
                  onLaunch={() => handleToolLaunch(tool.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="tool-container">
            {activeTool === "encrypt" && <FileEncryptor />}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
