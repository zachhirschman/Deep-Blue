import React, {useState} from "react"
// import "./login.scss"
import logo from "../../Images/Logos/headerLogo.png"
import {Link} from "react-router-dom"

export default function Register(){
    return(
        <div className = "authentication-parent">
            <div className = "login-form">
                <h1 className = "authentication-header">Welcome to Deep Blue!</h1>

                <div className = "input-container">
                    <input placeholder = "Email"/>
                    <input placeholder = "Password" type = "password"/>
                    <button className = "authentication-button register">
                        Register
                    </button>
                    <div className = "authentication-footer">
                        <p>Already have an account?</p><Link className = "emphasis" to = "/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}