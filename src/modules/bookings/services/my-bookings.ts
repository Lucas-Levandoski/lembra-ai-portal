import { envVars, privateClient } from 'Common';
import { BookingEntity, BookingStatus, CountBookingsByStatus, IListDatesResponse } from 'Bookings/models';
import { AllEvents } from 'Events/models';

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
  return await privateClient.get<BookingEntity[]>(`${envVars.bookingsUrl}/my-bookings/by-month`, { params: { year, month: month.padStart(2, '0') } })
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

export const getBookingsByStatus = async (statuses: BookingStatus[], start?: number, size?: number, errorFn: (data: any) => void = () => {}): Promise<AllEvents> => {
  return await privateClient.get<AllEvents>(`${envVars.bookingsUrl}/my-bookings/by-status`, { params: { statuses: statuses.join(','), start, size }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};