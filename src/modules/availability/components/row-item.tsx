'use client';

import { Button, DaysOfWeek } from 'Common';
import { IAvailabilityItem, IAvailabilityTime } from '../models';
import { IoClose } from 'react-icons/io5';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useAvailability } from '../hooks';
import { twMerge } from 'tailwind-merge';
import { useStore } from 'Store';

type props = {
  label: string;
  day: DaysOfWeek;
  content: IAvailabilityItem;
  onAddClick: (day: DaysOfWeek) => void;
  onEditClick: (day: DaysOfWeek ,index: number, time: IAvailabilityTime) => void;
}

export function RowItem({ content, day, label, onAddClick, onEditClick }: props) {
  const { toggleEnableDay, removeAvailabilityTime } = useAvailability();
  const { erroredItem } = useStore((state) => ({ erroredItem: state.erroredItem }));

  return (
    <div className="flex flex-row items-center gap-4">
      <label htmlFor={`check-${day}`} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-md size-6">
        <input className="size-4 hover:bg-gray-100 cursor-pointer" id={`check-${day}`} onChange={() => toggleEnableDay(day)} type="checkbox" checked={content.isEnable ?? false} />
      </label>
      <strong>{label}</strong>
      <div className="flex flex-row gap-4 overflow-hidden flex-wrap">
        {content.times.map(
          (time, i) => (
            <div
              key={day + i}
              className={
                twMerge(
                  'flex flex-row items-center gap-2 min-w-[150px] h-8 justify-center text-nowrap rounded-full px-3 py-1 text-blue-700 bg-blue-100',
                  erroredItem && erroredItem.day === day && erroredItem.index === i && 'text-red-600 bg-red-50 animate-pulse border-red-600 border '
                )
              }>
              <Button
                onClick={() => onEditClick(day, i, time)}
                variant="unset"
              >
                <span>{time.startTime} às {time.endTime}</span>
              </Button>
              <Button className="p-0 -mr-2" onClick={() => removeAvailabilityTime(day, i)} variant="icon">
                <IoClose className="size-6" />
              </Button>
            </div>
          )
        )}
      </div>

      <Button onClick={() => onAddClick(day)} variant="icon">
        <BsFillPlusCircleFill className="text-blue-700 size-8" />
      </Button>
    </div>
  );
}