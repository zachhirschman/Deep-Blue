import React, {useState, useEffect, useReducer} from "react"
import { useHistory } from "react-router-dom";
import "./AddIssue.scss"
import Form from "../Hooks/Form"
import Axios from "axios";
import imageUpload from "../../Images/image-upload.png"
import Urgency from "../Urgency/Urgency"
import FormInput from "../Hooks/Form.js"
import reducer from "../../Redux/Reducer"
import initialState from "../../Redux/initialState"
import ImageModal from "../ImageModal/ImageModal";

export default function AddIssue(props){

    const [urgencyValue,setUrgencyValue] = useState(0)
    const [images, setImages] = useState([])
    const [toggleUploader, setToggleUploader] = useState(true)
    const [state,dispatch] = useReducer(reducer,initialState)
    const nameValue = FormInput('')
    const descriptionValue = FormInput('')
    const imageValue = FormInput('')
    const history = useHistory();

    useEffect(() => {
        Axios.get("/api/get-user-data").then(response =>{
            if(!response.data){
                console.log("No user, going home");
                history.push("/");
            }
            dispatch({type:"update_user",payload:response.data})
        })
        
    }, [])
    let onImageDrop = (pictcha) =>{
       console.log(pictcha)
        setImages(pictcha);
    }
    let postIssue = () =>{
        console.log("images: ", images)
        Axios.post('/api/upload-image',{files:images}).then(response => {
           console.log("response: ", response.data)
       })

        // const payload = {
        //     user_id:state.currentUser.user_id,
        //     name:nameValue.value,
        //     thumbnail:imageValue.value || images[0] || "",
        //     images,
        //     description:descriptionValue.value,
        //     urgency:urgencyValue,
        //     comments:[],
        //     lat:0.0,
        //     lng:0.0,
        //     attendees:0
        // }
        // console.log("Payload before sending:", payload)
        // Axios.post("/api/create-Issue", payload).then(response =>{
        //     dispatch({type:"update_posts",payload:response.data})
        // })
    }

    return(
        <div className = "add-issue-parent">
            <header>

            </header>
            <div className = "add-issue-form">
                {
                    toggleUploader ?
                    <span className = "uploader-parent">
                        <p className = "upload-text">Upload Issue Images:</p>
                        <button onClick = {() => setToggleUploader(!toggleUploader)} className = "upload-img btn"><img src = {imageUpload}/></button>
                    </span>
                :
                    <ImageModal onImageDrop ={onImageDrop} toggleUploader={toggleUploader} setToggleUploader = {setToggleUploader}/>
                }
                <input placeholder = "Thumbnail" {...imageValue}/>
                <input placeholder = "Name" {...nameValue}/>
                <Urgency setUrgencyValueFn = {setUrgencyValue} urgencyValue = {urgencyValue}/>
                <textarea placeholder = "Describe your Issue" {...descriptionValue}/>
            </div>
            <button className = "submit-issue btn" onClick = {postIssue}>Submit Issue</button>
        </div>
    )

}