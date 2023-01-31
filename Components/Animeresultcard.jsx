import React, {useState} from 'react'
import dynamic from 'next/dynamic';

import {Modal, Card,Checkbox, Row,Input, Col, Text, Button, Container, Badge, Tooltip} from "@nextui-org/react"
import { BsFillInfoCircleFill } from 'react-icons/bs';
// import Animemodal from './animemodal';
const Animemodal = dynamic(() => import('./Animemodal'), {
    ssr: false,
  });
  
// import { Modal, Text, Row, Container, Col, Input, Button } from '@nextui-org/react'



const Animeresultcard = ({detail}) => {

    const [visible, setVisible] = useState(false);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
      };

  return (
    <div style={{display:"block", margin:"1rem"}}>
        <Card isPressable onPress={()=>setVisible(true)} css={{ w: "20vw", h: "480px", backgroundColor:"#222" }} >
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        
        
        {/* <Text h3 color="white">
          {detail.English}
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={detail.Image_link}
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
   
    <Card.Footer css={{ justifyItems: "flex-start", backgroundColor:" #222 ", p:"0.5rem 01rem" }}>
              <Row  justify="space-between" align="center">
                <Text css={{marginRight:" 1rem"}} color=' #c2b9c4 ' b size={18} >{detail.English}</Text>
               
              <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
              {detail.Type}
                </Text>
              </Row>     
              
            </Card.Footer>
            
            <Card.Footer css={{display:"flex",justifyItems: "flex-start",justifyContent:"space-evenly", justifyItems: "flex-end", backgroundColor:" #222 " }}>
                <Col css={{ m:"0.5rem 0 "}}>
                <div >
                    {
                        detail.Genres.split(",").map(gen=>{
                           if(gen!=="Unknown") return <Badge size="sm" css={{margin:"0.1rem 0.2rem"}} enableShadow  isSquared color="secondary" variant="flat">
                            {gen}
                          </Badge>
                        })
                        
                    }
                     {
                        detail.Themes.split(",").map(gen=>{
                           if(gen!=="Unknown") return <Badge size="sm" css={{margin:"0.1rem 0.2rem"}} enableShadow  isSquared color="secondary" variant="flat">
                            {gen}
                          </Badge>
                        })
                        
                    }
                </div>
                <Container css = {{display: "flex",justifyContent:"space-between", m:"0.2rem 0 0.5rem"}}>
                <Text color=' #c2b9c4 ' b size={12}  css={{ justifyItems:"flex-end", m:"0.2rem 0 0.5rem"}}>
                    
                <Tooltip shadow bordered
                // size={12}
                 css={{width:"200px"}}
          content={"Ranges from 0 to 1, lesser the value greater the similarity ! "}
          trigger="hover"
          color="secondary"
          enterDelay={200}
          leaveDelay={500}
          offset={6}
        >
            
                    
        <BsFillInfoCircleFill color='pink'/>&nbsp;Distance:&nbsp;{Math.round(detail.Distances*100)/100}
        </Tooltip></Text>
       
         

                {detail.Episodes===1 ?<Text color=' #c2b9c4 ' b size={12}  css={{ justifyItems:"flex-end", m:"0.2rem 0 0.5rem"}}>Movie</Text>:<Text color=' #c2b9c4 ' b size={12}  css={{ justifyItems:"flex-end", m:"0.2rem 0 0.5rem"}}>Episodes:&nbsp;{detail.Episodes}</Text>}
                
               
                </Container>
                </Col>
            </Card.Footer>
            
  </Card>

  <Modal
    closeButton
    noPadding
    preventClose
    width='1000px'
    // height='1000px'
    blur
    css={{height:"500px", justifyContent:"center"}}
    aria-labelledby="modal-title"
    open={visible}
    onClose={closeHandler}
  >
    
    <Modal.Body>

    <Animemodal detail={detail}/>
      
    </Modal.Body>
    {/* <Modal.Footer>
      <Button auto flat color="error" onPress={closeHandler}>
        Close
      </Button>
      <Button auto onPress={closeHandler}>
        Sign in
      </Button>
    </Modal.Footer> */}
  </Modal>
  
    

    </div>
  )
}

export default Animeresultcard