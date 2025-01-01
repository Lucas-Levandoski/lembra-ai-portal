import { TimeDescription } from 'Bookings/components';
import { sumMinutesToTime } from 'Common/utils';
import { TimeCard } from 'Common/components';
import { twMerge } from 'tailwind-merge';

type props = {
  colorName: string;
  agendaTitle: string;
  guestName: string;
  duration: number;
  date: string;
  time: string;
}

export function RowTitle({ agendaTitle, colorName, date, duration, guestName, time }: props) {
  return (
    <div className="w-full text-start grid grid-cols-12 items-center">
      <span className="col-span-4 flex items-center">
        <span className={twMerge('col-span-1 h-4 w-4 rounded-full mr-4', `bg-${colorName}-500`)} />
        <span>{agendaTitle} ({guestName})</span>
      </span>
      <span className="col-span-1">
        <TimeCard colorName={colorName} timeFrame={duration} />
      </span>
      <span className="col-span-7">
        <TimeDescription date={date} startTime={time} endTime={sumMinutesToTime(time, duration)} />
      </span>
    </div>
  );
}