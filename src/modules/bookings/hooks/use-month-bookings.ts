'use client';

import { AxiosError } from 'axios';
import { getBookingsByMonth } from 'Bookings/services';
import { toast } from 'react-toastify';
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

      if(!_bookings) return [];

      const mergedBookings = [...monthBookings ?? [], ..._bookings];

      setMonthBookings(mergedBookings);

      return mergedBookings;
    } catch (e) {
      if(e instanceof AxiosError) {
        if(e.response?.status === 404)
          return [];

        toast.error(e.response?.data);
      }

      throw e;
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