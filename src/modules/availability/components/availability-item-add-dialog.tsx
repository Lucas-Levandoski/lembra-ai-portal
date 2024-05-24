import { Button, Popup, isHourMinuteValid, timeToDateISO } from 'Common';
import { IAvailabilityTime } from '../models';
import { ChangeEvent, useState } from 'react';
import { CiClock1 } from 'react-icons/ci';
import { twMerge } from 'tailwind-merge';

type props = {
  // eslint-disable-next-line no-unused-vars
  onAdd: (time?: IAvailabilityTime) => void;
  isOpen: boolean;
}

export function ItemAddDialog({ onAdd, isOpen}: props) {
  const [timeStart, setTimeStart] = useState('09:00');
  const [timeEnd, setTimeEnd] = useState('12:00');
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

  const onSubmit = async() => {
    const validStart = isHourMinuteValid(timeStart);
    const validEnd = isHourMinuteValid(timeEnd);

    setIsStartValid(validStart);
    setIsEndValid(validEnd);

    if(validStart && validEnd)
      onAdd({startTime: timeToDateISO(timeStart), endTime: timeToDateISO(timeEnd)});
  }

  return (
    <Popup isOpen={isOpen} onClose={onAdd}>
      <div className='flex flex-col gap-8'>
        <h1 className='text-center'>Escolha o horário no qual<br /> você estará indisponível</h1>
        <div className='flex items-center justify-between'>
          <div className={twMerge('relative', !isStartValid && 'text-red-600')}>
            <input 
              value={timeStart} 
              className={twMerge('relative border-[2px] w-32 h-12 rounded-md p-2 text-end', !isStartValid && 'border-red-300 bg-red-50')} 
              onChange={onChangeStartTime} />
            <CiClock1 className='absolute left-3 top-3 size-6 stroke-[0.3]'/>
          </div>
          às
          <div className={twMerge('relative', !isEndValid && 'text-red-600')}>
            <input 
              value={timeEnd}
              className={twMerge('border-[2px] w-32 h-12 rounded-md p-2 text-end', !isEndValid && 'border-red-300 bg-red-50')} 
              onChange={onChangeEndTime} />
            <CiClock1 className='absolute left-3 top-3 size-6 stroke-[0.3]'/>
          </div>
        </div>  
        <div className='flex flex-row gap-4 justify-around'>
          <Button variant='secondary' onClick={() => onAdd()}>Cancelar</Button>
          <Button onClick={() => onSubmit()}>Concluir</Button>
        </div>
      </div>

    </Popup>
  )
}