import { envVars, privateClient } from 'Common';
import { BookingEntity, IListDatesResponse } from 'Bookings';

export const listBookedDates = async (errorFn: (data: any) => void = () => {}): Promise<IListDatesResponse> => {
  return await privateClient.get<IListDatesResponse>(`${envVars.bookingsUrl}/my-bookings/list-booked-dates`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};

export const getBookingsByDay = async (date: string, errorFn: (data: any) => void = () => {}): Promise<BookingEntity[]> => {
  return await privateClient.get<BookingEntity[]>(`${envVars.bookingsUrl}/my-bookings/by-day`, { params: { date } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};


