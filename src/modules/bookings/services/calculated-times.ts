import { envVars, publicClient } from 'Common';
import { toast } from 'react-toastify';

export const listAvailableDates = async (userId: string, agendaId: string, errorFn: (data: any) => void = () => {}): Promise<string[]> => {
  return await publicClient.get<string[]>(`${envVars.bookingsUrl}/calculated-times/list-dates`, { params: { userId, agendaId } })
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao listar datas disponíveis');
      throw new Error(err);
    });
};
