import React from 'react'
import Chats from '../dropdown/Chats';
import LanguageDropdown from '../dropdown/Language';
import Notifications from '../dropdown/Notifications';
import Profile from '../dropdown/Profile';
import logo from "../../assets/img/logo.svg"
import logo2 from "../../assets/img/collapse-logo.svg"
import logo3 from "../../assets/img/logo2.png"
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa';
const Heads = ({...props}) => {
    const handleToggle = () => {
        var body = document.body;
        body.classList.toggle("mini-sidebar");
        var subdropSiblings = document.querySelectorAll(".subdrop + ul");
        subdropSiblings.forEach(function (sibling) {
            if (body.classList.contains("mini-sidebar")) {
                sibling.style.display = "block";
            } else {
                sibling.style.display = "none";
            }
        })
    }
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <Link  className="logo">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Link  className="logo collapse-logo">
                        <img src={logo2} alt="Logo" />
                    </Link>
                    <Link  className="logo2">
                        <img src={logo3} width="40" height="40" alt="Logo" />
                    </Link>
                </div>
                <Link id="toggle_btn" onClick={handleToggle} >
                    <span className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </Link>
                <div className="page-title-box">
                    <h3>Dreams Technologies</h3>
                </div>
                <Link id="mobile_btn" className="mobile_btn" ><i className="fa-solid fa-bars"><FaBars /></i></Link>

                <ul className="nav user-menu">

                    <li className="nav-item">
                        <div className="top-nav-search">
                            <Link to="#" className="responsive-search">
                                <i className="fa-solid fa-magnifying-glass"><FaMagnifyingGlass/></i>
                            </Link>
                            <form>
                                <input className="form-control" type="text" placeholder="Search here" />
                                <button className="btn" type="submit"><i className="fa-solid fa-magnifying-glass"><FaMagnifyingGlass/></i></button>
                            </form>
                        </div>
                    </li>
                    <LanguageDropdown />
                    <Notifications />
                    <Chats />
                    <Profile />
                </ul>
            </div>
        </>
    )
}

export default Heads;