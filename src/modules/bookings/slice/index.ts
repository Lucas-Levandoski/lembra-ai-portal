import { StateCreator } from 'zustand';
import { Booking, BookingsSlice } from 'Bookings';

export const createBookingsSlice: StateCreator<BookingsSlice> = (set) => ({
  bookedDates: undefined,
  selectedDate: undefined,
  isBookedDatesLoading: false,
  dayBookings: undefined,
  isDayBookingsLoading: false,

  setBookedDates: (bookedDates) => set(() => ({ bookedDates })),
  setIsBookedDatesLoading: (isBookedDatesLoading) => set(() => ({ isBookedDatesLoading })),
  setSelectedDate: (selectedDate) => set(() => ({ selectedDate })),
  setDayBookings: (dayBookings: Booking[]) => set(() => ({ dayBookings })),
  setIsDayBookingsLoading: (isDayBookingsLoading) => set(() => ({ isDayBookingsLoading })),
});