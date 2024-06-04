import { AgendaElement, envVars, privateClient } from 'Common';
import { toast } from 'react-toastify';

export const getAgendas = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<AgendaElement>(`${envVars.agendaUrl}/my-agendas`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response.data);
      toast.error(err.response.data.message);
      return;
    }) as AgendaElement;
}

export const updateAgenda = async (agenda: any, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.put<any>(`${envVars.agendaUrl}/my-agenda`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response.data);
      toast.error(err.response.data.message);
      return;
    }) as any;
}

export const newAgenda = async (agenda: any, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.put<any>(`${envVars.agendaUrl}/my-agenda`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response.data);
      toast.error(err.response.data.message);
      return;
    }) as any;
}