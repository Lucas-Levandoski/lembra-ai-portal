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
            <div>
              <Button route={`${envVars.googleConsentUrl}`} routeTarget="_blank">Atualizar permissões do Google Account</Button>
            </div>
          )
      }
    </>
  );
}