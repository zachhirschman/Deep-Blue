import React, {useState, useEffect, useReducer} from "react"
import {Link, Redirect} from "react-router-dom"
import Axios from "axios";
import FormInput from "../Hooks/Form"
// import initialState from "../../Redux/initialState";
// import reducer from "../../Redux/Reducer";

export default function Register(props){
    let email = FormInput("")
    let password = FormInput("")
    const [redirect, setRedirect] = useState(false)
    // const [state,dispatch] = useReducer(reducer,initialState)
    
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
            Axios.post("/api/register",body).then(response =>{
                if(response.data.status == "success"){
                    // dispatch({type:"update_user",payload:response.data})
                    setRedirect(true)
                }
            })
        }
    }

    return(
        <div className = "authentication-parent">

            <div className = "login-form">

                <h1 className = "authentication-header">Welcome to Deep Blue!</h1>

                    <div className = "login-input-container">
                        <img src="https://img.icons8.com/small/16/000000/filled-message.png"/>
                        <input className = "login-input" {...email} placeholder = "Email"/>
                    </div>

                    <div className = "login-input-container">
                        <img src="https://img.icons8.com/small/16/000000/lock.png"/>
                        <input className = "login-input" {...password} placeholder = "Password" type = "password"/>
                    </div>
                    
                    <button onClick = {register} className = "authentication-button register">
                            Register now
                    </button>

                    <div className = "authentication-footer">
                        <p>Already have an account?</p><Link className = "emphasis" to = "/login">Login</Link>
                    </div>

                </div>
            {redirect ? <Redirect to = "/dashboard"/> : null}
        </div>
    )
}