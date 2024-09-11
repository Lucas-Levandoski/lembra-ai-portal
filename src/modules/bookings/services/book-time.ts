import { IDateTimes } from 'Bookings/models';
import { envVars, publicClient } from 'Common';
import { toast } from 'react-toastify';

export const bookNewEvent = async (userId: string, agendaId: string, errorFn: (data: any) => void = () => {}): Promise<{dates: string[], times: IDateTimes}> => {
  return await publicClient.post<{dates: string[], times: IDateTimes}>(`${envVars.bookingsUrl}/calculated-times/list-dates-and-times`, { params: { userId, agendaId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao listar datas disponíveis');
      throw new Error(err);
    });
};
