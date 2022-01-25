import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
          <Link to="/">
              <img src="https://sipnswig.co.uk/wp-content/uploads/2020/11/cocktail.png" alt='logo' className="logo"></img>
          </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
