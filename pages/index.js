import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, Text, Row } from "@nextui-org/react";
import Presscard from '@/Components/Presscard'
import data from "../public/anime_list";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Image from "next/image";
import {ImSearch} from "react-icons/im"
import {AiOutlineArrowRight} from "react-icons/ai"
import { useRouter } from 'next/navigation'
import { Center } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({quotes}) {

  const[anime, setAnime] = useState(null);
  const router=useRouter();

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
  };
  // data && console.log(data)
  const handleOnHover = (result) => {
    // the item hovered
  };
  const handleOnSelect = (item) => {
    setAnime(item.id);
  }



  const handleOnFocus = () => {
    
  };

  const searchAnime=()=>{
    if(anime===null){
      window.alert("Please Select some Anime");
    }else{
      router.push(`/AnimeSeries/${anime}`);
    }
  }
  
  const formatResult = (item) => {
    return (
      <>
       <Head>
        <title>Anime Recommendations</title>
        <meta name="description" content="Anime and Movies Recommendation system and can also be used for recommendations based on multiple anime or movies input. It is a static website and user can use this website to get recommendations for their next Anime to watch or next Movie to watch." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>


        <div css={{ display: "flex" }}>

        


          <span style={{ display: "flex", textAlign: "left" }}>
            {item.English}&nbsp;({item.Type})
          </span>
          {item.Premiered !== "Unknown" && (
            <span style={{ display: "flex", textAlign: "left" }}>
              Premiered in : {item.Premiered}
            </span>
          )}
         {item.Image_link && <span style={{ display: "flex", textAlign: "right" }}>
            <Image
              src={item.Image_link}
              css={{ position: "sticky" }}
              width={50}
              height={65}
              alt="N/A"
              quality={20}
            />
          </span>}
        </div>
      </>
    );
  };

  const [isChecked, setIsChecked] = useState(true);
    
  return (
    <>
      <Head>
        <title>🎬 Animovix Recommendations</title>
        <meta name="description" content="Anime and Movies Recommendation system and can also be used for recommendations based on multiple anime or movies input. It is a static website and user can use this website to get recommendations for their next Anime to watch or next Movie to watch." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
       <div className={styles.main}>

       

        <div className="parcar" style={{display:"flex", justifyContent:"center"}}>
        <div className={styles.carousal}>
          <div style={{display:"flex", width:'85vw', flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex"}}>



            <label className={styles.switch} >
  <input type="checkbox" checked={!isChecked} onChange={()=>setIsChecked(!(isChecked))}/>
  <span className={styles.slider}></span>
</label>

          <div className={styles.searchbar}>
        <ReactSearchAutocomplete
                  styling={{
                    borderRadius: "5px solid white",
                    fontSize: "1.3em",
                    zIndex: `8`,
                    border: "none",
                    filter: "alpha(opacity=60)",
                    backgroundColor: "#121212",
                    hoverBackgroundColor: " #322f34  ",
                    color: "whitesmoke",
                    height: "3rem",
                    borderRadius:"20px",
                  }}
                  items={data}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={(item) => handleOnSelect( item)}
                  onFocus={handleOnFocus}
                  autoFocus
                  placeholder={`Search Anime...`}
                  maxResults={3}
                  resultStringKeyName="English"
                  fuseOptions={{ keys: ["English"] }}
                  formatResult={formatResult}
                />
               
          </div>
          <div className={styles.searchIcon} onClick={searchAnime}>
           <ImSearch size={25} />
           </div>
           <div className={styles.image}>
           <Image src={"https://aniwatch.to/images/anw-min.webp"} width={520} height={450}/>
           </div>
           </div>
           <div className={styles.bottombanner}>
            Try Recommendation system
            <AiOutlineArrowRight style={{marginLeft:"0.5rem"}} size={20} />
           </div>
           </div>
           
        </div>
        </div>

      
      
      <div className={styles.presscards}>
        <div className={styles.blur2}>
      <Presscard src="press_anime_2.webp" content="Anime Recommendations" link="Anime"/>
      <Presscard src="press_movies.jpeg" content="Movies Recommendations" link="Movies"/>
      
      </div>
      </div>
      </div>
    </>
  )
}

// export async function getStaticProps() {
  
//   axios.get('https://animovixrecommendations.onrender.com/')
//   const res = await fetch('https://animechan.xyz/api/random')
//   const quotes = await res.json()

//   return {
//     props: {
//       quotes,
//     },
//     revalidate: 100,
//   }
// }
