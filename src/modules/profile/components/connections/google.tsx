'use client';

import { CirclingFourDotsLoading, Button, envVars, ErrorMessage, GOOGLE_SCOPES_MASKS } from 'Common';
import { useCheckGoogleConnection } from 'Profile/hooks';
import { useStore } from 'Store';


export function GoogleAccount() {
  const { profile, isProfileLoading } = useStore(state => ({
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));

  const { connectionStatus, isLoading } = useCheckGoogleConnection();

  return (
    <>
      {
        isProfileLoading && <CirclingFourDotsLoading />
      }

      {
        !profile 
          ? <ErrorMessage message="Falha ao carregar dados de usuário" />
          : (
            <div className="flex flex-col gap-4">
              <h2>Google Account</h2>
              <div className="flex items-center gap-3">
                <span>Conta Conectada:</span>
                <span className="border py-2 px-3 rounded-xl bg-blue-100">{profile.details.email}</span>
              </div>
              {
                isLoading
                  ? <CirclingFourDotsLoading />
                  : (
                    <div className="flex mx-auto">
                      <div className="flex flex-col gap-3 text-center">
                        <h3>Escopos connectados{connectionStatus.hasMissingScopes && <><br/>Nenhum escopo pendente</>}</h3>
                        <ul className="flex flex-col w-full gap-2">
                          {connectionStatus.connectedScopes.map(scope => (
                            <li key={scope} className="rounded-lg px-2 py-1 mx-auto bg-green-300">{GOOGLE_SCOPES_MASKS[scope]}</li>
                          ))}
                        </ul>
                      </div>
                      {
                        connectionStatus.hasMissingScopes && (
                          <div className="flex flex-col gap-3 text-center border-l pl-2 ml-2">
                            <h3>Escopos com aprovação pendente</h3>
                            <ul className="flex flex-col w-full gap-2">
                              {connectionStatus.missingScopes.map(scope => (
                                <li key={scope} className="rounded-lg px-2 py-1 mx-auto bg-red-300">{GOOGLE_SCOPES_MASKS[scope]}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                    </div>
                  )
              }
              <Button route={`${envVars.googleConsentUrl}`} routeTarget="_blank">Atualizar permissões</Button>
            </div>
          )
      }
    </>
  );
}