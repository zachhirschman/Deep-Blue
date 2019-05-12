import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from "./Components/Home/Home"
import Register from "./Components/Register/Register"
import Login from "./Components/login/login"

export default (
    <Switch>
        <Route path = "/register" component = {Register}/>
        <Route path = "/login" component = {Login}/>
        <Route exact path = "/" component = {Home}/>
    </Switch>
)