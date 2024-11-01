import { IEventsByAgenda } from 'Calendar/models';
import { WeekTimeGrid } from 'Common/components';

type props = {
  eventsByAgenda?: IEventsByAgenda;
  selectedDate: string;
}

export function WeekView({ eventsByAgenda, selectedDate }: props) {  
  return (
    <div>
      <WeekTimeGrid events={eventsByAgenda} selectedDate={selectedDate} />
    </div>
  );
}