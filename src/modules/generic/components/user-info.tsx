'use client';

import { BouncingThreeDotsLoading, DropdownMenu, useAuth, Link, Button, ErrorMessage } from 'Common';
import { useInitializeUser } from 'Profile/hooks';
import { useStore } from 'Store';
import { AiFillSetting } from 'react-icons/ai';

export function UserInfo() {
  const { profile, isProfileLoading } = useStore(state => ({ 
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));
  const { logout } = useAuth();

  useInitializeUser();

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
              buttonContent={
                <span className="flex items-center min-w-[210px]">
                  <AiFillSetting className="mr-3" size="20"/>
                  Olá,<b className="ml-1">{profile?.details.name}</b>
                </span>
              }
            >
              <Link route="/portal/profile/my-profile">Meu Perfil</Link>
              <Link route="/portal/profile/visual-identity">Identidade Visual</Link>
              <Link route="/portal/profile/my-link">Meu Link</Link>
              <Link route="/portal/profile/manage-connections">Gerenciar Conexões</Link>
              <Button  variant="outlined" onClick={() => logout()}>Logout</Button>
            </DropdownMenu>
          </>
      }
    </div>
  );
}