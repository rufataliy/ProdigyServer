import auth0 from "auth0-js"


let _auth0Client = null;
let _idToken = null;
let _profile = null;

class Auth0Client {
  constructor() {
    _auth0Client = new auth0.WebAuth({
      domain: 'prodigy-gate.auth0.com',
      audience: 'https://prodigy-gate.auth0.com/userinfo',
      clientID: 'miketN2zFghcI3DiW2pkdBOYmA3uLslb',
      redirectUri: 'http://localhost:3001',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  getIdToken() {
    return _idToken;
  }

  getProfile() {
    return _profile;
  }

  handleCallback() {
    return new Promise((resolve, reject) => {
      _auth0Client.parseHash({hash: window.location.hash}, (err, authResult) => {
        if (err) {
          return console.log(err);
        }
      
      _auth0Client.client.userInfo(authResult.accessToken, (err, user) => {
        if(err) {
          return err
        }else {
          console.log(user) 
        }
        })
      });
    });
  }

  signIn() {
    _auth0Client.authorize();
    handleCallback()
    
  }

  signOut() {
    _auth0Client.logout({
      returnTo: "http://localhost:3001/",
      clientID: 'miketN2zFghcI3DiW2pkdBOYmA3uLslb',
      federated: true
    })
    _idToken = null;
    _profile = null;
  }
}

export const auth0Client = new Auth0Client();