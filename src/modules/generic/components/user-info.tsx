'use client';

import { BouncingThreeDotsLoading, DropdownMenu, useAuth, Link, Button } from 'Common';
import { FiBell } from 'react-icons/fi';

export function UserInfo() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {
        user
          ? (
            <>
              {/* <Button variant="icon" onClick={() => logout()}> */}
              <FiBell className="size-6"/>
              {/* </Button> */}
              <DropdownMenu
                buttonContent={<>Olá, <b>{user?.name} {user?.surname}</b></>}
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