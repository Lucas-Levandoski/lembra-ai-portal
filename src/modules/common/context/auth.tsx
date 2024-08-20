'use client';

import { useState, useEffect, createContext, ReactNode } from 'react';
import { useMsal } from '@azure/msal-react';
import { jwtDecode } from 'jwt-decode';

import { loginRequest, b2cPolicies } from 'Auth';
import { privateClient } from 'Common';

type User = {
  name: string;
  surname: string;
  email: string;
  accountProvider: string;
  imageUrl?: string;
};

type Token = {
  sub: string;
  emails: string[];
  name: string;
  given_name: string;
  idp: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState<User | null>(null);
  const request = { ...loginRequest, account: accounts[0] };
  const isAuthenticated = user != null;

  useEffect(() => {
    if(inProgress === 'none')
      saveInfoAfterLogin();
  }, [accounts, inProgress]);

  const saveInfoAfterLogin = async () => {
    if (accounts.length > 0) {
      const accessToken = await getAccessToken();

      if (accessToken) {
        setHeaderBearerToken(accessToken);
        saveInfoInLocalStorage(accessToken);
        defineUserInfo(accessToken);
      }
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await instance.acquireTokenSilent(request);
      if (response) {
        return response.idToken;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const defineUserInfo = (accessToken: string) => {
    const decodedToken: Token = jwtDecode(accessToken);

    setUser((prevState) => ({
      ...prevState,
      email: decodedToken?.emails[0] || '',
      name: decodedToken?.name.split(' ')[0] || '',
      surname: decodedToken?.name.split(' ')[1] || '',
      accountProvider: decodedToken?.idp || '',
    }));
  };

  const setHeaderBearerToken = (accessToken: string) => {
    privateClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  };

  const saveInfoInLocalStorage = (accessToken: string) => {
    localStorage.setItem(`REACT_TOKEN_AUTH_PORTAL_${process.env.NEXT_PUBLIC_MSAL_CLIENT_ID}`, accessToken);
  };

  const removeInfoFromLocalStorage = () => {
    localStorage.removeItem(`REACT_TOKEN_AUTH_PORTAL_${process.env.NEXT_PUBLIC_MSAL_CLIENT_ID}`);
  };

  const login = async () => {
    await instance.loginRedirect();
  };

  const register = async () => {
    try {
      instance.loginRedirect({
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        scopes: loginRequest.scopes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await instance.logoutRedirect();
      setUser(null);
      removeInfoFromLocalStorage();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}
