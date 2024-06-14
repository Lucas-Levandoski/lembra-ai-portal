import { ReactNode } from 'react';

type props = {
  title?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
}

export function Accordion({ children, isOpen = false, onToggle = () => {}, title }: props) {


  return (
    <div className="p-3 border-2 border-gray-200 bg-gray-50 rounded-lg">
      <span>{title}</span>
      {children}
    </div>
  )
}