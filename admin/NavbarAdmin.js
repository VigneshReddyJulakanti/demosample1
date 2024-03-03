import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import '../styles/main.css';
import logo from '../assests/giftedcitlogo-removebg-preview.png';

export default function NavbarAdmin({ setadminView, adminView }) {
  const navigate = useNavigate();

  const navRef = useRef();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handlesignout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authtoken_admin');
    navigate('/admin');
    closeNavbar();
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const handleOptionClick = (option) => {
    setadminView(option);
    closeNavbar();
  };

  const showNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div>
      <header>
        <Link to="/adminorders">
          <div className="logo-container">
            <div className="brand-text">
              <span>Admin GIFTEDICT</span>
            </div>
          </div>
        </Link>
        <div className={`navbar-container ${navbarOpen ? 'active' : ''}`}>
          <button className="nav-btn" onClick={showNavbar}>
            {navbarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav ref={navRef} className={navbarOpen ? 'responsive_nav' : ''}>
            <Link
              to="/adminorders"
              className={`nav-link right-btn ${adminView === 'new' ? 'active' : ''}`}
              onClick={() => handleOptionClick('new')}
            >
              New Orders
            </Link>
            <Link
              to="/adminorders"
              className={`nav-link right-btn ${adminView === 'processed' ? 'active' : ''}`}
              onClick={() => handleOptionClick('processed')}
            >
              Processed Orders
            </Link>
            <Link
              to="/adminorders"
              className={`nav-link right-btn ${adminView === 'finished' ? 'active' : ''}`}
              onClick={() => handleOptionClick('finished')}
            >
              Finished Orders
            </Link>
            <Link
              to="/adminorders"
              className={`nav-link right-btn ${adminView === 'rejected' ? 'active' : ''}`}
              onClick={() => handleOptionClick('rejected')}
            >
              Rejected Orders
            </Link>

            <Link
              to="/requests"
              className={`nav-link right-btn `}
              onClick={()=>closeNavbar()}
            >
              Requests
            </Link>
  
            <Link to="/" className="nav-link right-btn" onClick={(e) => handlesignout(e)}>
              <Button gradientDuoTone="pinkToOrange">Sign Out</Button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
