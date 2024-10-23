'use client';

import { BouncingThreeDotsLoading, DropdownMenu, useAuth, Link, Button, ErrorMessage } from 'Common';
import { useInitializeUser } from 'Profile/hooks';
import { useStore } from 'Store';
import { useEffect } from 'react';

export function UserInfo() {
  const { profile, isProfileLoading } = useStore(state => ({ 
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));
  const { logout } = useAuth();

  const { onInitialize } = useInitializeUser();

  useEffect(() => {
    onInitialize();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      { isProfileLoading && <BouncingThreeDotsLoading /> }
      { profile === undefined && !isProfileLoading && <ErrorMessage message="Falha ao carregar usuário" /> }
      {
        profile && !isProfileLoading && 
          <>
            {/* <Button variant="icon" onClick={() => logout()}> */}
            {/* <FiBell className="size-6"/> */}
            {/* </Button> */}

            <DropdownMenu
              buttonContent={<>Olá, <b>{profile?.details.name}</b></>}
            >
              <Link route="/portal/profile">Alterar Perfil</Link>
              <Button variant="text" onClick={() => logout()}>Logout</Button>
            </DropdownMenu>
          </>
      }
    </div>
  );
}