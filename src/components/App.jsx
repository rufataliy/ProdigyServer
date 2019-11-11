import React, { useEffect } from "react";
import SideNav from "./Nav.jsx"
import TopNav from "./TopNav.jsx"
import { authTokenFirebAuth0 } from "../firebase/authToFire"
import useGlobalState from "../store/useGlobalState"
import Context from "../store/context"
import { firebaseClient } from "../firebase/firebase"

const App = () => {
    console.log("app rerendered");
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
        <div>
            <Context.Provider value={appState}>
                <TopNav />
                {appState.loggedIn && <SideNav />}
            </Context.Provider>
        </div>
    )
}

export default App