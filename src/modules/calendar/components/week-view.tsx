import { IEventsByAgenda } from 'Calendar/models';
import { WeekTimeGrid } from 'Common/components';

type props = {
  eventsByAgenda?: IEventsByAgenda;
  selectedDate: string;
  onSelectBooking?: (id: string) => void;
}

export function WeekView({ eventsByAgenda, selectedDate, onSelectBooking = () => {} }: props) {  
  return (
    <div>
      <WeekTimeGrid events={eventsByAgenda} selectedDate={selectedDate} onSelect={onSelectBooking} />
    </div>
  );
}