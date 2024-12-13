import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/',
  realm: 'OnlineOrderManagement-Realm',
  clientId: 'OnlineOrderManagement-Client',
};

const keycloak = new Keycloak(initOptions);

export const initializeKeycloak =  (httpClient) =>
  keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: true,
    pkceMethod: 'S256',
  }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;
      console.log("77777 ****", keycloak.authenticated);

      keycloak.onTokenExpired = () => {
        console.log('Token expired');
        localStorage.setItem('user', {
          email: keycloak.tokenParsed.email,
          firstname: keycloak.tokenParsed.given_name,
          lastname: keycloak.tokenParsed.family_name,
          roles: keycloak.tokenParsed.realm_access.roles,
        });
      };
    }
  }).catch(() => {
    console.error("Authentication Failed");
  });

export default keycloak;