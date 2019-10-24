import React, { useEffect } from "react";
import SideNav from "./Nav.jsx"
import TopNav from "./TopNav.jsx"
import { authTokenFirebAuth0 } from "../firebase/authToFire"
import useGlobalState from "../store/useGlobalState"
import Context from "../store/context"
import { firebaseClient } from "../firebase/firebase"

const App = () => {
    const store = useGlobalState();
    const { appState, actions } = store
    useEffect(
        () => {
            if (!appState.loggedIn) {
                authTokenFirebAuth0().then(() => {
                    firebaseClient.setAuthStateListener(() => {
                        if (firebaseClient.getCurrentUser()) {
                            console.log("yes");
                            actions({
                                type: "setAppState",
                                payload: { ...appState, loggedIn: true }
                            })
                        }
                    })
                })
            }

        }, [appState.loggedIn]
    )
    return (
        <Context.Provider value={store}>
            <TopNav />
            {appState.loggedIn && <SideNav />}
        </Context.Provider>
    )
}

export default App