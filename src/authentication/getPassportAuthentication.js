import passport from 'passport';
// import { OAuthBearerStrategy } from '@myob/myobal-passport';

const oAuthBearerOptions = {
  metadataAddress: process.env.AUTHENTICATION_OPENID_CONFIG_URL,
  passReqToCallback: true,
  validAudience: process.env.AUTHENTICATION_BFF_CLIENT_ID,
};

// const oAuthBearerStrategy = new OAuthBearerStrategy(oAuthBearerOptions,
  // ((request, token, validatedToken, done) => done(null, validatedToken)));

// passport.use(oAuthBearerStrategy);
passport.initialize();

const getPassportAuthentication = () => passport.authenticate('oauth-bearer', {
  session: false,
});

export default getPassportAuthentication;
