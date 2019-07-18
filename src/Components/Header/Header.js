import React, {useState,useEffect,useReducer} from "react"
import {Link} from "react-router-dom"
import "./Header.scss"
import logo from "../../Images/Logos/headerLogo.png"
import hamburger from "../../Images/Logos/iconfinder-icon.svg"
import Axios from "axios";
import reducer from "../../Redux/Reducer";
import initialState from "../../Redux/initialState";

export default function Header(){
    const [width,setWidth] = useState(window.innerWidth)
    const [responsive,setResponsive] = useState(false)
    const [toggleDropDown,setToggle] = useState(false)
    const [state,dispatch] = useReducer(reducer,initialState)

    useEffect(() => {
        Axios.get("/api/get-user-data").then(response =>{
            console.log("current User: ",response.data)
            dispatch({type:"update_user",payload:response.data})
        })
        return () =>{
            window.removeEventListener('resize', this.handleWindowSizeChange);
        }
    }, [])

    window.addEventListener('resize', () =>{
        setWidth(window.innerWidth)
    })


    let handleDropDown = () =>{
        setToggle(!toggleDropDown)
    }

    let logout = () =>{
        Axios.post('/api/log-out/').then(response =>{
            console.log("Logged out my homie")
            dispatch({type:'update_user', payload:""})
        })
    }


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
                {/* Check to see if there is a user logged in, if there is, show the first ul
                    if there isn't, show the login or register buttons.
                */}
                {
                    state.currentUser != ""?

                    <ul className = {width >700 ? "logged-user-parent__desktop" : "hamburger-container"}>
                        {
                            width > 700 ?
                                <ul>
                                    <Link to = "/contributions" className = "link">
                                        <h3>Contributions</h3>
                                    </Link>
                                    <Link to ="/dashboard" className = "link">
                                        <h3>Community</h3>
                                    </Link>
                                    <Link className = "link">
                                        <button style = {{border:"none",backgroundColor:"none"}} onClick = {logout}><h3>Logout</h3></button>
                                    </Link>
                                </ul>
                            :
                            <div className = "Dropdown">
                                <img onClick = {() =>{handleDropDown()}} src = {hamburger}/>
                            </div>
                        }
                    </ul>

                    :
                    
                    <ul className = "hamburger-container">
                    {
                        width > 500 ?
                        <div className = "button-container">
                            <li>
                                <Link className = "header-button login" to = "/login">Log in</Link>
                            </li>
                            <li>
                                <Link to = "/register"><button className = "header-button signup">Sign up</button></Link>
                            </li>
                        </div>
                    :
                        <div className = "Dropdown">
                            <img onClick = {() =>{handleDropDown()}} src = {hamburger}/>
                        </div>
                    }
                </ul>}
            </div>
            {
                state.currentUser !== ""?
                <div className = "drop-container">
                <div className = {toggleDropDown ? "show-Drop":"hide-Drop"}>
                        <ul className = {toggleDropDown ? "dropdown-ul" : "hide-dropdown-ul"}>
                
                            <li className = "links">
                                <Link to ="/contributions" className = "mobile-links signup-mobile">Contributions</Link> 
                            </li>
                            <li className = "links">    
                                <Link  className = "mobile-links signup-mobile" to = "/dashboard">Community</Link>
                            </li>
                            <li className = "links">    
                                <Link  className = "mobile-links signup-mobile" to = "/"><button style = {{border:"none",backgroundColor:"none"}} onClick = {logout}>Logout</button></Link>
                            </li>
                        </ul>
                </div>
                </div>

                :

                <div className = {toggleDropDown ? "show-Drop":"hide-Drop"}>
                        <ul className = "dropdown-ul">
                
                            <li className = "links">
                                <Link className ="mobile-links login-mobile" to = "/login">Log in</Link> 
                            </li>
                            <li className = "links">    
                                <Link  className = "mobile-links signup-mobile" to = "/register">Sign Up</Link>
                            </li>
                        </ul>
                </div>
            }
        </header>
        )
}
