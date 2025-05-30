'use client';

import { envVars } from 'Common';
import Image from 'next/image';

export function PublicNoNavHeaderView() {

  return (
    <header className="border-b h-20 px-[12vw] fixed z-50 w-full flex items-center justify-center bg-white">
      <Image
        alt="logo" 
        src={`${envVars.saAssetsUrl}/logo_lembra_ai.png`}
        width={140} 
        height={20} />
    </header>
  );
}
