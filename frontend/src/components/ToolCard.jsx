"use client"

import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import "./ToolCard.css"

export function ToolCard({ icon, title, description, color }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`tool-card ${isHovered ? "hovered" : ""} ${color}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing border effect */}
      <div className={`glow-border ${isHovered ? "visible" : ""}`}></div>

      <div className="card-content">
        <div className={`card-header ${color}`}>
          {/* Tech pattern overlay */}
          <div className="tech-pattern">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="pattern-h-line"></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="pattern-v-line"></div>
            ))}
          </div>

          <div className={`icon-container ${isHovered ? "scale" : ""}`}>{icon}</div>

          {/* Glowing dot */}
          <div className={`glow-dot ${isHovered ? "bright" : ""}`}></div>
        </div>

        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <button className="launch-button">
            <span className="prompt">&gt;</span> LAUNCH TOOL
            <FaArrowRight className={`arrow-icon ${isHovered ? "move" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
