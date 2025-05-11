import type { ReactNode } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export interface ToolCardProps {
  icon: ReactNode
  title: string
  description: string
  color: string
}
