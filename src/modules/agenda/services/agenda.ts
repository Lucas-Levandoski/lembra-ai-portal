import { AgendaDetails, AgendaElement, envVars, privateClient } from 'Common';
import { toast } from 'react-toastify';

export const listAgendas = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<AgendaElement[]>(`${envVars.agendaUrl}/my-agendas`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.message ?? 'Falha ao listar agendas');
      throw new Error(err);
    }) as AgendaElement[] | undefined;
}

export const updateAgenda = async (agendaId: string, details: AgendaDetails, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.put<AgendaElement>(`${envVars.agendaUrl}/my-agenda`, {agendaId, details})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.message ?? 'Falha ao atualizar agenda');
      throw new Error(err);
    }) as AgendaElement | undefined;
}

export const newAgenda = async (agenda: AgendaDetails, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.post<AgendaElement>(`${envVars.agendaUrl}/my-agenda`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.message ?? 'Falha ao criar agenda');
      throw new Error(err);
    }) as AgendaElement | undefined;
}