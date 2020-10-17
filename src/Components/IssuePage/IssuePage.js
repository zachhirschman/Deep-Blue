import React, {useState,useEffect, useReducer} from "react"
import reducer from "../../Redux/Reducer"
import initialState from "../../Redux/initialState"
import "./IssuePage.scss"
import Axios from "axios";
import Loader from "../Loader/Loader"
import emoji from "../../Images/emoji-selector.png"
import EmojiPicker from "emoji-picker-react"
import JSEMOJI from "emoji-js"
import Comment from "../Comment/Comment";
import Urgency from '../Urgency/Urgency';
// import { } from 'marked'

export default function IssuePage(props){
    
    let [postToShow, setPostToShow] = useState([])
    let [emojiToggle, setEmojiToggle] = useState(false)
    let [commentText, setCommentText] = useState('')
    let [width,setWidth] = useState(window.innerWidth)
    const [state, dispatch] = useReducer(reducer,initialState)

    let jsemoji = new JSEMOJI()

    jsemoji.img_set = 'emojione'
    jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
    jsemoji.supports_css = false;
    jsemoji.allow_native = false;
    jsemoji.replace_mode = 'unified';


    useEffect(() =>{
        Axios.get('/api/get-issues').then(response =>{
            dispatch({type:'update_posts', payload:response.data})
        })
    },[])


    window.addEventListener('resize', () =>{
        setWidth(window.innerWidth)
    })


    useEffect(() =>{
        let result = state.posts.filter(element =>{
            return element.issue_id == props.match.params.id
        })
        setPostToShow(result)
    },[state])
    let handleEmojiClick = (emoji,data) =>{
        let newEmoji = jsemoji.replace_colons(`:${data.name}:`)
        setCommentText(commentText + newEmoji)
    }
    let sendComment = (e) =>{
        if(e.keyCode === 13){
            Axios.put(`/api/add-comment?content=${commentText}&id=${props.match.params.id}`).then(response =>{
                setCommentText('')
                setPostToShow(response.data)
            })
        }   
    }
    
    let mobileTabs = (
        <ul className = "tabs-parent">
            <li className = "tab">
                Comments
            </li>
            <li className = "tab">
                Details
            </li>
        </ul>
    )

    let mappedComments
    if(postToShow.length){
        if(postToShow[0].comments){
            mappedComments = postToShow[0].comments.map(comment =>{
                return(
                    <Comment comment={comment} />
                )
            })
            
        }
        else mappedComments = null
    }

    console.log("Post: ", postToShow)
    return(
        <div className = "IssuePage">
            <div className = "main-parent flex">
                { postToShow.length ?
                    <div className = "content-parent flex">
                        <img className = "main-parent_image" src = {postToShow[0].thumbnail}/>
                        <div className = "main-parent_header flex">
                            <h1 className ="main-parent_name" >{postToShow[0].name}</h1>
                            <Urgency urgencyValue={postToShow[0].urgency}/>
                            <div className ="main-parent_description-parent">
                                <h2 className ="main-parent_description-header">Description:</h2>
                                <p className = "description">{postToShow[0].description}</p>
                            </div>
                        </div>
                    </div>
                : 
                
                <Loader/> 
                
                }
            </div>
            <div className = "comment-parent">
            { width > 600 ? null : mobileTabs}
                {/* <div> */}
                    {mappedComments}
                {/* </div> */}
                {/* <hr className = "divider"/> */}
                {emojiToggle ? <EmojiPicker onEmojiClick = {(emoji, data) => handleEmojiClick(emoji,data)} className = 'emoji-picker' preload/> : null}
                <div className = "newComment-parent">
                    <div className = "input-parent">
                        <input value = {commentText} onChange = {(e) => setCommentText(e.target.value)} onKeyDown ={(e) => sendComment(e)}/>
                        <img src = {emoji} onClick = {() => setEmojiToggle(!emojiToggle)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}



