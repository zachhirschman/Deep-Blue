import React from "react"
import "./Issue.scss"
import missingImage from '../../Images/missing-image.png'

console.log("Missing image: ", missingImage)

export default function Issue(props){
    return(
        <div className = {props.listStyle ? "Issue-Parent" : "Issue-Parent-row"} onClick = {() => props.routeFn(props.id)}>
            <img className = "thumbnail-pic" src = {props.img} onError={missingImage}/>
            <div className="flex">
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}