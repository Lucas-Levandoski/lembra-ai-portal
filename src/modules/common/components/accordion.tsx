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
    const updateHeight = () => {
      setHeight(contentRef.current?.scrollHeight || 0);
    };

    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

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
      <div style={{ height: isOpen ? `${height}px` : '0px' }} className="transition-all overflow-hidden">
        <div ref={contentRef}  className={twMerge('opacity-0 transition-opacity delay-100 duration-500 py-4', isOpen && 'opacity-100')}>
          {children[1]}
        </div>
      </div>
    </div>
  );
};