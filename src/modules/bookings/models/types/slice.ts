import { BookingEntity, IListDatesResponse } from 'Bookings';

export type BookingsSlice = {
  bookedDates?: IListDatesResponse,
  selectedDate?: string,
  isBookedDatesLoading: boolean,
  dayBookings?: BookingEntity[],
  isDayBookingsLoading: boolean,

  setBookedDates: (bookedDates?: IListDatesResponse) => void,
  setIsBookedDatesLoading: (isAgendaLoading: boolean) => void,
  setSelectedDate: (selectedDate: string) => void,
  setDayBookings: (dayBookings: BookingEntity[]) => void,
  setIsDayBookingsLoading: (isDayBookingsLoading: boolean) => void,
}