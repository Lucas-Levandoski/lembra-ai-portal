import { twMerge } from 'tailwind-merge';

type props = {
  state: boolean;
  onClick: () => void;
  className?: string;
  activeColors?: {
    bg: string,
    bullet: string,
  };
  inactiveColors?: {
    bg: string,
    bullet: string,
  }
}

export function Toggle({
  state, 
  onClick, 
  className, 
  activeColors = { bg: 'bg-blue-500', bullet: 'bg-white'  }, 
  inactiveColors = { bg: 'bg-slate-200', bullet: 'bg-gray-400' }
}: props) {
  return (
    <button
      className={twMerge('w-16 rounded-full px-1 h-8 items-center', state ? activeColors.bg : inactiveColors.bg, className)}
      onClick={() => onClick()}
      aria-checked={state}
      role="switch"
    >
      <span className={twMerge('flex rounded-full h-6 w-6 transition-all duration-200 ml-0', state ? activeColors.bullet : inactiveColors.bullet ,state && 'ml-8 mr-0')} />
    </button>
  )
}