import { Booking, IListDatesResponse } from 'Bookings';

export type BookingsSlice = {
  bookedDates?: IListDatesResponse,
  selectedDate?: string,
  isBookedDatesLoading: boolean,
  dayBookings?: Booking[],
  isDayBookingsLoading: boolean,

  setBookedDates: (bookedDates?: IListDatesResponse) => void,
  setIsBookedDatesLoading: (isAgendaLoading: boolean) => void,
  setSelectedDate: (selectedDate: string) => void,
  setDayBookings: (dayBookings: Booking[]) => void,
  setIsDayBookingsLoading: (isDayBookingsLoading: boolean) => void,
}