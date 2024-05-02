import { PublicClientApplication, SilentRequest } from '@azure/msal-browser';
import { msalConfig } from 'Auth';
import { loginRequest } from 'Auth';

export const getAccessToken = async (): Promise<string> => {
  const accounts = msalInstance.getAllAccounts();

  const request: SilentRequest = { ...loginRequest, account: accounts[0] };

  const authResult = await msalInstance.acquireTokenSilent(request);

  return authResult.idToken;
};

export const logout = async() => {
  await msalInstance.logoutRedirect();
}

export const login = async() => {
  await msalInstance.loginRedirect();
}

export const msalInstance = new PublicClientApplication(msalConfig);
