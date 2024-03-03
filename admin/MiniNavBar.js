

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/main.css';

export default function MiniNavBar({adminView2,setadminView2}) {  const navigate = useNavigate();

  const [navbarOpen, setNavbarOpen] = useState(false);


  const navRef = useRef();

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const handleOptionClick2 = (option) => {
    setadminView2(option);
    closeNavbar();
  };

  const showNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div>
      <header>
 
        <div className={`navbar-container ${navbarOpen ? 'active' : ''}`}>
          <button className="nav-btn" onClick={showNavbar}>
            {navbarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav ref={navRef} className={navbarOpen ? 'responsive_nav' : ''}>
            <Link
        
              className={`nav-link right-btn ${adminView2 === 'Hiring' ? 'active' : ''}`}
              onClick={() => handleOptionClick2('Hiring')}
            >
              Hiring
            </Link>
            <Link
            
              className={`nav-link right-btn ${adminView2 === 'Contact Us' ? 'active' : ''}`}
              onClick={() => handleOptionClick2('Contact Us')}
            >
              Contact Us
            </Link>
            <Link
           
              className={`nav-link right-btn ${adminView2 === 'Support' ? 'active' : ''}`}
              onClick={() => handleOptionClick2('Support')}
            >
              Support
            </Link>
            <Link
            
              className={`nav-link right-btn ${adminView2 === 'Brand Partner' ? 'active' : ''}`}
              onClick={() => handleOptionClick2('Brand Partner')}
            >
              Brand Partners
            </Link>

            
          </nav>
        </div>
      </header>
    </div>
  );
}
