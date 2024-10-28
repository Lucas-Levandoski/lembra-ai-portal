'use client';

import { Button } from 'Common';
import { ReactNode, Children, useState, cloneElement, ReactElement, isValidElement, useRef, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';


type OptionProps = {
  children?: ReactNode;
  onClick?: (value: any) => void;
  value?: any;
  className?: string;
}

export function Option({ children, onClick = () => {}, value, className }: OptionProps) {
  return (
    <Button variant="icon" className={twMerge('rounded-none flex items-center gap-3 justify-center font-normal', className)} onClick={() => onClick(value)}>
      {children}
    </Button>
  );
}

type SelectProps = {
  id?: string;
  children?: ReactNode;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  className?: string;
  fixedValue?: string;
}

export function Select({ id, children, value, className, placeholder = '', onChange = () => {}, fixedValue }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (_value: any) => {
    handleToggle();
    onChange(_value);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id={id} className={twMerge('relative w-full flex h-12', className)} ref={divRef}>
      <div className={
        twMerge(
          'transition-all duration-300 absolute flex flex-col w-full max-h-0 overflow-auto translate-y-14 z-10', 
          'rounded-lg bg-white shadow-lg',
          isOpen && 'max-h-52'
        )
      }>
        <div className="flex flex-col h-full">
          {
            Children.toArray(children).map(child => (
              cloneElement(child as ReactElement<any>, { onClick: handleSelect })
            ))
          }
        </div>
      </div>
      <Button 
        className="absolute flex items-center rounded-md hover:bg-gray-200 transition-colors w-full justify-between min-w-0 p-0" 
        variant="outlined" 
        onClick={() => handleToggle()}>
        <div className="flex items-center gap-3 ml-2">
          {
            fixedValue 
              ? fixedValue
              : (Children.toArray(children).find(child => {
                if(isValidElement(child))
                  return child.props.value === value;
                return false;
              }) as ReactElement)?.props.children ?? <span className="opacity-40">{placeholder}</span>
          }
        </div>
        <FaAngleDown className={twMerge('transition-transform duration-300 size-4 mr-1', isOpen && 'rotate-180' )} />
      </Button>
    </div>
  );
}