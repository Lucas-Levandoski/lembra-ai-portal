
// copied from codepen
// https://codepen.io/Diana-Moretti/pen/PoLrqZV

import { twMerge } from 'tailwind-merge';
import './index.css';

type Variant = 'primary' | 'secondary';

type props = {
  variant?: Variant,
  shouldFloatMiddle?: boolean,
  className?: string,
}


const variants: { [key in Variant]: string } = {
  primary: 'bg-blue-600',
  secondary: 'bg-slate-100',
};


export function BouncingThreeDotsLoading({ variant = 'primary', shouldFloatMiddle, className }: props) {
  return (
    <div className={ twMerge('flex items-center w-14 h-7', shouldFloatMiddle && 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2', className)}>
      <div className="loader">
        <div className={twMerge('dot', variants[variant])}></div>
        <div className={twMerge('dot', variants[variant])}></div>
        <div className={twMerge('dot', variants[variant])}></div>
      </div>
    </div>
  );
}