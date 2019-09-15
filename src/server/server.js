const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('../firebase/firebase-key.json');
const app = express();

console.log("hello")
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

app.use(cors());
app.use(express.static('dist'))


const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://prodigy-gate.auth0.com/.well-known/jwks.json`
    }),
    aud: "https://prodigy-gate.auth0.com/userinfo",
    iss: `https://prodigy-gate.auth0.com`,
    alg: 'RS256'
});


app.get('/firebase', jwtCheck, async(req, res) => {
    console.log(req.user)
        //const { sub: uid } = req.user;
    try {
        const firebaseToken = await firebaseAdmin.auth().createCustomToken(req.user.sub);
        res.json({ firebaseToken });

        firebaseAdmin.auth().updateUser("auth0|5d6b26917dbf4e0f14608d81", {
            displayName: "testuser"
        }).then(() => firebaseAdmin.auth().updateUser("auth0|5d6b26917dbf4e0f14608d81", { photoUrl: req.user.picture })).
        then(data => console.log(data))

    } catch (err) {
        res.status(500).send({
            message: 'Something went wrong acquiring a Firebase token.',
            error: err
        });
    }
});


app.get('*', (req, res) => {
    res.sendFile(__dirname + "/index.html", (err) => {
        console.log(err + "error");
    })
});










app.listen(3001, () => console.log('Server running on localhost:3001'));