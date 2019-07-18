import React, {useState} from "react"
import "./Urgency.scss"

export function UrgencyCircle(props){
    return(
        <div className = {props.urgencyValue === props.num ? `urgency-circle c${props.num} active-circle` : `urgency-circle c${props.num}`} onClick = {() =>{props.setUrgencyValueFn(props.num)}}>
            {props.num}
        </div>
    )
}

export default function Urgency(props){
    const [state,updateState] = useState([1,2,3,4,5])
    const mappedCircles = state.map(number =>{
        return (
            <UrgencyCircle setUrgencyValueFn = {props.setUrgencyValueFn} num = {number} urgencyValue = {props.urgencyValue}/>
        )
    })
    return(
        <div className = "urgency-parent">
            <p className = "urgency-header-text">Issue Urgency:</p>
            <div className = "circles-parent">
            {mappedCircles}
            </div>
        </div>
    )
}