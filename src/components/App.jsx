import React, { useEffect } from "react";
import SliderDemo from "./Nav.jsx"
import TopNav from "./TopNav.jsx"
import { authTokenFirebAuth0 } from "../firebase/authToFire"
import useGlobalState from "../store/useGlobalState"
import Context from "../store/context"

const App = () => {
    const store = useGlobalState();
    useEffect(
        () => { authTokenFirebAuth0() },
    )
    return (
        <Context.Provider value={store}>
            <TopNav />
            <SliderDemo />
        </Context.Provider>
    )
}

export default App