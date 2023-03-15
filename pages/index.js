import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, Text, Row } from "@nextui-org/react";
import Presscard from '@/Components/Presscard'

const inter = Inter({ subsets: ['latin'] })

export default function Home({quotes}) {

  const[quote, setQuote] = useState(quotes)


  
  
  return (
    <>
      <Head>
        <title>🎬 Animovix Recommendations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
      <div className={styles.main}>
        <div className="parcar" style={{display:"flex", justifyContent:"center"}}>
        <div className={styles.carousal}>
        <div className={styles.quote}>


<Card variant="bordered" className={styles.card}>
 <div className={styles.blur}>
   <Card.Header >
     <Text  size={25} color=" #f0d5f6 ">{quote.anime} </Text>
   </Card.Header>
   <Card.Divider css={{border:"1px groove whitesmoke"}}/>
   <Card.Body css={{ py: "$10"}} >
     
     <Text b size={20} color=" #7bf1e9 " >
      {quote.quote}
     </Text>
    
<Row justify="flex-end">
       <Text b size={17} color=" #fc3291">--- {quote.character} </Text>
       
     </Row>
   </Card.Body>
   
   <Card.Footer>
     
   </Card.Footer>
   </div>
 </Card>
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

export async function getStaticProps() {
  
  axios.get('https://animovixrecommendations.onrender.com/')
  const res = await fetch('https://animechan.vercel.app/api/random')
  const quotes = await res.json()

  return {
    props: {
      quotes,
    },
  }
}
