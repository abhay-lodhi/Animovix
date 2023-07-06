import React from 'react'
import { useEffect } from 'react'
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

 const test = () => {
    const {getAnime, signIn,user, addComment, signout, getComments}= useFirebase();
    
    //console.log(details)
    const getData= async ()=>{
      try {
        const animeId="10";
        const text= "hey my first comment";
        const needReply= true;
        const commentId="snklbZMbBRdRLNwt9lyj";
       const data= await getComments(animeId,commentId,needReply);

       console.log(data.docs[0].data());
        
      } catch (error) {
        console.log(error);
      }   
    }

  return (
    <>
    <div><button onClick={getData}>click me</button></div>
    <div><button onClick={signIn}>sign in</button></div>
    <div><button onClick={signout}>signout</button></div>
    <div><button onClick={getData}>get comments</button></div>
    </>
  )
}

export default test;
