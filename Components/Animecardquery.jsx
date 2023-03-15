import React from 'react'
import { Card, Row, Text, Col, Button, Container } from '@nextui-org/react'
import styles from '../styles/Animecardquery.module.css'

const Animecardquery = (props) => {
    console.log(props.Image_link)
  return (
        <Container >
        <Card  css={{ w: "200px", h: "250px", m:"0.2rem 0rem" }} className = {styles.qrycard}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      {/* <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          New
        </Text>
        <Text h3 color="black">
          Acme camera
        </Text>
      </Col> */}
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      
      <Card.Image
        src={`${props.item.Image_link}`}
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
      
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      {/* <Row> */}
        {/* <Col> */}
          <Text  b color=" #442754  " size={20}>
            {props.item.English}
          </Text>
          {/* <Text color="#000" size={12}>
            Get notified.
          </Text> */}
        {/* </Col> */}
        {/* <Col> */}
          {/* <Row justify="flex-end"> */}
            {/* <Button flat auto rounded color="secondary">
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Notify Me
              </Text>
            </Button> */}
          {/* </Row> */}
        {/* </Col> */}
      {/* </Row> */}
    </Card.Footer>
  </Card>
  </Container>
  )
}

export default Animecardquery