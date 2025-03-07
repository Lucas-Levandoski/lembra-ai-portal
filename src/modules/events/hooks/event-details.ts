import { BookingDetails, BookingStatus, bookingStatusTexts } from 'Bookings/models';
import { updateBookingStatus } from 'Bookings/services';
import { FlattenReschedules } from 'Calendar/utils';
import { EventDetails } from 'Events/models';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export function useEventDetails(events: EventDetails[]) {
  const [isOpen, setIsOpen] = useState<boolean[]>(new Array(events.length).fill(false));
  const [reschedules, setReschedules] = useState<BookingDetails[][]>(new Array(events.length).fill([]));
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {    
    for(let i = 0; i < reschedules.length; i++) {
      reschedules[i] = FlattenReschedules(events[i].bookingEntity.details.rescheduledBooking);
    }

    setReschedules(reschedules);

    setRefresh(!refresh);
  }, []);

  const onSetBookingStatus = (elementId: number, bookingId: string, status: BookingStatus) => {
    const event = events[elementId];

    event.bookingEntity.details.status = status;

    const bookingTitle = `${event.agendaEntity.name} (${event.bookingEntity.guestDetails.name})`;

    setRefresh(!refresh);
    updateBookingStatus(bookingId, status)
      .then(() => toast.success(`Sucesso ao atualizar o status do booking '${bookingTitle}' para ${bookingStatusTexts[status]}`))
      .catch(() => toast.error(`Falha ao atualizar o status do booking '${bookingTitle}' para ${bookingStatusTexts[status]}`));

  };

  const onToggle = (id: number, status: boolean) => {
    isOpen[id] = status;

    setIsOpen(isOpen);
    setRefresh(!refresh);
  };

  return {
    isOpen,
    reschedules,
    onToggle,
    onSetBookingStatus,
  };
}