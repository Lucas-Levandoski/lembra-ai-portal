'use client';

import { Button, CirclingFourDotsLoading, envVars, ErrorMessage } from 'Common';
import { useStore } from 'Store';


export function GoogleAccount() {
  const { profile, isProfileLoading } = useStore(state => ({
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));
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
              <Button route={`${envVars.googleConsentUrl}`} routeTarget="_blank">Atualizar permissões</Button>
            </div>
          )
      }
    </>
  );
}