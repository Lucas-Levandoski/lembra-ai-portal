'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { MsalProvider } from '@azure/msal-react';
import { AuthContextProvider } from 'modules/common/context/auth';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'Auth';

const inter = Inter({ subsets: ['latin'] });

type props = Readonly<{children: React.ReactNode;}>

export default function RootLayout({children}: props) {
  const msalInstance = new PublicClientApplication(msalConfig);
  
  return (
    <html lang="en">
      <MsalProvider instance={msalInstance}>
        <AuthContextProvider>
          <body className={inter.className}>{children}</body>
        </AuthContextProvider>
      </MsalProvider>
    </html>
  );
}
