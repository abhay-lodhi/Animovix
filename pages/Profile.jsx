import React, {useEffect, useState} from 'react'
import  { useRouter } from 'next/router';
import { useFirebase } from "@/context/firebaseContext";
import styles from '@/styles/Profile.module.css'
import Profilecard from '@/Components/Profilecard';
import {FaClockRotateLeft, FaHeart} from 'react-icons/fa6'

const Profile = () => {

    const {checkUserCookies, getUserCookies} = useFirebase();
    const [name, setName] = useState("User")    
    const [data, setData] = useState({});
    
    const router = useRouter();
    useEffect(() => {      
        if(!checkUserCookies())router.replace("/");  
        setName(getUserCookies().details?.name.split(" ")[0]);
        // setData()
      return () => {       
      }
    }, [])

    const [isFavActive, setIsFavActive] = useState(true);
    const initial = {        
      all:false,
      watch:false,
      dropped:false,
      hold:false,
      plan:false,
      completed:false      
  }

    const [section, setSection] = useState({...initial, all:true})

    const handleActive=()=>setIsFavActive(!(isFavActive));

    const handleSection=(e)=>{
      const id = e.target.id;
      console.log(e.target.id)
      const newState={...initial, [id]:true};
      setSection(newState)
    }
    

  return (
    <div className={styles.main}>
      <h2 className={styles.greeting}> Hi, {name}</h2>
      <div className={styles.tab}>
        <ul>
          <li className={isFavActive?styles.active:""}  onClick={handleActive}>
            <FaHeart  size={15}/>&nbsp;Favourites
            </li>
          <li className={!isFavActive?styles.active:""} onClick={handleActive}>
            <FaClockRotateLeft size={18}/>&nbsp;Watch List
            </li>
      </ul>
      </div>
      <div className={styles.box}>
      
      {/** FAVORITES HEADING  */}
        {isFavActive?<><h2><FaHeart  size={30}/>&nbsp;Favourites</h2>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div>
      </>:
      /* WATCH LATER HEADING  */
      <><h2><FaClockRotateLeft size={30}/>&nbsp;Watch List</h2>
      <ul className={styles.section}>
        <li id="all" className={section.all?styles.section_active:""} onClick={(e)=>handleSection(e)}>All</li>
        <li id="watch" className={section.watch?styles.section_active:""} onClick={(e)=>handleSection(e)}>Watching</li>
        <li id="dropped" className={section.dropped?styles.section_active:""} onClick={(e)=>handleSection(e)}>Dropped</li>
        <li id="hold" className={section.hold?styles.section_active:""} onClick={(e)=>handleSection(e)}>On-Hold</li>
        <li id="plan" className={section.plan?styles.section_active:""} onClick={(e)=>handleSection(e)}>Plan to Watch</li>
        <li id="completed" className={section.completed?styles.sectionActive:""} onClick={(e)=>handleSection(e)}>Completed</li>
      </ul>

     
      
      {(section.all || section.watch) && <><h3>Watching</h3>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div></>}
      </>}

      {(section.all || section.dropped) && <><h3>Dropped</h3>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div></>}

      {(section.all || section.hold) && <><h3>On-Hold</h3>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div></>}

      {(section.all || section.plan) && <><h3>Plan to Watch</h3>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div></>}

      {(section.all || section.completed) && <><h3>Completed</h3>
      <div className={styles.container}>
      <Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/><Profilecard/></div></>}

      </div>
    </div>
  )
}

export default Profile