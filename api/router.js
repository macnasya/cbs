// const jwtAuthz = require('express-jwt-authz');
// const checkScopes = jwtAuthz([ 'read:profile', 'email' ]);
// function fromHeaderOrQuerystring (req) {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//   } else if (req.query && req.query.token) {
//     return req.query.token;
//   }
//   return null;
// }
const guard = require('express-jwt-permissions')({
  requestProperty: 'user',
  permissionsProperty: 'scope'
})
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const claimNamespace = 'https://cbs.webgears.org/'

var customClaims = (claims) => (req, res, next) => {
  claims.forEach(claim => {
    if(req.user[claimNamespace + claim]){
      req.user[claim] = req.user[claimNamespace + claim]
      delete req.user[claimNamespace + claim]
    }
  });
  next()
}

exports.init = (app, port) => {
  
  // Authentication middleware. When used, the
  // Access Token must exist and be verified against
  // the Auth0 JSON Web Key Set
  const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      credentialsRequired: true,
      jwksUri: `https://cbs.auth0.com/.well-known/jwks.json`
    }),

    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },  

    // Validate the audience and the issuer.
    audience: `http://localhost:${port}`,
    params: {scope: 'email'},
    issuer: `https://cbs.auth0.com/`,
    algorithms: ['RS256']
  });

  // This route doesn't need authentication
  app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });

  // This route need authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });

  app.get('/api/user/profile', 
    checkJwt, 
    guard.check(['read:profile']), 
    customClaims(['email', 'given_name', 'family_name']), 
    function(req, res) {
      
      res.json({
        name: req.user.given_name + ' ' + req.user.family_name
      });
  });

}