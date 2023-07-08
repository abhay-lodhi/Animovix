import React, { useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { useFirebase } from '@/context/firebaseContext';
//import {Animemodal} from '../../Components/Animemodal';
import dynamic from 'next/dynamic';
import {
    Loading,
  } from "@nextui-org/react";

const Animemodal = dynamic(() => import('../../Components/Animemodal'), {
    ssr: false,
  });

const animewithID = () => {
   const router= useRouter();
   const id= router.query.id;
   const {getAnime}=useFirebase();
   const [details,setDetails]=useState();

   useEffect(()=>{

    //console.log(id+ "hiiiiii");
     getAnime(id).then((details)=>{
        setDetails(details);
        //console.log(details);
     })

   },[id]);

  return (

    
    <div >{details?  (<>
       <Animemodal detail={details}/>
    
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
