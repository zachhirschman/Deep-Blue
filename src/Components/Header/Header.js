import React, {useState,useEffect,useReducer} from "react"
import {Link , useHistory} from "react-router-dom"
import "./Header.scss"
import logo from "../../Images/Logos/headerLogo.png"
import hamburger from "../../Images/Logos/iconfinder-icon.svg"
import Axios from "axios";
import reducer from "../../Redux/Reducer";
import initialState from "../../Redux/initialState";

export default function Header(){
    const [width,setWidth] = useState(window.innerWidth)
    const [reRender, setRerender] = useState(1);
    const [responsive,setResponsive] = useState(false)
    const [toggleDropDown,setToggle] = useState(false)
    const [state,dispatch] = useReducer(reducer,initialState)
    const history = useHistory();

    useEffect(() => {
        Axios.get("/api/get-user-data").then(response =>{
            if(!response.data){
                console.log("No user, going home");
                history.push("/");
            }
            dispatch({type:"update_user",payload:response.data})
            setWidth(window.innerWidth);
        })
        return () =>{
           
        }
    }, [])

    useEffect(() => {
        setRerender(reRender +1);
    }, state);

    window.addEventListener('resize', () =>{
        setWidth(window.innerWidth)
    })


    let handleDropDown = () =>{
        setToggle(!toggleDropDown)
    }

    let logout = () =>{
        Axios.post('/api/log-out/').then(response =>{
            dispatch({type:'update_user', payload:""})
            history.push("/");
        })
    }

    console.log("Rendering header ... ... ... ... ...")

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
                                        <h3 onClick = {logout}>Logout</h3>
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
                                <Link className = "header-button link" to = "/login">Log in</Link>
                            </li>
                            <li>
                                <Link to = "/register" className="header-button link"><h3>Sign Up</h3></Link>
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
                                <Link  className = "mobile-links signup-mobile" to = "/"><h3 onClick = {logout} >Log out</h3></Link>
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
