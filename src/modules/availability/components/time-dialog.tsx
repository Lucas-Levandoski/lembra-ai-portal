'use client';

import { Button, Popup, TimeOptions } from 'Common';
import { IAvailabilityTime } from '../models';
import { twMerge } from 'tailwind-merge';
import { CiClock1 } from 'react-icons/ci';
import { useTimeItem } from '../hooks';
import { useEffect } from 'react';

type props = {
  onSubmit: (time?: IAvailabilityTime) => void;
  onCancel: () => void;
  isOpen: boolean;
  currentStart?: string;
  currentEnd?: string;
}

export function TimeDialog({ isOpen, currentStart = '', currentEnd = '',  onSubmit, onCancel = () => {}}: props) {
  const { 
    isStartValid, 
    isEndValid, 
    timeStart, 
    timeEnd,
    onChangeStartTime, 
    onChangeEndTime, 
    trySubmit,
    initTime
  } = useTimeItem({ onSubmit });

  useEffect(() => {
    initTime(currentStart, currentEnd)
  }, [])

  return (
    <Popup isOpen={isOpen} onClose={onCancel}>
      <TimeOptions />
      <form className="flex flex-col gap-8" onSubmit={trySubmit}>
        <h1 className="text-center">Escolha o horário no qual<br /> você estará disponivel</h1>
        <div className="flex items-center justify-between">
          <div className={twMerge('relative', !isStartValid && 'text-red-600')}>
            <input
              list="time-options"
              value={timeStart}
              className={twMerge('relative border-[2px] w-32 h-12 rounded-md p-2 text-end focus:outline-none', !isStartValid && 'border-red-300 bg-red-50')}
              onChange={onChangeStartTime} />
            
            <CiClock1 className="absolute left-3 top-3 size-6 stroke-[0.3]"/>
          </div>
          às
          <div className={twMerge('relative', !isEndValid && 'text-red-600')}>
            <input
              list="time-options"
              value={timeEnd}
              className={twMerge('border-[2px] w-32 h-12 rounded-md p-2 text-end focus:outline-none focus:ring-blue-500', !isEndValid && 'border-red-300 bg-red-50')}
              onChange={onChangeEndTime} />
            <CiClock1 className="absolute left-3 top-3 size-6 stroke-[0.3]"/>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-around">
          <Button type="button" variant="secondary" onClick={() => onCancel()}>Cancelar</Button>
          <Button type="submit">Concluir</Button>
        </div>
      </form>
    </Popup>
  )
}