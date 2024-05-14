'use client';

import { Button, useAuth } from 'Common';
import { FiBell } from 'react-icons/fi';

export function UserInfo() {
  const { user } = useAuth();

  return (
    <div className='flex flex-row items-center'>
      <Button variant='icon' onClick={console.log}>
        <FiBell className="size-6"/>
      </Button>
      <Button variant='text' >
        Olá, {user?.name} {user?.surname}
      </Button>
    </div>
  )
}