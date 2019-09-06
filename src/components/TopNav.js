import React from "react"
import {Layout,Button} from "antd"
import {auth0Client} from "../auth0/auth0"
import firebaseClient from "../firebase/firebase"
const authSignIn = auth0Client.signIn()
const authSignOut = auth0Client.signOut()

const firebaseSignOut = firebaseClient.firebaseSignOut()
const logOutHandle = ()=>{
    authSignOut();
    firebaseSignOut();
}
const {Header} = Layout

const TopNav = () => {
    
    
    return (
        <Layout>
            <Header>
            <Button type="primary" 
                    onClick={()=> authSignIn()}>
                Log in
            </Button>
          

             <Button type="primary" 
                    onClick={()=> logOutHandle()}>
                Log out
            </Button>
            
            </Header>
        </Layout>
    )
}

export default TopNav