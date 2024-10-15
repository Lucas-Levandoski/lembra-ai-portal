'use client';

import { twMerge } from 'tailwind-merge';

type props = {
  message: string;
  className?: string;
}

export function StatusMessage({ message, className }: props) {
  return (
    <div className={twMerge('rounded flex items-center justify-center text-center bg-blue-200 p-4', className)} >
      <p className="text-blue-700">{message}</p>
    </div>
  );
}