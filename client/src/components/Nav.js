import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import logo from './logo2.png'
import '../styles/main.css';


export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const { user } = useAuthContext()

    const { logout } = useLogout()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

    const handleToggle = () => {
        setIsToggle(!isToggle)
    }

    const handleClick = () => {

        logout()

    }

    return (
        <div className="nav-layout">
            <header>
                <div className="logo">
                    <img src={logo} alt="" width="30" />
                    <h2>Nordz</h2>
                </div>
                <nav className={isOpen ? "nav-box active1" : "nav-box"}>
                    <ul className="nav-link">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/projects">Projects</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        {user && (
                            <li><NavLink to="/admin">Admin</NavLink></li>
                        )}
                        {/* when productionthis route will be inside user dashboard */}

                    </ul>

                    <ul id="login">
                        {!user && (<div className="user-log">
                            <li><NavLink to="/signup" className="user-name">Signup</NavLink></li>
                            <li className="login-logout"><NavLink to="/login">Login</NavLink></li>
                        </div>)}

                        {user && (
                            <div className="user-log">
                                <li className="user-name">Welcome, Eng. {user.username}</li>
                                <li className="login-logout"><NavLink to="/login" onClick={handleClick}>Logout</NavLink></li>
                            </div>
                        )}
                    </ul>

                </nav>
                {/* for mobile */}
                <div className="icon-menu" onClick={toggleMenu}>

                    {
                        (isToggle === false) ? <FaBars onClick={handleToggle} /> : <FaTimes onClick={handleToggle} />

                    }

                </div>
            </header>

            <main id="main-container">
                <Outlet />
            </main>
        </div>
    )
}
