import React from "react";

import logo from "../assets/logo.png";
import "../css/navbar.css"


const Navbar = ({todos,setSearchTerm}) => {
  
 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Todo App Logo" className="logo" />
         <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" onChange={(e)=> {setSearchTerm(e.target.value)}}/>
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;




