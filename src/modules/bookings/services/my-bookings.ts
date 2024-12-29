import { envVars, privateClient } from 'Common';
import { BookingEntity, CountBookingsByStatus, IListDatesResponse } from 'Bookings/models';

export const listBookedDates = async (errorFn: (data: any) => void = () => {}): Promise<IListDatesResponse> => {
  return await privateClient.get<IListDatesResponse>(`${envVars.bookingsUrl}/my-bookings/list-booked-dates`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};

export const getBookingsByDay = async (date: string, errorFn: (data: any) => void = () => {}): Promise<BookingEntity[] | undefined> => {
  return await privateClient.get<BookingEntity[]>(`${envVars.bookingsUrl}/my-bookings/by-day`, { params: { date } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};

export const getBookingsByMonth = async (year: string, month: string, errorFn: (data: any) => void = () => {}): Promise<BookingEntity[] | undefined> => {
  return await privateClient.get<BookingEntity[]>(`${envVars.bookingsUrl}/my-bookings/by-month`, { params: { year, month } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};

export const getCountByStatus = async (errorFn: (data: any) => void = () => {}): Promise<CountBookingsByStatus> => {
  return await privateClient.get<CountBookingsByStatus>(`${envVars.bookingsUrl}/my-bookings/count-by-status`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};
