import { StateCreator } from 'zustand';
import { AgendaSlice } from '../models';

export const createAgendaSlice: StateCreator<AgendaSlice> = (set) => ({
  agendas: undefined,
  isAgendaLoading: false,

  setAgendas: (agendas) => set(() => ({ agendas })),
  setIsAgendaLoading: (isAgendaLoading) => set(() => ({ isAgendaLoading }))
});