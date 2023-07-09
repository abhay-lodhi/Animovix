import React, { useState } from 'react';
import { useFirebase } from '@/context/firebaseContext';

const CommentForm = ({commentId,animeId,setOpenReplies,setOpenBox}) => {
  
   const [text,setText]= useState("");
   const {addComment,getCommentsAgain,setGetCommentsAgain}=useFirebase();

   const postComment= async()=>{     
      const res= await addComment(text,animeId,commentId);    
      if(res!=false){
        setGetCommentsAgain(!getCommentsAgain);
        setOpenBox(false);
        setOpenReplies(true);
      }
   }
 
  return (
    <div>
      <input onChange={e=>setText(e.target.value)} value={text} placeholder='add Comment'></input>
      <button onClick={postComment}>Post</button>
    </div>
  )
}

export default CommentForm;