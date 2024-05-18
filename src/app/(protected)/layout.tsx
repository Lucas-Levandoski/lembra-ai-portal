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
      loadingComponent={() => (<div>Authenticating User</div>)}
      interactionType={InteractionType.Redirect} 
      authenticationRequest={loginRequest} 
    >
      <ProtectedHeaderView />
      <main className="px-[12vw] pt-16">{children}</main>
    </MsalAuthenticationTemplate>
  )
}
