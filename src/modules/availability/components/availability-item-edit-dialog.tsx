'use client';

import { Button, Popup, isHourMinuteValid, timeToDateISO } from 'Common';
import { IAvailabilityTime } from '../models';
import { ChangeEvent, FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CiClock1 } from 'react-icons/ci';

type props = {
  // eslint-disable-next-line no-unused-vars
  onEdit: (time?: IAvailabilityTime) => void;
  onClose: () => void;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

export function ItemEditDialog({ onEdit, onClose = () => {}, isOpen, endTime, startTime }: props) {
  const [timeStart, setTimeStart] = useState(startTime);
  const [timeEnd, setTimeEnd] = useState(endTime);
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);

  const onChangeStartTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 

    if(value.length > 5) return;

    setTimeStart(value)
    setIsStartValid(true);
  }

  const onChangeEndTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 

    if(value.length > 5) return;

    setTimeEnd(value)
    setIsEndValid(true);
  }

  const onSubmit = async(event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const validStart = isHourMinuteValid(timeStart);
    const validEnd = isHourMinuteValid(timeEnd);

    setIsStartValid(validStart);
    setIsEndValid(validEnd);

    if(validStart && validEnd) {
      onEdit({startTime: timeToDateISO(timeStart), endTime: timeToDateISO(timeEnd)});
      onClose();
    }
  }

  const onCancel = () => {
    setTimeout(() => {
      setIsStartValid(true);
      setIsEndValid(true);

      setTimeStart(startTime);
      setTimeEnd(endTime);
    }, 500);

    onEdit();

    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onCancel}>
      <form className='flex flex-col gap-8' onSubmit={onSubmit}>
        <h1 className='text-center'>Escolha o horário no qual<br /> você estará indisponível</h1>
        <div className='flex items-center justify-between'>
          <div className={twMerge('relative', !isStartValid && 'text-red-600')}>
            <input 
              value={timeStart} 
              className={twMerge('relative border-[2px] w-32 h-12 rounded-md p-2 text-end focus:outline-none', !isStartValid && 'border-red-300 bg-red-50')} 
              onChange={onChangeStartTime} />
            <CiClock1 className='absolute left-3 top-3 size-6 stroke-[0.3]'/>
          </div>
          às
          <div className={twMerge('relative', !isEndValid && 'text-red-600')}>
            <input 
              value={timeEnd}
              className={twMerge('border-[2px] w-32 h-12 rounded-md p-2 text-end focus:outline-none', !isEndValid && 'border-red-300 bg-red-50')}
              onChange={onChangeEndTime} />
            <CiClock1 className='absolute left-3 top-3 size-6 stroke-[0.3]'/>
          </div>
        </div>
        <div className='flex flex-row gap-4 justify-around'>
          <Button type='button' variant='secondary' onClick={() => onCancel()}>Cancelar</Button>
          <Button type='submit'>Concluir</Button>
        </div>
      </form>

    </Popup>
  )
}