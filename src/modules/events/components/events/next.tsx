'use client';

import { Accordion, Button, StatusMessage, sumTimes, timeToMinutes } from 'Common';
import { RowTitle } from '../row-title';
import { EventDetails } from 'Events/models';
import { useEventDetails } from 'Events/hooks/event-details';
import { CiCalendar, CiStickyNote, CiUser } from 'react-icons/ci';
import { BsWhatsapp } from 'react-icons/bs';
import { TimeDescription } from 'Bookings/components';
import { FaAngleDoubleUp } from 'react-icons/fa';


type props = {
  events: EventDetails[];
}

export function NextEvents({ events }: props) {
  const { isOpen, reschedules, onToggle } = useEventDetails(events);

  return (
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
                      <div className="flex flex-col gap-3 text-sm">
                        <span className="flex justify-start items-center gap-4">
                          <CiCalendar className="size-8" />
                          <TimeDescription date={booking.details.date} startTime={booking.details.time} endTime={sumTimes(booking.details.time, booking.details.duration)} />
                        </span>
                        <span className="flex justify-start items-center gap-4 text-balance">
                          <CiUser className="size-8" />
                          <span>{booking.guestDetails.name} | {booking.guestDetails.email}</span>
                        </span>
                        <span className="flex justify-start items-center gap-4">
                          <BsWhatsapp className="size-6 ml-1" />
                          <span>{booking.guestDetails.phoneNumber}</span>
                        </span>
                        <span className="flex justify-start items-center gap-4">
                          <CiStickyNote className="size-8" />
                          <div>
                            Informações Adicionais: <br/>
                            {
                              !booking.guestDetails.otherInfo
                                ? <span className="text-red-400">Nenhuma informação adicional</span>
                                : <span>{booking.guestDetails.otherInfo}</span>
                            }
                          </div>
                        </span>
                        {
                          reschedules[i].length > 0 && (
                            <div className="flex flex-col">
                              <h3>Este booking já foi reagendado
                                <span className="text-orange-500"> {reschedules[i].length > 1 ? `${reschedules[i].length} vezes`: '1 vez'}</span>
                              </h3>
                              {reschedules[i].map((reschedule, j) => (
                                <div className="flex flex-col gap-1 mt-1" key={reschedule.sourceBookingId}>
                                  {j > 0 && <span className="flex w-full justify-center"><FaAngleDoubleUp className="text-orange-500 size-4" /></span>}
                                  <div className="bg-orange-200 rounded-md px-2 text-center">
                                    <TimeDescription date={reschedule.date} startTime={reschedule.time} endTime={sumTimes(reschedule.time, reschedule.duration)} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      </div>
                      <div className="flex justify-between mx-4">
                        <Button className="text-blue-700" route={`/re-schedule/${booking.id}`} variant="secondary" >Cancelar Evento</Button>
                        <Button routeTarget="_blank" route={`/re-schedule/${booking.id}`} variant="primary">Reagendar</Button>
                      </div>
                    </div>
                    <span className="w-[1px] border mx-4" />
                    <div className="flex flex-col w-3/5">
                      <div className="flex flex-col mx-auto w-fit">
                        <h2 className="font-bold">Lembretes</h2>

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