import React from 'react';

import './Comment.scss';

export default function Comment(props){


    const { comment } = props;
    if(comment.includes('<img')){
        
    }
    return(
        <div className="comment-container flex">
            {comment}
        </div>
    )
}