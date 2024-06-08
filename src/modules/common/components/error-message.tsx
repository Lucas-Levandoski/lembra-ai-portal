'use client';

import { twMerge } from 'tailwind-merge';

type props = {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: props) {
  return (
    <div className={twMerge('rounded flex items-center justify-center text-center bg-red-200 p-4', className)} >
      <p className="text-red-600">{message}</p>
    </div>
  )
}