import React, {Component} from "react"
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
    render(){
        const { width, toggleDropDown} = this.state
        console.log(toggleDropDown)
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
                            <img onClick = {() =>{this.handleDropDown()}} src = {hamburger}/>
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
}
