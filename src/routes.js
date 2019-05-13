import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from "./Components/Home/Home"
import Register from "./Components/Register/Register"
import Login from "./Components/login/login"
import Dashboard from "./Components/Dashboard/Dashboard";
import Contributions from "./Components/Contributions/Contributions";

export default (
    <Switch>
        <Route path = "/contributions" component = {Contributions}/>
        <Route path = "/dashboard" component = {Dashboard}/>
        <Route path = "/register" component = {Register}/>
        <Route path = "/login" component = {Login}/>
        <Route exact path = "/" component = {Home}/>
    </Switch>
)