import React from 'react';
import Image from 'next/image';
import {  auth } from "../../firebase/firebaseinit";

const CommentDesign = ({key,comment,animeId}) => {
     
 // console.log(comment);
  return (
    <>
    <div>{comment.userName}</div>
    <div>{comment.text}</div>
    </>
  )
}

export default CommentDesign;