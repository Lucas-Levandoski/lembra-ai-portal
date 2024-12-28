import { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'danger' | 'outlined' | 'text' | 'icon' | 'unset';

type props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  route?: string | { pathname: string, query: { [name: string]: string }};
  routeTarget?: HTMLAttributeAnchorTarget;
};


const variants: { [key in Variant]: string } = {
  primary: 'bg-blue-700 text-white border-primary h-12 min-w-40',
  secondary: 'bg-slate-100 text-gray-900 border-primary h-12 min-w-40',
  danger: 'bg-red-500 text-white border-primary h-12 min-w-40',
  outlined: 'bg-white text-primary border-2 border-primary h-12 min-w-40',
  text: 'bg-white text-textPrimary p-2',
  icon: 'border-none p-2 rounded-full hover:bg-gray-200 transition-colors',
  unset: 'border-none bg-transparent p-0',
};

export function Button({ variant = 'primary', onClick, children, className, disabled = false, type = 'button', route, routeTarget }: props) {
  const baseClass = 'flex justify-center items-center rounded-lg font-semibold px-4';

  return (
    route && !disabled ? (
      <Link
        target={routeTarget}
        href={route}
        className={twMerge([
          baseClass,
          variants[variant],
          className,
          disabled && 'opacity-60 cursor-not-allowed'
        ])}
      >
        {children}
      </Link>
    ) : (
      <button 
        type={type}
        disabled={disabled}
        className={twMerge([
          baseClass,
          variants[variant],
          className,
          disabled && 'opacity-60 cursor-not-allowed'
        ])}
        onClick={onClick}
      >
        {children}
      </button>
    )
  
  );
}
