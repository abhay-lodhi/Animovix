import React, { useEffect, useState } from 'react';
import { useFirebase } from '@/context/firebaseContext';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentsSection = ({id}) => {
    const {getComments,getCommentsAgain,setGetCommentsAgain,addComment}=useFirebase();
    const [comments,setComments]= useState(null);
    const [root,setRoot]=useState();
    const [text,setText]=useState();
  
    useEffect(()=>{
      let rootData=null;
  
      if(comments!=null)
      rootData= comments.filter((d)=>d.data().parentId===null);
  
      setRoot(rootData);
    
    },[comments])
    
    useEffect(()=>{
        getComments(id).then((data)=>{
          setComments(data.docs);
        });
       
    },[getCommentsAgain]);

    const postComment= async()=>{
      const res= await addComment(text,id);
     
      
      
      if(res===false) console.log("error");
      else setGetCommentsAgain(!getCommentsAgain);


    }
  

  return (
     <div> 
      <input onChange={e=>setText(e.target.value)} value={text} placeholder='add Comment'></input>
      <button onClick={postComment}>Post</button>
       {root && root.map(doc=>(
        <Comment key={doc.id} data={comments} currComment={doc} animeId={id}/>
       ))}
    </div>
  )
}

export default CommentsSection;