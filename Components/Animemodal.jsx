import React, { useEffect,useState } from 'react'
import {  Text, Badge,Dropdown } from '@nextui-org/react'
import Image from 'next/image'
import styles from '../styles/Animemodal.module.css'
import { useFirebase } from '@/context/firebaseContext'
import {AiOutlineHeart} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"

const Animemodal = ({detail}) => {
  const [selected, setSelected] = useState(new Set(["Status"]));
  const [favourite,setFavourite]= useState(false);
  const {updateUserLists}= useFirebase();
  const mapVal= {
    "Watching":"watching",
    "Completed":"completed",
    "On Hold":"onHold",
    "Dropped":"dropped",
    "Plan To Watch":"planToWatch"
  }

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
    var val=0;
    var val2=0;

  const updateFavourite= async (key)=>{
    const ref= JSON.parse(localStorage.getItem("favourites")) || [];
     if(favourite){
      setFavourite(false);
      const index = ref.indexOf(detail.id);
      if (index > -1) 
        ref.splice(index, 1); 

        //await updateUserLists(detail,null,"favourite");
     }else{
      setFavourite(true);
      ref.push(detail.id);
      //await updateUserLists(detail,"favourite",null);

     }

     localStorage.setItem("favourite",JSON.stringify(ref));
  }

  const updateList= async (key)=>{

    const remove= JSON.parse(localStorage.getItem(mapVal[selectedValue])) || [];

    const add= JSON.parse(localStorage.getItem(mapVal[key])) || [];
    const index = remove.indexOf(detail.id);
    if (index > -1) 
      remove.splice(index, 1); 

    add.push(detail.id);
  
    //await updateUserLists(detail,mapVal[key],mapVal[selectedValue]);

    localStorage.setItem(mapVal[selectedValue],JSON.stringify(remove));
    localStorage.setItem(mapVal[key],JSON.stringify(add));

  }

  useEffect(()=>{
    const favourites= JSON.parse(localStorage.getItem("favourites"));
    const completed= JSON.parse(localStorage.getItem("completed"));
    const dropped= JSON.parse(localStorage.getItem("dropped"));
    const onHold= JSON.parse(localStorage.getItem("onHold"));
    const planToWatch= JSON.parse(localStorage.getItem("planToWatch"));
    const watching= JSON.parse(localStorage.getItem("watching"));

    completed.find(e=> e==detail.id) && setSelected(new Set(["Completed"]));
    dropped.find(e=> e==detail.id) && setSelected(new Set(["Dropped"]));
    onHold.find(e=> e==detail.id) && setSelected(new Set(["On Hold"]));
    planToWatch.find(e=> e==detail.id) && setSelected(new Set(["Plan To Watch"]));
    watching.find(e=> e==detail.id) && setSelected(new Set(["Watching"]));
    favourites.find(e=> e==detail.id) && setFavourite(true);
    
  },[])

  return (
  
    <div className={styles.contain} >
                
            <div className={styles.image}>
            <Image css={{borderRadius:"15px"}} src={detail.main_picture} unoptimized={true} width={350} height={470}/>
            </div>
           
           <div className={styles.contentM}>

          
      <Text css={{marginRight:"1rem", width:"800px", marginTop:"2rem", marginBottom:"0rem", fontWeight:"600", wordWrap:"break-word"}} color='white' b size={40} className={styles.title}>{detail.title_english}</Text>

      <div className={styles.badges}>
      <div className={styles.fav} onClick={updateFavourite}>
       {favourite?(<AiFillHeart color='red' className={styles.fav}/>):(<AiOutlineHeart  color='red' className={styles.fav}/>)}
      </div>
        
         <Badge size="md" css={{  margin:"0.1rem 0.2rem 1.5rem 0", padding:"0.5rem 1rem 0.5rem 1rem"}} color="primary" variant="flat" className={styles.head2}>{detail.rating}</Badge>

         <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" ,borderRadius:"35px", height:"32px"}}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        onAction={(key)=>updateList(key)}
      >
        <Dropdown.Item key="Watching">Watching</Dropdown.Item>
        <Dropdown.Item key="Dropped">Dropped</Dropdown.Item>
        <Dropdown.Item key="Plan To Watch">Plan To Watch</Dropdown.Item>
        <Dropdown.Item key="On Hold">On Hold</Dropdown.Item>
        <Dropdown.Item key="Completed">Completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   
            </div>
            <div className={styles.lY}>
             
             
           <div className={styles.car}>
           <div className={styles.head}>Episodes</div>
              {detail.episodes ? <><div className={styles.bod}>
              {detail.episodes}
              </div></>:
              <><div className={styles.bod}>
              N/A
              </div>
              </>
              }
              </div>

             <div className={styles.car}>
              <div className={styles.head}>Aired</div><div className={styles.bod}>{detail.start_date}</div>
              </div>
              <div className={styles.car}>
              <div className={styles.head}>Status</div><div className={styles.bod}>{detail.status}</div>
              </div>
              <div className={styles.car}>
              <div  className={styles.head}>Type</div><div className={styles.bod}>{detail.type}</div>
              </div>

              <div className={styles.car}>
              <div  className={styles.head}>MAL Score</div><div className={styles.bod}>{detail.score}</div>
              </div>
              
              

              
              </div> 
              <div className={styles.last}>
               <div className={styles.genre}>Genre</div>
              <div style={{marginBottom:"24px"}}>
              { 
                        detail.genres.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val==0) return <Badge size="md" key={i} css={{color:"white",backgroundColor:"teal", margin:"0.1rem 0.2rem 0.1rem 0"}}   isSquared color="secondary" variant="flat">
                            {gen}
                          </Badge>
                         

                         
                        })
                        
                    }
                     {
                        detail.themes.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val2==0) return <Badge size="md" key={i} css={{ color:"white",backgroundColor:"teal",margin:"0.1rem 0.2rem 0.1rem 0" , padding:"6px 8px"}}    isSquared color="secondary" variant="flat" >
                            {gen}
                          </Badge>
                        

                     
                        })
                        
                    }
              </div>

              <div className={styles.genre}>Synopsis</div>
              {/* <div className="hidden" style={{height:"10vh", overflow:'hidden'}}> */}
              <div className={styles.scroll} >{detail.synopsis}</div>
              {/* </div> */}
            
              <div style={{marginBottom:"24px"}}>
              <div>Studios</div>
              { 
                        detail.studios.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val==0) return <Badge size="md" key={i} isSquared css={{color:"black", backgroundColor:"white", margin:"0.1rem 0.2rem 0.1rem 0"}} >
                            {gen}
                          </Badge>
                                  
                        })
                        
                    }
                         
                      
                        
                    </div>
                    </div>
             


           </div>




           
    </div>
   
  )
}

export default Animemodal;