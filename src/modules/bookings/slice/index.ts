import { StateCreator } from 'zustand';
import { BookingEntity, BookingsSlice } from 'Bookings';

export const createBookingsSlice: StateCreator<BookingsSlice> = (set) => ({
  bookedDates: undefined,
  selectedDate: undefined,
  isBookedDatesLoading: false,
  dayBookings: undefined,
  monthBookings: undefined,
  isDayBookingsLoading: false,
  isMonthBookingsLoading: false,

  setBookedDates: (bookedDates) => set(() => ({ bookedDates })),
  setIsBookedDatesLoading: (isBookedDatesLoading) => set(() => ({ isBookedDatesLoading })),
  setSelectedDate: (selectedDate) => set(() => ({ selectedDate })),
  setDayBookings: (dayBookings: BookingEntity[]) => set(() => ({ dayBookings })),
  setMonthBookings: (monthBookings: BookingEntity[]) => set(() => ({ monthBookings })),
  setIsDayBookingsLoading: (isDayBookingsLoading) => set(() => ({ isDayBookingsLoading })),
  setIsMonthBookingsLoading: (isMonthBookingsLoading) => set(() => ({ isMonthBookingsLoading })),
});