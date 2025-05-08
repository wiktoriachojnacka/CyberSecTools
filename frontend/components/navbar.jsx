"use client"

import { useState } from "react"
import { Settings, User, LogIn, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0b1e]/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tighter">
                CyberSecTool
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full blur-[3px]"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#0f1130] border-purple-500/20 text-blue-100">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-500/20" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10">Dashboard</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10" onClick={toggleLogin}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLogin}
                className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-purple-400 hover:text-purple-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f1130]/95 border-b border-purple-500/20 backdrop-blur-md">
          <div className="px-4 py-3 space-y-3">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  onClick={toggleLogin}
                  className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={toggleLogin}
                className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 