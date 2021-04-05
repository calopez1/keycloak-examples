const request = require('request')
const express = require('express')

var router = express.Router();
const app = express();
const port = 5000;

//------------------Begin Online token validation---------------------//
// const keycloakHost = 'localhost';
// const keycloakPort = '8080';
// const realmName = 'djangowebapp-realm';

// let resp;
// // check each request for a valid bearer token
// app.use((req, res, next) => {
//   // assumes bearer token is passed as an authorization header
//   console.log("req.headers.authorization",req.headers.authorization)
//   if (req.headers.authorization) {
//     // configure the request to your keycloak server
//     const options = {
//       method: 'GET',
//       url: `http://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
//       headers: {
//         // add the token you received to the userinfo request, sent to keycloak
//         Authorization: req.headers.authorization,
//       },
//     };

//     // send a request to the userinfo endpoint on keycloak
//     request(options, (error, response, body) => {
//       console.log("validating...")
//       if (error) throw new Error(error);

//       // if the request status isn't "OK", the token is invalid
//       if (response.statusCode !== 200) {
//         res.status(401).json({
//           error: `unauthorized`,
//         });
//       }
//       // the token is valid pass request onto your next function
//       else {
//         // console.log("response",response.body)
//         resp = response.body
//         next();
//       }
//     });

//   } else {
//     // there is no token, don't process request further
//     res.status(401).json({
//       error: `unauthorized`,
//     });
//   }
// });

// // configure your protected routes
// app.use('/user', (req, res) => {
//   console.log("/user",resp)
//   res.send(resp) 
// });

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   console.log("/error")
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//------------------End Online token validation---------------------//

//------------------Begin Offline token validation---------------------//
const publicKey = '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwBgGxrFXyGSFyTlBtlk5UyG/rMO0ELXQYbU7Jf9qq3OiwlULZpM88SMsOB5YF3t0cuXkv2Tz7w2PK/Wrp5MP3eUP5soszp9fYLDX438f4/ZWrRkHYnWxl65ty9qmFXubi2+yvllv1l3lQKUyb0Z0K/vrcMNT4BpUWABqUmHvoApGcIBzhyeZUcyqVg3jrGYSRJJPF5xKv/HX1Dtof9pnPBwjjIYZnqBosusLl2zhlLIU5L+0NMpYrP6xaTANNFsJfvhdEP66+TltzqiMyZ6aSZHyMsIrpwAv+pa83p00G5g3kM6Y6IXH7lR2oHyJs//jkLY/pe/FQBachWFFrWEzuQIDAQAB\r\n-----END PUBLIC KEY-----';//JSON.parse(res.getBody().toString());

var jwt = require('express-jwt');

app.get('/user',
  jwt({ secret: publicKey, algorithms: ['RS256'] }),
  function(req, res) {
    console.log("/user",req.user)
    // if (!req.user.admin) return res.sendStatus(401);
    res.send(req.user) ;
  });
//------------------End Offline token validation---------------------//

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

