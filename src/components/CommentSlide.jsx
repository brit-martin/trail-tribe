import React from 'react'
import Comment from './Comment.jsx'


export default function CommentSlide({ onClick, comment}) {
  return (
    
        <Comment onClick={onClick} comment={comment}/>
    
  )
}
