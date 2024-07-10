import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
              <div>
              <h1>
                    Footer
                </h1>
                <div className='footer-elements'>
                    <ul>
                        <li>
                            <NavLink to="/" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" >Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/project" >Projects</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" >About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" >Contact</NavLink>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
        </footer>
    )
}

export default Footer