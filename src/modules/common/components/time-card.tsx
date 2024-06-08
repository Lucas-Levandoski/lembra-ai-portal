'use client';

import { twMerge } from 'tailwind-merge';
import { maskMinutes } from '../utils';

type props = {
  colorName: string;
  timeFrame: number;
  className?: string;
}

export function TimeCard({ colorName, timeFrame, className = '' }: props) {
  return <span className={twMerge('rounded-lg px-3 py-1 font-semibold w-fit', `bg-${colorName}-100 text-${colorName}-700`, className)}>{maskMinutes(timeFrame)}</span>
}