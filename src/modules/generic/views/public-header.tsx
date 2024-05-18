'use client';

import { AuthenticatedTemplate } from '@azure/msal-react';
import { Button, Link, useAuth } from 'Common';
import Image from 'next/image';
import NextLink from 'next/link';
import { PiStackSimpleLight } from 'react-icons/pi';
import { UserInfo } from '../components';

export function PublicHeaderView() {
  const { login, register, isAuthenticated } = useAuth();

  return (
    <header className="border-b h-20 px-[12vw] mx-0 my-auto flex items-center justify-between bg-white">
      <NextLink href='/'>
        <Image
          alt='logo' 
          src='/assets/images/lembra-ai-logo.png' 
          width={140} 
          height={20} />
      </NextLink>
      <nav className="flex gap-8">
        <Link route='/landing'>Landing</Link>
        <Link route='/about-us'>Sobre Nós</Link>
          
        <AuthenticatedTemplate>
          <Link route='/portal'><PiStackSimpleLight  strokeWidth={5} className='size-6'/>Portal</Link>
        </AuthenticatedTemplate>
      </nav>
      {
        isAuthenticated 
          ? <UserInfo />
          : (
            <div className='flex gap-4'>
              <Button variant='text' onClick={() => login()}> login </Button>
              <Button variant='text' onClick={() => register()}> signup </Button>
            </div>
          )
      }
    </header>
  )
}
