import { BookingEntity } from 'Bookings/models';
import { readEvent } from 'Bookings/services';
import { useEffect, useState } from 'react';



export function useOnAlreadyReScheduled(oldBooking: BookingEntity) {
  const [isNewBookingLoading, setIsNewBookingLoading] = useState(true);
  const [newBooking, setNewBooking] = useState<BookingEntity>();

  
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      if(!oldBooking.details.rescheduleBookingId) {
        setIsNewBookingLoading(false);
        return;
      }
  
      await getBooking(oldBooking.details.rescheduleBookingId);
    } finally {
      setIsNewBookingLoading(false);
    }
  };

  const getBooking = async(_bookingId: string) => {
    const _booking = await readEvent(_bookingId);

    setNewBooking(_booking);

    return _booking;
  };


  return {
    newBooking,
    isNewBookingLoading,
  };
}