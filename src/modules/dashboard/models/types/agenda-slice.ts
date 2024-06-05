import { AgendaElement } from 'Common';

export type AgendaSlice = {
  agendas?: AgendaElement[],
  isAgendaLoading: boolean,

  setAgendas: (agendas?: AgendaElement[]) => void,
  setIsAgendaLoading: (isAgendaLoading: boolean) => void,
}