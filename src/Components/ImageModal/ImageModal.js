import React, {Component} from "react"
import ImageUploader from 'react-images-upload';
import cancelImageUpload from "../../Images/cancelImageUpload.png"
import "./ImageModal.scss"



export default class ImageModal extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        const {onImageDrop,toggleUploader,setToggleUploader} = this.props;
        return(
            <div className = "Modal-overlay">
                <div className="Modal-parent">
                    <span className="close-modal"><img src={cancelImageUpload} onClick={() => setToggleUploader(!toggleUploader)}></img></span>
                </div>
                <div className="upload-container">
                    <div className = "uploader-parent">
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onImageDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    </div>
                </div>
            </div>
        )
    }
}