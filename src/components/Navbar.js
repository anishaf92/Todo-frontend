import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";
import "../css/navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Todo App Logo" className="logo" />
        {/* <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;




