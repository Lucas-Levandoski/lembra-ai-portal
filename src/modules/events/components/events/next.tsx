'use client';

import { Accordion, Button, ConfirmationDialog, StatusMessage, timeToMinutes } from 'Common';
import { RowTitle } from '../row-title';
import { EventDetails } from 'Events/models';
import { useEventDetails } from 'Events/hooks';
import { NotificationsContainer } from '../notifications';
import { BookingDescription } from '../booking-description';
import { useOnOwnerCancel } from 'Bookings';


type props = {
  events: EventDetails[];
  onReloadAll: () => void;
}

export function NextEvents({ events, onReloadAll }: props) {
  const { isOpen, reschedules, onToggle } = useEventDetails(events);
  const { handleCancelCancellation, handleCancellation, handleConfirmCancellation, isLoading, isOpen: isConfirmationOpen } = useOnOwnerCancel(onReloadAll);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {
          !events.length 
            ? <StatusMessage message="Parece que não foi encontrado nenhum evento" />
            : events.map(({bookingEntity: booking, agendaEntity: agenda}, i) =>
              (
                <li key={booking.id}>
                  <Accordion isOpen={isOpen[i]} onChange={(status) => onToggle(i, status)}>
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
                        <div className="flex justify-between mx-4">
                          <Button className="text-blue-700" onClick={() => handleCancellation(booking.id)} variant="secondary" >Cancelar Evento</Button>
                          <Button routeTarget="_blank" route={`/re-schedule/${booking.id}`} variant="primary">Reagendar</Button>
                        </div>
                      </div>
                      <span className="w-[1px] border mx-4" />
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
      <ConfirmationDialog 
        isLoading={isLoading}
        isOpen={isConfirmationOpen}
        content="Você tem certeza de que deseja cancelar este evento?"
        onCancel={() => handleCancelCancellation()}  
        onConfirm={() => handleConfirmCancellation()}
      />
    </>
  );
}