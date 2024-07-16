'use client';

import Image from 'next/image';

export function PublicNoNavHeaderView() {

  return (
    <header className="border-b h-20 px-[12vw] mx-0 my-auto flex items-center justify-center bg-white">
      <Image
        alt="logo" 
        src="/assets/images/lembra-ai-logo.png" 
        width={140} 
        height={20} />
    </header>
  );
}