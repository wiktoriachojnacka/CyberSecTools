"use client"

import { useState } from "react"
import { FaCog, FaUser, FaSignInAlt, FaBars, FaTimes, FaArrowLeft } from "react-icons/fa"
import "./Navbar.css"

export function Navbar({ onBack }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo/Title */}
          <div className="logo-container">
            <div className="logo">
              <h1 className="title">CyberSecTool</h1>
              <div className="title-underline"></div>
              <div className="title-dot"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {onBack && (
              <button className="back-button" onClick={onBack}>
                <FaArrowLeft />
                Back
              </button>
            )}
            {isLoggedIn ? (
              <div className="dropdown">
                <button className="user-button" onClick={toggleDropdown}>
                  <FaUser className="icon" />
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-label">My Account</div>
                    <div className="dropdown-separator"></div>
                    <button className="dropdown-item">Profile</button>
                    <button className="dropdown-item">Dashboard</button>
                    <button className="dropdown-item" onClick={toggleLogin}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-button" onClick={toggleLogin}>
                <FaSignInAlt className="icon-small" />
                Login
              </button>
            )}

            <button className="settings-button">
              <FaCog className="icon" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button className="menu-toggle" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes className="icon-large" /> : <FaBars className="icon-large" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {onBack && (
              <button className="mobile-menu-item back-button" onClick={onBack}>
                <FaArrowLeft />
                Back
              </button>
            )}
            {isLoggedIn ? (
              <>
                <button className="mobile-menu-item">
                  <FaUser className="icon-small" />
                  Profile
                </button>
                <button className="mobile-menu-item">
                  <FaCog className="icon-small" />
                  Settings
                </button>
                <button className="mobile-menu-item logout" onClick={toggleLogin}>
                  <FaSignInAlt className="icon-small" />
                  Logout
                </button>
              </>
            ) : (
              <button className="mobile-menu-item" onClick={toggleLogin}>
                <FaSignInAlt className="icon-small" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
