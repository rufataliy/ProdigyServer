import React, { useContext } from "react"
import { Layout, Button } from "antd"
import { auth0Client } from "../auth0/auth0"
import { firebaseClient } from "../firebase/firebase"

const firebaseSignOut = firebaseClient.firebaseSignOut()
const logOutHandle = () => {
    auth0Client.signOut();
    firebaseClient.firebaseSignOut();
}
const { Header } = Layout

const TopNav = () => {
    return (
        <Layout >
            <Header >
                <Button type="primary"
                    onClick={auth0Client.signIn} >
                    Log in
                </Button>
                <Button type="primary"
                    onClick={
                        () => logOutHandle()
                    } >
                    Log out
                </Button>
            </Header>
        </Layout >
    )
}

export default TopNav