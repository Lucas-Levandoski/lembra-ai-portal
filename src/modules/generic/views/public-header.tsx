'use client';

import { AuthenticatedTemplate } from '@azure/msal-react';
import { login } from 'Common';

export function PublicHeaderView() {
  return (
    <header className="border-b h-20 px-[12vw] flex justify-center items-center">
      <div className="flex justify-between">
        <nav className="flex gap-6">
          <a href="/landing">Product</a>
          <a href="/about-us">About Us</a>
          <AuthenticatedTemplate>
            <a href="/portal">Portal</a>
          </AuthenticatedTemplate>
        </nav>
        <button onClick={() => login()}> login </button>
      </div>
    </header>
  )
}