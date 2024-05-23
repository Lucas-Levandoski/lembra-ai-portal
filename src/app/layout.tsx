'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { MsalProvider } from '@azure/msal-react';
import { AuthContextProvider } from 'modules/common/context/auth';
import { EventType, PublicClientApplication, SilentRequest } from '@azure/msal-browser';
import { msalConfig } from 'Auth';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

type props = Readonly<{children: React.ReactNode;}>


const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && (event.payload! as SilentRequest).account) {
      const account = (event.payload! as SilentRequest).account ?? null;
      msalInstance.setActiveAccount(account);
    }
  });
});

export default function RootLayout({children}: props) {

  return (
    <html lang="en">
      <MsalProvider instance={msalInstance}>
        <AuthContextProvider>
          <body className={inter.className} suppressHydrationWarning>
            <ToastContainer />
            {children}
          </body>
        </AuthContextProvider>
      </MsalProvider> 
    </html>
  );
}
