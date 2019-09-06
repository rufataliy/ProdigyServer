import {auth0Client} from "../auth0/auth0"

const setTokenToFirebase = async function setFirebaseCustomToken() {
    const response = await fetch('http://localhost:3002/firebase', {
      headers: {
        'Authorization': `Bearer ${auth0Client.getIdToken()}`,
      },
    });
  
    const data = await response.json();
    await firebaseClient.setToken(data.firebaseToken);
    await firebaseClient.updateProfile(auth0Client.getProfile());
  }

export const sendToken = (async () => {
  
    const loggedInThroughCallback = await auth0Client.handleCallback();
    if (loggedInThroughCallback) await setTokenToFirebase();
})()

  