const authenticationOptions = {
  authority: process.env.AUTHENTICATION_AUTHORITY,
  clientId: process.env.AUTHENTICATION_BFF_CLIENT_ID,
  clientSecret: process.env.AUTHENTICATION_BFF_CLIENT_SECRET,
  resource: process.env.AUTHENTICATION_GATEWAY_CLIENT_ID,
};


const skipExchangeToken = () => 'noAuth';

const exchangeToken = skipExchangeToken

export default exchangeToken;
