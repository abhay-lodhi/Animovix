import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import{ useRouter} from 'next/router';
import { Navbar } from "@nextui-org/react";
import styles from '@/styles/Navbar.module.css'


const Bar= () => {
  const router = useRouter();
  // const ariaCurrent = href === asPath ? "page" : undefined;
  return (
    <div >
        <Navbar  height="100px" isBordered shouldHideOnScroll activeColor="primary" variant="floating">
        <Navbar.Brand >
         <Image src="/sharingan.png" alt="Animovix" height={100} width={130}/>
                 </Navbar.Brand>
        <Navbar.Content
         
          style={{color:"black",fontSize:"1.3em"}}>
          <Link 
            href="/" style={{color:"white"}}>
            Home</Link>
            <Link  href="/Anime" style={{color:"white"}}>
            Anime</Link>
            <Link  href="/Movies" style={{color:"white"}}>
            Movies</Link>
            
        </Navbar.Content>
        <Navbar.Content css={{fontSize:"1.1em"}}>
          {/* <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link> */}
          
        </Navbar.Content>
      </Navbar>
    </div>
  )
}

export default Bar




