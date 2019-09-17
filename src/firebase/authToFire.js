import { auth0Client } from "../auth0/auth0"
import { firebaseClient } from "../firebase/firebase"
const firebaseCustomToken = async function setFirebaseCustomToken(authToken) {
    const firebaseTokenRequest = await fetch('http://localhost:3001/firebase', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    }).then(token => token.json());
    const token = await firebaseTokenRequest.firebaseToken;

    await firebaseClient.setToken(token);
    console.log(auth0Client.getProfile());
    console.log(auth0Client.getResult());
}
const auth0ToFirebase = async() => {
    const authToken = await auth0Client.handleCallback();
    return authToken;
}



export const authTokenFirebAuth0 = () => auth0ToFirebase().then((token) => firebaseCustomToken(token))