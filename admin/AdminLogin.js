import React from 'react'
import { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import noteContext from './../../Context/notes/noteContext';
import { Button } from 'flowbite-react';
import logo from "../assests/giftedcitlogo-removebg-preview.png"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {

  const navigate = useNavigate()

  const { host } = useContext(noteContext)


  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const signin = async (a) => {
    try {

      a.preventDefault();
      const response = await fetch(`${host}/api/admin/login`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',


        },
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
        body: JSON.stringify({ "email": credentials.email, "password": credentials.password })
      });
      let res = await response.json(); // parses JSON response into native JavaScript objects
      if (res.success) {
        localStorage.setItem("authtoken_admin", res.authtoken)
        navigate("/adminorders")

      } else {
        alert("Enter valid details")
      }
    } catch (error) {
      document.getElementById("signin_error").innerHTML = error
    }
  }


  const handleonchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <>
      <div className="container mt-10 mx-auto p-4">
        <form className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 ">
            <div className='row'>
              <div className='col-md-4'></div>
              <div className='col-md-6'>
                <img src={logo} alt="Logo" className="logo-image" />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <div className="logo-container">
                  {/* <img src={logo} alt="Logo" className="logo-image" /> */}
                  <div className="brand-text">
                    <span>ADMIN SIGN IN</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-sm text-orange-700 '>NOTE :Only Admins are allowed</div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              onChange={handleonchange}
              placeholder="Enter email"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className='flex items-center'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              onChange={handleonchange}
              placeholder="Enter password"
            />
              <button type="button" onClick={togglePasswordVisibility} className="ml-2 mb-4">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Link to="/signin" className="block w-full text-center">
              <Button gradientDuoTone="pinkToOrange" onClick={signin}>
                SignIn
              </Button>
            </Link>
          </div>
        </form>
        <p id="signin_error" className="text-red-500 text-center mt-2"></p>
      </div>
    </>
  )
}


