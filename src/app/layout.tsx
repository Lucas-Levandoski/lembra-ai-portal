'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'Auth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <html lang="en">
      <MsalProvider instance={msalInstance}>
        <body className={inter.className}>{children}</body>
      </MsalProvider>
    </html>
  );
}
