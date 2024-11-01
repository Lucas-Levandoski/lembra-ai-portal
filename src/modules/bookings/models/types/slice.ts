import { BookingEntity, IListDatesResponse } from 'Bookings';

export type BookingsSlice = {
  bookedDates?: IListDatesResponse,
  selectedDate?: string,
  isBookedDatesLoading: boolean,
  dayBookings?: BookingEntity[],
  monthBookings?: BookingEntity[],
  isDayBookingsLoading: boolean,
  isMonthBookingsLoading: boolean,

  setBookedDates: (bookedDates?: IListDatesResponse) => void,
  setIsBookedDatesLoading: (isAgendaLoading: boolean) => void,
  setSelectedDate: (selectedDate: string) => void,
  setDayBookings: (dayBookings: BookingEntity[]) => void,
  setMonthBookings: (monthBookings: BookingEntity[]) => void,
  setIsDayBookingsLoading: (isDayBookingsLoading: boolean) => void,
  setIsMonthBookingsLoading: (isMonthBookingsLoading: boolean) => void,
}