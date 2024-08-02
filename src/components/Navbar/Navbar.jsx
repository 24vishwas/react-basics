import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AiFillMacCommand } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";

import './Navbar.css'


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
    const handleCloseNavbar = () => {
        setShowNavbar(false); // Set showNavbar to false to close the menu
    };

  return (
    <nav className="navbar">
    <div className="container">
      <div className="logo">
      <AiFillMacCommand size={40}  />
      </div>
      <div className="menu-icon" onClick={handleShowNavbar}>
      {!showNavbar ? <FiMenu size={30} /> : <FiX size={30} />}
      </div>
      <div className={`nav-elements  ${showNavbar && 'active'}`}>
      <ul>
            <li>
              <NavLink to="/" onClick={handleCloseNavbar}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/about" onClick={handleCloseNavbar}>About</NavLink>
              
            </li>
            <li>
              <NavLink to="/projects" onClick={handleCloseNavbar}>Projects</NavLink>
            </li>
           
            <li>
              <NavLink to="/contact" onClick={handleCloseNavbar}>Contact</NavLink>
            </li>
            <li>
              <NavLink to="/Login" onClick={handleCloseNavbar}>Login</NavLink>
            </li>
          </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
