const tenantName    = process.env.TENANT_NAME;
const clientID      = process.env.APP_ID;
const clientName    = process.env.APP_NAME;
const serverPort    = process.env.PORT || 3000;
const authenticatedUserTokens  = process.env.AUTHENTICATED_USER_TOKENS;

module.exports.serverPort = serverPort;

module.exports.credentials = {
  // bearer token
  identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
  clientID: clientID,
  validateIssuer: true,
  loggingLevel: "info",
  audience: `https://${tenantName}.onmicrosoft.com/${clientName}`,
  userTokens: authenticatedUserTokens
};