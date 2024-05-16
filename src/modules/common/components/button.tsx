import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'outlined' | 'text' | 'icon';

type props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// eslint-disable-next-line no-unused-vars
const variants: { [key in Variant]: string } = {
  primary: 'bg-blue-700 text-white border-primary px-4 py-2 h-12 min-w-40',
  secondary: 'bg-slate-100 text-gray-900 border-primary px-4 py-2 h-12 min-w-40',
  outlined: 'bg-white text-primary border border-primary px-4 py-2 h-12 min-w-40',
  text: 'bg-white text-textPrimary p-2',
  icon: 'border-none p-2 h-auto rounded-full hover:bg-gray-100'
};

export function Button({ variant = 'primary', onClick, children, className }: props) {
  const baseClass = 'rounded-lg font-semibold px-4 py-1';
  
  return (
    <button 
      className={twMerge([
        baseClass, 
        variants[variant], 
        className
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
