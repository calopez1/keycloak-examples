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
const publicKey = '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk9tD7acdqbnZ9X8EOq+8YhRq6f4HcWCx00+O2aPJOTvZ7IYyhyHV7sdoAXZXiHc/Zb2fZzTKWSJVEuIRjkpUt3ExkNLdvBYyL/V4du1isZAw5AN7DGdcRLKSNN4J90U4qKPc1Gch0KhNZdxzB1eyaSlxa9ICGhtZVWKq5izZ+n7pjHx3y4ViAWTY9lvWARVaAmtfAcrCUJbhH7yWEffJPKnel/3h62qS6+DnC/gDxLRrueURubGfTgQOWNXmzg+h8xpDNDSMQBZzuGA0q4tDGRiyyTE35b2UE2mcO604kHfC16GkBB648CidrxPSJ5qlqIKDwzIwNKbcGoWqaY9x1QIDAQAB\r\n-----END PUBLIC KEY-----';//JSON.parse(res.getBody().toString());

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

