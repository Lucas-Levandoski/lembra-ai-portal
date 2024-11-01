'use client';

import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { loginRequest } from 'Auth';
import { useAuth } from 'Common';
import { LoadingUserView, ProtectedHeaderView } from 'Generic';

type props = Readonly<{children: React.ReactNode}>;

export default function ProtectedLayout({children}: props) {
  const { isAuthenticated } = useAuth();

  return (
    <MsalAuthenticationTemplate 
      loadingComponent={LoadingUserView}
      interactionType={InteractionType.Redirect} 
      authenticationRequest={loginRequest} 
    >
      {
        isAuthenticated
          ? (
            <>
              <ProtectedHeaderView />
              <main className="px-[12vw] pt-10">{children}</main>
            </>
          )
          : <LoadingUserView />
      }
    </MsalAuthenticationTemplate>
  );
}
