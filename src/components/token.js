import axios from "axios"

const options = { method: 'POST',
  url: 'https://prodigy-gate.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"edyE5RK7G4frIdm0ryHaB6ia0xhEpos0","client_secret":"R2gO1ofyeJHC_jGgW6NBwDfS87-1N11SkisdBlbuhdOWFrrrNWL1oBhZq48Ja4w_","audience":"http://localhost:3000","grant_type":"client_credentials"}' };

axios(options, function (error, response, body) {
    console.log(token);
  if (error) throw new Error(error);
});

