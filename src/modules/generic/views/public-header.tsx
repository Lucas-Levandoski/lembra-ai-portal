'use client';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Button, envVars, Link, useAuth } from 'Common';
import Image from 'next/image';
import NextLink from 'next/link';
import { PiStackSimpleLight } from 'react-icons/pi';
import { UserInfo } from '../components';

export function PublicHeaderView() {
  const { login, register } = useAuth();

  return (
    <header className="border-b h-20 px-[12vw] fixed z-50 w-full flex items-center justify-between bg-white">
      <NextLink href="/">
        <Image
          alt="logo" 
          src={`${envVars.saAssetsUrl}/logo_lembra_ai.png`} 
          width={140} 
          height={20} />
      </NextLink>
      <nav className="flex gap-8">
        <Link route="/landing">Landing</Link>
        <Link route="/about-us">Sobre Nós</Link>

        <AuthenticatedTemplate>
          <Link route="/portal"><PiStackSimpleLight  strokeWidth={5} className="size-6"/>Portal</Link>
        </AuthenticatedTemplate>
      </nav>
      <div className="w-60">
        <AuthenticatedTemplate>
          <UserInfo />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="flex gap-4">
            <Button variant="text" onClick={() => login()}>login</Button>
            <Button variant="text" onClick={() => register()}>signup</Button>
          </div>
        </UnauthenticatedTemplate>
      </div>  
    </header>
  );
}
