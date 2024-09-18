import { IDateTimes } from 'Bookings/models';
import { IBookingReqBody } from 'Bookings/models/interfaces';
import { envVars, publicClient } from 'Common';
import { toast } from 'react-toastify';

export const bookNewEvent = async (
  userId: string, 
  agendaId: string, 
  data: IBookingReqBody, 
  errorFn: (_data: any) => void = () => {}
): Promise<{dates: string[], times: IDateTimes}> => {
  return await publicClient.post<{dates: string[], times: IDateTimes}>(`${envVars.bookingsUrl}/book-event`, data, { params: { userId, agendaId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join(',\n ') ?? 'Falha ao fazer o seu agendamento');
      throw new Error(err);
    });
};
