'use client';

import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { loginRequest } from 'Auth';
import { ProtectedHeaderView } from 'Generic';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MsalAuthenticationTemplate 
      interactionType={InteractionType.Redirect} 
      authenticationRequest={loginRequest} 
    >
      <ProtectedHeaderView />
      <main className="px-[12vw]">{children}</main>
    </MsalAuthenticationTemplate>
  )
}
