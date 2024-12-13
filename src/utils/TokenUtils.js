export const getTokenInfo = (keycloak) => keycloak.token;
export const getParsedToken = (keycloak) => keycloak.tokenParsed;
export const isTokenExpired = (keycloak, seconds) => keycloak.isTokenExpired(seconds);