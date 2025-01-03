'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { PiCaretDownBold  } from 'react-icons/pi';


type props = {
  children: [ReactNode, ReactNode];
  isOpen?: boolean;
  onChange?: (newState: boolean) => void;
  className?: string;
}

export function Accordion({ children, className, isOpen = true, onChange = () => {}  }: props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(contentRef.current?.scrollHeight || 0);
  }, [contentRef.current?.scrollHeight]);

  return (
    <div className={twMerge('w-full rounded-md border p-2 bg-slate-100', className)}>
      <Button className="flex items-center relative w-full font-normal justify-normal" variant="unset" onClick={() => onChange(!isOpen)}>
        {children[0]}
        <span 
          className="absolute right-0 flex justify-center items-center font-semibold px-4 p-2 rounded-full hover:bg-gray-200 transition-colors" 
          onClick={() => onChange(!isOpen)}
        >
          <PiCaretDownBold className={twMerge('transition-transform duration-300', isOpen && 'rotate-180')}  />
        </span>
      </Button>
      <div ref={contentRef} style={{ height: isOpen ? `${height}px` : '0px' }} className="transition-all overflow-hidden">
        <div className={twMerge('opacity-0 transition-opacity delay-100 duration-500', isOpen && 'opacity-100')}>
          {children[1]}
        </div>
      </div>
    </div>
  );
};