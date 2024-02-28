import React from 'react';
import Comment from './Comment.jsx';

export default function CommentSlide({ fname, lname, onClick, comment }) {
  return <Comment fname={fname} lname={lname} onClick={onClick} comment={comment} />;
}
