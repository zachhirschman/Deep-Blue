import React, {Component} from "react"
import {Link} from "react-router-dom"
import "./Header.scss"
import logo from "../../Images/Logos/headerLogo.png"
import hamburger from "../../Images/Logos/iconfinder-icon.svg"
export default class Header extends Component{
    constructor(){
        super()
        this.state = {
            width:window.innerWidth,
            responsive:false,
            toggleDropDown:false
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleDropDown = () =>{
        this.setState({
            toggleDropDown:!this.state.toggleDropDown
        })
        console.log(this.state.toggleDropDown)
    }
    navigateToPage = (location) =>{
        console.log(location)
        window.location = location
    }
    render(){
        const { width, toggleDropDown} = this.state
        console.log(toggleDropDown)
        return(
            <header>
            <div className = "header-parent-container">   
                <ul className = "header-parent-container__logo-container">
                    <li>
                        <Link to = "/"><img src ={logo} alt ="not found"/></Link>
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
                                <Link to = "/login"><button className = "header-button login">Log in</button></Link>
                            </li>
                            <li>
                                <Link to = "/register"><button className = "header-button signup">Sign up</button></Link>
                            </li>
                        </div>
                    :
                        <div className = "Dropdown">
                            <img onClick = {() =>{this.handleDropDown()}} src = {hamburger}/>
                        </div>
                    }
                </ul>
            </div>
            <div className = {toggleDropDown ? "show-Drop":"hide-Drop"}>
                    <ul className = {toggleDropDown ? "dropdown-ul" : "hide-dropdown-ul"}>
                        <li className = {toggleDropDown ? "links":"hide-links"}>
                            <Link className = {toggleDropDown ? "mobile-links login-mobile" : "mobile-links-hidden"} to = "/login"><a  href = "#">Log in</a></Link> 
                        </li>
                        <li className = {toggleDropDown ? "links":"hide-links"}>    
                            <Link  className = {toggleDropDown ? "mobile-links signup-mobile" : "mobile-links-hidden"}to = "/register"><a  href = "#">Sign Up</a></Link>
                        </li>
                    </ul>
                    <footer className = {toggleDropDown ? "dropdown-footer" : "dropdown-footer-hide"}>

                    </footer>
            </div>
        </header>
        )
    }
}
