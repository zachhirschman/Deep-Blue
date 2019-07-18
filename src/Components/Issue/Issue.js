import React from "react"
import "./Issue.scss"

export default function Issue(props){
    return(
        <div className = {props.listStyle ? "Issue-Parent" : "Issue-Parent-row"} onClick = {() => props.routeFn(props.id)}>
            <img className = "thumbnail-pic" src = {props.img}/>
            <div>
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}