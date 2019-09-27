import React from "react";
import SliderDemo from "./Nav"
import TopNav from "./TopNav"
import { authTokenFirebAuth0 } from "../firebase/authToFire"

class App extends React.Component {
    componentDidMount() {
        authTokenFirebAuth0()
    }
    render() {
        return ( <
            div >
            <
            TopNav / >
            <
            SliderDemo / >
            <
            /div>
        )
    }
}

export default App