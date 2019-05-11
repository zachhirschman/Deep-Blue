import React, {Component} from 'react';
import './App.css';
import "./reset.css"
import axios from "axios"
import Header from "./Components/Header/Header"
import routes from "./routes"

export default class App extends Component{
  constructor(){
    super()
    this.state = {

    }
  }
  componentDidMount(){
    axios.get('api/get-data').then(response =>{
      console.log(response.data)
    })
  }
  render(){
    return(
      <div className = "App">
        <Header/>
          {routes}
      </div>
    )
  }
}