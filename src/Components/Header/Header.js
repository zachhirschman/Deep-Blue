import React, {Component, useState} from "react"
import "./Header.scss"
import logo from "../../Images/Logos/headerLogo.png"
import hamburger from "../../Images/Logos/iconfinder-icon.svg"
export default function Header(){
    const [width, setWidth] = useState(window.innerWidth)
    const [toggleDropDown, setDropDown] = useState(false)
    
    
    let handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowSizeChange);

    let handleDropDown = () =>{
        setDropDown(
            !toggleDropDown
        )
        console.log(toggleDropDown)
    }
        return(
            <header>
            <div className = "header-parent-container">   
                <ul className = "header-parent-container__logo-container">
                    <li>
                        <img src ={logo} alt ="not found"/>
                    </li>
                    <li>
                        <p className = "title">Deep Blue</p>
                    </li>
                </ul>
                <ul className = "hamburger-container">
                    {
                        width > 500 ?
                        <div className = "button-container">
                            <li>
                                <button className = "header-button login">Log in</button>
                            </li>
                            <li>
                                <button className = "header-button signup">Sign up</button>
                            </li>
                        </div>
                    :
                        <div className = "Dropdown">
                            <img onClick = {() =>{handleDropDown()}} src = {hamburger}/>
                        </div>
                    }
                </ul>
            </div>
            <div className = {toggleDropDown ? "show-Drop":"hide-Drop"}>
                    <ul className = {toggleDropDown ? "dropdown-ul" : "hide-dropdown-ul"}>
                        <li className = {toggleDropDown ? "links":"hide-links"}>
                            <a className = {toggleDropDown ? "mobile-links login-mobile" : "mobile-links-hidden"} href = "#">Log in</a>    
                        </li>
                        <li className = {toggleDropDown ? "links":"hide-links"}>    
                            <a className = {toggleDropDown ? "mobile-links signup-mobile" : "mobile-links-hidden"} href = "#">Sign Up</a>
                        </li>
                    </ul>
                    <footer className = {toggleDropDown ? "dropdown-footer" : "dropdown-footer-hide"}>

                    </footer>
            </div>
        </header>
        )
}
