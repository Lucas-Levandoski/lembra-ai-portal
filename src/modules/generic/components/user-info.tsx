'use client';

import { BouncingThreeDotsLoading, Button, useAuth } from 'Common';
import { FiBell } from 'react-icons/fi';

export function UserInfo() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-row items-center justify-center">
      {
        user
          ? (
            <>
              <Button variant="icon" onClick={() => logout()}>
                <FiBell className="size-6"/>
              </Button>
              <Button variant="text" >
                Olá, {user?.name} {user?.surname}
              </Button>
            </>
          )
          : <BouncingThreeDotsLoading />
      }
    </div>
  );
}