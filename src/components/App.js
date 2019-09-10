import React from "react";
import SliderDemo from "./Nav"
import TopNav from "./TopNav"
import {auth0Client} from "../auth0/auth0"

(async () => {
  const loggedInThroughCallback = await auth0Client.handleCallback();
  if (loggedInThroughCallback) await firebaseCustomToken();
})()
const firebaseCustomToken = async function setFirebaseCustomToken() {
  const response = await fetch('http://localhost:3001/firebase', {
    headers: {
      'Authorization': `Bearer ${auth0Client.getIdToken()}`,
    },
  })
  console.log(auth0Client.getResult());
  
}
  console.log(firebaseCustomToken());
  



 class App extends React.Component {
   render (){
       
       return (
            <div>
              <TopNav/>
              <SliderDemo />
            </div>
             
       )
    }
  }

 export default App