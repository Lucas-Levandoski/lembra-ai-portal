'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from 'Common';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MsalProvider instance={msalInstance}>
        <body className={inter.className}>{children}</body>
      </MsalProvider>
    </html>
  );
}
