import React, { useState } from 'react';
import { useFirebase } from '@/context/firebaseContext';
import { Textarea, Button } from '@nextui-org/react';
import styles from "../../styles/CommentForm.module.css"
import {IoSend} from 'react-icons/io5'

const CommentForm = ({commentId,animeId,setOpenReplies,setOpenBox,placeholder}) => {
  
   const [text,setText]= useState("");
   const {addComment,getCommentsAgain,setGetCommentsAgain}=useFirebase();
   const [textStatus,setStatus]= useState(false);

   const postComment= async()=>{   
       if(text===""){
         setStatus(true);
         return false;
       }
        
      const res= await addComment(text,animeId,commentId);     
      if(res!=false){
          
        setText("")
        setGetCommentsAgain(!getCommentsAgain);
        setOpenBox && setOpenBox(false);
        setOpenReplies && setOpenReplies(true);
      }
   }
 
  return (
    <div className={styles.main}>
      <Textarea 
      onChange={e=>{
        setText(e.target.value)
        e.target.value!=""?setStatus(false):setStatus(true)
      }}
      value={text} 
      placeholder={[placeholder]} 
      maxRows={4}
      status={textStatus?"error":"default"}
      helperColor={textStatus?"error":"default"}
      helperText={textStatus?"Can't be empty":""}
      />
      <Button
       onClick={postComment}
       auto
       icon={<IoSend/>}
       color={"#202121"}
       >Post</Button>
    </div>
  )
}

export default CommentForm;