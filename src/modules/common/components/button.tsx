import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'outlined' | 'text' | 'icon';

type props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};


const variants: { [key in Variant]: string } = {
  primary: 'bg-blue-700 text-white border-primary px-4 py-2 h-12 min-w-40',
  secondary: 'bg-slate-100 text-gray-900 border-primary px-4 py-2 h-12 min-w-40',
  outlined: 'bg-white text-primary border border-primary px-4 py-2 h-12 min-w-40',
  text: 'bg-white text-textPrimary p-2',
  icon: 'border-none p-2 h-auto rounded-full hover:bg-gray-200'
};

export function Button({ variant = 'primary', onClick, children, className, disabled = false, type = 'button' }: props) {
  const baseClass = 'rounded-lg font-semibold px-4 py-1';

  return (
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
}
