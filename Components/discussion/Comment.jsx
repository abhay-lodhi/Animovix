import React, { useEffect, useState } from 'react';
import { useFirebase } from '@/context/firebaseContext';
import CommentDesign from './CommentDesign';
import CommentForm from './CommentForm';

const Comment = ({key,data,currComment,animeId}) => {
     const [replies,setReplies]= useState();
     const [openReplies,setOpenReplies]=useState(false);
     const [openBox,setOpenBox]=useState(false);


  useEffect(()=>{
    let rep=null;
    if(data!=null)
    rep= data.filter((d)=>d.data().parentId===currComment.id);
    setReplies(rep);

  },[data]);


  return (
    <div style={{marginLeft:"1.8rem"}}><CommentDesign comment={currComment.data()} animeId={animeId} />
    <button onClick={()=>{setOpenReplies(!openReplies)}}> 
        {openReplies? (<>Hide Replies</>):(<>Show Replies</>)}
    </button>
    <button onClick={()=>setOpenBox(!openBox)}>Reply</button>
    {openBox&&
        <CommentForm commentId={currComment.id} animeId={animeId} setOpenReplies={setOpenReplies} setOpenBox={setOpenBox} />
    }

    {openReplies &&
        (<div style={{marginLeft:"3rem"}}>{
           replies.length>0? (replies.map((d)=>(
           <CommentDesign key={d.id} comment={d.data()} animeId={animeId}/>
        ))) :(<>No Replies</>)
    }</div>)}
    
    </div>
  )
}

export default Comment;