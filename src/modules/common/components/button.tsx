import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'contained' | 'outlined' | 'text' | 'icon';

type props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// eslint-disable-next-line no-unused-vars
const variants: { [key in Variant]: string } = {
  contained: 'bg-blue-200 text-blue-700 border-primary px-4 py-2 h-12',
  outlined: 'bg-white text-primary border border-primary px-4 py-2 h-12',
  text: 'bg-white text-textPrimary p-2',
  icon: 'border-none p-2 h-auto rounded-full hover:bg-gray-100'
};

export function Button({ variant = 'contained', onClick, children }: props) {
  const baseClass = 'rounded-lg font-bold px-4 py-1';
  
  return (
    <button 
      className={twMerge([baseClass, variants[variant], 'font-bold'])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
