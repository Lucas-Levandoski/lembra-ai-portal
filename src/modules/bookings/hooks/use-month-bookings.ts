'use client';

import { getBookingsByMonth } from 'Bookings/services';
import { useStore } from 'Store';


export function useMonthBookings() {
  const {
    monthBookings,
    isMonthBookingsLoading,
    setIsMonthBookingsLoading,
    setMonthBookings,
  } = useStore(state => ({
    monthBookings: state.monthBookings,
    setMonthBookings: state.setMonthBookings,
    isMonthBookingsLoading: state.isMonthBookingsLoading,
    setIsMonthBookingsLoading: state.setIsMonthBookingsLoading,
  }));

  const getBookings = async (year: string, month: string) => {
    setIsMonthBookingsLoading(true);

    try {
      const _bookings = await getBookingsByMonth(year, month);

      if(!_bookings) return;

      setMonthBookings(_bookings);

      return _bookings;
    } finally {
      setIsMonthBookingsLoading(false);
    }
  };

  return {
    getBookings,
    isMonthBookingsLoading,
    monthBookings,
  };
}