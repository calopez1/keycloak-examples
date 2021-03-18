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
const publicKey = '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiz4BKT01kdAtCwuf3iCx+I2Mykqq2NNhobOCvgS6GiEMrIvotQHbClM9QB6v5+4L0YzQbe/sm1Hhv9T7ERzfvkqfhIJX77DduaWPU553PvssZFqLOVDvUmbAwIcccjzgmYF/40SN4KWPZ0EdfyCNE3MUA8f6TW9te2RRZGHhizVV+kKqqmSzFxL1CtBrYGzWm83PEATHBu1BKa9kAX3A2a4VswZeSZHKjmw3nF5GXCiCUQp+oOqVrsgeqX11THwxYmAMBkui+Pjzdn3cLHAo1Zw7LYQNgmUkZuLy1mAtm0kEmjWsnmTFxTqOFCOaNwWHBbpgqoant10WUfddGqVyJQIDAQAB\r\n-----END PUBLIC KEY-----';//JSON.parse(res.getBody().toString());

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

