import { Calendar } from 'Common';
import { DayInfo } from '.';

export function CalendarColumn() {
  return (
    <div className="flex flex-col gap-4">
      <Calendar />
      <DayInfo />
    </div>
  );
}