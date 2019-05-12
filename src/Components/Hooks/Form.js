import React, {useState} from "react"

export default function FormInput(initialValue){
    const [value, setValue] = useState(initialValue)
    let handleInput = (value) =>{
        setValue(value)
    }

    return{
        value,
        onChange: handleInput
    }
}