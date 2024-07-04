'use client';

import { listAgendas, updateAgenda } from 'Agenda';
import { useStore } from 'Store';
import { toast } from 'react-toastify';

export function useAgenda() {
  const { agendas, isAgendaLoading, setAgendas, setIsAgendaLoading } = useStore(state => ({
    agendas: state.agendas,
    setAgendas: state.setAgendas,
    isAgendaLoading: state.isAgendaLoading,
    setIsAgendaLoading: state.setIsAgendaLoading
  }));

  const onCopy = (agendaName: string) => {
    console.info(agendaName, 'copied');

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

    await updateAgenda(agendaId, agenda.details)
      .then(() => {
        toast.success(`Agenda '${agenda.details.name}' ${agenda.details.isEnable ? 'ativada' : 'desativada'} com sucesso`);
      }).catch(() => {
        agenda.details.isEnable = ! newState;
        agendas[index] = agenda;
        setAgendas(agendas);
      });
  };

  const getAgendas = async (shouldSetLoading: boolean = false) => {

    if(!agendas || shouldSetLoading) setIsAgendaLoading(true);

    listAgendas().then(agendaResult => {
      setAgendas(agendaResult);
    }).finally(() => {
      setIsAgendaLoading(false);
    });
  };

  return {
    agendas,
    isAgendaLoading,
    getAgendas,
    onCopy,
    onToggleActive,
  };
}