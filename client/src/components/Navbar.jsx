import { Component } from "react";
import { MenuData } from "./MenuData";
import Hamburger from "hamburger-react";
import '../navbar.css';

function toggleNavbar() {
    const navbar = document.querySelector('.nav-menu');
    if (navbar.style.left === '-110%' || navbar.style.left === '') {
    navbar.style.left = '0';
    } else {
    navbar.style.left = '-110%';
    }
}

class Navbar extends Component{
        render(){
            return(
                <nav className="NavbarItems">
                    <h1 className="navbar-logo">DigiAnsatt <i className="fab fa-react"></i></h1>
                    <div className="menu-icons">
                        <i className="humburger">< Hamburger onToggle={toggleNavbar}/></i>
                    </div>
                    <ul className="nav-menu">
                        {MenuData.map((item, index) => {
                            return(
                                <li key={index}>
                                    <a className={item.cName} href={item.link}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            );
    }
}

export default Navbar;
