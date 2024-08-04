import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillMacCommand } from 'react-icons/ai';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleCloseNavbar = () => {
    setShowNavbar(false); // Set showNavbar to false to close the menu
  };

  // Define the JSON data as a JavaScript array
  const navbarItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' }
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <AiFillMacCommand size={40} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar ? <FiMenu size={30} /> : <FiX size={30} />}
        </div>
        <div className={`nav-elements ${showNavbar && 'active'}`}>
          <ul>
            {navbarItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} onClick={handleCloseNavbar}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
