import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const NavMenu = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    CineSphere
                </Link>
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/movies" className="navbar-link">Movies</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/genres" className="navbar-link">Genres</Link>
                    </li>
                    <li className="navbar-item">
                        <ThemeSwitcher/>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavMenu;