import React, {useState, Component} from "react"
import {withRouter} from "react-router-dom"
const MyContext = React.createContext()

export class ContextProvider extends Component{
    constructor(props){
        super()
        this.state = {
            currentUser:{},
            updateCurrentUserFn:(user) =>{
                console.log("Updating user:", user)
                this.setState({
                    currentUser:user
                })
            }
        }
    }
    render(){
        return(
            <MyContext.Provider value = {{...this.state}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default withRouter(ContextProvider)
export function UserContext(){
    return props =>{
        return(
            <MyContext.Consumer>
                {context => <Component {...props} userContext = {context}/>}
            </MyContext.Consumer>
        )
    }
}