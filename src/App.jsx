import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import About from './pages/about/About';
import Home from './pages/home/Home';
import Projects from './pages/projects/Projects';
import Contact from './pages/contact/Contact';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';


function App() {
  

  return (
    <>
    
      <div className="App">
          <Sidebar />
          <div className="main-content">
        <Navbar />
        <main>

          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
          </Routes>
        </main>
        <Footer />
          </div>
      </div>
    
    </>
  )
}

export default App
