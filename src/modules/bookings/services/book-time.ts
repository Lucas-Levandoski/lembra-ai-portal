import { BookingEntity } from 'Bookings/models';
import { IBookingReqBody, IReScheduleReqBody } from 'Bookings/models/interfaces';
import { envVars, publicClient } from 'Common';
import { toast } from 'react-toastify';

export const bookNewEvent = async (
  userId: string, 
  agendaId: string, 
  data: IBookingReqBody, 
  errorFn: (_data: any) => void = () => {}
): Promise<string> => {
  return await publicClient.post<string>(`${envVars.bookingsUrl}/booking`, data, { params: { userId, agendaId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join(',\n ') ?? 'Falha ao fazer o seu agendamento');
      throw new Error(err);
    });
};


export const readEvent = async (
  bookingId: string,
  errorFn: (_data: any) => void = () => {}
): Promise<BookingEntity> => {
  return await publicClient.get<BookingEntity>(`${envVars.bookingsUrl}/booking`, { params: { bookingId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join(',\n ') ?? 'Falha ao realizar o seu agendamento');
      throw new Error(err);
    });
};


export const cancelEvent = async (
  bookingId: string,
  reason: string,
  errorFn: (_data: any) => void = () => {}
): Promise<BookingEntity> => {
  return await publicClient.delete<BookingEntity>(`${envVars.bookingsUrl}/booking`, { params: { bookingId, reason } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join(',\n ') ?? 'Falha ao cancelar o seu agendamento');
      throw new Error(err);
    });
};


export const reScheduleEvent = async (
  userId: string,
  reqBody: IReScheduleReqBody,
  errorFn: (_data: any) => void = () => {}
): Promise<BookingEntity> => {
  return await publicClient.put<BookingEntity>(`${envVars.bookingsUrl}/booking`, reqBody, { params: { userId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join(',\n ') ?? 'Falha ao realizar o seu reagendamento');
      throw new Error(err);
    });
};