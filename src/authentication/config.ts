import { Configuration } from '@azure/msal-browser';
import { b2cPolicies } from './policies';
import { envVars } from 'Common';

const { msalClientID, msalLogoutRedirectURI, msalRedirectURI } = envVars;

export const msalConfig: Configuration = {
  auth: {
    clientId: msalClientID,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: msalRedirectURI,
    postLogoutRedirectUri:msalLogoutRedirectURI
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

export const loginRequest = {
  scopes: ['openid', 'offline_access'],
};
