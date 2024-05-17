import { Button, DaysOfWeek, getTime } from 'Common';
import { IAvailabilityItem } from '../models'
import { IoClose } from 'react-icons/io5';
import { BsFillPlusCircleFill } from 'react-icons/bs';

type props = {
  label: string;
  id: DaysOfWeek;
  content: IAvailabilityItem;
}

export function AvailabilityItem({ content, id, label }: props) {
  return (
    <div className='flex flex-row items-center gap-4'>
      <label htmlFor={`check-${id}`} className='flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-md size-6'>
        <input className='size-4 hover:bg-gray-100 cursor-pointer' id={`check-${id}`} type='checkbox' checked={content.isEnable ?? false} />
      </label>
      <strong>{label}</strong>
      <div className='flex flex-row gap-4 overflow-hidden flex-wrap'>
        {content.times.map((time, i) => (
          <div
            className='flex flex-row items-center gap-2 w-[150px] justify-center text-nowrap rounded-full px-3 py-1 text-blue-700 bg-blue-100'
            key={id + i}>
            {getTime(time.startTime)} às {getTime(time.endTime)}
            <Button className='p-0 -mr-2' variant='icon'>
              <IoClose className='size-6' />
            </Button>
          </div>
        ))}
      </div>
      <Button variant='icon'>
        <BsFillPlusCircleFill className='text-blue-700 size-8' />
      </Button>
    </div>
  )
}