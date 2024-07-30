import React from 'react'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';

import './Sidebar.css'

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  return (
    
         <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-button">
      {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="content">
        <h2>Sidebar Content</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>

  )
}

export default Sidebar