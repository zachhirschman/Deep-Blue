import React, {Component} from "react"
import loader from "../../Images/loader.svg"

export default class Loader extends Component{
    render(){
        return(
            <div style = {{
                "width":"100%",
                "height":"100%",
                "display":"flex",
                "justifyContent":"center",
                "alignItems":"center",
                "flexDirection":'column'
            }}>
                <img src ={loader} />
                <h1 stlyle = {{"fontFamily":'Raleway'}}>Loading...</h1>
            </div>
        )
    }
    
}
