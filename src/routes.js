import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from "./Components/Home/Home"

export default (
    <Switch>
        <Route path = "/" component = {Home}/>
    </Switch>
)