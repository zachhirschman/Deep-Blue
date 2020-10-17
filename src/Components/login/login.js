import React, {useState, useReducer} from "react"
import "./login.scss"
import logo from "../../Images/Logos/headerLogo.png"
import {Link, Redirect} from "react-router-dom"
import Form from "../Hooks/Form"
import Axios from "axios";
import initialState from "../../Redux/initialState";
import reducer from "../../Redux/Reducer";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [value, setValue] = useState(false)
    const [state,dispatch] = useReducer(reducer,initialState)
    let login = () =>{
        console.log(email, password)
        if(email == "" || password == "") return;
        else{
            let body = {
                email,
                password
            }
            Axios.post('/api/login',body).then(response =>{
                if(response.data.status == "success"){
                    console.log(response.data)
                    dispatch({type:"update_user",payload:response.data.user})
                    setValue(true)
                }
                console.log(response.data)
            })
        }
        
        
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
                    <div className = "login-input-container">
                        <img src="https://img.icons8.com/small/16/000000/filled-message.png"/>
                        <input className = "login-input" onChange = {(e) => handleChange(e.target.value)} placeholder = "Email" name="email"/>
                    </div>
                    <div className = "login-input-container">
                        <img src="https://img.icons8.com/small/16/000000/lock.png"/>
                        <input className = "login-input" onChange = {(e) => handlePwChange(e.target.value)} placeholder = "Password" type = "password" name="password"/>
                    </div>
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
            {value ? <Redirect to = "/dashboard"/> : null}
        </div>
    )
}