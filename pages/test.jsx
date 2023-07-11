import React from 'react'
import { useEffect ,useState} from 'react'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import {useFirebase} from "../context/firebaseContext"
  import {db} from "../firebase/firebaseinit"
import CommentsSection from '@/Components/discussion/CommentsSection';
import Tab from '@/Components/Tab';

 const test = () => {
     const {getComments,addComment}=useFirebase();
  // const [comments,setComments]= useState(null);
  // const [root,setRoot]=useState();
  
  // // root && root.map(d=>{
  // //   console.log(d.data());
  // // })
  // useEffect(()=>{
  //   let rootData=null;

  //   if(comments!=null)
  //   rootData= comments.filter((d)=>d.data().parentId===null);

  //   setRoot(rootData);
  
  // },[comments])
  
  // useEffect(()=>{
  //   const id="1000";
  //     getComments(id).then((data)=>{
  //       setComments(data.docs);
  //       console.log(data.docs);
  //     });
     
  // },[]);

    
    //console.log(details)
    const getData= async ()=>{
      try {
        const animeId="1000";
        const text= "hey my 6 comment";
        const needReply= true;
        const commentId="waguT4tEn38Cgnb5pGAI";
        const data= await addComment(text,animeId,commentId);

        // data.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        // });
       console.log(data);
        
      } catch (error) {
        console.log(error);
      }   
    }

  return (
    <>
     <Tab/>
     {/* <button onClick={getData}>click</button> */}
    </>
  )
}

export default test;
