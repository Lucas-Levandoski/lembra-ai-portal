'use client';

import { Accordion, StatusMessage, timeToMinutes } from 'Common';
import { useEventDetails } from 'Events/hooks';
import { RowTitle } from '../row-title';
import { BookingDescription } from '../booking-description';
import { NotificationsContainer } from '../notifications';
import { EventDetails } from 'Events/models';

type props = {
  events: EventDetails[];
}

export function CanceledEvents({ events }: props) {
  const { isOpen, reschedules, onToggle } = useEventDetails(events);

  return (
    <ul className="flex flex-col gap-4">
      {
        !events.length 
          ? <StatusMessage message="Parece que não foi encontrado nenhum evento" />
          : events.map(({bookingEntity: booking, agendaEntity: agenda}, i) =>
            (
              <li key={booking.id}>
                <Accordion className="border-red-400 bg-red-100" isOpen={isOpen[i]} onChange={(status) => onToggle(i, status)}>
                  <RowTitle 
                    agendaTitle={agenda.name}
                    colorName={agenda.colorName}
                    date={booking.details.date}
                    duration={timeToMinutes(booking.details.duration)}
                    guestName={booking.guestDetails.name}
                    time={booking.details.time} />

                  <div className="flex h-full p-10">
                    <div className="flex flex-col w-2/5 gap-10">
                      <BookingDescription booking={booking} reschedules={reschedules[i]} />
                    </div>
                    <span className="w-[1px] border mx-4 border-red-500" />
                    <div className="flex flex-col w-3/5">
                      <div className="flex flex-col mx-auto w-fit">
                        <h2 className="font-bold mb-6">Lembretes</h2>
                        {
                          !booking.notifications 
                            ? <StatusMessage message="Parece que não foi enviado nenhuma notificação para este agendamento" />
                            : <NotificationsContainer notifications={booking.notifications} />
                        }
                      </div>
                    </div>
                  </div>
                </Accordion>
              </li>
            )
          )
      }
    </ul>
  );
}