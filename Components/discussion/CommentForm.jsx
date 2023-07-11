import React, { useState } from 'react';
import { useFirebase } from '@/context/firebaseContext';
import { Textarea, Button, Loading } from '@nextui-org/react';
import styles from "../../styles/CommentForm.module.css"
import {IoSend} from 'react-icons/io5'
import { m } from 'framer-motion';

const CommentForm = ({commentId,animeId,setOpenReplies,setOpenBox,placeholder}) => {
  
   const [text,setText]= useState("");
   const {addComment,getCommentsAgain,setGetCommentsAgain,signIn}=useFirebase();
   const [textStatus,setStatus]= useState(false);
   const [loading,setLoading]=useState(false)

   const postComment= async()=>{   
       if(text===""){
         setStatus(true);
         return false;
       }
       setText("")
       setLoading(true);
      const res= await addComment(text,animeId,commentId);     
      if(res!=false){
        setLoading(false);
        setOpenBox && setOpenBox(false);
        setOpenReplies && setOpenReplies(true);  
        
        setGetCommentsAgain(!getCommentsAgain); 
      }else{
        signIn();
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
      disabled={loading}
       onClick={postComment}
       auto
       icon={<IoSend/>}
       color={"#202121"}
       >{loading?
       ( <Loading type="points" color="currentColor" size="sm" />)
       :(<>Post</>)}
        </Button>
    </div>
  )
}

export default CommentForm;