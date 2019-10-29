import React, { useContext } from "react"
import { Layout, Button } from "antd"
import { auth0Client } from "../auth0/auth0"
import { firebaseClient } from "../firebase/firebase"
import Context from "../store/context"
import { app } from "firebase"
const logOutHandle = () => {
    auth0Client.signOut();
    firebaseClient.firebaseSignOut();
}
const { Header } = Layout


const TopNav = () => {
    const { appState } = useContext(Context)
    const logBtnShow = () => {
        if (appState.loggedIn) {
            return <Button type="primary"
                onClick={
                    () => logOutHandle()
                } >
                Log out
        </Button>
        } else {
            return <Button type="primary"
                onClick={auth0Client.signIn} >
                Log in
        </Button>
        }
    }
    return (
        <Layout >
            <Header >
                {logBtnShow()}
            </Header>
        </Layout >
    )
}

export default TopNav