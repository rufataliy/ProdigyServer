const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('../firebase/firebase-key.json');
const app = express();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

app.use(cors());
// app.use("/static", express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist')) 
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html" , (err)=>{
    console.log(err + "error");
  })
});

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://prodigy-gate.auth0.com/.well-known/jwks.json`
  }),
  audience: "https://prodigy-gate.auth0.com/userinfo",
  issuer: `https://prodigy-gate.auth0.com/`,  
  algorithm: 'RS256'
});


app.get('/firebase', jwtCheck, async (req, res) => {
  const {sub: uid} = req.user;
  try {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
    res.json({firebaseToken});
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err
    });
  }
});






app.listen(3001, () => console.log('Server running on localhost:3001'));