'use strict';
require('dotenv-extended').load();

const
      restify = require('restify')
    , restifyPlugins = require('restify-plugins')
    , passport = require('passport')
    , BearerStrategy = require('passport-azure-ad').BearerStrategy
    , config = require('./config')
    , authenticatedUserTokens = [config.credentials.userTokens]
    , serverPort = process.env.PORT || config.serverPort
;

// https://github.com/AzureAD/passport-azure-ad#51-oidcstrategy
const bearerAuthenticationStrategy = new BearerStrategy(config.credentials, (token, done) => {
    let currentUser = null;

    console.log(token);
    console.log(authenticatedUserTokens);

    let userToken = authenticatedUserTokens.find((user) => {
        currentUser = user;
        user.sub === token.sub;
    });

    if(!userToken) {
        authenticatedUserTokens.push(token);
    }
    
    console.log("token:" + token.toString());
    console.log(currentUser);
    return done(null, currentUser, token);
});

passport.use(bearerAuthenticationStrategy);

const server = restify.createServer({ name: 'Azure Active Directroy with Node.js Demo' });
server.use(restifyPlugins.authorizationParser());
server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req, res, next) => {
    res.send(200, 'Try: curl -isS -X GET http://127.0.0.1:3000/api');
    console.log("received unauthenticated request");
    return next();
});

server.get('/api', passport.authenticate('oauth-bearer', { session: false }), (req, res, next) => {
    res.json({ message: 'response from API endpoint' });
    console.log("received authenticated request");
    return next();
});

server.post('/api', passport.authenticate('oauth-bearer', { session: false }), (req, res, next) => {
    res.json({ message: 'response from API endpoint' });
    console.log("received authenticated request");
    return next();
});

server.listen(serverPort);