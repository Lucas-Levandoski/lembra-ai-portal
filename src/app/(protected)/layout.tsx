'use client';

import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { ConsentComponent, loginRequest } from 'Auth';
import { MainContainer, useAuth } from 'Common';
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
            <ConsentComponent>
              <ProtectedHeaderView />
              <MainContainer>{children}</MainContainer>
            </ConsentComponent>
          )
          : <LoadingUserView />
      }
    </MsalAuthenticationTemplate>
  );
}
