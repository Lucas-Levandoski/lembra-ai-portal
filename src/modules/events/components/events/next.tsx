'use client';

import { Accordion, StatusMessage, timeToMinutes } from 'Common';
import { RowTitle } from '../row-title';
import { EventDetails } from 'Events/models';
import { useEventDetails } from 'Events/hooks/event-details';


type props = {
  events: EventDetails[];
}

export function NextEvents({ events }: props) {
  const { isOpen, onToggle } = useEventDetails(events);

  return (
    <ul className="flex flex-col gap-4">
      {
        !events.length 
          ? <StatusMessage message="Parece que não foi encontrado nenhum evento" />
          : events.map((event, i) => {
            const { agendaEntity: agenda, bookingEntity: booking } = event;

            return (
              <li key={event.bookingEntity.id}>
                <Accordion isOpen={isOpen[i]} onChange={(status) => onToggle(i, status)}>
                  <RowTitle 
                    agendaTitle={agenda.name}
                    colorName={agenda.colorName}
                    date={booking.details.date}
                    duration={timeToMinutes(booking.details.duration)}
                    guestName={booking.guestDetails.name}
                    time={booking.details.time} />
                  <div>content here</div>
                </Accordion>
              </li>
            );
          })
      
      }
    </ul>
  );
}