'use client';

import { useAuth } from 'Common';
import Link from 'next/link';

export function UserInfo() {
  const { user } = useAuth();

  const domain = window ? window.location.origin : '';


  return (
    <div className="flex gap-2 flex-col">
      <h1>{user?.name} {user?.surname}</h1>
      <div className="flex gap-3 items-center">
        <span className='bg-blue-100 rounded-lg text-blue-700 px-3 py-1 font-semibold'>LINK</span>
        <Link 
          target='_blank'
          href={`/${user?.name.toLowerCase()}-${user?.surname.toLowerCase()}`}
          className="font-semibold text-blue-700"
        >
          {domain}/{user?.name.toLowerCase()}-{user?.surname.toLowerCase()}
        </Link>
      </div>
    </div>
  )
}