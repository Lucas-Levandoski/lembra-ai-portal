import { Button, DaysOfWeek, getTime } from 'Common';
import { IAvailabilityItem, IAvailabilityTime } from '../models'
import { IoClose } from 'react-icons/io5';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useAvailability, useAvailabilityItem } from '../hooks';
import { ItemEditDialog } from './availability-item-edit-dialog';
import { ItemAddDialog } from './availability-item-add-dialog';
import { useState } from 'react';

type props = {
  label: string;
  day: DaysOfWeek;
  content: IAvailabilityItem;
}

export function AvailabilityItem({ content, day, label }: props) {
  const { toggleEnableDay } = useAvailability();
  const { isAddOpen, onAdd, onEdit, toggleAdd } = useAvailabilityItem();

  return (
    <div className='flex flex-row items-center gap-4'>
      <label htmlFor={`check-${day}`} className='flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-md size-6'>
        <input className='size-4 hover:bg-gray-100 cursor-pointer' id={`check-${day}`} onChange={() => toggleEnableDay(day)} type='checkbox' checked={content.isEnable ?? false} />
      </label>
      <strong>{label}</strong>
      <div className='flex flex-row gap-4 overflow-hidden flex-wrap'>
        {content.times.map((time, i) => <TimeItem day={day} onEdit={onEdit} time={time} key={day + i} index={i} />)}
      </div>

      <Button onClick={() => toggleAdd()} variant='icon'>
        <BsFillPlusCircleFill className='text-blue-700 size-8' />
      </Button>
      <ItemAddDialog isOpen={isAddOpen} onAdd={onAdd(day)} />
    </div>
  )
}

type timeItemProps = {
  // eslint-disable-next-line no-unused-vars
  onEdit: (day: DaysOfWeek, index: number) => (item?: IAvailabilityTime | undefined) => void;
  day: DaysOfWeek;
  time: IAvailabilityTime;
  index: number
}

export function TimeItem({onEdit, day, time, index }: timeItemProps) {
  const { removeAvailabilityTime } = useAvailability();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsEditOpen(value => !value)}
        className='flex flex-row items-center gap-2 min-w-[150px] h-8 justify-center text-nowrap rounded-full px-3 py-1 text-blue-700 bg-blue-100'>
        <span>{getTime(time.startTime)} às {getTime(time.endTime)}</span>
        <Button className='p-0 -mr-2' onClick={() => removeAvailabilityTime(day, index)} variant='icon'>
          <IoClose className='size-6' />
        </Button>
      </Button>
      <ItemEditDialog isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} startTime={getTime(time.startTime)} endTime={getTime(time.endTime)} onEdit={onEdit(day, index)} />
    </>
  )
}