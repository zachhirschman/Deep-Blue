import React, {useState, useEffect} from "react"
import "./AddIssue.scss"
import Form from "../Hooks/Form"
import Axios from "axios";
import imageUpload from "../../Images/image-upload.png"
import Urgency from "../Urgency/Urgency"
import ImageUploader from 'react-images-upload';

export default function AddIssue(props){

    const [urgencyValue,setUrgencyValue] = useState(0)
    const [images, setImages] = useState([])
    const [toggleUploader, setToggleUploader] = useState(true)
    useEffect(() =>{
        // const box = '60,20:58,17';
        // Axios.get(`https://api.stormglass.io/v1/weather/area?box=${box}`, {
        //     headers:{
        //         'Authorization':"41994dfa-8c92-11e9-9c0e-0242ac130004-41994f08-8c92-11e9-9c0e-0242ac130004"
        //     }
        // }).then(response =>{
        //     console.log("Got ocean data, :", response.data)
        // })
    },[])
    let onImageDrop = (picture) =>{
        let copy = images.slice()
        console.log("picture: ", picture)
        setImages(copy.push(picture))
    }
    console.log("Urgency number: ", urgencyValue)
    console.log("Images: ", images)
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
                <span className = "uploader-parent">
                <ImageUploader
                    withPreview = {true}
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onImageDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <button onClick = {() => setToggleUploader(!toggleUploader)}>Cancel</button>
                </span>
                }
                <input placeholder = "Name"/>
                <Urgency setUrgencyValueFn = {setUrgencyValue} urgencyValue = {urgencyValue}/>
                <textarea placeholder = "Describe your Issue"/>
            </div>
            <button className = "submit-issue btn" onClick = {props.openModal}>Submit Issue</button>
        </div>
    )

}