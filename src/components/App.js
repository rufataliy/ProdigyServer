import React from "react";
import SliderDemo from "./Nav"
import TopNav from "./TopNav"
import { auth0Client } from "../auth0/auth0"
import { firebaseClient } from "../firebase/firebase"

const firebaseCustomToken = async function setFirebaseCustomToken(token) {
    const firebaseToken = await fetch('http://localhost:3001/firebase', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(token => token.json())
    return firebaseToken
}
const auth0ToFirebase = async() => {
    const authToken = await auth0Client.handleCallback();
    return authToken;
    //const token = loggedInThroughCallback ? await firebaseCustomToken() :"lolo";
    //return token
}

auth0ToFirebase().
then((token) => firebaseCustomToken(token)).then(fireToken => firebaseClient.setToken(fireToken.firebaseToken))

//firebaseClient.setToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU2ODMwNjM5NCwiZXhwIjoxNTY4MzA5OTk0LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay01aTZwZEBwcm9kaWd5LWI2MTRlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstNWk2cGRAcHJvZGlneS1iNjE0ZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImF1dGgwfDVkNmIyNjkxN2RiZjRlMGYxNDYwOGQ4MSJ9.sOAzTKXvLCJ_WUYHcRt_g2LqvJO_2o4-MPaIvz1MVu9BIFl3_71loxeMgJjNFsz51zJxeNkc1k3_u-zsH9iHm0I_pGhoaU2aKwI75k9WCLpm1dxl0Hzpp9ML5JATs7NpTWh1nAnKKaEMpta0myeEEzehBvV3tyXLlXpNkpDlzVJWj4sbT0chNIk5a7PJzis69TjiLSIkuc1GdbAWuGGSv6kWTaeBMYNTWsiOnxJ0S2iIbpUmLI76I3MVSSOKK8TKtZdQt-qtsmJZNgeLvDtN4S50mQWJd-oWMr-0GkiHnVBSvsYEQFyJPPyS9C-pvWKavukhyBDKXS3o7iE3IIudIQ")




class App extends React.Component {
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