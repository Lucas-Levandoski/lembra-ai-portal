'use client';

import { AnchorHTMLAttributes } from 'react'
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  route: string,
  unsetStyle?: boolean,
}

export function Link({ children, route, target, unsetStyle = false }: props) {
  const isRoute = usePathname().includes(route);

  return (
    <NextLink 
      className={twMerge([
        'px-4 py-1 flex items-center gap-2 rounded-md hover:bg-slate-100 transition-all duration-300',
        isRoute && 'font-bold text-blue-600 bg-blue-100 hover:bg-blue-50'
      ])}
      href={route}
      target={target}>
      {children}
    </NextLink>
  )
}