import { AgendaDetails, AgendaElement, envVars, privateClient, publicClient } from 'Common';
import { toast } from 'react-toastify';
import { IShortAgendaProps } from '../models';

export const listMyAgendas = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<AgendaElement[]>(`${envVars.agendaUrl}/my-agendas`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao listar agendas');
      throw err;
    }) as AgendaElement[] | undefined;
};

export const readMyAgenda = async (agendaId: string, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<AgendaElement>(`${envVars.agendaUrl}/my-agenda`, {params: { agendaId }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao listar agendas');
      throw err;
    }) as AgendaElement | undefined;
};

export const updateMyAgenda = async (agendaId: string, details: AgendaDetails, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.put<AgendaElement>(`${envVars.agendaUrl}/my-agenda`, {agendaId, details})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao atualizar agenda');
      throw err;
    }) as AgendaElement | undefined;
};

export const newMyAgenda = async (agenda: AgendaDetails, errorFn: (data: any) => void = () => {}): Promise<AgendaElement | undefined> => {
  return await privateClient.post<AgendaElement>(`${envVars.agendaUrl}/my-agenda`, agenda)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao criar agenda');
      throw err;
    }) as AgendaElement | undefined;
};

export const getAgendasByUser = async (userId: string, errorFn: (data: any) => void = () => {}): Promise<IShortAgendaProps[] | undefined> => {
  return await publicClient.get<IShortAgendaProps[]>(`${envVars.agendaUrl}/list-agendas`, {params: { userId }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao carregar lista de agendas');
      throw err;
    }) as IShortAgendaProps[] | undefined;
};

export const getAgendaByTag = async (userId: string, tag: string, errorFn: (data: any) => void = () => {}): Promise<IShortAgendaProps | undefined> => {
  return await publicClient.get<IShortAgendaProps>(`${envVars.agendaUrl}/agenda-info-by-tag`, {params: { userId, tag}})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao carregar lista de agendas');
      throw err;
    }) as IShortAgendaProps | undefined;
};

export const getAgendaById = async (userId: string, agendaId: string, errorFn: (data: any) => void = () => {}): Promise<IShortAgendaProps | undefined> => {
  return await publicClient.get<IShortAgendaProps>(`${envVars.agendaUrl}/agenda-info-by-id`, {params: { userId, agendaId}})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao carregar lista de agendas');
      throw err;
    }) as IShortAgendaProps | undefined;
};