import React, { useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { useFirebase } from '@/context/firebaseContext';
//import {Animemodal} from '../../Components/Animemodal';
import dynamic from 'next/dynamic';
import axios from "axios";
import {
  Button,
    Loading,
  } from "@nextui-org/react";
import CommentsSection from '@/Components/discussion/CommentsSection';
import { Center } from '@chakra-ui/react';
import styles from "../../styles/AnimeSeries.module.css"
import Recommendations from '@/Components/Recommendations';

const Animemodal = dynamic(() => import('../../Components/Animemodal'), {
    ssr: false,
  });

const animewithID = () => {
   const router= useRouter();
   const id= router.query.id;
   const {getAnime}=useFirebase();
   const [details,setDetails]=useState();
   const [tab,setTab]=useState(true);
   const {getComments,getCommentsAgain}=useFirebase();
   const [comments,setComments]= useState(null);
   const[status,setStatus]=useState(false);
   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(false);
   const itemcount = 20;


   useEffect(()=>{

    //console.log(id+ "hiiiiii");
     getAnime(id).then((details)=>{
        setDetails(details);
        //console.log(details);
     })

   },[id]);

   useEffect(()=>{
    // console.log("hiiiii");

    if(details) 
     axios
     .post("https://animovixrecommendations.onrender.com/anime", {
       names:details.title_english ,
     })
     .then(function (response) {
       //console.log(response.data);
       setLoading(false);
       setResults(response.data.slice(0, 20));
     })
     .catch(function (error) {
       console.log(error);
     });
 },[details])

   //console.log(comments);

   useEffect(()=>{

    getComments(id).then((data)=>{
      setComments(data.docs);
      setStatus(true);
    });
   
    },[id,getCommentsAgain]);

  return (

    
    <div className={styles.main} >{details?  (<>
       <Animemodal detail={details}/>
       <div className={styles.tabs}>
       <button 
       onClick={()=>setTab(true)}
       className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-2 outline-sky-400 focus-visible:outline`}
       >
        {/* {tab && } */}
       Recommendations

       </button>

       <button 
       onClick={()=>setTab(false)}
       className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-2 outline-sky-400 focus-visible:outline`}
       >
       Discussion

       </button>

       </div>
       
       {tab?(<>{!loading &&
       <Recommendations results={results} name={details.title_english}/>}
       </>):(<>{status &&(
       <CommentsSection id={id} comments={comments}/>)}
       </>)}
    
    </>):(<div style={{display:'flex', width:"100%",alignItems:"center", justifyContent: "center", justifyItems:"center"}}>
        <Loading
              color="secondary"
              type="gradient"
              loadingCss={{
                $$loadingSize: "100px",
                $$loadingBorder: "10px",
                margin: "10vw auto",
              }}
            />
    </div>)
            }</div>
  )
}

export default animewithID;
