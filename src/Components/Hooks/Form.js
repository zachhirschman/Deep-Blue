import React, {useState} from "react"

export default function FormInput(initialValue){
    const [value, setValue] = useState(initialValue)
    let handleInput = (event) =>{
        console.log("Updating:",value)
        setValue(event.target.value)
    }

    return{
        onChange:handleInput,
        value
    }
}
