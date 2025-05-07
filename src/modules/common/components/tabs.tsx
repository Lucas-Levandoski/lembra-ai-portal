'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type props = {
  items: Item[],
  selectedId: string,
  onChangeTab?: (id: string) => void;
}

type Item = {
  content: ReactNode,
  id: string,
  label: string,
  shouldHide?: boolean
}

export function Tabs({ items = [], selectedId = '', onChangeTab = console.info as any }: props) {
  return (
    <div>
      <div className="flex flex-row w-full">
        {items.filter(item => !item.shouldHide).map(item => 
          <button 
            onClick={() => onChangeTab(item.id)}
            key={item.id} 
            className={twMerge([
              'px-2 py-3 text-slate-500 transition-all border-b-2 border-transparent',
              item.id === selectedId && 'text-blue-600 border-blue-600'
            ])}>
            {item.label}
          </button>
        )}
      </div>
      <div className="pt-6">
        {items.filter(item => item.id === selectedId).map(item =>
          <div key={`selected-${item.id}`}>{item.content}</div>  
        )}
      </div>
    </div>
  );
}