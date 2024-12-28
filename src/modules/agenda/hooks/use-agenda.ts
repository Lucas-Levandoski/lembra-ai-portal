'use client';

import { listMyAgendas, updateMyAgenda } from 'Agenda/services';
import { AgendaElement } from 'Common';
import { useStore } from 'Store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useAgenda() {
  const { agendas, isAgendaLoading, setAgendas, setIsAgendaLoading, profile } = useStore(state => ({
    agendas: state.agendas,
    setAgendas: state.setAgendas,
    isAgendaLoading: state.isAgendaLoading,
    setIsAgendaLoading: state.setIsAgendaLoading,
    isProfileLoading: state.isProfileLoading,
    profile: state.profile,
  }));

  const onCopy = (agendaTag: string) => {
    const domain = window ? window.location.origin : '';

    navigator.clipboard.writeText(`${domain}/${profile?.tag}/${agendaTag}`);

    toast.success('Link copiado com sucesso');
  };

  const onToggleActive = async (agendaId: string) => {
    if (!agendas) return;

    const index = agendas.findIndex(agenda => agenda.id === agendaId);

    if(index < 0) return;

    const agenda = agendas[index];
    const newState = !agenda.details.isEnable;
    agenda.details.isEnable = newState;

    agendas[index] = agenda;

    setAgendas(agendas);

    await updateMyAgenda(agendaId, agenda.details)
      .then(() => {
        toast.success(`Agenda '${agenda.details.name}' ${agenda.details.isEnable ? 'ativada' : 'desativada'} com sucesso`);
      }).catch(() => {
        agenda.details.isEnable = ! newState;
        agendas[index] = agenda;
        setAgendas(agendas);
      });
  };

  const findAgenda = (id: string) => {
    if(!agendas) return;
    
    return agendas.find(agenda => agenda.id === id);
  };

  const getAgendas = async (shouldSetLoading: boolean = false): Promise<AgendaElement[] | undefined> => {
    if(!agendas || shouldSetLoading) setIsAgendaLoading(true);

    const _agendas = await listMyAgendas()
      .then(agendaResult => {
        setAgendas(agendaResult);
        return agendaResult;
      }).catch((err) => {
        if(err instanceof AxiosError) {
          if (err.response?.status === 404) {
            setAgendas([]);
            return undefined;
          }

          toast.error('Falha ao listar suas agendas');
        }
        return undefined;
      })      
      .finally(() => {
        setIsAgendaLoading(false);
      });

    return _agendas;
  };

  return {
    agendas,
    isAgendaLoading,
    getAgendas,
    onCopy,
    onToggleActive,
    findAgenda,
  };
}