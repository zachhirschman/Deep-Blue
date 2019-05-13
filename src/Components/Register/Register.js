import React, {useState, useEffect} from "react"
// import "./login.scss"
import logo from "../../Images/Logos/headerLogo.png"
import {Link, Redirect} from "react-router-dom"
import Axios from "axios";
import Form from "../Hooks/Form"
import {UserContext} from "../../Context/userContext"

export default function Register(props){
    let email = Form("")
    let password = Form("")
    const [redirect, setRedirect] = useState(false)
    
    useEffect(() =>{
        console.log("Component Mounted!", props)
    })

    let register = () =>{
        if(email == "" || password == ""){
            return
        }
        else{
            let body = {
                email:email.value,
                password:password.value
            }
            console.log("Registering with ", body)
            Axios.post("/register",body).then(response =>{
                if(response.data.status == "success"){
                    setRedirect(true)
                }
            })
        }
    }
    return(
        // <UserContext>
        <div className = "authentication-parent">
            <div className = "login-form">
                <h1 className = "authentication-header">Welcome to Deep Blue!</h1>

                <div className = "input-container">
                    <input {...email} placeholder = "Email"/>
                    <input {...password} placeholder = "Password" type = "password"/>
                    <button onClick = {register} className = "authentication-button register">
                        Register
                    </button>
                    <div className = "authentication-footer">
                        <p>Already have an account?</p><Link className = "emphasis" to = "/login">Login</Link>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to = "/dashboard"/> : null}
        </div>
        // </UserContext>
    )
}