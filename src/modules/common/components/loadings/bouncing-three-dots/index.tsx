
// copied from codepen
// https://codepen.io/Diana-Moretti/pen/PoLrqZV

import { twMerge } from 'tailwind-merge';
import './index.css';

type Variant = 'primary' | 'secondary';

type props = {
  variant?: Variant,
}


const variants: { [key in Variant]: string } = {
  primary: 'bg-blue-600',
  secondary: 'bg-slate-100',
};


export function BouncingThreeDotsLoading({ variant = 'primary' }: props) {
  return (
    <div className="flex items-center w-14 h-7">
      <div className="loader">
        <div className={twMerge('dot', variants[variant])}></div>
        <div className={twMerge('dot', variants[variant])}></div>
        <div className={twMerge('dot', variants[variant])}></div>
      </div>
    </div>
  );
}