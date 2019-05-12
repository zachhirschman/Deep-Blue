import React, {useState} from "react"
import "./login.scss"
import logo from "../../Images/Logos/headerLogo.png"
import {Link} from "react-router-dom"
import Form from "../Hooks/Form"
import Axios from "axios";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [value, setValue] = useState('')
    let login = () =>{
        if(!email || !password) return;
        let body = {
            email,
            password
        }
        Axios.post('/login',body).then(response =>{
            console.log("Logged in :", response.data)
        })
        setValue("")
    }
    let handleChange = (value) =>{
        setEmail(value)
        console.log(email)
    }
    let handlePwChange = (value) =>{
        setPassword(value)
    }
    return(
        <div className = "authentication-parent">
            <div className = "login-form">
                <h1 className = "authentication-header">Welcome Back!</h1>

                <div className = "input-container">
                    <input onChange = {(e) => handleChange(e.target.value)} placeholder = "Email"/>
                    <input onChange = {(e) => handlePwChange(e.target.value)} placeholder = "Password" type = "password"/>
                    <div>
                        <a className = "forgot-password" href = "#">Forgot your password?</a>
                    </div>
                    <button onClick = {login} className = "authentication-button login">
                        Login
                    </button>
                    <div className = "authentication-footer">
                        <p>Need an account?</p><Link className = "emphasis" to = "/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}