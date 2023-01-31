import React from 'react'
import { Modal, Text, Row, Container, Col, Input, Button } from '@nextui-org/react'
import Image from 'next/image'
import styles from '../styles/Animemodal.module.css'

const Animemodal = ({detail}) => {

    // const [visible, setVisible] = React.useState(vis);
    // // const handler = () => setVisible(true);
    // const closeHandler = () => {
    //   setVisible(false);
    //   console.log("closed");
    // };

  return (
    <div>
    <Container css={{alignContent:"center", alignItems:"center"}}>
            
        <div className={styles.main}>
            <div className={styles.image}>
            <Image css={{borderRadius:"5px"}} src={detail.Image_link} width={250} height={350}/>
            </div>
            <div className={styles.content}>
                <Container>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, veritatis eos soluta nihil quo architecto officiis magni non nesciunt dignissimos voluptatum dolorum dicta corrupti maxime. Similique culpa beatae voluptate facere reiciendis quia eum omnis vel ad, totam, inventore deserunt optio nihil atque doloribus neque deleniti. Tempora molestias quod tenetur repellendus.
                asrgf
                </Container>
            </div>
        </div>
    </Container>
    </div>
  )
}

export default Animemodal