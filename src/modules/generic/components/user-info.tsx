'use client';

import { BouncingThreeDotsLoading, DropdownMenu, useAuth, Link, Button } from 'Common';
import { useInitializeUser } from 'Profile/hooks';
import { useStore } from 'Store';
import { useEffect } from 'react';
import { FiBell } from 'react-icons/fi';

export function UserInfo() {
  const { profile, isProfileLoading } = useStore(state => ({ 
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));
  const { logout } = useAuth();

  const { onInitilalize } = useInitializeUser();

  useEffect(() => {
    onInitilalize();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {
        profile && !isProfileLoading
          ? (
            <>
              {/* <Button variant="icon" onClick={() => logout()}> */}
              <FiBell className="size-6"/>
              {/* </Button> */}

              <DropdownMenu
                buttonContent={<>Olá, <b>{profile?.details.name}</b></>}
              >
                <Link route="/portal/profile">Alterar Perfil</Link>
                <Button variant="text" onClick={() => logout()}>Logout</Button>
              </DropdownMenu>
            </>
          )
          : <BouncingThreeDotsLoading />
      }
    </div>
  );
}