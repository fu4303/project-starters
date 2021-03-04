import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <Link to="/" className="navbar-brand text-light">
        React Movies
      </Link>
      <ul className="nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link text-light">
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link text-light">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
