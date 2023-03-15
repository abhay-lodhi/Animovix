import React from 'react'
import {  Text, Badge } from '@nextui-org/react'
import Image from 'next/image'
import styles from '../styles/Animemodal.module.css'

const Animemodal = ({detail}) => {


    var val=0;
    var val2=0;

  return (
  
    <div className={styles.contain} >
                

            <div className={styles.image}>
            <Image css={{borderRadius:"15px"}} src={detail.Image_link} unoptimized={true} width={350} height={400}/>
            </div>
           
           <div className={styles.contentM}>

          
                <Text css={{marginRight:"1rem", width:"800px", marginTop:"2rem", marginBottom:"0rem", fontWeight:"600", wordWrap:"break-word"}} color='white' b size={40} className={styles.title}>{detail.English}</Text>
            
         <Badge size="md" css={{  margin:"0.1rem 0.2rem 1.5rem 0", padding:"0.5rem 1rem 0.5rem 1rem"}} color="primary" variant="flat" className={styles.head2}>{detail.Rating}</Badge>

            <div className={styles.lY}>
             
             
           <div className={styles.car}>
           <div className={styles.head}>Episodes</div>
              {detail.Episodes ? <><div className={styles.bod}>
              {detail.Episodes}
              </div></>:
              <><div className={styles.bod}>
              N/A
              </div>
              </>
              }
              </div>

             <div className={styles.car}>
              <div className={styles.head}>Aired</div><div className={styles.bod}>{detail.Start_Aired}</div>
              </div>
              <div className={styles.car}>
              <div className={styles.head}>Status</div><div className={styles.bod}>{detail.Status}</div>
              </div>
              <div className={styles.car}>
              <div  className={styles.head}>Type</div><div className={styles.bod}>{detail.Type}</div>
              </div>

              <div className={styles.car}>
              <div  className={styles.head}>MAL Score</div><div className={styles.bod}>{detail.Score}</div>
              </div>
              
              

              
              </div> 
              <div className={styles.last}>
               <div className={styles.genre}>Genre</div>
              <div style={{marginBottom:"24px"}}>
              { 
                        detail.Genres.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val==0) return <Badge size="md" key={i} css={{color:"white",backgroundColor:"teal", margin:"0.1rem 0.2rem 0.1rem 0"}}   isSquared color="secondary" variant="flat">
                            {gen}
                          </Badge>
                         

                         
                        })
                        
                    }
                     {
                        detail.Themes.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val2==0) return <Badge size="md" key={i} css={{ color:"white",backgroundColor:"teal",margin:"0.1rem 0.2rem 0.1rem 0" , padding:"6px 8px"}}    isSquared color="secondary" variant="flat" >
                            {gen}
                          </Badge>
                        

                     
                        })
                        
                    }
              </div>

              <div className={styles.genre}>Synopsis</div>
              {/* <div className="hidden" style={{height:"10vh", overflow:'hidden'}}> */}
              <div className={styles.scroll} >{detail.Synopsis}</div>
              {/* </div> */}
            
              <div style={{marginBottom:"24px"}}>
              <div>Studios</div>
              { 
                        detail.Studios.split(",").map((gen,i)=>{
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

export default Animemodal