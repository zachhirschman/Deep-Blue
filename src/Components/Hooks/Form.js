import React, {useState} from "react"

export default function FormInput(initialValue){
    const [value, setValue] = useState(initialValue)
    let handleInput = (event) =>{
        console.log("Updating:",value)
        setValue(event.target.value)
    }

    return{
        value,
        onChange: handleInput
    }
}

// covefefe = (str) => {
//     str = str.split(' ')
//     for(i =0; i < str.length; i++){
//       if(str[i] === 'coverage'){
//         str[i] = 'covfefe'
//       } else if (str[i] !== 'coverage') {
//         return str.concat('covfefe').join(' ')
//       }
//     }
//     return str.join(' ')
    
//   }