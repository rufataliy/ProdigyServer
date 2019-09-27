import { auth0Client } from "../auth0/auth0"
import { firebaseClient } from "../firebase/firebase"

const auth0ToFirebase = async() => {
    const authToken = await auth0Client.handleCallback();
    return authToken;

}

const firebaseCustomToken = async function setFirebaseCustomToken(tokenFromAuth) {
    const firebaseTokenRequest = await fetch('http://localhost:3001/firebase', {
        headers: {
            'Authorization': `Bearer ${tokenFromAuth}`,
        },
    }).then(token => token.json());
    const token = await firebaseTokenRequest.firebaseToken;
    console.log(token);
    await firebaseClient.setToken(token);
    console.log(auth0Client.getResult());
}

export const authTokenFirebAuth0 = () => auth0ToFirebase().then(token => firebaseCustomToken(token));