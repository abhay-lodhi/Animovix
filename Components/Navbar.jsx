import React from "react";
import { Navbar, Link, Text, Avatar, Dropdown, useTheme, Button, red } from "@nextui-org/react";
//import { Layout } from "./Layout.js";
//import { AcmeLogo } from "./AcmeLogo.js";

//import {db, auth} from "../firebase/firebaseinit"
import {useFirebase} from "../context/firebaseContext"

import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";



const Bar= () => {
  const [variant, setVariant] = React.useState("default");
  const [activeColor, setActiveColor] = React.useState("primary");
  const {signIn, signout,auth}= useFirebase();
  const {isDark} = useTheme();
  const [ user, setUser ]=React.useState();

  React.useEffect(()=>{
      //console.log("heyy");
     
      
      const listener = onAuthStateChanged(auth, async (user) => {
       // console.log(user);
        setUser(!!user);
      });
    
      return () => {
        listener();
      };
    
  },[])

  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  const colors = ["primary", "secondary", "success", "warning", "error"];
  return (
    <div >
         <Navbar height={100} shouldHideOnScroll variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit"  size={25} style={{textDecoration:"underline"}}>
            ANIMOVIX
          </Text>
        </Navbar.Brand>

        <Navbar.Content activeColor={activeColor}  variant={variant}>

          <Navbar.Link href="/"><Text size={20}>Home</Text></Navbar.Link>
          <Navbar.Link href="/Anime"><Text size={20}> Anime</Text></Navbar.Link>
          <Navbar.Link href="/Movies"><Text size={20}>Moveis</Text></Navbar.Link>
          {user? 
           ( <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={auth.currentUser.photoURL}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {auth.currentUser.displayName}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                 <div onClick={signout}>Log Out</div>
                  
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>)
          :
          (<Navbar.Item>
            <Button auto flat as={Link} color={activeColor} onPress={signIn}>
              Sign In
            </Button>
          </Navbar.Item>)
        }
        
          </Navbar.Content>
      </Navbar>
     
    </div>
  )
}

export default Bar




