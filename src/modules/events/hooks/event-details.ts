import { BookingDetails } from 'Bookings/models';
import { FlattenReschedules } from 'Calendar/utils';
import { EventDetails } from 'Events/models';
import { useEffect, useState } from 'react';


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

  const onToggle = (id: number, status: boolean) => {
    isOpen[id] = status;

    setIsOpen(isOpen);
    setRefresh(!refresh);
  };

  return {
    isOpen,
    reschedules,
    onToggle,
  };
}