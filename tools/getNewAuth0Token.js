const request = require("request");
const Token = require("../models/Token")
var options = {
    method: 'POST',
    url: 'https://prodigy-gate.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: `{"client_id":"${process.env.CLIENT_ID}","client_secret":"${process.env.CLIENT_SECRET}","audience":"https://prodigy-gate.auth0.com/api/v2/","grant_type":"client_credentials"}`
};

const refreshToken = () => request(options, function(error, response, body) {
    if (error) throw new Error(error);
    const token = { access_token: JSON.parse(body).access_token }
    console.log(token);

    Token.updateOne(token)
        .then(token => console.log(token))
        .catch(err => console.log(err))
});


module.exports = refreshToken